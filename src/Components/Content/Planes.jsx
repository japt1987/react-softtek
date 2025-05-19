import React, { useEffect, useState } from 'react'

import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import { Stack, ThemeProvider } from 'react-bootstrap';
import { Chip, createTheme } from '@mui/material';
import { IoArrowBackCircleOutline } from "react-icons/io5";

import { Header, Footer } from '../../App';

import { ListUser } from '../../Services/Api';

import './Planes.css';

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
        <div className='col-sm-12 col-md-10 col-lg-9 col-xl-8'>
          
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

  useEffect(() => {
    // Llamamos al servicio
    ListUser()
    .then(data => {
      setUsers(data);
      console.log(data);    
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    })
  }, []);

  if (loading) return <p> Cargando ... </p>;
  if (error) return <p> Erorr: {error} </p>;

  return (
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
  );
}

export default Planes;