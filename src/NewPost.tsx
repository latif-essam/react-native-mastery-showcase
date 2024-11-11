import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import TextInputField from '../components/forms/TextInputField';
import {Post} from '../types/post';
import {useAppDispatch, useAppSelector} from '../store';
import Spacer from '../components/Spacer';
import ScreenWrapper from '../components/ScreenWarper';
import Button from '../components/Button';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {addPost, editPost} from '../store/actions/postsActions';
import Toast from 'react-native-toast-message';

type RootStackParamList = {
  PostsScreen: undefined;
  NewPost: {post: Post};
};

const NewPost = () => {
  const {error, status} = useAppSelector(state => state.posts);
  const route = useRoute<RouteProp<RootStackParamList, 'NewPost'>>();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth.user);
  // set screen title

  const postData = route.params?.post;

  const [post, setPost] = useState<Partial<Post>>({
    title: postData?.title || '',
    body: postData?.body || '',
  });

  // Handle input changes for title and body
  const handleSetPost = useCallback((val: string, name: keyof Post) => {
    setPost(prevPost => ({...prevPost, [name]: val}));
  }, []);

  const handleNewPost = useCallback(() => {
    if (status === 'loading') {
      return;
    }

    const isValidPost = post.title && post.body;
    if (isValidPost) {
      const postToSubmit = {...post};

      // Dispatch either add or edit action based on postData presence
      if (postData) {
        dispatch(editPost({...postToSubmit, id: postData.id}));
      } else {
        dispatch(addPost(postToSubmit));
      }
      navigation.goBack();
    } else {
      // Show error Toast message
      Toast.show({
        text1: `Error: ${postData ? 'Updating' : 'Adding'} Post`,
        text2: 'Title and Body cannot be empty',
        type: 'error',
      });
    }
  }, [status, post, postData, navigation, dispatch]);

  // Set screen title dynamically based on postData
  useLayoutEffect(() => {
    navigation.setOptions({title: postData ? 'Update Post' : 'New Post'});
  }, [navigation, postData]);

  // Button title logic based on the state
  const buttonTitle =
    status === 'loading'
      ? `${postData ? 'Updating' : 'Adding'} post...`
      : postData
      ? 'Update Post'
      : 'Submit Post';
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Spacer />
        <Text>{postData ? 'Edit Post' : 'Create New Post'}</Text>
        <TextInputField
          name="title"
          value={post.title as string}
          icon="pen"
          onChangeText={value => handleSetPost(value, 'title')}
          trim={false}
          onBlur={undefined}
        />
        <Spacer />
        <TextInputField
          name="body"
          value={post.body as string}
          icon="comments"
          onChangeText={value => handleSetPost(value, 'body')}
          trim={false}
          onBlur={undefined}
        />
        <Spacer />
        <Button
          title={buttonTitle}
          onPress={handleNewPost}
          style={styles.submit}
        />

        <Toast />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    rowGap: 10,
  },
  submit: {
    width: '100%',
    padding: 10,
  },
});

export default NewPost;
