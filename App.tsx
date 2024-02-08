import React, {useCallback} from 'react';
import {Image} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen.tsx';
import AccountScreen from './src/screens/AccountScreen.tsx';
import ExercisesScreen from './src/screens/ExercisesScreen.tsx';
import {COLORS, ROUTES} from './src/utils/constants.ts';
import Icons from './src/assets/icons';
import Header from './src/navigation/header.tsx';
import ExerciseDetailScreen from './src/screens/ExerciseDetailScreen.tsx';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ExerciseStack() {
  return (
    <Stack.Navigator
      screenOptions={({}) => ({
        headerShown: false,
      })}>
      <Stack.Screen name={ROUTES.EXERCISE_LIST} component={ExercisesScreen} />
      <Stack.Screen
        name={ROUTES.EXERCISE_DETAIL}
        component={ExerciseDetailScreen}
      />
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  const {t} = useTranslation('app');
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
            paddingTop: 15,
            height: '13%',
          },
          tabBarLabelStyle: {
            fontSize: 12, // Set font size of labels if needed
            paddingBottom: 10,
          },
          tabBarLabel: t(`tab.${route.name}`),
          headerShown: true,
          header: renderHeader,
        })}
        initialRouteName={ROUTES.HOME}>
        <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
        <Tab.Screen name={ROUTES.EXERCISES} component={ExerciseStack} />
        <Tab.Screen name={ROUTES.ACCOUNT} component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
