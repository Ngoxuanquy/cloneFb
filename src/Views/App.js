import React, { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import DefaultLayout from "./Layouts/DefaultLayout/DefaultLayout";
import { publicRoute, privateRoute } from "../Routes";
// import PrivateDefaultLayout from "./Layouts/DefaultLayout/DefaultLayout";
import './index.css'
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const App = () => {
  // dotenv.config();

  return (
    <>
      <Router>
        <Routes>
          {
            publicRoute.map((route, index) => {
              let Page = route.component
              return (
                <Route key={index} path={route.path} element={
                  <DefaultLayout>
                    {Page}
                  </DefaultLayout>
                } />
              )
            })
          }

          {
            privateRoute.map((route, index) => {
              let Page = route.component
              return (
                <Route key={index} path={route.path} element={
                  <>
                    {Page}
                  </>
                } />
              )
            })
          }
        </Routes>
      </Router>
    </>
  );
}

export default App;