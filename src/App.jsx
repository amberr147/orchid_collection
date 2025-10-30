import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import OrchidsContainer from './components/OrchidsContainer';
import Detail from './components/Detail';
import Contact from './components/Contact';
import About from './components/About';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<OrchidsContainer />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/natural" element={<OrchidsContainer />} />
        <Route path="/special" element={<OrchidsContainer />} />
      </Routes>
    </Router>
  );
}

export default App;