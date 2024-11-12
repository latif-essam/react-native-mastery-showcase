/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../store';
import {fetchPosts} from '../store/actions/postsActions';
import PostCard from '../components/PostCard';
import AddPost from '../components/AddPost';
import TextInputField from '../components/forms/TextInputField';
import Spacer from '../components/Spacer';
import {deleteAllPosts} from '../store/reducers/posts';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../hooks/useTheme';
import {ThemePallet} from '../constants/themes';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/Ionicons';

const Home = () => {
  const navigation = useNavigation();
  const theme = useTheme(); // Access the theme
  const {error, list, status, page, totalPages} = useAppSelector(
    state => state.posts,
  );
  const [search, setSearch] = useState('');
  const [filteredList, setFilteredList] = useState(list);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!filteredList.length) {
      setFilteredList(list);
    }
    if (status === 'idle' && !list.length) {
      dispatch(fetchPosts(1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, list, status]);

  const loadNextPosts = () => {
    if ((status === 'loading' || page >= totalPages) && search) {
      return;
    }
    dispatch(fetchPosts(page + 1));
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    const newList = list.filter(p =>
      p.title.toLocaleLowerCase().includes(text.toLowerCase()),
    );
    setFilteredList(newList);
  };

  useEffect(() => {
    setFilteredList(list);
  }, [list]);

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <Icon
          onPress={() => navigation.navigate('Settings')}
          name="settings-outline"
          size={18}
          color={theme.primary}
        />
      ),
    });
  }, [list.length, navigation, theme.primary]);

  const styles = stylesObj(theme);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={{width: '75%', elevation: 4}}>
          <TextInputField
            name="Search"
            onBlur={undefined}
            onChangeText={handleSearch}
            value={search}
            icon="search"
            trim={false}
          />
        </View>
        <View>
          <Button
            onPress={() => dispatch(deleteAllPosts())}
            title="Delete All"
            style={{backgroundColor: theme.primary, elevation: 4}}
          />
        </View>
      </View>
      <Spacer height={10} />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.list}
        data={filteredList}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <PostCard post={item} />}
        onEndReached={loadNextPosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          status === 'loading' ? (
            <ActivityIndicator size={'large'} color={theme.primary} />
          ) : null
        }
      />
      {status === 'failed' && (
        <View style={styles.errorContainer}>
          <Text style={{color: theme.error}}>Error: {error}</Text>
          <Button
            title="Retry"
            onPress={() => dispatch(fetchPosts(1))}
            style={{backgroundColor: theme.primary}}
          />
        </View>
      )}
      <AddPost />
    </View>
  );
};

export default Home;

const stylesObj = (theme: ThemePallet) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      paddingHorizontal: 15,
      paddingTop: 20,
      backgroundColor: theme.bg,
    },
    list: {
      width: '100%',
      height: '100%',
    },
    errorContainer: {
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 5,
      marginTop: 20,
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      columnGap: 6,
    },
  });
