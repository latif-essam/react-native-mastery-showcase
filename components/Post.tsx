// import {StyleSheet, Text, View} from 'react-native';
// import React, {PropsWithChildren} from 'react';
// import Spacer from './Spacer';
// import {capitalizeFirstLetter} from '../utils/helpers';
// import Button from './Button';
// import {useAppDispatch} from '../store';
// import {deletePost} from '../store/reducers/posts';
// import {useNavigation} from '@react-navigation/native';
// interface PostProps {
//   post: any;
// }
// const Post = ({post}: PropsWithChildren<PostProps>) => {
//   //   const state = useSelector((state: RootState) => state.posts.list);
//   //   console.log({state});
//   const dispatch = useAppDispatch();
//   const navigation = useNavigation().navigate;
//   const handleDelete = () => {
//     console.log('deleted: ', post.id);
//     dispatch(deletePost({id: post.id}));
//     console.log('done: ', post.id);
//   };
//   const handleEdit = () => {
//     navigation('newPost', {post});
//     console.log('Edited: ', post.id);
//   };
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{capitalizeFirstLetter(post.title)}.</Text>
//       <Spacer />
//       <Text style={styles.body}>
//         {post.body.length >= 100
//           ? post.body.slice(0, 130) + '.....'
//           : post.body}
//       </Text>
//       <View style={styles.badge}>
//         <Text style={styles.badgeText}>{post.id && post.id}</Text>
//       </View>
//       <View style={styles.footer}>
//         <Button type="secondary" title="Edit" onPress={handleEdit} />
//         <Button title="Delete" onPress={handleDelete} />
//       </View>
//     </View>
//   );
// };

// export default Post;

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     height: 150,
//     margin: 5,
//     marginHorizontal: 'auto',
//     backgroundColor: 'rgba(1,1,1,0.2)',
//     padding: 5,
//     borderWidth: 0,
//     borderRadius: 5,
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   title: {
//     fontWeight: '500',
//     fontSize: 14,
//     color: 'white',
//   },
//   body: {
//     fontSize: 12,
//     color: 'white',
//   },
//   badge: {
//     padding: 5,
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     width: 48,
//     height: 24,
//     borderBottomLeftRadius: 12,
//     backgroundColor: 'green',
//   },
//   badgeText: {
//     color: 'white',
//     textAlign: 'center',
//     fontSize: 10,
//     fontWeight: '500',
//   },
//   footer: {
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
//     width: '50%',
//     display: 'flex',
//     alignSelf: 'flex-end',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
// });
import {StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import Spacer from './Spacer';
import {capitalizeFirstLetter} from '../utils/helpers';
import Button from './Button';
import {useNavigation} from '@react-navigation/native';

interface PostProps {
  post: any;
}

const Post = ({post}: PropsWithChildren<PostProps>) => {
  const navigation = useNavigation();

  const handleMoreDetails = () => {
    navigation.navigate('PostDetails', {post});
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
      <View style={styles.footer}>
        <Button
          // eslint-disable-next-line react-native/no-inline-styles
          style={{padding: 2}}
          title="View Details"
          onPress={handleMoreDetails}
        />
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 150,
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
    width: 48,
    height: 24,
    borderBottomLeftRadius: 12,
    backgroundColor: 'green',
  },
  badgeText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
