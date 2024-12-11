import './App.css';
import {
  useState,
  useRef,
  useReducer,
  useCallback,
  createContext,
  useMemo
} from 'react';
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

// 컨텍스트의 생성은 컴포넌트 외부에 하는 것이 일반적
// 방법 1.
// export const TodoContext = createContext();

// context의 property
// Provider만 제대로 알고 있으면 된다.
// - 컨텍스트가 공급할 데이터를 설정하거나 컨텍스트의 데이터를 공급받을 컴포넌트들을 설정하기 위해 사용

// 방법2. 2개의 context 로 분리
export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

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
  }, []);

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: 'UPDATE',
      targetId: targetId,
    });
  }, []);

  // useCallback에 의해 mount 되었을 때만 딱 한번 생성
  const onDelete = useCallback((targetId) => {
    dispatch({
      type: 'DELETE',
      targetId: targetId,
    });
  }, []);

  // return 객체로 onCreate와 onUpdate와 onDelete를 가진 객체를 리턴하도록 하고 
  // 두 번째 인수 deps 로는 빈 배열을 전달해서 이 객체 값이 
  // 앱 컴퍼넌트의 마운트 이후에는 다시는 재생성되지 않도록 설정
  const memoizedDispatch = useMemo(() => {
    return {onCreate, onUpdate, onDelete}
  }, [])

  // 이제부터는 디스패치 컨텍스트가 공급하는 값은 절대 어떠한 상황에서도 다시는 변경되지 않을 것


  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memoizedDispatch}>
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>

      
    </div>
  );
}

export default App;
