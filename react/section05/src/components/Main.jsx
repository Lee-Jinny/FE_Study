// JSX주의사항
// 1. 중괄호 내부에는 자바스크립트 표현식만 넣을 수 있다.
// => 조건문이나 반복문 불가
// 2. 숫자, 문자열, 배열 값만 렌더링 된다
// => 객체는 점표기 법으로 사용
// 3. 모든 태그는 닫혀 있어야 한다.
// 4. 최상위 태그는 반드시 하나여야 한다.
// => 빈태그로 감싸면 랜더링 되긴하지만 HTML 콘솔 상에서 확인해 보면 모든 요소가 흩뿌려져 있음

// const Main = () => {
//   const number = 10;
//   const obj = { a: 1}

//   return (
//     <main>
//       <h1>main</h1>
//       <h1>{number + 10}</h1>
//       <h1>{number % 2 === 0 ? "짝수" : "홀수"}</h1>
//       {/* {if(){}}
//       {for(){}} */}
//       {/* {true}  오류를 발생시키지 않지만 렌더링 되지도 않음 */}
//       {undefined}
//       {null}
//       {obj.a}
//     </main>
//   );
// };

import './Main.css';

const Main = () => {
  const user = {
    name: '이정환',
    isLogin: true,
  };
  if (user.isLogin) {
    return <div className="logout">로그아웃</div>;
  } else {
    return <div>로그인</div>;
  }

  // return <>
  //     { user.isLogin ? <div>로그아웃</div> : <div>로그인</div> }
  // </>
};

export default Main;
