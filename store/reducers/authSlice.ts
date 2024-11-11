import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface User {
  userId?: number;
  username: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

// Static user data (You can extend this with more users or fetch from an API)
const staticUserData: User = {
  userId: 6,
  username: 'latif',
  password: '202010',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to handle login
    login: (state, action: PayloadAction<User>) => {
      const {username, password} = action.payload;

      // Check if username and password match the static data
      if (
        username === staticUserData.username &&
        password === staticUserData.password
      ) {
        state.user = {...staticUserData};
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.error = 'Invalid username or password';
        state.isAuthenticated = false;
      }
    },
    // Action to handle logout
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;
