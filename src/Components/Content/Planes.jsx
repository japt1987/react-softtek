import React, { useEffect, useState } from 'react'

import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import { Stack, ThemeProvider } from 'react-bootstrap';
import { Checkbox, Chip, createTheme, FormControlLabel } from '@mui/material';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import Protection from '../Assets/img/png/IcProtectionLight.png';
import AddUser from '../Assets/img/png/IcAddUserLight.png';

import { Header, Footer } from '../../App';

import { ListUser, ListPlanes } from '../../Services/Api';

import './Planes.css';
import { green } from '@mui/material/colors';

export const Planes = () => {
  const valor = Cookies.get('admin'); // reemplaza 'nombreCookie' por el nombre real
  return (
    <>
      <StartPlanes valor={valor}/>
    </>
  );
}

function StartPlanes(valor) {
    if (valor.valor) {
      return <div className='container'>
        <Header/>
          <ContentPlanes/>
        <Footer/>
      </div>;
    } else {
      return <Navigate to="/" replace />; // Al inicio
    }
}

function ContentPlanes() {
  return (
  <main className='body'>
      <div className='row m-0 justify-content-center'>
        <div className='col-sm-10 col-md-10 col-lg-9 col-xl-8'>
          
          {/* Volver */}
          <div className='row'>
            <div className='col-12'>
              <BeforeContent />
              <GetListUser />
            </div>
          </div>

        </div>
      </div>
    </main>
  );

}

function BeforeContent() {
    const navigate = useNavigate();
    const BackPaga = () => {
      Cookies.remove('admin');
      navigate('/'); // La ruta destino
    };

    const theme = createTheme({
      components: {
        MuiChip: {
          styleOverrides: {
            root: {
              backgroundColor: '#4F4FFF',
              fontSize: '14px',
              color: '#4F4FFF',
              '&:hover': {
                backgroundColor: '#4F4FFF'
              }
            }
          }
        }
      }
    });

    return (
      <>
      <Stack direction="row" spacing={2}>
      <ThemeProvider theme={theme} >
        <Chip onClick={BackPaga} className='iconBack' icon={<IoArrowBackCircleOutline />} label="Volver" 
        sx={{ backgroundColor: 'transparent' }}/>
      </ThemeProvider>
    </Stack>
      </>
  );
}

function GetListUser() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [miValor, setMiValor] = React.useState(null);

  useEffect(() => {
    // Llamamos al servicio
    ListUser()
    .then(data => {
      setUsers(data);
      setMiValor(data.birthDay);
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    })
  }, []);

  if (loading) return <div className='row text-center'><div className='col-12'>Cargando ... </div></div>;
  if (error) return <div className='row text-center'><div className='col-12'> Erorr: {error} </div></div>;

  return (
    <>
    <div className='row m-0 mt-5 justify-content-center'>
        <div className='col-sm-12 col-md-11 col-lg-10 col-xl-9'>

          <div className='row justify-content-center text-center'>
            <div className='col-sm-12 col-md-9 col-lg-8 col-xl-7'>
              {users ? (
                <label className='planes--access'>{ users.name } ¿Para quién deseas cotizar? </label>
              ) : (
                <label className='planes--access'>Hola ¿Para quién deseas cotizar?</label>
              )}
            </div>
          </div>
        <div className='row mt-3 justify-content-center text-center'>
          <div className='col-sm-12 col-md-9 col-lg-8 col-xl-7'>
              <label className='planes__description'>Selecciona la opción que se ajuste más a tus necesidades.</label> 
            </div>
        </div>

        </div>
    </div>
    <PlanesCondition miValor={miValor} />
   </>
  );
}

function PlanesCondition({miValor}) {
    // Esto es para actuar en grupo
    const [selChek, setSelChek] = useState('');

    const selChekChange = (option) => {
      setSelChek(option);
    };

    return (
      <>
    <div className='row m-0 mt-5 justify-content-center'>
        <div className='col-sm-12 col-md-11 col-lg-10 col-xl-9'>

            <div className='row planes__card__quote'>
              <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex justify-content-center'>
                  <Card style={{ width: '256px', height: '212px', borderRadius: 24 }}>
                  <Card.Body>
                    <Card.Title>
                      <div className='row'>
                        <div className='col-12 text-end'>
                          <FormControlLabel 
                            control = {
                                  <Checkbox 
                                  checked={selChek === 'option1'}
                                  onChange={() => selChekChange('option1')}
                                  sx={{ transform: 'scale(1.5)', color: green[800], '&.Mui-checked': { color: green[600]}, padding: 0 }}/>
                            }
                          />
                        </div>
                        <div className='col-12'>
                          <img src={ Protection } alt='' className='' />
                        </div>
                      </div>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 mt-3 text-muted planes__card">Para mí</Card.Subtitle>
                    <Card.Text className='planes__card__content'>
                        Cotiza tu seguro de salud y agrega familiares si así lo deseas.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex justify-content-center'>
                <Card style={{ width: '256px', height: '212px', borderRadius: 24 }}>
                  <Card.Body>
                    <Card.Title>
                      <div className='row'>
                        <div className='col-12 text-end'>
                            <FormControlLabel 
                            control = {
                            <Checkbox 
                                  checked={selChek === 'option2'}
                                  onChange={() => selChekChange('option2')}
                                 sx={{ transform: 'scale(1.5)', color: green[800], '&.Mui-checked': { color: green[600]}, padding: 0 }}/>
                            }
                            />
                        </div>
                        <div className='col-12'>
                          <img src={ AddUser } alt='' className='' />
                        </div>
                      </div>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 mt-3 text-muted planes__card">Para alguien más</Card.Subtitle>
                    <Card.Text className='planes__card__content'>
                        Realiza una cotización para uno de tus familiares o cualquier persona.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
        </div>
      </div>
        <GetListPlanes miValor={miValor} selChek={selChek} />
      </>
  );
}

function GetListPlanes({miValor, selChek}) {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Llamamos al servicio
    ListPlanes()
    .then(data => {
      setPlanes(data);
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    })
  }, []);

  if (loading) return <div className='row text-center'><div className='col-12'>Cargando ... </div></div>;
  if (error) return <div className='row text-center'><div className='col-12'> Erorr: {error} </div></div>;

  const añoActual = new Date().getFullYear();
  const age = añoActual - miValor.split('-')[2];
  console.log(age);
 
  return (
    <div className='row m-0 mt-5 justify-content-center'>
      <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>

        { selChek && (
        <div className='row'>
          {planes.list.map((data) => (

            age < data.age && (
              <div key={data.name} className='col-sm-12 col-md-6 col-lg-4 col-xl-4 listCard__top'>
              <Card style={{ borderRadius: 24, height: 687 }}>
                    <Card.Body>
                      <Card.Title>
                        <div className='row mt-5'>
                          <div className='col-12 listCard__title'>
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
                            {selChek === 'option2' ? (
                              <div>$ {data.price - (data.price * 0.05)} al mes</div>
                            ) : (
                               <div>$ {data.price} al mes</div>
                            )}
                          </div>
                        </div>
                      </Card.Subtitle>
                      <Card.Text className='listCard__row'>
                        <hr className='mt-4'/>
                            {data.description.map((desc, i) => (
                              <li className='mt-3' key={i}>{desc}</li>
                            ))}
                            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-3 text-center listCard_button'>
                              <Button variant="danger">Seleccionar Plan</Button>
                            </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              )
            
            ))}
          </div>
          )}

      </div>
    </div>
    );
}



export default Planes;