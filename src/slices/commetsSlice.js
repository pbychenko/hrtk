// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as usersActions } from './usersSlice.js';
import { actions as postsActions } from './postsSlice.js';

const commentsAdapter = createEntityAdapter();

const initialState = commentsAdapter.getInitialState();

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComments: commentsAdapter.addMany,
    addComment: commentsAdapter.addOne,
  },
  // BEGIN (write your solution here)
  extraReducers: (builder) => {
    builder.addCase(usersActions.removeUser, (state, action) => {
      const userId = action.payload;

      const allEntities = Object.values(state.entities);
      const restEntities = allEntities.filter((e) => e.author !== userId);
      commentsAdapter.setAll(state, restEntities);
    });
    builder.addCase(postsActions.removePost, (state, action) => {
      const { comments } = action.payload;
      commentsAdapter.removeMany(state, comments);
    });
  },
  // END
});

export const { actions } = commentsSlice;
export const selectors = commentsAdapter.getSelectors((state) => state.comments);
export default commentsSlice.reducer;
