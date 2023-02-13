import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice.js';
import commentsReducer from './commentsSlice.js';
import usersReducer from './usersSlice.js';

export default configureStore({
  reducer: {
    usersReducer,
    postsReducer,
    commentsReducer,
  },
});

// {
//   posts: {
//     entities: {
//       post1: {
//         id: 'post1',
//         author: 'user1',
//         body: '......',
//         comments: ['comment1', 'comment2'],
//       },
//       post2: {
//         id: 'post2',
//         author: 'user2',
//         body: '......',
//         comments: [],
//       },
//     },
//     ids: ['post1', 'post2'],
//   },
//   comments: {
//     entities: {
//       comment1: {
//         id: 'comment1',
//         author: 'user2',
//         comment: '.....',
//       },
//       comment2: {
//         id: 'comment2',
//         author: 'user3',
//         comment: '.....',
//       },
//     },
//     ids: ['comment1', 'comment2'],
//   },
//   users: {
//     entities: {
//       user1: {
//         id: 'user1',
//         username: 'user1',
//         name: 'User 1',
//       },
//       user2: {
//         id: 'user2',
//         username: 'user2',
//         name: 'User 2',
//       },
//       user3: {
//         id: 'user3',
//         username: 'user3',
//         name: 'User 3',
//       },
//     },
//     ids: ['user1', 'user2', 'user3'],
//   }
// }