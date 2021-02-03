import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../pages/Dashboard';

const Router = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Router.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Router.Screen name="Dashboard" component={Dashboard} />
      </Router.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
