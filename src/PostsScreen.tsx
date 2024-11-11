import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../store';
import {fetchPosts} from '../store/actions/postsActions';
import Post from '../components/Post';
import AddPost from '../components/AddPost';
import TextInputField from '../components/forms/TextInputField';
import Spacer from '../components/Spacer';
import {deleteAllPosts} from '../store/reducers/posts';
import {useNavigation} from '@react-navigation/native';

const PostsScreen = () => {
  const navigation = useNavigation();

  const [search, setSearch] = useState('');
  const {error, list, status, page, totalPages} = useAppSelector(
    state => state.posts,
  );
  const [filteredList, setFilteredList] = useState(list);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!filteredList.length) {
      setFilteredList(list);
    }
    if (status === 'idle' && !list.length) {
      dispatch(fetchPosts(1));
    }
  }, [dispatch, list, status]);

  //   handle Infinite scroll
  const loadNextPosts = () => {
    if ((status === 'loading' || page >= totalPages) && search) {
      console.log('not loading');
      console.log({status, page, search: !search});
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

  // Update filteredList only when list changes
  useEffect(() => {
    setFilteredList(list);
  }, [list]);

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <Text>{list.length}</Text>,
    });
  }, [list.length, navigation]);

  return (
    <View style={styles.container}>
      <Spacer />
      <Button onPress={() => dispatch(deleteAllPosts())} title="delete all" />
      <Spacer height={12} />
      <TextInputField
        name="Search"
        onBlur={undefined}
        onChangeText={handleSearch}
        value={search}
        icon="search"
        trim={false}
      />
      <Spacer height={10} />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.list}
        data={filteredList}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <Post post={item} />}
        onEndReached={loadNextPosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          status === 'loading' ? <ActivityIndicator size={'large'} /> : null
        }
      />
      {status === 'failed' && (
        <View>
          <Text>Error: {error}</Text>
          <Button title="Retry" onPress={() => dispatch(fetchPosts(1))} />
        </View>
      )}
      <AddPost />
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 15,
    backgroundColor: 'grey',
  },
  list: {
    width: '100%',
    height: '100%',
  },
});
