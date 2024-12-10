import './App.css';
import { useState, useRef, useReducer, useCallback  } from 'react';
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

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATE':
      return state.map((item) =>
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item
      );
    case 'DELETE':
      return state.filter((item) => item.id !== action.targetId);
    default:
      return state;
  }
}

function App() {
  // 기존 useState를 이용하던 상태변화를 useReducer 이용으로 변경
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);
  // 방법 1.
  const onCreate = useCallback((content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  },[]);

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: 'UPDATE',
      targetId: targetId,
    });
  },[])

  // useCallback에 의해 mount 되었을 때만 딱 한번 생성
  const onDelete = useCallback((targetId) => {
    dispatch({
      type: 'DELETE',
      targetId: targetId,
    });
  },[])

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
