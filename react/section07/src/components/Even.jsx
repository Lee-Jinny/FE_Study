import { useEffect } from "react"

const Even = () => {
    useEffect(() => {
        // 클린업, 정리함수
        // useEffect가 끝날 대 실행이 된다.
        return () => {
            console.log("unMount");
            
        }
    },[]) // deps를 빈 배열로 전달하면 useEffect는 마운트가 될 때 실행이 된다.
    // 종료는 unMount 될대 실행이 되는대 그대가 되면 정리함수를 호출하게 된다.
    return <div>짝수 입니다.</div>
}

export default Even