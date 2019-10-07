import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = () => {
  const items = ['Drink coffee', 'Build Awesome App'];

  return (
    <ul>
      <li><TodoListItem /></li>
      <li><TodoListItem /></li>
      <li><TodoListItem /></li>
    </ul>
  );
};

export default TodoList;
