import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../store';
import {RootStackParamList} from '../types/navigation';
import {deletePost} from '../store/actions/postsActions';
import Toast from 'react-native-toast-message';

interface PostDetailsProps {
  route: RouteProp<RootStackParamList, 'PostDetails'>;
}

const PostDetails = ({route}: PostDetailsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [deleteAttempted, setDeleteAttempted] = useState(false);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UserID: {post?.userId}</Text>
      <Text style={styles.title}>{post?.title}</Text>
      <Text style={styles.body}>{post?.body}</Text>

      <View style={styles.footer}>
        <Button title="Edit" onPress={handleEdit} color="#4CAF50" />
        <Button
          title="Delete"
          onPress={() => setIsVisible(true)}
          color="#F44336"
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
              <Button title="Delete" onPress={handleDelete} color="#F44336" />
              <Button
                title="Cancel"
                onPress={() => setIsVisible(false)}
                color="#9E9E9E"
              />
            </View>
            {status === 'loading' && (
              <ActivityIndicator size="large" color="#2196F3" />
            )}
          </View>
        </View>
      </Modal>

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontWeight: '500',
    fontSize: 24,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  body: {
    fontSize: 16,
    color: '#333',
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
  },
  modal: {
    backgroundColor: 'white',
    padding: 25,
    width: '80%',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  modalBody: {
    fontSize: 14,
    color: '#666',
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
