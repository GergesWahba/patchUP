import { Card } from './card';

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card className="text-center">
      <p className="text-lg font-semibold">{title}</p>
      <p className="mt-2 text-sm text-ink/65">{description}</p>
    </Card>
  );
}
