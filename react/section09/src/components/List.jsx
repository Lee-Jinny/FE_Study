import './List.css';
import TodoItem from './TodoItem';
import { useState } from 'react';

const List = ({ todos, onUpdate, onDelete }) => {
  const [search, setSearch] = useState('');
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === '') {
      return todos;
    }
    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredData = getFilteredData();

  return (
    <div className="List">
      <h4>Todo List 🌱</h4>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      <div className="todos_wrapper">
        {filteredData.map((todo) => {
          // Jsx에서 map 메서드 활용시 콜백함수가 html 반환하도록 가능
          // return <div>{todo.content}</div>;
          return (
            <TodoItem
              key={todo.id} // 구분하기 위한 고유한 값 전달이 필요
              {...todo}
              onUpdate = {onUpdate}
              onDelete = {onDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;
