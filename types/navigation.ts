export type RootStackParamList = {
  PostsScreen: undefined;
  PostDetails: {post: any}; // Assuming 'post' is an object with a type
  newPost: {post?: any}; // Optional, since it's for editing or creating a post
};
