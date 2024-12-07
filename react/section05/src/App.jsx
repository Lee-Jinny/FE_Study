import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

// 부모 컴포넌트
function App() {
  return (
    <>
      <Header/>
      <Main/>
      <Footer/>
      <h1>안녕 리액트!</h1>
    </>
  );
}

export default App;
