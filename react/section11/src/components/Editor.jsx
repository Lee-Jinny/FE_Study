import './Editor.css';
import { useState, useRef, useContext } from 'react';
import { TodoDispatchContext } from '../App';

const Editor = () => {
  // useContext라는 리엑트 훅은 인수로 전달한 컨텍스트로 부터 전달한 데이터 반환
  const { onCreate } = useContext(TodoDispatchContext);
  const [content, setContent] = useState(''); // 배열 구조분해할당 사용
  const contentRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = () => {
    if (content === '') {
      contentRef.current.focus();
      return;
    }
    onCreate(content);
    setContent(''); // 초기화
  };

  const onKeydown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  return (
    <div className="Editor">
      <input
        ref={contentRef}
        value={content}
        onKeyDown={onKeydown}
        onChange={onChangeContent}
        placeholder="새로운 Todo..."
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Editor;
