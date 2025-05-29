/* Import styles and script */
import React, { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import { Stack, ThemeProvider } from 'react-bootstrap';
import { Chip } from '@mui/material';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Button from 'react-bootstrap/Button';

/* Img */
import Protection from '../../../Assets/img/png/IcoProtectionLight.png';
import AddUser from '../../../Assets/img/png/IcoAddUserLight.png';
import Casa from '../../../Assets/img/png/IcoHomeLight.png';
import CasaMore from '../../../Assets/img/png/IcoHospitalLight.png';

/* Components */
import Header from '../../../Components/Header/Header';
import Footer from '../../../Components/Footer/Footer';
import HorizontalLinearStepper from '../../../Components/Stepper/Stepper';
import CardAll from '../../../Components/CardAll/CardAll';
import CardCarousel from '../../../Components/CardCarousel/CardCarousel';

/* Services */
import { GetListUser, GetListPlans } from '../../../Services/Api';

/* Utils */
import { UtilResponsive } from '../../../Utils/UtilResponsive';

/* Style important */
import './Plans.scss';

const Plans = () => {
  const valueCookie = Cookies.get('admin'); // reemplaza 'nombreCookie' por el nombre real
  const valueCookieParse = JSON.parse(valueCookie); // parseamos el Cookies Json

  return (
    <StartPlans valueCookie={valueCookieParse}/>
  );
}

function StartPlans(valueCookieParse) {
  // Obtenemos los variables de la Cookie
  const Admin = valueCookieParse.valueCookie.user;
  if (Admin === 'jesuspeña') {
    return (
    <div className='container page__plans'>
      <Header/>
      <ContentPlans/>
      <Footer/>
      </div>
    );
  } else {
    return <Navigate to="/" replace />; // Al inicio
  }
}

function ContentPlans() {
  const steps = ['Planes y coberturas', 'Resumen'];
  const responsive = { active: 1, router: '/', text: true, icons: false, click: false, center: true};
  return (
  <>
  {/* Stepper */}
  <div className='row m-0 justify-content-center stepper__color'>
    <div className='col-sm-9 col-md-7 col-lg-5 col-xl-3'>
      <HorizontalLinearStepper steps={steps} active={1} router={'/'} text={false} back={false} next={false} end={false} click={false} responsive={responsive}/>
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
        <ListUser />

        </div>
      </div>
    </main>
    </>
  );
}

function BeforeContent() {
  /* Para la navegacion */
  const navigateUrl = useNavigate();
  /* Crear Cookies */
  const backPage = () => {
    Cookies.remove('admin');
    navigateUrl('/'); // La ruta destino
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

function ListUser() {
  /* Variables para almacenar el usario, el loading, el eror y el valor */
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [myValueYear, setMyValueYear] = React.useState(null);
  const [name, setName] = useState(null);

  // Evitar duplicados
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    // Llamamos al servicio
    GetListUser()
    .then(data => {
      setUsers(data);
      setMyValueYear(data.birthDay);
      setName(data.name + ' ' + data.lastName);
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    })
  }, []);

  // Obtenemos de nuevo el admin
  const valueCookie = JSON.parse(Cookies.get('admin')); // reemplaza 'nombreCookie' por el nombre real
  // Modificamos el Cookie
  valueCookie.name = name;
  // Guardar de nuevo en la cookie
  Cookies.set('admin', JSON.stringify(valueCookie), { expires: 7 });

  /* Muesta el load y el mensaje de error */
  if (loading) return <div className='row text-center'><div className='col-12'>Cargando ... </div></div>;
  if (error) return <div className='row text-center'><div className='col-12'> Erorr: {error} </div></div>;

  return (
    <>
    <div className='row m-0 mt-5 justify-content-center'>
      <div className='col-11 col-sm-11 col-md-11 col-lg-10 col-xl-9'>

        <div className='row justify-content-center text-center'>
          <div className='col-sm-12 col-md-9 col-lg-8 col-xl-7'>
            {users ? (
              <label className='plans--access'>
                { users.name } ¿Para quién deseas cotizar? </label>
            ) : (
            <label className='plans--access'>Hola ¿Para quién deseas cotizar?</label>
            )}
          </div>
        </div>
        <div className='row mt-3 justify-content-center text-center'>
          <div className='col-sm-12 col-md-9 col-lg-8 col-xl-7'>
            <label className='plans__description'>Selecciona la opción que se ajuste más a tus necesidades.</label> 
          </div>
        </div>
        
      </div>
    </div>
    <PlansCondition myValueYear={myValueYear} />
   </>
  );
}

function PlansCondition({myValueYear}) {
  // Variables para las opciones
  const optionForMy = {
    label: 'optionForMy',
    img:  <img src={ Protection } loading="lazy" alt="Protección Rimac"/>
  }
  const optionForMore = {
    label: 'optionForMore',
    img: <img src={ AddUser } loading="lazy" alt="Usuario Rimac"/>
  }

  // Variables para el checbox a la hora de seleccionar y modifica el diseño
  const colorCheck = {
    borderStyle: 'solid', borderWidth: 3, borderColor: '#03050F'
  }

  // Evento que recoje a la hora de hacer check
  const [checkOptionGroup, setCheckOptionGroup] = useState('');
  const onChangeEvent = (option) => {
    setCheckOptionGroup(option); // Me permite recoger que tipo de Option es
  }

  return (
  <>
  <div className='row m-0 mt-5 justify-content-center'>
    <div className='col-sm-12 col-md-11 col-lg-10 col-xl-9'>
      <div className='row plans__card__quote'>

        <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex justify-content-center'>
          {/* Card para Mí */}
          <CardAll type='radio' title='*' subtitle='Para mí' text='Cotiza tu seguro de salud y agrega familiares si así lo deseas.' 
          option={optionForMy} checkedEvent={checkOptionGroup} onChangeEvent={onChangeEvent} colorCheck={colorCheck} />
          {/* Card para Mí */}
        </div>
        
        <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex justify-content-center'>
          {/* Card para alguien más */}
          <CardAll type='radio' title='*' subtitle='Para alguien más' text='Realiza una cotización para uno de tus familiares o cualquier persona.' 
          option={optionForMore} checkedEvent={checkOptionGroup} onChangeEvent={onChangeEvent} colorCheck={colorCheck}/>
          {/* Card para alguien más */}
        </div>
        
      </div>
    </div>
  </div>
  <ListPlans myValueYear={myValueYear} checkOptionGroup={checkOptionGroup} />
  </>
  );
}

function ListPlans({myValueYear, checkOptionGroup}) {
  /* Variable para la lista de planes, loading y error */
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countData, setCountData] = useState(0);

  // Tamaño de la pantalla
  const width = UtilResponsive();

  /* Se saca la diferencia por años */
  const yearActual = new Date().getFullYear();
  const yearTotal = yearActual - myValueYear.split('-')[2];

  // Evitar duplicados
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    // Llamamos al servicio
    GetListPlans()
    .then(data => {
      setPlans(data);
      const dataRow = data.list.filter(row => yearTotal < row.age);
      setCountData(dataRow.length);
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    })
  },[yearTotal]);

  /* Muesta el load y el mensaje de error */
  if (loading) return <div className='row text-center'><div className='col-12'>Cargando ... </div></div>;
  if (error) return <div className='row text-center'><div className='col-12'> Erorr: {error} </div></div>;

  return (
  <div className='row m-0 mt-5 justify-content-center'>
    <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>

      { checkOptionGroup && (

        <div className='row'>
          {
          width < 576 ? 
          (
          
          <CardCarousel 
          content={
            plans.list.map((data, index) => (
              yearTotal < data.age && (
                
              <div key={index} className={index < countData ? 'carousel-scenery me-3' : 'carousel-scenery'}>
                {/* Card lista de planes */}
                <CardAll 
                type='list'
                title={
                <TitleContent data={data} />
                }
                subtitle={
                <SubtitleContent data={data} checkOptionGroup={checkOptionGroup} />
                }
                line={true}
                text={
                <LineContent data={data} />
                }
                button={
                <SelectPlan data={data}/>
                }
                />
                {/* Card lista de planes */}
              </div>
              )))

          }
          />
          ) 
          : 
          (
          <>
          {

          plans.list.map((data) => (
            yearTotal < data.age && (
          
            <div key={data.name} className='col-sm-6 col-md-6 col-lg-4 col-xl-4 listCard__top'>
              {/* Card lista de planes */}
              <CardAll 
              type='list'
              title={
                <TitleContent data={data} />
              }
              subtitle={
                <SubtitleContent data={data} checkOptionGroup={checkOptionGroup} />
              }
              line={true}
              text={
                <LineContent data={data} />
              }
              button={
                <SelectPlan data={data}/>
              }
              />
              {/* Card lista de planes */}
            </div>

            )))

          }
          </>
          )
          }
        </div>

      )}

    </div>
  </div>
  );
}

