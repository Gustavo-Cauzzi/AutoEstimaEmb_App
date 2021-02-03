import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import ClientList from '../pages/ClientList';
import ClientPage from '../pages/ClientPage';

const Router = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Router.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false,
        }}>
        <Router.Screen name="Dashboard" component={Dashboard} />
        <Router.Screen name="ClientList" component={ClientList} />
        <Router.Screen name="ClientPage" component={ClientPage} />
      </Router.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
