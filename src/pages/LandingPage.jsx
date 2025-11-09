import { Route, Routes } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Collection from './Collection';
import About from './About';
import FAQ from './FAQ';
import Contact from './Contact';
import ProductDetail from './ProductDetail';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/faq' element={<FAQ />} />
      </Routes>
      <Footer />
    </div>
  );
};
export default LandingPage;
