import './List.css';
import TodoItem from './TodoItem';
import { useState, useMemo, useContext } from 'react';
import { TodoStateContext } from '../App';

const List = () => {
  // 구조 분해 할당이 아님을 주의 
  // value props로 전달된 값이 todos 한개이기 때문 
  const todos = useContext(TodoStateContext);
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

  // const getAnalyzedData = () => {
  //   console.log("getAnalyzedData 호출!");
  //   const totalCount = todos.length;
  //   // filter 메서드는 배열내 모든 요소를 한번씩 순회하므로 배열의 요소가 증가할 수록 시간이 오래걸리게 된다.
  //   const doneCount = todos.filter((todo) => todo.isDone).length;
  //   const notDoneCount = totalCount - doneCount

  //   return {
  //     totalCount,
  //     doneCount,
  //     notDoneCount
  //   }
  // };

  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    console.log('getAnalyzedData 호출!');
    const totalCount = todos.length;
    // filter 메서드는 배열내 모든 요소를 한번씩 순회하므로 배열의 요소가 증가할 수록 시간이 오래걸리게 된다.
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;

    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);
  // 첫번째 인수는 콜백함수
  // 두번째 인수는 의존성배열 deps
  // deps에 포함된 값이 변경되었을 떄에만(즉, 특정 조건이 만족)
  // -> 첫번째 인수로 전달한 콜백함수를 다시 실행
  // 해당 콜백 함수가 반환하는 값을 그대로 다시 반환

  // 리스트 컴포넌트가 리렌더링 될 때 마다 새롭게 호출됨
  // const {totalCount, doneCount, notDoneCount} = getAnalyzedData()

  return (
    <div className="List">
      <h4>Todo List 🌱</h4>
      <div>
        <div>total : {totalCount}</div>
        <div>done : {doneCount}</div>
        <div> notDone: {notDoneCount}</div>
      </div>
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
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;
