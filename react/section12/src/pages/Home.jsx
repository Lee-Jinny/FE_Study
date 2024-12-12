import { useState, useContext } from 'react';
import { DiaryStateContext } from '../contexts/DiaryContexts';

import Header from '../components/Header';
import Button from '../components/Button';
import DiaryList from '../components/DiaryList';
import { data } from 'react-router-dom';
import { use } from 'react';

const getMonthlydata = (pivotDate, data) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0, // 이전달의 마지막날
    23,
    59,
    59
  ).getTime();

  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime
  );
};

const Home = () => {
  // context 가 공급하는 일기 data를 data라는 이름으로 받아온다.
  const data = useContext(DiaryStateContext);

  // 날짜 저장
  const [pivotDate, setPivotDate] = useState(new Date());

  const monthlyData = getMonthlydata(pivotDate, data);
  console.log(monthlyData);
  

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  // 저장된 날짜를 Header 컴포넌트에 title props 바꾸기
  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button onClick={onDecreaseMonth} text={'<'} />}
        rightChild={<Button onClick={onIncreaseMonth} text={'>'} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
