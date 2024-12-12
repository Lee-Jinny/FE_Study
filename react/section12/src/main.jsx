import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  // BrowserRouter는 현재 주소를 저장하고 감지하는 역할을 한다
  //리액트 앱의 모든 컴포넌트들이 이렇게 페이지 라우팅과 관련된 모든 데이터를 공급받아 사용가능
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
