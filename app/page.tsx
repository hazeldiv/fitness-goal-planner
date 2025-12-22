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
// import Snowfall from "react-snowfall";

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
      Number.isNaN(form.weight) ||
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
        if (outputRef.current) {
          outputRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 1500);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="mx-24 sm:px-15 px-3">
        <div className="flex h-[100vh] items-center justify-between">
          <div className="text-[#026345]">
            <p className="text-6xl font-semibold">Fitly</p>
            <p className="text-3xl mt-8">
              Turn your goals into a weekly fitness plan.
            </p>
            <p className="text-3xl mt-1">
              Train smarter. Eat better. Feel Stronger
            </p>
            <p className="mt-4 text-md">
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
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Built My Plan
            </Button>
          </div>
          <div>
            <img src="/hero.png" alt="" className="h-full w-120" />
          </div>
        </div>

        {/* <LightRays style={{ zIndex: -2, height: "100vh", position: "fixed" }} /> */}
        <p className="text-3xl font-bold mb-3 w-full max-sm:text-center mt-100">
          Fitness Goal Planner
        </p>
        <p className="mb-3 max-sm:text-center">
          Enter your basic info to generate a weekly fitness plan.
        </p>

        {/* Input Form */}
        <Card
          sx={{ mb: 4, borderRadius: 2, padding: { sm: 1 } }}
          ref={inputRef}
        >
          <CardContent className="flex flex-col gap-3">
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField
                error={
                  error && Number.isNaN(form.weight ?? NaN)
                    ? "Weight Must be Filled"
                    : null
                }
                label="Weight (kg)"
                placeholder="Weight (kg)"
                value={
                  form?.weight || form?.weight == 0
                    ? form?.weight.toString()
                    : ""
                }
                type="number"
                onChange={(e) => {
                  const input = parseInt(e.target.value);
                  if (input > 0 || e.target.value == "") {
                    setForm({
                      ...form,
                      weight: e.target.value.startsWith("-") ? 0 : input,
                    });
                  }
                }}
              />
              <InputField
                error={
                  error && Number.isNaN(form.height ?? NaN)
                    ? "Height Must be Filled"
                    : null
                }
                label="Height (cm)"
                placeholder="Height (cm)"
                value={
                  form?.height || form?.height == 0
                    ? form?.height.toString()
                    : ""
                }
                type="number"
                onChange={(e) => {
                  const input = parseInt(e.target.value);
                  if (input > 0 || e.target.value == "") {
                    setForm({
                      ...form,
                      height: e.target.value.startsWith("-") ? 0 : input,
                    });
                  }
                }}
              />
            </div>
            <SelectField
              error={
                error && (form?.goal ?? "") == ""
                  ? "Height Must be Filled"
                  : null
              }
              label="Goal"
              value={form?.goal ?? ""}
              placeholder="Goal"
              onChange={(e) => setForm({ ...form, goal: e.target.value ?? "" })}
              options={[
                { value: "Lose Weight", label: "Lose Weight" },
                { value: "Gain Muscle", label: "Gain Muscle" },
                { value: "Maintain Fitness", label: "Maintain Fitness" },
              ]}
            />
            <InputField
              error={
                error && Number.isNaN(form.days ?? NaN)
                  ? "Training days per week Must be Filled"
                  : null
              }
              label="Training days per week"
              placeholder="Training days per week"
              value={form?.days || form?.days == 0 ? form?.days.toString() : ""}
              type="number"
              onChange={(e) => {
                const input = parseInt(e.target.value);
                if ((input <= 7 && input > 0) || e.target.value == "") {
                  setForm({
                    ...form,
                    days: input,
                  });
                }
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
                backgroundColor: "#F4F5F7",
                color: "#0E1117",
                fontWeight: 600,
                letterSpacing: 0.6,
                borderRadius: 2,
                boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
                "&:hover": {
                  backgroundColor: "#868686ff",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
                },
                "&:active": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                },
                mt: 3,
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

        {/* Weekly Plan */}
        {weeklyPlan.length > 0 && (
          <div className="mb-4" ref={outputRef}>
            <p className="font-bold mb-2 ml-2">Weekly Plan</p>
            {weeklyPlan.map((day, idx) => (
              <Card key={idx} sx={{ mb: 2, borderRadius: 3, padding: 1 }}>
                <CardContent>
                  <p className="font-bold">
                    {day.day} - {day.focus}
                  </p>
                  <List dense>
                    {day.workout.map((w: any, i: number) => (
                      <ListItem key={i} disablePadding>
                        <ListItemText
                          primary={`${w.exercise} (${w.sets} sets x ${w.reps})`}
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
          <div className="mt-10">
            <p className="font-bold mb-1 ml-2">Nutrition Tips</p>
            <List>
              {nutritionTips.map((tip, i) => (
                <ListItem key={i} disablePadding>
                  <ListItemText primary={tip} className="ml-2" />
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
