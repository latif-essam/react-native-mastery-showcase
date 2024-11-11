import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewPost from '../src/NewPost';
import PostsScreen from '../src/PostsScreen';
import LoginScreen from '../src/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {Text} from 'react-native';
import PostDetails from '../src/PostDetails';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="Home"
          component={PostsScreen}
          options={{title: 'Home', headerLeft: () => <></>}}
        />
        <Stack.Screen
          name="PostDetails"
          options={{title: 'Post Details'}}
          // eslint-disable-next-line react/no-unstable-nested-components
          component={({route}) => <PostDetails route={route} />}
        />
        <Stack.Screen
          name="NewPost"
          options={{title: 'New Post'}}
          component={NewPost}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
