import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from '../navigation/AppNavigator';
import { useAuthBootstrap } from '../hooks/useAuthBootstrap';
import { useAuthStore } from '../store/auth-store';

export function PatchUpMobileApp() {
  useAuthBootstrap();
  const isHydrating = useAuthStore((state) => state.isHydrating);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        {isHydrating ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#F5F0E7',
            }}
          >
            <ActivityIndicator size="large" color="#19324A" />
          </View>
        ) : (
          <AppNavigator />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
