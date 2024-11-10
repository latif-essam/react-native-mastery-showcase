import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TextInputField from '../components/forms/TextInputField';
import {Post} from '../types/post';
import {useAppDispatch, useAppSelector} from '../store';
import {addPost, editPost} from '../store/reducers/posts';
import Spacer from '../components/Spacer';
import ScreenWrapper from '../components/ScreenWraper';
import Button from '../components/Button';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

type RootStackParamList = {
  PostsScreen: undefined;
  NewPost: {post: Post};
};

const NewPost = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'NewPost'>>();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth.user);

  // Check if we're editing an existing post or creating a new one
  const postData = route.params?.post;

  const [post, setPost] = useState<Partial<Post>>({
    title: postData?.title || '',
    body: postData?.body || '',
  });

  // Update state when input changes
  const handleSetPost = (val: string, name: keyof Post) => {
    setPost(prevPost => ({...prevPost, [name]: val}));
  };

  // Handle submission (either new post or edit)
  const handleNewPost = () => {
    if (postData) {
      // Editing an existing post
      dispatch(editPost({...post, id: postData.id})); // Make sure to include the post ID
    } else {
      // Creating a new post
      dispatch(addPost({...post, userId: auth?.userId}));
    }
    navigation.navigate('Home'); // Navigate to Home after submission
  };

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
          title={postData ? 'Update Post' : 'Submit Post'}
          onPress={handleNewPost}
          style={styles.submit}
        />
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
