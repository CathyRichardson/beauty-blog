import './App.scss';
import Header from './Components/Header';
import routes from './routes';

function App() {

  return (
    <div className="App">
      <Header />
      {routes}
      <footer>
        
      </footer>
    </div>
  );
}

export default App;
