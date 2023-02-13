// @ts-check

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { normalize, schema } from 'normalizr';
import Posts from './Posts.jsx';
import routes from '../routes.js';
import PostForm from './PostForm.jsx';
import Users from './Users.jsx';

import { actions as usersActions } from '../slices/usersSlice.js';
import { actions as postsActions } from '../slices/postsSlice.js';
import { actions as commentsActions } from '../slices/commentsSlice.js';

const App = () => {
  const dispatch = useDispatch();

  const getNormalized = (data) => {
    const user = new schema.Entity('users');

    const comment = new schema.Entity('comments', {
      author: user,
    });

    const post = new schema.Entity('posts', {
      author: user,
      comments: [comment],
    });

    return normalize(data, [post]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(routes.getData());
      const normalizedData = getNormalized(data);
      const {
        users,
        posts,
        comments,
      } = normalizedData.entities;

      dispatch(usersActions.addUsers(users));
      dispatch(postsActions.addPosts(posts));
      dispatch(commentsActions.addComments(comments));
    };

    fetchData();
  });

  return (
    <>
      <div className="card">
        <div className="card-header">
          Создать пост
        </div>
        <div className="card-body">
          <PostForm />
        </div>
      </div>

      <div className="mt-5">
        <Users />
      </div>

      <div className="mt-5">
        <Posts />
      </div>
    </>
  );
};

export default App;
