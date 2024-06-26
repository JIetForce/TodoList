import React, {Component} from 'react';

import AppHeader from '../AppHeader/AppHeader';
import SearchPanel from '../SearchPanel/SearchPanel';
import TodoList from '../TodoList/TodoList';
import ItemStatusFilter from '../ItemStatusFilter/ItemStatusFilter';
import ItemAddForm from '../ItemAddForm/ItemAddForm';

import './App.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ],
    term: '',
    filter: 'all'
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {

      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx+1)];

      return {
        todoData: newArray
      }
    });
  };

  toggleProperty (arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx+1)];
  };

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    })
  };

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({todoData}) => {
      const newArray = [...todoData, newItem];
      return {
        todoData: newArray
      };
    });
  };

  onSearchChange = (term) => {
    this.setState({term})
  }

  search (items, term) {

    if(term.length === 0) {
      return items;
    };

    return items.filter((el) => el.label.toLowerCase().indexOf(term.toLowerCase()) > -1);
  };

  filter(items, filter) {
    if(filter === 'active') {
      return items.filter((item) => !item.done);
    } else if(filter === 'done') {
      return items.filter((item) => item.done);
    } else if(filter === 'all') {
      return items;
    };
  };

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  render() {

    const { todoData, term, filter } = this.state;

    const visibleItem = this.filter(this.search(todoData, term), filter);

    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length-doneCount;

    return (
    <div className="todo-app">
      <AppHeader toDo={todoCount} done={doneCount} />
      <div className="top-panel d-flex">
        <SearchPanel
          onSearchChange={this.onSearchChange} />
        <ItemStatusFilter 
          filter={filter}
          onFilterChange={this.onFilterChange} />
      </div>

      <TodoList 
        todos={visibleItem}
        onDeleted={this.deleteItem} 
        onToggleImportant={this.onToggleImportant}
        onToggleDone={this.onToggleDone}/>
      <ItemAddForm
        onItemAdded={this.addItem} />
    </div>
  );
};
}



  

  
