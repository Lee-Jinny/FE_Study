import { useContext, useEffect, useState } from 'react';
import { DiaryStateContext } from '../contexts/DiaryContexts';
import { useNavigate } from 'react-router-dom';

const useDiary = (id) => {
  const data = useContext(DiaryStateContext);
  const [currentDiaryItem, setCurrentDiaryItem] = useState();

  const nav = useNavigate();

  // deps => params의 아이디가 바뀌거나 데이터가 변경되었을 때만 실행이 되도록 설정
  // 렌더링 시점이 중요, 리턴전에 호출되는 것 방지 필요
  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );
    if (!currentDiaryItem) {
      window.alert('존재하지 않는 일기 입니다.');
      nav('/', { replace: true });
    }
    setCurrentDiaryItem(currentDiaryItem);
  }, [id]);

  return currentDiaryItem;
};


export default useDiary;
