import logo from './logo.svg';
import './App.css';
import Home from './Views/Home';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Routes, Route } from "react-router-dom"
import Login from './Views/Login';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* <div className="App-content">
          <Home></Home>
        </div> */}
      </div>
    </Provider>
  );
}

export default App;
