export interface OutputModel {
  weeklyPlan: [
    {
      day: string;
      focus: string;
      workout: [
        {
          exercise: string;
          sets: string;
          reps: string;
        }
      ];
    }
  ];
  nutritionTips: string[];
}
