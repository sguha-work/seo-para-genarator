//import logo from './logo.svg';
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/pages/home.page.component";

function App() {
  return (
    <div className="font-['jost']">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home></Home>} />

          <Route />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
