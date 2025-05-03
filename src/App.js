import Sidebar from './components/sidebar/Sidebar';
import TopBar from './components/topbar/Topbar';
import "./App.css"

function App() {
  return (

    <div className="App">
      <TopBar/>
      <div className="container">
        <Sidebar/>
      </div>
    </div>
  );
}

export default App;
