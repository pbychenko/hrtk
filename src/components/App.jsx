// @ts-check

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { normalize, schema } from 'normalizr';
import Posts from './Posts.jsx';
import routes from '../routes.js';

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
    const normalizedData = normalize(data, [post]);

    return normalizedData;
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

      dispatch(usersActions.setUsers({ entities: users, ids: Object.keys(users) }));
      dispatch(postsActions.setPosts({ entities: posts, ids: Object.keys(posts) }));
      dispatch(commentsActions.setComments({ entities: comments, ids: Object.keys(comments) }));
    };

    fetchData();
  });

  return (
    <div className="col-5">
      <Posts />
    </div>
  );
};

export default App;
