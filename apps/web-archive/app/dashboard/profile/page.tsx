import { AuthGuard } from '@/components/layout/auth-guard';
import { ProfileForm } from '@/features/dashboard/profile-form';

export default function ProfilePage() {
  return (
    <AuthGuard roles={['customer', 'provider']}>
      <ProfileForm />
    </AuthGuard>
  );
}
