"use client";

import theme from "./theme";
import { ThemeProvider } from "@mui/material";
import { useRef, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import SelectField from "./components/selectField";
import InputField from "./components/inputField";
import { FormModel } from "./model/formModel";
import { OutputModel } from "./model/outputModel";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

export default function FitnessPlannerPage() {
  const [form, setForm] = useState<FormModel>({} as FormModel);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weeklyPlan, setWeeklyPlan] = useState<any[]>([]);
  const [nutritionTips, setNutritionTips] = useState<string[]>([]);
  const inputRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async () => {
    setError(false);
    if (
      Number.isNaN(form.weight) ||
      Number.isNaN(form.height) ||
      Number.isNaN(form.days) ||
      form.goal == ""
    ) {
      setError(true);
      return;
    }

    setLoading(true);
    setWeeklyPlan([]);
    setNutritionTips([]);

    try {
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as OutputModel;
      setWeeklyPlan(data.weeklyPlan || []);
      setNutritionTips(data.nutritionTips || []);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
        outputRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 1500);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AnimatedGridPattern className="-z-2 absolute inset-0" />
      <div className="w-full">
        <div className="h-screen w-full">
          <div className="flex h-screen items-center justify-between px-5 sm:px-12 lg:px-36">
            <div className="text-[#026345]">
              <p className="text-6xl font-semibold">Fitly</p>
              <p className="text-3xl mt-8">
                Turn your goals into a weekly fitness plan.
              </p>
              <p className="text-3xl mt-1">
                Train smarter. Eat better. Feel stronger.
              </p>
              <p className="mt-4 text-md font-light">
                Get a personalized weekly workout plan and simple nutrition tips
                <br />
                based on your body, goals, and training schedule in under a
                minute.
              </p>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#026345",
                  color: "#EEF2F0",
                  fontSize: "20px",
                  borderRadius: "32px",
                  marginTop: "40px",
                }}
                onClick={() =>
                  inputRef.current?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Build My Plan
              </Button>
            </div>
            <div className="hidden md:block">
              <img src="/hero.png" alt="Hero" className="h-full w-[480px]" />
            </div>
          </div>
        </div>

        <div className="px-4 mt-32 pb-32 sm:px-12 lg:px-24" ref={inputRef}>
          <p className="text-3xl font-normal mb-3 text-center sm:text-left text-[#026345]">
            Create Your Fitness Plan
          </p>
          <p className="text-xl mb-6 font-light text-center sm:text-left text-[#026345]">
            Tell us about your body, goals, and schedule — we'll do the rest.
          </p>

          <Card
            sx={{
              mb: 4,
            }}
          >
            <CardContent className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <InputField
                  error={
                    error && Number.isNaN(form.weight ?? NaN)
                      ? "Weight must be filled"
                      : null
                  }
                  label="Weight (kg)"
                  value={form?.weight?.toString() ?? ""}
                  type="number"
                  onChange={(e) =>
                    setForm({ ...form, weight: parseInt(e.target.value) })
                  }
                />
                <InputField
                  error={
                    error && Number.isNaN(form.height ?? NaN)
                      ? "Height must be filled"
                      : null
                  }
                  label="Height (cm)"
                  value={form?.height?.toString() ?? ""}
                  type="number"
                  onChange={(e) =>
                    setForm({ ...form, height: parseInt(e.target.value) })
                  }
                />
              </div>

              <SelectField
                error={error && !form.goal ? "Goal must be selected" : null}
                label="Goal"
                value={form?.goal ?? ""}
                onChange={(e) => setForm({ ...form, goal: e.target.value })}
                options={[
                  { value: "Lose Weight", label: "Lose Weight" },
                  { value: "Gain Muscle", label: "Gain Muscle" },
                  { value: "Maintain Fitness", label: "Maintain Fitness" },
                ]}
              />

              <InputField
                error={
                  error && Number.isNaN(form.days ?? NaN)
                    ? "Training days must be filled"
                    : null
                }
                label="Training days per week"
                value={form?.days?.toString() ?? ""}
                type="number"
                onChange={(e) => {
                  const day = parseInt(e.target.value);
                  if (day <= 0 || day > 7) return;
                  setForm({ ...form, days: day });
                }}
              />

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleSubmit}
                disabled={loading}
                sx={{
                  height: 48,
                  backgroundColor: "#026345",
                  color: "#EEF2F0",
                  fontWeight: 600,
                  borderRadius: 2,
                  mt: 2,
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Generate Plan"
                )}
              </Button>
            </CardContent>
          </Card>

          {weeklyPlan.length > 0 && (
            <div ref={outputRef} className="text-[#026345]">
              <p className="font-bold mb-3">Weekly Plan</p>
              {weeklyPlan.map((day, idx) => (
                <Card key={idx} sx={{ mb: 2, borderRadius: 3 }}>
                  <CardContent>
                    <p className="font-bold">
                      {day.day} — {day.focus}
                    </p>
                    <List dense>
                      {day.workout.map((w: any, i: number) => (
                        <ListItem key={i} disablePadding>
                          <ListItemText
                            primary={`${w.exercise} (${w.sets} x ${w.reps})`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {nutritionTips.length > 0 && (
            <div className="mt-10 text-[#026345]">
              <p className="font-bold mb-2">Nutrition Tips</p>
              <List>
                {nutritionTips.map((tip, i) => (
                  <ListItem key={i} disablePadding>
                    <ListItemText primary={tip} />
                  </ListItem>
                ))}
              </List>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}
