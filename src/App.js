import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/Home'
import ProductDetails from './components/product/ProductDetails';


import './App.css';

function App() {
  return (
    <Router>
     < Header />
      <Routes>
     < Route exact path = "/" element={<Home/>}  />
     <Route  path="/search/:keyword" element={<Home/>} />
     < Route exact path = "/product/:id" element={<ProductDetails/>}  />
     </Routes>
     < Footer />
    </Router>
  );
}

export default App;
