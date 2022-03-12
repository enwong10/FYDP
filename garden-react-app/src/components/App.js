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
import MainGarden from "./MainGarden";
import PlantIdentification from "./PlantIdentification";
import PlantDictionary from "./PlantDictionary";
import GardenSettings from "./GardenSettings";
import MyPlants from "./MyPlants";
import { ContextProvider } from "./Context";
import { TopNavBar } from "./TopNavBar";
import styled from "styled-components";

function App() {
  return (
    <Container>
      <BrowserRouter>
        <ContextProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="my-gardens" element={<MyGardens />} />
            <Route path="garden" element={<MainGarden />} />
            <Route path="settings" element={<TopNavBar title={'Garden Settings'} component={<GardenSettings />} />} />
            <Route path="3d-grid" element={<TopNavBar component={<ARGrid />} />} />
            <Route path="2d-grid" element={<TopNavBar component={<TwoDGrid />} />} />
            <Route path="identification" element={<TopNavBar title={'Identification'} component={<PlantIdentification />} />} />
            <Route path="dictionary" element={<TopNavBar component={<PlantDictionary />} />} />
            <Route path='my-plants' element={<TopNavBar title={'My Plants'} component={<MyPlants />} />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </Container>
  );
}

const Container = styled.div`
    margin:auto;
    max-width: 400px;
    width: 100%
`;

export default App;
