import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewPost from '../src/NewPost';
import PostsScreen from '../src/PostsScreen';
import LoginScreen from '../src/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import PostDetails from '../src/PostDetails';
import {useTheme} from '../hooks/useTheme';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useAppDispatch, useAppSelector} from '../store';
import {setTheme} from '../store/reducers/themeSlice';
import {Image, Switch, Text, View} from 'react-native';
import WelcomeScreen from '../src/Welcome';
import Icon from 'react-native-vector-icons/MaterialIcons';

// drawer
const Drawer = createDrawerNavigator();

const Sidebar = ({navigation}) => {
  const isdark =
    useAppSelector(state => state.theme.color) === 'dark' ? true : false;

  const [isDarkMode, setIsDarkMode] = React.useState(isdark);
  const dispatch = useAppDispatch();
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Switch theme logic (this will depend on your theme provider logic)
    if (isDarkMode) {
      // Switch to light theme
      dispatch(setTheme(isDarkMode ? 'dark' : 'light'));
    }
  };

  return (
    <View style={{flex: 1, paddingTop: 30, paddingLeft: 15, paddingRight: 15}}>
      {/* Photo */}
      <Image
        source={{uri: 'https://via.placeholder.com/150'}}
        style={{width: 100, height: 100, borderRadius: 50}}
      />

      {/* Contact Info */}
      <Text style={{marginTop: 20}}>Email: latif_essam@outlook.com</Text>
      <Text>Phone: +201026042736</Text>

      {/* Settings Section - Theme Toggle */}
      <View style={{marginTop: 30}}>
        <Text>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
    </View>
  );
};
const HomeDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="PostsScreen"
      screenOptions={{
        drawerStyle: {backgroundColor: '#fff'},
        headerStyle: {backgroundColor: '#f0f0f0'},
      }}>
      <Drawer.Screen name="PostsScreen" component={PostsScreen} />
    </Drawer.Navigator>
  );
};
const Stack = createNativeStackNavigator();

// Stack Navigator for Welcome and Login screens
const WelcomeStackNavigator = () => {
  const theme = useTheme();
  return (
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
          title: 'Welcome',
          headerStyle: {backgroundColor: theme.bg},
          headerTitleStyle: {color: theme.text},
          headerTintColor: theme.primary,
        }}
      />
    </Stack.Navigator>
  );
};

const AppNavigators = () => {
  const theme = useTheme();
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
            title: 'Welcome',
            headerStyle: {backgroundColor: theme.bg},
            headerTitleStyle: {color: theme.text},
            headerTintColor: theme.primary,
          }}
        />
        <Stack.Screen
          name="Home"
          component={PostsScreen}
          options={{
            title: 'Home',
            headerLeft: () => <></>,
            headerStyle: {backgroundColor: theme.bg},
            headerTitleStyle: {color: theme.text},
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
// Main AppNavigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        {/* Welcome & Login Flow */}
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />

        {/* Home with Drawer */}
        <Stack.Screen
          name="Home"
          component={HomeDrawerNavigator}
          options={({navigation}) => ({
            title: 'Home',
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => (
              <Icon
                name="menu"
                size={30}
                onPress={() => navigation.openDrawer()}
              />
            ),
            headerShown: false,
          })}
        />

        {/* Post Details and New Post */}
        <Stack.Screen
          name="PostDetails"
          component={PostDetails}
          options={{
            title: 'Post Details',
            headerStyle: {backgroundColor: '#fff'},
            headerTitleStyle: {color: '#333'},
          }}
        />
        <Stack.Screen
          name="NewPost"
          component={NewPost}
          options={{
            title: 'New Post',
            headerStyle: {backgroundColor: '#fff'},
            headerTitleStyle: {color: '#333'},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
