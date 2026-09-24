import { FormModel } from "@/app/model/formModel";
import { OutputModel } from "@/app/model/outputModel";
import { NextResponse } from "next/server";

const MODELS = [
  "nvidia/nemotron-3.5-lightning:free",
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
];

export async function POST(req: Request) {
  try {
    let data = (await req.json()) as FormModel;
    let prompt = ` Create a fitness plan based on the following user data:
      Weight (kg): ${data.weight}
      Height (cm): ${data.height}
      Fitness Goal: ${data.goal}
      Available Training Days per Week: ${data.days} day

      Rules:
      1. Return ONLY valid JSON.
      2. Do NOT add any text outside the JSON.
      3. The output must match this exact structure:

      {
        "weeklyPlan": [
          {
            "day": "Day 1",
            "focus": "string",
            "workout": [
              {
                "exercise": "string",
                "sets": number,
                "reps": "string"
              }
            ]
          }
        ],
        "nutritionTips": [
          "string"
        ]
      }
      Guidelines:
      - Weekly plan length must match the number of available training days.
      - Exercises should match the fitness goal.
      - Nutrition tips must be short, practical, and beginner-friendly.`;
    for (const model of MODELS) {
      try {
        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model,
              messages: [
                {
                  role: "system",
                  content: `You are a fitness planning assistant.
                            You must return output ONLY in valid JSON.
                            Do NOT include explanations, markdown, or extra text.
                            The JSON structure must follow the schema exactly.`,
                },
                {
                  role: "user",
                  content: prompt,
                },
              ],
              reasoning: { enabled: true },
            }),
          },
        );

        if (!response.ok) continue;

        const result = await response.json();
        const content = result?.choices?.[0]?.message?.content;
        if (!content) continue;

        const output = JSON.parse(
          content.replaceAll("—", "-"),
        ) as OutputModel;
        return NextResponse.json(output);
      } catch {
        continue;
      }
    }

    throw new Error("All models failed");
  } catch (error) {
    return NextResponse.json(
      { success: false },
      {
        status: 401,
      },
    );
  }
}
