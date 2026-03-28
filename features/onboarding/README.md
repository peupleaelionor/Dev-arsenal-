# Onboarding Module

Guides new users through initial setup after signup.

## Steps
1. **Welcome** — introduce the product
2. **Organization** — create or join an org
3. **Profile** — set display name and avatar
4. **Billing** — select a plan (optional, can skip to free trial)
5. **Invite** — invite team members
6. **Complete** — show the dashboard

## Usage

```typescript
import { ONBOARDING_STEPS, getNextStep, isOnboardingComplete } from "@/features/onboarding/steps";

const nextStep = getNextStep(user.onboardingStep);
```

## State

Onboarding progress is stored on the `User` model as `onboardingStep: string`.
