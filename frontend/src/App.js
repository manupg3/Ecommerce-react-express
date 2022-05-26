import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import Navbarv2 from './components/navbarv2';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router} from 'react-router-dom';
import RoutesApp from './routes/routes';


function App() {
  return (
    <div className="App">
  <Router>
  <Navbarv2/>
    <RoutesApp />
  </Router>
    </div>
  );
}

export default App;
