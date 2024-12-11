import "./Header.css"
import { memo } from 'react'

const Header = () => {
    return <div className="Header">
        <h3>오늘은 📅</h3>
        <h1>{ new Date().toDateString() }</h1>
    </div>
}

// 호출한뒤 최적화 하고 싶은 컴포넌트 인수로 넣어주기
// 메모 메서드는 인수로 받은 헤더 컴포넌트를 props가 변경되기 않았을 때에는
// rerendering하지 않도록 최적화해서 반환
const memoizedHeaderHeader = memo(Header)

// memoized 된 컴포넌트를 내보낸다
export default memoizedHeaderHeader

// 단축도 가능
// export default memo(Header)

