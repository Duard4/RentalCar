import './App.css'
import {Route, Routes} from "react-router-dom";
import React from 'react';
import {Layout} from "./components/Layout.tsx";

const HomePage = React.lazy(() => import('./pages/HomePage').then(module => ({default: module.HomePage})));
const CatalogPage = React.lazy(() => import('./pages/CatalogPage.tsx').then(module => ({default: module.CatalogPage})));
const CarPage = React.lazy(() => import('./pages/CarPage.tsx').then(module => ({default: module.CarPage})));

function App() {

  return (
    <Layout>
      <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/catalog' element={<CatalogPage/>}/>
          <Route path='/catalog/:id' element={<CarPage/>}/>
      </Routes>
    </Layout>
  )
}

export default App
