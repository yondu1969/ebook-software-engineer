import { createSlice } from '@reduxjs/toolkit';
// utils
// import axios from '../../utils/axios';

import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  user: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET USER
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
    },

    addUserAfterLogin(state, action) {
      state.user = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

export const {
  addUserAfterLogin,
} = slice.actions;

// ----------------------------------------------------------------------

export function getUser(email) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('/api/products/product', {
      //   params: { name },
      // });
      const response = {
        data: {
          user: {
            first_name: "David"
            ,last_name: "H"
          }
        }
      }
      dispatch(slice.actions.getUserSuccess(response.data.user));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
