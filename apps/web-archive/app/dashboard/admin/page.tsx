import { Card } from '@/components/ui/card';

export default function AdminDashboardPage() {
  return (
    <Card>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ember">Admin foundation</p>
      <h1 className="mt-3 text-3xl font-black">Admin routing and role structure are ready for expansion.</h1>
      <p className="mt-4 max-w-2xl text-sm text-ink/70">
        The MVP includes JWT role support, admin-aware middleware, and dashboard routing so moderation,
        analytics, and dispute workflows can be layered in without reworking authentication or authorization.
      </p>
    </Card>
  );
}
