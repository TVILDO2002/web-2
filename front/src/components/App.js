import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./header";
import Home from '../Home';
import Add from '../Add';


function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
