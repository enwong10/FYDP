import React from "react";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import LoginPage from "./LoginPage";
import MyGardens from "./MyGardens";
import NoMatch from "./NoMatch";
import ARGrid from "./3DGrid";
import TwoDGrid from "./TwoDGrid";
import { ContextProvider } from "./Context";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ContextProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="my-gardens" element={<MyGardens />} />
            <Route path="3d-grid" element={<ARGrid />} />
            <Route path="2d-grid" element={<TwoDGrid />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
