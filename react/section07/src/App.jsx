import './App.css'
import Viewer from './components/Viewer'
import Controller from './components/Controller'
import Even from './components/Even'
import { useState, useEffect, useRef } from 'react'

function App() {
  // State Lifting (State 끌어올리기)
  const [count, setCount] = useState(0)
  const [input, setInput] = useState("")

  const isMount = useRef(false)

  // 1. 마운트 : 탄생
  // useEffect는 deps에 있는 값이 변경되어야만 실행이 되므로 결국 콜백함수는
  // 컴포넌트가 처음 마운트 될때를 제외하고 실행되지 않음
  useEffect(()=> {
    console.log("mount");
  }, [])


  // 2. 업데이트 : 변화, 리렌더링
  // 컴포넌트가 업데이트 될 때 마다 계속 실행이 된다
  useEffect(()=> {
    if (!isMount.current) {
      // 진짜 컴포넌트가 리렌더링 될때만 호출하고 싶은 경우 
      // 레퍼런스 객체를 하나 생성하여 플래그로써 사용
      isMount.current = true
      return
    }
    // callback함수는 컴포넌트가 최초로 마운트 될 때 먼저 실행이 된다.
    // current의 값을 true로 바꾸고 강제로 return을 당하기 때문에
    // 아래에서 아무런 일도 수행할 수 없다.
    // 컴포넌트가 리렌더링되어 다시 호출될 때가 되어서야 console.log 실행 
    console.log("update");    
  })

  // 3. 언마운트 : 죽음



  // useEffect 함수를 호출한 다음, 콜백함수를 호출하고 두번째 인수로는 배열을 전달
  // 그러면 두번째 인수로 전달된 배열에 있는 값이 변경되면
  // sideEffect로서 첫번째 인수로 전달한 콜백함수를 실행
  // useEffect(() => {
  //   console.log(`count : ${count} / ${input}`);
  // }, [count, input])
  // useEffect hook은 두번째 인수로 전달한 배열에 의존하게 된다.
  // 배열을 의존성 배열이라고 부르고 
  // dependency array => deps

  const onClickButton = (value) => {
    setCount(count + value)
  }
  // 의존성 배열을 사용하지 않고 이벤트 헨들러에서 로그 찍는건 왜 안될까?
  // => 변경된 카운트의 값은 0인데 콘솔에는 0이 찍힘
  // => 변경되기 이전의 값을 출력하는것
  // setCount 라는 React의 함수 값은 비동기로 동작
  // 실제로 호출만된거지 변경이 된것이 아님


  return (
    <div className='App'>
      <h1>Simple Counter</h1>
      <section>
        <input value={input} onChange={(e)=> {
          setInput(e.target.value)
        }} />
      </section>
      <section>
        <Viewer count = { count }/>
        {count % 2 === 0 ? <Even/> : null}
      </section>

      <section>
        <Controller onClickButton={ onClickButton }/>
      </section>
    </div>

  )
}

export default App
