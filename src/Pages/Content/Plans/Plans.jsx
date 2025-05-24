/* Import styles and script */
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import { Stack, ThemeProvider } from 'react-bootstrap';
import { Chip, FormControlLabel, Radio } from '@mui/material';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { green } from '@mui/material/colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

/* Img */
import Protection from '../../../Assets/img/png/IcProtectionLight.png';
import AddUser from '../../../Assets/img/png/IcAddUserLight.png';

/* Components */
import Header from '../../../Components/Header/Header';
import Footer from '../../../Components/Footer/Footer';
import HorizontalLinearStepper from '../../../Components/Stepper/Stepper';

/* Services */
import { GetListUser, GetListPlans } from '../../../Services/Api';

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

  useEffect(() => {
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
  // Esto es para actuar en grupo que funcione como tipo radio button
  const [checkOptionGroup, setCheckOptionGroup] = useState('');
  const [colorCheck, setColorCheck] = useState(null);
  const selChekChange = (option) => {
    setColorCheck({ borderStyle: 'solid', borderWidth: 3, borderColor: '#03050F' });
    setCheckOptionGroup(option);
  };
  
  return (
  <>
  <div className='row m-0 mt-5 justify-content-center'>
    <div className='col-sm-12 col-md-11 col-lg-10 col-xl-9'>
      <div className='row plans__card__quote'>

        <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex justify-content-center'>
          {/* Card para Mí */}
          <Card 
          style={{ width: '256px', height: '212px', borderRadius: 24, boxShadow: 'rgba(174, 172, 243, 0.35) 0px 1px 32px', ...(checkOptionGroup === 'optionForMy' ? colorCheck : '') }}>
            <Card.Body>
              <Card.Title>
 
                <div className='row'>
                  <div className='col-12 text-end'>
                    {/* Checkbox para la opción Card para mí */}
                    <FormControlLabel 
                    control = {
                    <Radio 
                    checked={checkOptionGroup === 'optionForMy'}
                    onChange={() => selChekChange('optionForMy')}
                    icon={<RadioButtonUncheckedIcon sx={{ fontSize: 30, color: green[800] }} />}
                    checkedIcon={<CheckCircleIcon sx={{ fontSize: 30, color: green[600] }} />}
                    sx={{ padding: 0 }}
                    />
                    }
                    />
                    {/* Checkbox para la opción Card para mí */}
                  </div>
                  <div className='col-12'>
                    <img src={ Protection } loading="lazy" alt='Protección Rimac'/>
                  </div>
                </div>
                
              </Card.Title>
              <Card.Subtitle className="mb-2 mt-3 text-muted plans__card">Para mí</Card.Subtitle>
              <Card.Text className='plans__card__content'>
                Cotiza tu seguro de salud y agrega familiares si así lo deseas.
              </Card.Text>
            </Card.Body>
          </Card>
          {/* Card para Mí */}
        </div>
        
        <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex justify-content-center'>
          {/* Card para alguien más */}
          <Card style={{ width: '256px', height: '212px', borderRadius: 24, boxShadow: 'rgba(174, 172, 243, 0.35) 0px 1px 32px', ...(checkOptionGroup === 'optionForMore' ? colorCheck : '') }}>
            <Card.Body>
              <Card.Title>

                <div className='row'>
                  <div className='col-12 text-end'>
                    {/* Checkbox para la opción Card para alguine más */}
                    <FormControlLabel 
                    control = {
                    <Radio 
                    checked={checkOptionGroup === 'optionForMore'}
                    onChange={() => selChekChange('optionForMore')}
                    icon={<RadioButtonUncheckedIcon sx={{ fontSize: 30, color: green[800] }} />}
                    checkedIcon={<CheckCircleIcon sx={{ fontSize: 30, color: green[600] }} />}
                    sx={{ padding: 0 }}
                    />
                    }
                    />
                    {/* Checkbox para la opción Card para alguine más */}
                  </div>
                  <div className='col-12'>
                    <img src={ AddUser } loading="lazy" alt='Usuario Rimac'/>
                  </div>
                </div>
              
              </Card.Title>
              <Card.Subtitle className="mb-2 mt-3 text-muted plans__card">Para alguien más</Card.Subtitle>
              <Card.Text className='plans__card__content'>
                Realiza una cotización para uno de tus familiares o cualquier persona.
              </Card.Text>
            </Card.Body>
          </Card>
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

  useEffect(() => {
    // Llamamos al servicio
    GetListPlans()
    .then(data => {
      setPlans(data);
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    })
  }, []);

  /* Muesta el load y el mensaje de error */
  if (loading) return <div className='row text-center'><div className='col-12'>Cargando ... </div></div>;
  if (error) return <div className='row text-center'><div className='col-12'> Erorr: {error} </div></div>;

  /* Se saca la diferencia por años */
  const yearActual = new Date().getFullYear();
  const yearTotal = yearActual - myValueYear.split('-')[2];

  return (
  <div className='row m-0 mt-5 justify-content-center'>
    <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>

      { checkOptionGroup && (
        <div className='row'>
          {plans.list.map((data) => (
            yearTotal < data.age && (
            <div key={data.name} className='col-sm-6 col-md-6 col-lg-4 col-xl-4 listCard__top'>

              {/* Card lista de planes */}
              <Card style={{ borderRadius: 24, height: 687, boxShadow: 'rgba(174, 172, 243, 0.35) 0px 1px 32px' }}>
                <Card.Body className='d-flex flex-column' >
                  <Card.Title>
                    <div className={`row ${data.name === 'Plan en Casa y Clínica' ? 'mt-4': 'mt-5'}`}>
                      <div className='auto'>
                        {data.name === 'Plan en Casa y Clínica' && <label className='body__secure'>Plan recomendado</label> }
                      </div>
                      <div className='col-12 mt-2 listCard__title'>
                        {data.name}
                      </div>
                    </div>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 mt-3 text-muted">
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
                  </Card.Subtitle>
                  <div className='row'>
                    <div className='col-12'>
                      <hr className='mt-4'/>
                    </div>
                  </div>
                  {/* Contenido por cada plan despues de dar click a cada opción */}
                  <div className='row listCard__row'>
                    <div className='col-12'>
                      <Card.Text>
                        {
                        data.description.map((desc, i) => (
                          <li className='mt-3' key={i}>{desc}</li>
                        ))
                        }
                      </Card.Text>
                    </div>
                  </div>
                  {/* Contenido por cada plan despues de dar click a cada opción */}
                  <SelectPlan data={data}/>
                </Card.Body>
              </Card>
              {/* Card lista de planes */}

            </div>
            )
          ))}
        </div>
      )}
      
    </div>
  </div>
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
    <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-3 mb-3 text-center listCard__button'>
      <Button variant="danger" onClick={() => selectPlan(data)}>Seleccionar Plan</Button>
    </div>
  </div>
  </>
  )
}

export default Plans;
