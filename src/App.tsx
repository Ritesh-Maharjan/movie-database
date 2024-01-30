import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Favorite from "./page/Favourite";
import About from "./page/About";
import Header from "./component/Header";
import Footer from "./component/Footer";
import NotFound from "./page/NotFound";
import Details from "./page/Details";
import { APP_FOLDER_NAME } from "./global";

function App() {
  return (
    <BrowserRouter basename={`/${APP_FOLDER_NAME}`}>
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
