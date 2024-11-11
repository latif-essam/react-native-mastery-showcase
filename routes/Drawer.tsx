import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import PostsScreen from '../src/PostsScreen'; // PostsScreen (Home)
import Sidebar from './SideBar'; // Sidebar for the drawer content

const Drawer = createDrawerNavigator();
const HomeDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="PostsScreen"
      drawerContent={Sidebar}
      screenOptions={{
        drawerStyle: {backgroundColor: '#fff'},
        headerStyle: {backgroundColor: '#f0f0f0'},
      }}>
      <Drawer.Screen name="PostsScreen" component={PostsScreen} />
    </Drawer.Navigator>
  );
};

export default HomeDrawerNavigator;
