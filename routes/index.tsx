import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewPost from '../src/NewPost';
import Home from '../src/Home';
import LoginScreen from '../src/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import PostDetails from '../src/PostDetails';
import {useTheme} from '../hooks/useTheme';
import WelcomeScreen from '../src/Welcome';
import {useAppSelector} from '../store';
import Avatar from '../components/Avatar';
import About from '../src/About';
import Settings from '../src/Settings';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const theme = useTheme();
  const auth = useAppSelector(s => s.auth.user?.username);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            title: 'Login',
            headerStyle: {backgroundColor: theme.bg},
            headerTitleStyle: {color: theme.text},
            headerTintColor: theme.primary,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: auth ? `Hi, ${auth}` : 'Home',
            headerLeft: () => <Avatar />,
            headerStyle: {backgroundColor: theme.bg},
            headerTitleStyle: {
              color: theme.text,
              fontSize: 16,
            },
            headerTintColor: theme.primary,
          }}
        />
        <Stack.Screen
          name="PostDetails"
          options={{
            title: 'Post Details',
            headerStyle: {backgroundColor: theme.bg},
            headerTitleStyle: {color: theme.text},
            headerTintColor: theme.primary,
          }}
          // eslint-disable-next-line react/no-unstable-nested-components
          component={({route}) => <PostDetails route={route} />}
        />
        <Stack.Screen
          name="NewPost"
          options={{
            title: 'New Post',
            headerStyle: {backgroundColor: theme.bg},
            headerTitleStyle: {color: theme.text},
            headerTintColor: theme.primary,
          }}
          component={NewPost}
        />
        <Stack.Screen
          name="About"
          options={{
            title: 'About',
            headerStyle: {backgroundColor: theme.bg},
            headerTitleStyle: {color: theme.text},
            headerTintColor: theme.primary,
          }}
          component={About}
        />
        <Stack.Screen
          name="Settings"
          options={{
            title: 'Settings',
            headerStyle: {backgroundColor: theme.bg},
            headerTitleStyle: {color: theme.text},
            headerTintColor: theme.primary,
          }}
          component={Settings}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
