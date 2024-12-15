import './Editor.css';
import EmotionItem from './EmotionItem';
import Button from './Button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { emotionList } from '../util/constants';
import { getStringedDate } from '../util/get-stringed-data';

// Editor 컴포넌트에서는 입력을 컴포넌트위에 있는 Input State에 보관한다.
// 컴포넌트 맨 아래 있는 작성완료 버튼이 클릭이 되면
// => onSubmit 버튼 클릭 (New 컴포넌트에 정의됨)
//  - 부모 컴포넌트로 부터 props로 제공받은 onSubmit 함수를 호출하면서
//  - 인수로는 현재 Input State의 값을 전달




const Editor = ({ initData, onSubmit }) => {
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: '',
  });

  const nav = useNavigate();

  useEffect(() => {
    if(initData){
      setInput({
        ...initData,
        createdDate : new Date(Number(initData.createdDate)),
      })
    }
  },[initData])

  const onChangeInput = (e) => {
    console.log(e.target.name); // 현재 어떤 요소에 입력이 들어온건지
    console.log(e.target.value);

    let name = e.target.name;
    let value = e.target.value;

    if (name === 'createdDate') {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  // 에디터 컴퍼넌트에서 다이어리 DispatchContext로 부터 onCreate
  // 함수를 고정적으로 공급을 받아서 그냥 이 버튼이 클릭되었을 때 실행하도록 만들면 문제 발생
  // => Edit 페이지에서 컴포넌트를 쓰기가 굉장히 어려워 진다.

  // 어떻게 처리를 해주어야 할까?
  // 컨텍스트로부터 직접 onCreate 함수를 공급받게 하지 말고
  // 그냥 이 작성 완료 버튼이 실행되어야 하는 함수를
  // Props로 페이지 역할을 하는 컴포넌트로 부터 전달 받도록 하면 된다!

  const onClickSubmitButton = () => {
    // 이렇게 하면 부모 컴포넌트에서 인풋 스테이트를 매개변수로 받아가서 알아서 처리(New.jsx)
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          name="createdDate"
          onChange={onChangeInput}
          value={getStringedDate(input.createdDate)}
          type="date"
        />
      </section>

      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() =>
                onChangeInput({
                  target: {
                    name: 'emotionId',
                    value: item.emotionId,
                  },
                })
              }
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>

      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?"
        />
      </section>

      <section className="button_section">
        <Button onClick={() => nav(-1)} text={'취소하기'} />
        <Button
          onClick={onClickSubmitButton}
          text={'작성완료'}
          type={'POSITIVE'}
        />
      </section>
    </div>
  );
};

export default Editor;
