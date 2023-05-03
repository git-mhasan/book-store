import { Provider } from 'react-redux';
import './App.css';
import BookStore from './components/BookStore';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div>
        <BookStore></BookStore>
      </div>
    </Provider>
  );
}

export default App;
