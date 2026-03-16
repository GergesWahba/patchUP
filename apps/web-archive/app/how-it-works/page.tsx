import { Card } from '@/components/ui/card';

const steps = [
  {
    title: '1. Customer submits a request',
    description:
      'Choose a category, describe the issue, set urgency, and share location and timing details.',
  },
  {
    title: '2. Providers browse or receive matches',
    description:
      'Providers see relevant open jobs by category and location, then accept or decline quickly.',
  },
  {
    title: '3. Status stays visible',
    description:
      'Requests move through open, accepted, in progress, completed, or canceled states with a clear audit trail.',
  },
  {
    title: '4. Messaging foundation supports coordination',
    description:
      'The MVP includes conversation and message models, plus placeholder UI and API endpoints for next-step chat features.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-ember">How PatchUp works</p>
        <h1 className="mt-3 font-[family-name:var(--font-heading)] text-5xl font-bold">
          A repair request workflow designed for fast response and clear ownership
        </h1>
      </div>

      <div className="mt-10 grid gap-5">
        {steps.map((step) => (
          <Card key={step.title}>
            <h2 className="text-2xl font-bold">{step.title}</h2>
            <p className="mt-3 text-ink/70">{step.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
