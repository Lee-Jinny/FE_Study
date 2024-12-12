import './DiaryList.css';
import Button from './Button';
import DiaryItem from './DiaryItem';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const DiaryList = ({ data }) => {
  const nav = useNavigate();
  // 초기값은 latest
  const [sortType, setSortType] = useState('latest');

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  // 새 일기 작성 페이지로 이동하는 함수
  const onClickNew = () => {
    nav('/new');
  };

  const getSortedData = () => {
    // 원본 배열은 그대로 두고 정렬값 반환
    return data.toSorted((a, b) => {
      if (sortType === 'oldest') {
        return Number(a.createdDate) - Number(b.createdDate);
      } else {
        return Number(b.createdDate) - Number(a.createdDate);
      }
    });
  };

  const sortedData = getSortedData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={'latest'}>최신순</option>
          <option value={'oldest'}>오래된 순</option>
        </select>
        <Button
          onClick={onClickNew}
          text={'새 일기 쓰기'}
          type={'POSITIVE'}
        />
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
