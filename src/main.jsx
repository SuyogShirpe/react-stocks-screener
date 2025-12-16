import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import {  createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import Home from './components/Home.jsx';
import Watchlist from './components/Watchlist.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import StockDetails from './components/StockDetails.jsx';

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path='' element={<Home />} />
      <Route path='/watchlist' element={<Watchlist />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path="/stock/:ticker" element={<StockDetails />} /> 
    </Route>

  )
)

createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router} />
  
)
