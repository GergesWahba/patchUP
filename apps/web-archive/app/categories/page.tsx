import { CATEGORY_LABELS, SERVICE_CATEGORIES } from '@patchup/shared';
import { Card } from '@/components/ui/card';

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-ember">Categories</p>
      <h1 className="mt-3 font-[family-name:var(--font-heading)] text-5xl font-bold">
        Service types available in the PatchUp MVP
      </h1>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICE_CATEGORIES.map((category) => (
          <Card key={category}>
            <h2 className="text-xl font-bold">{CATEGORY_LABELS[category]}</h2>
            <p className="mt-2 text-sm text-ink/65">
              Ready for request intake, provider matching, and dashboard tracking.
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
