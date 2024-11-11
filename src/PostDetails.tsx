import {StyleSheet, Text, View, Modal, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../store';
import {RootStackParamList} from '../types/navigation';
import {deletePost} from '../store/actions/postsActions';
import Toast from 'react-native-toast-message';
import {useTheme} from '../hooks/useTheme';
import {ThemePallet} from '../constants/themes';
import Button from '../components/Button';

interface PostDetailsProps {
  route: RouteProp<RootStackParamList, 'PostDetails'>;
}

const PostDetails = ({route}: PostDetailsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [deleteAttempted, setDeleteAttempted] = useState(false);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = stylesObj(theme);

  const {id} = route.params?.post;
  const {error, list, status} = useAppSelector(state => state.posts);
  const post = list.find(p => p.id === id);

  const handleDelete = () => {
    setDeleteAttempted(true);
    dispatch(deletePost(id));
    setIsVisible(false);
  };

  useEffect(() => {
    if (status === 'loading' && deleteAttempted) {
      Toast.show({
        text1: 'Attempting to Delete Post...',
        type: 'info',
      });
    }
  }, [status, deleteAttempted]);

  useEffect(() => {
    if (deleteAttempted) {
      if (status === 'failed') {
        Toast.show({
          text1: 'Error Deleting Post',
          text2: `Error: ${error || 'Unknown error'}`,
          type: 'error',
        });
      } else if (status === 'idle' && !error) {
        navigation.goBack();
      }
    }
  }, [status, error, navigation, deleteAttempted]);

  const handleEdit = () => {
    navigation.navigate('NewPost', {post});
  };

  console.log({isVisible}); // Check the value of isVisible in console

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UserID: {post?.userId}</Text>
      <Text style={styles.title}>{post?.title}</Text>
      <Text style={styles.body}>{post?.body}</Text>

      <View style={styles.footer}>
        <Button
          title="Edit"
          onPress={handleEdit}
          style={{backgroundColor: theme.success}}
        />
        <Button
          title="Delete"
          onPress={() => setIsVisible(true)}
          style={{backgroundColor: theme.error}}
        />
      </View>

      {/* Modal for Confirming Deletion */}
      <Modal visible={isVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Are you sure?</Text>
            <Text style={styles.modalBody}>
              Do you really want to delete this post?
            </Text>
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => setIsVisible(false)}
                style={{backgroundColor: theme.secondary}}
              />
              <Button
                title="Delete"
                onPress={handleDelete}
                style={{backgroundColor: theme.error}}
              />
            </View>
            {status === 'loading' && (
              <ActivityIndicator size="large" color={theme.primary} />
            )}
          </View>
        </View>
      </Modal>

      <Toast />
    </View>
  );
};

const stylesObj = (theme: ThemePallet) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
      backgroundColor: theme.bg, // Background color based on the theme
    },
    title: {
      fontWeight: '500',
      fontSize: 24,
      color: theme.text, // Text color for title based on the theme
      marginBottom: 20,
      textAlign: 'center',
    },
    body: {
      fontSize: 16,
      color: theme.text_on_surface, // Use theme.text_on_surface for body text
      textAlign: 'center',
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 20,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000, // Ensure the modal overlay is on top
    },
    modal: {
      backgroundColor: theme.surface, // Modal background color based on theme
      padding: 25,
      width: '80%',
      borderRadius: 10,
      alignItems: 'center',
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      zIndex: 1001, // Ensure the modal is on top of the overlay
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text, // Modal title color
      marginBottom: 15,
    },
    modalBody: {
      fontSize: 14,
      color: theme.text_on_surface, // Modal body text color
      marginBottom: 25,
      textAlign: 'center',
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
  });

export default PostDetails;
