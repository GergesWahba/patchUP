import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ProviderRootStackParamList } from '../types';
import { ProviderTabsNavigator } from './ProviderTabs';
import { CategoriesScreen } from '../screens/CategoriesScreen';
import { RequestDetailsScreen } from '../screens/RequestDetailsScreen';

const Stack = createNativeStackNavigator<ProviderRootStackParamList>();

export function ProviderNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#F5F0E7',
        },
        headerTintColor: '#19324A',
      }}
    >
      <Stack.Screen name="ProviderTabs" component={ProviderTabsNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="RequestDetails" component={RequestDetailsScreen} options={{ title: 'Job details' }} />
      <Stack.Screen name="Categories" component={CategoriesScreen} options={{ title: 'Categories' }} />
    </Stack.Navigator>
  );
}
