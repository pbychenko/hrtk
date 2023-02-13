// @ts-check

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { actions as usersActions } from '../slices/usersSlice.js';

const User = ({ user }) => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => {
    if (!state.posts) {
      return [];
    }
    const allPosts = Object.values(state.posts.entities);
    const result = allPosts.filter((item) => item.author === user.id);
    return result;
  });

  const comments = useSelector((state) => {
    if (!state.comments) {
      return [];
    }
    const allComments = Object.values(state.comments.entities);
    const result = allComments.filter((item) => item.author === user.id);
    return result;
  });

  const removeUser = () => {
    dispatch(usersActions.removeUser(user.id));
  };

  return (
    <div className="mt-3">
      {user.name}
      <Button variant="primary" className="ml-3" onClick={removeUser}>
        Удалить
      </Button>
      <div className="d-flex flex-row">
        <ul className="list-group m-3 col-3">
          <li className="list-group-item active">Посты</li>
          {posts?.map((post) => (<li key={post.id} className="list-group-item">{post.body}</li>))}
        </ul>
        <ul className="list-group m-3 col-3">
          <li className="list-group-item active">Комментарии</li>
          {comments?.map((comment) => (<li key={comment.id} className="list-group-item">{comment.text}</li>))}
        </ul>
      </div>
      <hr />
    </div>
  );
};

export default User;
