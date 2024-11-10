import {Button, StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import Spacer from './Spacer';
import {capitalizeFirstLetter} from '../utils/helpers';
interface PostProps {
  post: any;
}
const Post = ({post}: PropsWithChildren<PostProps>) => {
  //   const state = useSelector((state: RootState) => state.posts.list);
  //   console.log({state});
  console.log({len: post.body.length});
  const handleDelete = () => {
    console.log('deleted: ', post.id);
  };
  const handleEdit = () => {
    console.log('Edited: ', post.id);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{capitalizeFirstLetter(post.title)}.</Text>
      <Spacer />
      <Text style={styles.body}>
        {post.body.length >= 100
          ? post.body.slice(0, 130) + '.....'
          : post.body}
      </Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{post.id && post.id}</Text>
      </View>
      <View>
        <Button title="Delete" onPress={handleDelete} />
        <Button title="Edit" onPress={handleEdit} />
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
    margin: 5,
    marginHorizontal: 'auto',
    backgroundColor: 'rgba(1,1,1,0.2)',
    padding: 5,
    borderWidth: 0,
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  title: {
    fontWeight: '500',
    fontSize: 14,
    color: 'white',
  },
  body: {
    fontSize: 12,
    color: 'white',
  },
  badge: {
    padding: 5,
    position: 'absolute',
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    // borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    backgroundColor: 'green',
  },
  badgeText: {color: 'white', textAlign: 'center'},
});
