import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home-page.tsx";
// import CoursesPage from "./pages/courses-page.tsx";
// import ExportPage from "./pages/export-page.tsx";
// import AboutPage from "./pages/about-page.tsx";

import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/courses" element={<CoursesPage />} /> */}
          {/* <Route path="/export" element={<ExportPage />} /> */}
          {/* <Route path="/about" element={<AboutPage />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
