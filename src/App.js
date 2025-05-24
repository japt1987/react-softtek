/* Import styles and script */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* Img */
import Family from './Assets/img/png/Family.png';

/* Components */
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

/* Pages */
import Login from './Pages/Login/Login';
import Plans from './Pages/Content/Plans/Plans';
import DetailPlan from './Pages/Content/DetailPlan/DetailPlan';

/* Style important */
import './App.scss';

function App() {
   return (
   <Router>
    <Routes>
      <Route path='/' element={<Page/>} />
      <Route path='/plans' element={<Plans/>} />
      <Route path='/detailplan' element={<DetailPlan />} />
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

export function Body() {
  return (
  <main className='body'>
    <div className='row m-0 justify-content-center'>
      <div className='col-sm-12 col-md-10 col-lg-9 col-xl-8'>

        {/* Content for modif and changes */}
        <div className='row'>
          <div className='col-sm-12 col-md-5 col-lg-6 col-xl-5 body__image--maxcontent'>
            <img src={ Family } loading="lazy" alt='Familia Rimac' className='body__image' />
          </div>
          <div className='col-sm-12 col-md-7 col-lg-6 col-xl-7'>
            <div className='row justify-content-center'>

              {/* Content of img with condition */}
              <div className='col-sm-12 col-md-11 col-lg-10 col-xl-8'>

                {/* The part of secure and not image for { display none */}
                <div className='row'>
                  <div className='col-7 col-sm-7 col-md-12 col-lg-12 col-xl-12'>
                    <label className='body__secure'>Seguro Salud Flexible</label><br/>
                    <label className='body__title mt-3'>Creado para ti y tu familia</label>
                  </div>
                  <div className='col-5 col-sm-5 col-md-5 col-lg-12 col-xl-12 body__image--mincontent'>
                    <img src={ Family } alt='Familia' loading="lazy" className='body__image--visible'/>
                  </div>
                </div>
                {/* The part of secure and not image for { display none */}

                {/* The part of login */}
                <Login/>
                {/* The part of login */}

              </div>
              {/* Content of img with condition */}

            </div>
          </div>
        </div>
        {/* Content for modif and changes */}

        </div>
      </div>
    </main>
  );
}

export default App;
