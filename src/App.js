//import Registro from "./components/Registro";
import React from "react";
import { Route, HashRouter, Routes } from "react-router-dom";

import Login from "./components/Login.jsx";
import Registro2 from "./components/Registro2.jsx";
import HomePage from "./pages/HomePage.jsx";

import './styles/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ContactPage from "./pages/ContactPage.jsx";
import PrivateRoute from "./private/PrivateRoute.jsx";

function App() {
  return (
    <>
      <HashRouter>
        <Routes >
          <Route index element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Registro2 />} />
          <Route path='/home' element={
            <PrivateRoute >
              <HomePage />
            </PrivateRoute>} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/editar/:id' element={<Registro2 />} />
          
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
