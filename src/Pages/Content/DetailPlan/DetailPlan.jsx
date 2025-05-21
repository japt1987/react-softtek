/* Import styles and script */
import Cookies from 'js-cookie';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Card, Stack, ThemeProvider } from 'react-bootstrap';
import { Chip } from '@mui/material';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { HiUsers } from "react-icons/hi2";

/* Pages */
import Header from '../../../Components/Header/Header';
import Footer from '../../../Components/Footer/Footer';

/* Style important */
import './DetailPlan.css';

export const DetailPlan = () => {
  const valueCookie = Cookies.get('admin'); // reemplaza 'nombreCookie' por el nombre real
  const valueCookieParse = JSON.parse(valueCookie); // parseamos el Cookies Json
  return (
  <StartDetailPlan valueCookie={valueCookieParse}/>
  );
}

function StartDetailPlan(valueCookieParse) {
  // Obtenemos los variables de la Cookie
  const Admin = valueCookieParse.valueCookie.user;
  if (Admin === 'jesuspeña') {
    return (
    <div className='container'>
      <Header/>
      <ContentDetailPlan valueCookieParse={valueCookieParse}/>
      <Footer/>
      </div>
    );
  } else {
    return <Navigate to="/" replace />; // Al Inicio
  }
}

function ContentDetailPlan({valueCookieParse}) {
  return (
  <main className='body'>
    <div className='row m-0 justify-content-center'>
      <div className='col-sm-10 col-md-10 col-lg-9 col-xl-8'>

        {/* Volver */}
        <div className='row'>
          <div className='col-12'>
            <BeforeContent />
          </div>
        </div>
        {/* Volver */}
        <Content valueCookieParse={valueCookieParse} />

        </div>
      </div>
    </main>
  );
}

function BeforeContent() {
  /* Para la navegacion */
  const navigateUrl = useNavigate();
  /* Atras */
  const backPage = () => {
    navigateUrl('/plans'); // Te devuelve al listado
  };

  return (
  <Stack 
  direction="row" 
  spacing={2}>
    <ThemeProvider >
      <Chip 
      onClick={backPage} 
      className='iconBack' 
      icon={<IoArrowBackCircleOutline />} 
      label="Volver" 
      sx={{ 
        backgroundColor: 'transparent',
        '& .MuiChip-icon': {
          color: '#4F4FFF'
        },
        '&:hover .MuiChip-icon': {
          color: '#fff', 
        }
      }}
    />
    </ThemeProvider>
  </Stack>
  );
}

function Content({valueCookieParse}) {
  // Obtenemos la data del url
  const location = useLocation();
  const Data = location.state;

  // Si no hay datos
  if (!Data) return <div className='row text-center'><div className='col-12'>Cargando ... </div></div>;

  return (
    <>
    <div className='row m-0 mt-5'>
      <div className='col-12'>
        <label className='plans--access'>Resumen del seguro</label>        
      </div>
    </div>
    <div className='row m-0 mt-5'>
      <div className='col-12'>

        {/* Card lista de planes */}
        <Card style={{ borderRadius: 24 }}>
          <Card.Body>
            <Card.Title>
              <div className='row mt-2'>
                <div className='col-12 detalle__title'>
                  Precios calculados para:
                </div>
              </div>
            </Card.Title>
            <Card.Subtitle>
              {/* Nombre de la persona */}
              <div className='row mt-3'>
                <div className='col-12 detalle--name'>
                  <HiUsers className='me-2'/><label>{ valueCookieParse.valueCookie.name }</label>
                </div>
              </div>
              {/* Nombre de la persona */}
            </Card.Subtitle>
            <div className='row mt-2'>
              <div className='col-12'>
                <hr className='line d-block'/>
              </div>
            </div>
            {/* Contenido para la data del resumen */}
            <div className='row'>
              <div className='col-12'>
                <Card.Text>
                  <label className='detale__row'>Responsable de pago</label> <br/>
                  <label className='detale__row--data'>{valueCookieParse.valueCookie.detail[0].typDoc }: {valueCookieParse.valueCookie.detail[0].dni }</label><br/>
                  <label className='detale__row--data'>Celular: {valueCookieParse.valueCookie.detail[0].cel}</label><br/>
                  <label className='mt-3 detale__row'>Plan elegido</label><br/>
                  <label className='detale__row--data'>{Data.name}</label><br/>
                  <label className='detale__row--data'>Costo del Plan: ${parseFloat(Data.totPri)} al mes</label>
                </Card.Text>
              </div>
            </div>
            {/* Contenido para la data del resumen */}
          </Card.Body>
        </Card>
        {/* Card lista de planes */}
        
      </div>
    </div>
          
   </>
  )
}

export default DetailPlan;