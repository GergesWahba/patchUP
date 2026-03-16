import { StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { useAuthStore } from '../store/auth-store';

export function WelcomeScreen({
  navigation,
  adminFallback = false,
}: {
  navigation?: any;
  adminFallback?: boolean;
}) {
  const logout = useAuthStore((state) => state.logout);

  if (adminFallback) {
    return (
      <ScreenContainer>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Admin foundation</Text>
          <Text style={styles.title}>Admin login works, but dedicated admin mobile tooling is still queued.</Text>
          <Text style={styles.body}>
            The backend role model is preserved. For now, admins can sign out here or continue using API tooling while the admin surface is built.
          </Text>
          <PrimaryButton onPress={() => void logout()}>Log out</PrimaryButton>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>PatchUp mobile</Text>
        <Text style={styles.title}>Find fast local help for minor repair jobs without chasing ten different people.</Text>
        <Text style={styles.body}>
          Customers can post service requests in minutes. Providers can browse, accept, and update jobs from the same app.
        </Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Get started</Text>
        <Text style={styles.panelBody}>
          Create an account to book help or sign in to manage active jobs on the go.
        </Text>
        <PrimaryButton onPress={() => navigation?.navigate('Register')}>Create account</PrimaryButton>
        <PrimaryButton variant="ghost" onPress={() => navigation?.navigate('Login')}>
          Log in
        </PrimaryButton>
        <PrimaryButton variant="secondary" onPress={() => navigation?.navigate('Categories')}>
          Browse categories
        </PrimaryButton>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: 28,
    padding: 24,
    backgroundColor: '#19324A',
    gap: 14,
  },
  eyebrow: {
    color: '#F7C9AE',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
  },
  body: {
    color: '#D8E0E6',
    fontSize: 15,
    lineHeight: 22,
  },
  panel: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E0D7',
    padding: 20,
    gap: 12,
  },
  panelTitle: {
    color: '#19324A',
    fontSize: 22,
    fontWeight: '800',
  },
  panelBody: {
    color: '#5A646E',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },
});
