import './TodoItem.css';

const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
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

export default TodoItem;
