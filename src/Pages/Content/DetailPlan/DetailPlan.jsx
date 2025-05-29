/* Import styles and script */
import Cookies from 'js-cookie';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Stack, ThemeProvider } from 'react-bootstrap';
import { Chip } from '@mui/material';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

/* Components */
import Header from '../../../Components/Header/Header';
import Footer from '../../../Components/Footer/Footer';
import HorizontalLinearStepper from '../../../Components/Stepper/Stepper';
import CardAll from '../../../Components/CardAll/CardAll';

/* Style important */
import './DetailPlan.css';

const DetailPlan = () => {
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
    <div className='container page__detailplan'>
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
  const steps = ['Planes y coberturas', 'Resumen'];
  const responsive = { active: 2, router: '/plans', text: true, icons: false, click: false, center: true};
  return (
    <>
    {/* Stepper */}
    <div className='row m-0 justify-content-center stepper__color'>
      <div className='col-sm-9 col-md-7 col-lg-5 col-xl-3'>
        <HorizontalLinearStepper steps={steps} active={2} router={'/plans'} text={false} back={false} next={false} end={false} click={false} responsive={responsive}/>
      </div>
    </div>
    {/* Stepper */}
    <main className='body'>
    <div className='row m-0 justify-content-center'>
      <div className='col-sm-10 col-md-9 col-lg-8 col-xl-7 body_content'>

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
    </>
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
  className='body--back'
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
        <CardAll type='sumary' title={'Precios calculados para:'} subtitle = {valueCookieParse.valueCookie.name} line={true} 
        text={
        <>
        <label className='detale__row'>Responsable de pago</label> <br/>
        <label className='detale__row--data'>{valueCookieParse.valueCookie.detail[0].typDoc }: <b>{valueCookieParse.valueCookie.detail[0].dni }</b></label><br/>
        <label className='detale__row--data'>Celular: <b>{valueCookieParse.valueCookie.detail[0].cel}</b></label><br/>
        <label className='mt-3 detale__row'>Plan elegido</label><br/>
        <label className='detale__row--data'>{Data.name}</label><br/>
        <label className='detale__row--data'>Costo del Plan: <b>${parseFloat(Data.totPri)}</b> al mes</label>
        </>
        } />
        {/* Card lista de planes */}

      </div>
    </div>

   </>
  )
}

export default DetailPlan;