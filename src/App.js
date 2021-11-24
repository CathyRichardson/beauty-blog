import './App.scss';
import Header from './Components/Header';
import routes from './routes';

function App() {

  return (
    <div className="App">
      <Header />
      {routes}
      <footer>
        <p>A special thanks to DevMountain</p>
      </footer>
    </div>
  );
}

export default App;
