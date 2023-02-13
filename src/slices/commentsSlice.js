// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, { payload }) {
      state.comments = payload;
    },
  },
});

export const { actions } = commentsSlice;
export default commentsSlice.reducer;
