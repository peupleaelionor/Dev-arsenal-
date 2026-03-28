export type OnboardingStepId =
  | "welcome"
  | "organization"
  | "profile"
  | "billing"
  | "invite"
  | "complete";

export interface OnboardingStep {
  id: OnboardingStepId;
  title: string;
  description: string;
  path: string;
  order: number;
  required: boolean;
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Welcome",
    description: "Get oriented with DevArsenal",
    path: "/onboarding/welcome",
    order: 1,
    required: true,
  },
  {
    id: "organization",
    title: "Create Organization",
    description: "Set up your workspace",
    path: "/onboarding/organization",
    order: 2,
    required: true,
  },
  {
    id: "profile",
    title: "Your Profile",
    description: "Add your name and avatar",
    path: "/onboarding/profile",
    order: 3,
    required: false,
  },
  {
    id: "billing",
    title: "Choose a Plan",
    description: "Select the plan that fits your needs",
    path: "/onboarding/billing",
    order: 4,
    required: false,
  },
  {
    id: "invite",
    title: "Invite Your Team",
    description: "Bring your team members on board",
    path: "/onboarding/invite",
    order: 5,
    required: false,
  },
  {
    id: "complete",
    title: "All Done",
    description: "You're ready to go",
    path: "/dashboard",
    order: 6,
    required: true,
  },
];

export function getStepByIndex(order: number): OnboardingStep | undefined {
  return ONBOARDING_STEPS.find((s) => s.order === order);
}

export function getNextStep(currentStepId: OnboardingStepId | null): OnboardingStep {
  if (!currentStepId) return ONBOARDING_STEPS[0];
  const current = ONBOARDING_STEPS.find((s) => s.id === currentStepId);
  if (!current) return ONBOARDING_STEPS[0];
  const next = ONBOARDING_STEPS.find((s) => s.order === current.order + 1);
  return next ?? ONBOARDING_STEPS[ONBOARDING_STEPS.length - 1];
}

export function isOnboardingComplete(stepId: OnboardingStepId | null): boolean {
  return stepId === "complete";
}

export function getCompletionPercentage(stepId: OnboardingStepId | null): number {
  if (!stepId) return 0;
  const step = ONBOARDING_STEPS.find((s) => s.id === stepId);
  if (!step) return 0;
  return Math.round((step.order / ONBOARDING_STEPS.length) * 100);
}
