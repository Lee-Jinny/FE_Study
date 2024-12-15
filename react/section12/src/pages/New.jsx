import Header from '../components/Header';
import Button from '../components/Button';
import Editor from '../components/Editor';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { DiaryDispatchContext } from '../contexts/DiaryContexts';
import usePageTitle from '../hooks/usePageTitle';


// onSubmit 함수가 호출이 되면셔 useContext를 통해서
// 앱 컴포넌트로 부터 공급받은 onCreate함수가 호출이 되면서 실제로 일기데이터 추가

const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext);

  const nav = useNavigate();

  usePageTitle("새 일기 쓰기")

  const onSubmit = (input) => {
    onCreate(input.createdDate.getTime(), input.emotionId, input.content);
    // replace : 뒤로가기 방지
    nav('/', { replace: true });
  };

  return (
    <div>
      <Header
        title={'새 일기 쓰기'}
        leftChild={
          <Button
            onClick={() => {
              nav(-1);
            }}
            text={'< 뒤로 가기'}
          />
        }
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
