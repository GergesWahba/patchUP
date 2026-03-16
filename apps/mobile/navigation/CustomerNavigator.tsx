import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { CustomerRootStackParamList } from '../types';
import { CustomerTabsNavigator } from './CustomerTabs';
import { CategoriesScreen } from '../screens/CategoriesScreen';
import { RequestDetailsScreen } from '../screens/RequestDetailsScreen';

const Stack = createNativeStackNavigator<CustomerRootStackParamList>();

export function CustomerNavigator() {
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
      <Stack.Screen name="CustomerTabs" component={CustomerTabsNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="RequestDetails" component={RequestDetailsScreen} options={{ title: 'Request details' }} />
      <Stack.Screen name="Categories" component={CategoriesScreen} options={{ title: 'Categories' }} />
    </Stack.Navigator>
  );
}
