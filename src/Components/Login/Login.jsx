import React, { useState } from 'react';

import { TextField, MenuItem, FormControl, Box, Select, Checkbox, Button  } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import './Login.css';

export const Login = () => { 

  const selDocument = { inputProps: { 'aria-label': 'Without label' }};
  /* Modal */
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <hr className='line mt-4'/>
      <div className='login'>
        <div className='row m-0'>
          <div className='col-12 p-0'>
            <label className='login__description mt-3'>Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.</label>
          </div>
        </div>
        <FormLogin selDocument={selDocument} modalShow={modalShow} setModalShow={setModalShow}/>
      </div>
    </>
  );
}

function FormLogin({selDocument, modalShow, setModalShow}) {
  /* For Valition */
  // Campos
  const [selDoc, setSelDoc] = useState(1);
  const [numDoc, setNumDoc] = useState('');
  const [cel, setCel] = useState('');
  const [ckbPol1, setCkbPol1] = useState(false);
  const [ckbPol2, setCkbPol2] = useState(false);
  const [ckbPol1Error, setCkbPol1Error] = useState(false);
  const [ckbPol2Error, setCkbPol2Error] = useState(false);

  // Para ir a la otra página
  const navigate = useNavigate();

  // Estado de errors
  const [errors, setErrors] = useState({
    numDoc: false,
    cel: false
  });

  const documentChange = (e) => {
    setSelDoc(e.target.value);
  };

  const validationSubmit = (e) => {
    e.preventDefault();
    // Validar
    const newErrors = {
      numDoc: numDoc.trim() === '',
      cel: cel.trim() === '',
      ckbPol1: !ckbPol1,
      ckbPol2: !ckbPol2
    };
    setErrors(newErrors);
    setCkbPol1Error(newErrors.ckbPol1);
    setCkbPol2Error(newErrors.ckbPol2);

    // Revisand si hay errores
    const isValid = !Object.values(newErrors).includes(true);
    if (isValid) {
      // Aquí envías los datos
      Cookies.set('admin', 'admin', { expires: 7 }); // Crear Cookies y expira en 7 días
      navigate('/planes'); // Cambia de ruta
    }
  }

  return (   
    <>
    <form onSubmit={validationSubmit}>
          <div className='row m-0 mt-3'>
            <div className='col-4 p-0'>
              <FormControl sx={{width: '100%', '& .MuiOutlinedInput-root': { '& fieldset': { borderEndEndRadius: '0px', borderStartEndRadius: '0px' } } }}>
                <Select 
                  value={selDoc}
                  onChange={documentChange}
                  displayEmpty {...selDocument} >
                  <MenuItem value={1}>DNI</MenuItem>
                  <MenuItem value={2}>RUC</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className='col-8 p-0'>
              <Box className='d-inline' sx = {{width: '100%', '& .MuiTextField-root': { '& fieldset': { borderLeft: '0px', borderStartStartRadius: '0px', borderBottomLeftRadius: '0px' } } }}>
                <TextField 
                id='numberDocument' 
                label='Nor. de documento' 
                value={numDoc} 
                error={errors.numDoc} 
                helperText={errors.numDoc ? '*El documento ingresado no es válido' : ''} 
                onChange={(e) => setNumDoc(e.target.value)} 
                variant='outlined' 
                sx = {{width: '100%', '& .MuiFormHelperText-root': { margin: 0 } }}/>
              </Box>
            </div>
          </div>
          <div className='row m-0 mt-3'>
            <div className='col-12 p-0'>
              <Box sx = {{width: '100%' }}>
                <TextField 
                id='numberCelphone' 
                label='Celular' 
                value={cel} 
                error={errors.cel} 
                helperText={errors.cel ? '*El celular ingresado no es válido' : ''} 
                onChange={(e) => setCel(e.target.value)} 
                variant='outlined' 
                sx={{ width: '100%', '& .MuiFormHelperText-root': { margin: 0 } }}/>
              </Box>
            </div>
          </div>

        <div className='row m-0 mt-3'>
              {/* Texto que abre el modal */}
              <div className='col-12 p-0'>
                <label className='login__condition--modal' onClick={() => setModalShow(true)}>Aplican Términos y Condiciones.</label>
              </div>
              {/* Moodal of condition */}
              <FormConditionModal show={modalShow} onHide={() => setModalShow(false)} />
              {/* Moodal of condition */}
        </div>

        <div className='row m-0 mt-3 login__condition'>
          <div className='col-12 p-0'>
            <Checkbox 
            checked={ckbPol1}
            onChange={(e) => {
              setCkbPol1(e.target.checked);
              if (e.target.checked) { setCkbPol1Error(false); /* Vuevel a su estado normal */
              } else { setCkbPol1Error(true); /* Regresa con el error */ }
            }}
            sx={{ color: ckbPol1Error ? 'red' : grey[800], '&.Mui-checked': { color: ckbPol1Error ? 'red' : grey[600]}, padding: 0 }}/>
            <label style={{ color: ckbPol1Error ? 'red' : '#0A051E' }}>Acepto la Política de Privacidad</label><br/>
            <Checkbox 
            checked={ckbPol2}
            onChange={(e) => {
              setCkbPol2(e.target.checked);
              if (e.target.checked) { setCkbPol2Error(false); /* Vuevel a su estado normal */
              } else { setCkbPol2Error(true); /* Regresa con el error */ }
            }}
            sx={{ color: ckbPol2Error ? 'red' : grey[800], '&.Mui-checked': { color: ckbPol2Error ? 'red' : grey[600]}, padding: 0 }}/>
            <label style={{ color: ckbPol2Error ? 'red' : '#0A051E' }}>Acepto la Política Comunicaciones Comerciales</label>
          </div>
        </div>

        <div className='row m-0 mt-3'>
          <div className='col-12 p-0'>
            <Box sx={{ '& button': { m: 1, backgroundColor: '#000', color: '#fff', borderRadius: 10, margin: 0 } }}>
              <Button className='login__condition--button' variant='outlined' size='large' type='submit'>
                Cotiza aqui
              </Button>
            </Box>
          </div>
        </div>

    </form>
    </>
    );
}

function FormConditionModal(showModal) {
  return (
    <>
      <Modal
        {...showModal}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter' 
        style={{ backdropFilter: 'blur(5px)' }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Aplican Términos y Condiciones</h4>
          <p>
            Encontrarás información importante sobre tus derechos y obligaciones al utilizar nuestros servicios. Cubren aspectos clave como la privacidad, 
            la seguridad y la conducta esperada. Te recomendamos encarecidamente familiarizarte con estos términos para estar bien informado.
            Si tienes preguntas o inquietudes sobre los 'Términos y Condiciones', no dudes en ponerte en contacto con nuestro equipo de soporte. 
            Estamos aquí para ayudarte y garantizar que tu experiencia sea transparente y segura.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={showModal.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;