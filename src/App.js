import Sidebar from './components/sidebar/Sidebar';
import TopBar from './components/topbar/Topbar';
import "./App.css"
import Home from './pages/Home';
// import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <TopBar/>
      <div className="container">
        <Sidebar/>
        <Home/>
      </div>
    </div>
  );
}

export default App;
