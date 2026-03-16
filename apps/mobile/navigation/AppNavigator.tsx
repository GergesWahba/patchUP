import { AuthStackNavigator } from './AuthStack';
import { CustomerNavigator } from './CustomerNavigator';
import { ProviderNavigator } from './ProviderNavigator';
import { useAuthStore } from '../store/auth-store';
import { WelcomeScreen } from '../screens/WelcomeScreen';

export function AppNavigator() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <AuthStackNavigator />;
  }

  if (user.role === 'customer') {
    return <CustomerNavigator />;
  }

  if (user.role === 'provider') {
    return <ProviderNavigator />;
  }

  return <WelcomeScreen adminFallback />;
}
