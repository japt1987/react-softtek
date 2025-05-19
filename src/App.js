import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Rimac from './Components/Assets/img/png/Rimac.png';
import Family from './Components/Assets/img/png/Family.png';
import RimacWhite from './Components/Assets/img/png/Vector.png';

import { FaPhoneAlt } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Components/Login/Login';
import Planes from './Components/Content/Planes';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Page/>} />
        <Route path='/planes' element={<Planes/>} />
      </Routes>
    </Router>
  );
}

function Page() {
  return (
    <div className='container'>
      <Header/>
      <Body/>
      <Footer/>
    </div>
  );
}

export function Header() {
  return (
    <header className='header'>
      <div className='row m-0 justify-content-center'>
        <div className='col-sm-12 col-md-10 col-lg-9 col-xl-8'>

          <div className='row'>
            <div className='col-6 col-sm-4 col-md-4 col-lg-6 col-xl-6 text-start'>
              <img src={ Rimac } alt='' />
            </div>
            <div className='col-6 col-sm-8 col-md-8 col-lg-6 col-xl-6 text-end'>
              <label className='me-3 header__message'>¡Compra por este medio!</label>
              <FaPhoneAlt className='me-3'/>
              <label className='me-3 header__number'><b>(01) 411 6001</b></label>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}

export function Body() {
  return (
    <main className='body'>
      <div className='row m-0 justify-content-center'>
        <div className='col-sm-12 col-md-10 col-lg-9 col-xl-8'>

             <div className='row'>
                <div className='col-sm-12 col-md-5 col-lg-6 col-xl-5 body__image--maxcontent'>
                  <img src={ Family } alt='' className='body__image' />
                </div>
                <div className='col-sm-12 col-md-7 col-lg-6 col-xl-7'>
                  <div className='row justify-content-center'>

                    <div className='col-sm-12 col-md-11 col-lg-10 col-xl-8'>
                      {/* The part of secure and not image for { display none */}
                      <div className='row'>
                        <div className='col-7 col-sm-7 col-md-12 col-lg-12 col-xl-12'>
                          <label className='body__secure'>Seguro Salud Flexible</label><br/>
                          <label className='body__title mt-3'>Creado para ti y tu familia</label>
                        </div>
                        <div className='col-5 col-sm-5 col-md-5 col-lg-12 col-xl-12 body__image--mincontent'>
                          <img src={ Family } alt='' className='body__image--visible'/>
                        </div>
                      </div>
                      {/* The part of login */}
                      <Login/>
                    </div>
                    
                  </div>
                </div>
             </div>

        </div>
      </div>
    </main>
  );
}

export function Footer() {
  return (
    <footer className='footer'>
      <div className='row m-0 justify-content-center'>
        <div className='col-sm-12 col-md-10 col-lg-9 col-xl-8'>

         <div className='row pt-3 pb-3'>
            <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6 align-content-center text-start'>
              <img src={ RimacWhite } alt='' />
            </div>
            <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6 text-end'>
              <label className='align-content-center footer__message'>© 2023 RIMAC Seguros y Reaseguros.</label>
            </div>
         </div>

        </div>
      </div>
    </footer>
  );
}

export default App;
