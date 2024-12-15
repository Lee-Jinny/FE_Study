import './App.css';
import { useReducer, useRef, createContext, useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import Edit from './pages/Edit';
import Notfound from './pages/NotFound';
import {
  DiaryStateContext,
  DiaryDispatchContext,
} from './contexts/DiaryContexts';
// import { loadEnv } from 'vite';
// import js from '@eslint/js';

// import Button from './components/Button';
// import Header from './components/Header';

// import { getEmotionImage } from './util/get-emotion-image';

// const mockData = [
//   {
//     id: 1,
//     createdDate: new Date('2024-12-12').getTime(),
//     emotionId: 1,
//     content: '1번 일기 내용',
//   },
//   {
//     id: 2,
//     createdDate: new Date('2024-12-11').getTime(),
//     emotionId: 2,
//     content: '2번 일기 내용',
//   },
//   {
//     id: 3,
//     createdDate: new Date('2024-11-11').getTime(),
//     emotionId: 3,
//     content: '3번 일기 내용',
//   },
// ];

function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'CREATE': {
      nextState = [action.data, ...state];
      break;
    }
    case 'UPDATE': {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }
    case 'DELETE': {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }
    default:
      return state;
  }
  localStorage.setItem('diary', JSON.stringify(nextState));
  return nextState;
}

// localStorage.setItem('test', 'hello');
// localStorage.setItem('person', JSON.stringify({name: "이정환"}))
// console.log(localStorage.getItem('test'));
// console.log(JSON.parse(localStorage.getItem('person')));
// localStorage.removeItem('person')

// 1. "/"  : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem('diary');
    if (!storedData) {
      setIsLoading(false);
      return;
    }
    const parsedData = JSON.parse(storedData);

    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;

    dispatch({
      type: 'INIT',
      data: parsedData,
    });

    setIsLoading(false);
  }, []);

  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    // 새로운 일기를 추가하는 기능
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: 'DELETE',
      id,
    });
  };

  // const nav = useNavigate();
  // const onClickButton = () => {
  //   nav('/new');
  // };

  // 위에서 부터 아래로 일치하는 경로를 찾음
  // Routes 컴포넌트 안에는 Route 컴포넌트만 들어갈 수 있다
  // Routes 컴포넌트 바깥에 배치된요소는 모든 페이지에 다 렌더링 된다.

  // 디폴트 버튼은 타입 작성을 생략해도 된다.

  if (isLoading) {
    return <div>데이터 로딩중입니다...</div>;
  }

  return (
    <>
      {/* <Header title = {"Header"}
      leftChild={<Button text={"Left"} />} 
      rightChild={<Button text={"Right"} /> }
      />
      <Button
        text={'123'}
        onClick={() => {
          console.log(' 버튼 클릭');
        }}
      />
      <Button
        text={'123'}
        type={'POSITIVE'}
        onClick={() => {
          console.log(' 버튼 클릭');
        }}
      />
      <Button
        text={'123'}
        type={'NEGATIVE'}
        onClick={() => {
          console.log(' 버튼 클릭');
        }}
      /> */}
      {/* <div>
        <img src={getEmotionImage(1)} />
        <img src={getEmotionImage(2)} />
        <img src={getEmotionImage(3)} />
        <img src={getEmotionImage(4)} />
        <img src={getEmotionImage(5)} />
      </div>
      <div>
        <Link to={'/'}>Home</Link>
        <Link to={'/new'}>New</Link>
        <Link to={'/diary'}>Diary</Link> */}

      {/* a tag를 이용하면 리렌더링 된다.
        <a href="/">Home</a>
        <a href="/">New</a>
        <a href="/">Diary</a> */}
      {/* </div> */}
      {/* <button onClick={onClickButton}>New 페이지로 이동</button> */}

      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