function TitleContent({data}) {
  return (
  <div className={`row ${data.name === 'Plan en Casa y Clínica' ? 'mt-4': 'mt-5'}`}>
    <div className='auto'>
      {data.name === 'Plan en Casa y Clínica' && <label className='body__secure'>Plan recomendado</label> }
    </div>
    <div className='col-12 mt-2 listCard__title'>
      {
      data.name.includes('Clínica') || data.name.includes('Chequeo') ? 
      <div className='row'>
        <div className='col-8 col-sm-8 col-md-7 col-lg-8 col-xl-8'>
          {data.name}
        </div>
        <div className='col-4 col-sm-4 col-md-5 col-lg-4 col-xl-4 text-center'>
          {<img src={ CasaMore } loading="lazy" alt={data.name}/>}
        </div>
      </div>
      : 
      <div className='row'>
        <div className='col-8 col-sm-8 col-md-7 col-lg-8 col-xl-8'>
          {data.name}
        </div>
        <div className='col-4 col-sm-4 col-md-5 col-lg-4 col-xl-4 text-center'>
          {<img src={ Casa } loading="lazy" alt={data.name}/>}
        </div>
      </div>
      }
    </div>
  </div>
  );
}

function SubtitleContent({data, checkOptionGroup}) {
  return (
  <div className='row mt-4'>
    <div className='col-12 listCard__message'>
      COSTO DE PLAN
    </div>
    <div className='col-12 listCard__price'>
      {/* Si es para el checbox para alguien más se aplica un descuento del - 5% */}
      {checkOptionGroup === 'optionForMore' ? (
        <div>$ {data.totPri = data.price - (data.price * 0.05)} al mes</div>
      ) : (
        <div>$ {data.totPri = data.price} al mes</div>
      )}
      {/* Si es para el checbox para alguien más se aplica un descuento del - 5% */}
    </div>
  </div>
  );
}

function LineContent({data}) {
  return (
    data.description.map((desc, i) => (
      <li className='mt-3' key={i}>{desc}</li>
    )) 
  );
}

function SelectPlan({data}) {
  // Para ir a la otra página
  const navigateUrl = useNavigate();
  const selectPlan = (item) => {
    navigateUrl('/detailplan', { state: item }); // Cambia de ruta al detalle
  }

  return (
  <>
  <div className='row mt-auto'>
    <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-3 mb-3 text-center'>
      <Button className='listCard__button' variant="danger" onClick={() => selectPlan(data)}>Seleccionar Plan</Button>
    </div>
  </div>
  </>
  )
}

export default Plans;
