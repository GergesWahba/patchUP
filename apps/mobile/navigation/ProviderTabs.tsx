import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { ProviderTabParamList } from '../types';
import { AcceptedJobsScreen } from '../screens/AcceptedJobsScreen';
import { AvailableJobsScreen } from '../screens/AvailableJobsScreen';
import { CompletedJobsScreen } from '../screens/CompletedJobsScreen';
import { ProviderDashboardScreen } from '../screens/ProviderDashboardScreen';
import { ProviderProfileScreen } from '../screens/ProviderProfileScreen';

const Tab = createBottomTabNavigator<ProviderTabParamList>();

export function ProviderTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#F5F0E7',
        },
        headerTintColor: '#19324A',
        tabBarActiveTintColor: '#19324A',
        tabBarInactiveTintColor: '#7D7A73',
      }}
    >
      <Tab.Screen name="ProviderDashboard" component={ProviderDashboardScreen} options={{ title: 'Overview' }} />
      <Tab.Screen name="AvailableJobs" component={AvailableJobsScreen} options={{ title: 'Available' }} />
      <Tab.Screen name="AcceptedJobs" component={AcceptedJobsScreen} options={{ title: 'Accepted' }} />
      <Tab.Screen name="CompletedJobs" component={CompletedJobsScreen} options={{ title: 'Completed' }} />
      <Tab.Screen name="ProviderProfile" component={ProviderProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}
