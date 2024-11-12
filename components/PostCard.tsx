// Post.tsx
import {StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import Spacer from './Spacer';
import {capitalizeFirstLetter} from '../utils/helpers';
import Button from './Button';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../hooks/useTheme';
import {ThemePallet} from '../constants/themes';
import {Post} from '../types/post';

interface PostProps {
  post: Post;
}

const PostCard = ({post}: PropsWithChildren<PostProps>) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = stylesObj(theme);

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
        <Button title="View Details" onPress={handleMoreDetails} />
      </View>
    </View>
  );
};

export default PostCard;

const stylesObj = (theme: ThemePallet) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 150,
      margin: 5,
      marginHorizontal: 'auto',
      padding: 5,
      backgroundColor: theme.surface, // Use surface color for card background
      borderWidth: 0,
      borderRadius: 5,
      overflow: 'hidden',
      position: 'relative',
      elevation: 4,
    },
    title: {
      fontWeight: '500',
      fontSize: 14,
      color: theme.text_primary, // Primary text color (dark blue)
    },
    body: {
      fontSize: 12,
      color: theme.text_secondary, // Secondary text color (lighter blue)
    },
    badge: {
      padding: 5,
      position: 'absolute',
      top: 0,
      right: 0,
      width: 48,
      height: 24,
      borderBottomLeftRadius: 12,
      backgroundColor: theme.surface_overlay, // Badge overlay color
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
