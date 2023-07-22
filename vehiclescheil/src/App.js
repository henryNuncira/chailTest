import logo from './logo.svg';
import './App.css';
import Home from './Views/Home';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
        </header>
        <div className="App-content">
          <Home></Home>
        </div>
      </div>
    </Provider>
  );
}

export default App;
