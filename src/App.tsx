import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Favorite from "./page/Favorite";
import About from "./page/About";
import Header from "./component/Header";
import Footer from "./component/Footer";
import NotFound from "./page/NotFound";
import Details from "./page/Details";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
