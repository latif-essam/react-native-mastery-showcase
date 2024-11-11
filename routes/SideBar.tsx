import React from 'react';
import {View, Text, Image, Switch} from 'react-native';
import {useAppSelector, useAppDispatch} from '../store';
import {setTheme} from '../store/reducers/themeSlice';

const Sidebar = () => {
  const isDarkModeInitial =
    useAppSelector(state => state.theme.color) === 'dark';
  const [isDarkMode, setIsDarkMode] = React.useState(isDarkModeInitial);
  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    dispatch(setTheme(isDarkMode ? 'light' : 'dark'));
  };

  return (
    <View style={{flex: 1, paddingTop: 30, paddingLeft: 15, paddingRight: 15}}>
      <Image
        source={{uri: 'https://via.placeholder.com/150'}}
        style={{width: 100, height: 100, borderRadius: 50}}
      />
      <Text style={{marginTop: 20}}>Email: latif_essam@outlook.com</Text>
      <Text>Phone: +201026042736</Text>
      <View style={{marginTop: 30}}>
        <Text>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
    </View>
  );
};

export default Sidebar;
