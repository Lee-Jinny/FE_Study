import './App.css';
import { useState, useRef } from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';

// 다시 생성하지 않도록 컴포넌트 외부에 선언
const mockData = [
  {
    id: 0,
    isDone: false,
    content: 'React 공부하기',
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: '빨래하기',
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: '노래 연습하기',
    date: new Date().getTime(),
  },
];

function App() {
  // 컴포넌트가 생성됨과 동시에 3개의 데이터가 저장
  const [todos, setTodos] = useState(mockData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    // 새로운 Todo Item을 객체형태로 생성
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };
    // Todos와 같은 state의 값은 상태변화 함수를 호출해야만 수정 가능!
    // 그렇게 해야만 변경된 state의 값을 React가 감지, 컴포넌트를 정상적으로 리렌더링
    // todos.push(newTodo)

    setTodos([newTodo, ...todos]);
  };

  const onUpdate = (targetId) => {
    // todos State 값들 중에
    // targetId와 일치하는 id를 갖는 투두아이템의 isDone 변경

    // 인수 : 기존의 todos 배열에서 targetId와 일치하는 id를 갖는 요소의 데이터만 딱 바꾼 새로운 배열
    setTodos(
      todos.map(
        (todo) =>
          todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo

        // {
        //   if (todo.id === targetId) {
        //     return {
        //       ...todo,
        //       isDone: !todo.isDone
        //     }
        //   }
        //   return todo
        // }
      )
    );
  };

  const onDelete = (targetId) => {
    // 인수 : todos 배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
    setTodos(todos.filter((todo) => todo.id !== targetId))
  }


  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate = {onUpdate} onDelete = {onDelete} />
    </div>
  );
}

export default App;
