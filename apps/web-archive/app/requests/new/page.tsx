import { AuthGuard } from '@/components/layout/auth-guard';
import { RequestForm } from '@/features/requests/request-form';

export default function NewRequestPage() {
  return (
    <AuthGuard roles={['customer']}>
      <div className="mx-auto max-w-7xl px-6 py-10">
        <RequestForm />
      </div>
    </AuthGuard>
  );
}
