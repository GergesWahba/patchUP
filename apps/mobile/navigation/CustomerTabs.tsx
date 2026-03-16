import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { CustomerTabParamList } from '../types';
import { ActiveRequestsScreen } from '../screens/ActiveRequestsScreen';
import { CreateRequestScreen } from '../screens/CreateRequestScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { RequestHistoryScreen } from '../screens/RequestHistoryScreen';

const Tab = createBottomTabNavigator<CustomerTabParamList>();

export function CustomerTabsNavigator() {
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
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="CreateRequest" component={CreateRequestScreen} options={{ title: 'Create' }} />
      <Tab.Screen name="ActiveRequests" component={ActiveRequestsScreen} options={{ title: 'Active' }} />
      <Tab.Screen name="RequestHistory" component={RequestHistoryScreen} options={{ title: 'History' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
