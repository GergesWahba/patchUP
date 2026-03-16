import Link from 'next/link';
import { CATEGORY_LABELS, SERVICE_CATEGORIES } from '@patchup/shared';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="pb-20">
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-ember/30 bg-white/70 px-4 py-2 text-sm font-semibold text-ember">
            Built for fast local repair help
          </p>
          <h1 className="max-w-3xl font-[family-name:var(--font-heading)] text-5xl font-bold leading-tight md:text-7xl">
            When something breaks, PatchUp gets the right local help moving.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/70">
            Customers create repair requests in minutes. Providers discover matching jobs,
            respond quickly, and keep progress visible from acceptance through completion.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/register">
              <Button>Start as a customer</Button>
            </Link>
            <Link href="/register">
              <Button variant="secondary">Join as a provider</Button>
            </Link>
          </div>
        </div>

        <Card className="bg-white">
          <div className="space-y-5">
            <div className="rounded-[24px] bg-mist p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink/50">Customer flow</p>
              <p className="mt-2 text-2xl font-bold">Post a request, get matched, track every step.</p>
            </div>
            <div className="rounded-[24px] bg-ink p-5 text-white">
              <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Provider flow</p>
              <p className="mt-2 text-2xl font-bold">
                Browse open jobs, accept the right fit, update status with confidence.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[24px] bg-ember/10 p-5">
                <p className="text-3xl font-black">11</p>
                <p className="mt-1 text-sm text-ink/60">starter service categories</p>
              </div>
              <div className="rounded-[24px] bg-moss/15 p-5">
                <p className="text-3xl font-black">3</p>
                <p className="mt-1 text-sm text-ink/60">role foundations ready now</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-ember">Service categories</p>
            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold">
              Broad enough for launch, simple to expand later
            </h2>
          </div>
          <Link href="/categories" className="text-sm font-semibold text-ink underline-offset-4 hover:underline">
            View all categories
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CATEGORIES.slice(0, 6).map((category) => (
            <Card key={category} className="bg-white/90">
              <p className="text-lg font-bold">{CATEGORY_LABELS[category]}</p>
              <p className="mt-2 text-sm text-ink/65">
                Requests, matching, and provider workflows are ready for this category on day one.
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
