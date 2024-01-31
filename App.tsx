import React, {useCallback} from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen.tsx';
import AccountScreen from './src/screens/AccountScreen.tsx';
import ExercisesScreen from './src/screens/ExercisesScreen.tsx';
import {COLORS, ROUTES} from './src/utils/constants.ts';
import Icons from './src/assets/icons';
import Header from './src/navigation/header.tsx';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  const renderIcon = useCallback((name: string, focused: boolean) => {
    let icon;
    switch (name) {
      case ROUTES.EXERCISES:
        icon = Icons.exercises;
        break;
      case ROUTES.ACCOUNT:
        icon = Icons.account;
        break;
      default:
        icon = Icons.home;
        break;
    }
    return (
      <Image
        source={icon}
        tintColor={focused ? COLORS.PRIMARY : COLORS.SECONDARY}
        style={{width: 20, height: 20}}
      />
    );
  }, []);

  const renderHeader = useCallback(() => {
    return <Header />;
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => renderIcon(route.name, focused),
          tabBarActiveTintColor: COLORS.PRIMARY,
          tabBarInactiveTintColor: COLORS.SECONDARY,
          tabBarStyle: {
            backgroundColor: COLORS.MENUS,
            paddingBottom: 10,
            height: '10%',
          },
          tabBarLabelStyle: {
            fontSize: 12, // Set font size of labels if needed
            paddingBottom: 10,
          },
          headerShown: true,
          header: renderHeader,
        })}
        initialRouteName={ROUTES.HOME}>
        <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
        <Tab.Screen name={ROUTES.EXERCISES} component={ExercisesScreen} />
        <Tab.Screen name={ROUTES.ACCOUNT} component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
