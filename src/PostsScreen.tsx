import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../store';
import {fetchPosts} from '../store/actions/postsActions';
import Post from '../components/Post';
import AddPost from '../components/AddPost';
import TextInputField from '../components/forms/TextInputField';
import Spacer from '../components/Spacer';

const PostsScreen = () => {
  const [search, setSearch] = useState('');
  const {error, list, status, page, totalPages} = useAppSelector(
    state => state.posts,
  );
  const [filteredList, setFilteredList] = useState(list);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts(1));
    }
  }, []);

  //   handle Infinite scroll
  const loadNextPosts = () => {
    if (status === 'loading' || page >= totalPages || !search) {
      return;
    }

    dispatch(fetchPosts(page + 1));
  };
  console.log({status, page, list: list[0]});

  const handleSearch = (text: string) => {
    setSearch(text);
    const newList = list.filter(p =>
      p.title.toLocaleLowerCase().includes(text.toLowerCase()),
    );
    setFilteredList(newList);
  };
  console.log({list: list.length, filteredList: filteredList.length});
  return (
    <View style={styles.container}>
      <Spacer />
      <Text>Posts: {list.length}</Text>
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
        style={styles.list}
        data={filteredList}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <Post post={item} />}
        onEndReached={loadNextPosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          status === 'loading' ? <ActivityIndicator size={'small'} /> : null
        }
      />
      {status === 'failed' && (
        <View>
          <Text>Error: {error}</Text>
          <Button title="Retry" onPress={() => dispatch(fetchPosts(1))} />
        </View>
      )}
      {status === 'loading' && <ActivityIndicator size={'large'} />}
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
