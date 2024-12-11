import './TodoItem.css';
import { memo, useContext } from 'react'
import { TodoDispatchContext } from '../App';

const TodoItem = ({ id, isDone, content, date, }) => {
  const {onUpdate, onDelete } = useContext(TodoDispatchContext)
  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onClickDeleteButton = () => {
    onDelete(id)
  }

  return (
    <div className="TodoItem"> 
      <input
        onChange={onChangeCheckbox} // 동작은 체크지만 값이 전달되는 인풋이므로 onchange 사용
        readOnly
        checked={isDone}
        type="checkbox"
      />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={onClickDeleteButton }>삭제</button>
    </div>
  );
};

// 이것만 하면 첫번째만 todoItem 변경하더라도 나머지 에서도 변경이 발생
// 체크 박스를 클릭해서 투두 데이터를 변경시켜 버리면
// 앱 컴포넌트에 있는 Todos 스테이트의 값을 바꾸게 되면 일단 앱 컴포넌트가 리렌더링
// 앱 함수가 다시 호출이 되는 거니까 onCreate, onUpdate, onDelete와 같은 이런 함수들도 
// 다시 다 새롭개 생성 -> 객체 타입에 해당하므로 새롭게 생성되어도 다 다른 값으로 인식(주소값으로 저장)
// 프롭스를 기준으로 현재와 과거를 비교하는데 memo 메서드는 얕은 비교 (동등, 비교 연산자)
// 객체는 무조건 다른 주소값을 가지므로 프롭스가 바뀌었다고 판단

// 해결방법
// 1. 앱 컴포넌트에서 함수들 자체를 메모이제이션해서 리렌더링되더라도 다시 생성되지 않게 방지
// 2. (이번시간), 두번째 인수로 콜백함수를 추가로 전달해서 최적화 기능을 커스터마이징


// 방법 2.
// 고차 컴포넌트, HOC 
// 한번 호출하는 것 만으로도 컴포넌트에 새로운 기능을 부여 
// export default memo(TodoItem, (prevProps, nextProps) => {
//   // 반환 값에 따라, Props에 변화가 있는지 판단
//   // T -> 바뀌지 않음-> 리렌더링 x , F -> 바뀜 -> 리렌더링 o
//   if (prevProps.id !== nextProps.id) return false
//   if (prevProps.isDone !== nextProps.isDone) return false
//   if (prevProps.content !== nextProps.content) return false
//   if (prevProps.date !== nextProps.date) return false

//   return true 
// });



// 방법 1.
export default memo(TodoItem)