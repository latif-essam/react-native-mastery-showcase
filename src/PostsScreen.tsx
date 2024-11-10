import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store';
import {fetchPosts} from '../store/actions/postsActions';
import Post from '../components/Post';
import AddPost from '../components/AddPost';

const PostsScreen = () => {
  const {error, list, status, page, totalPages} = useAppSelector(
    state => state.posts,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts(1));
    }
  }, []);

  //   handle Infinite scroll
  const loadNextPosts = () => {
    if (status === 'loading' || page >= totalPages) {
      return;
    }

    dispatch(fetchPosts(page + 1));
  };
  console.log({status, page, list: list[0]});
  return (
    <View style={styles.container}>
      <Text>Posts: {list.length}</Text>
      <FlatList
        style={styles.list}
        data={list}
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
