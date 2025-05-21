/* Import styles and script */
import React, { useState } from 'react';
import { TextField, MenuItem, FormControl, Box, Select, Checkbox, Button  } from '@mui/material';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

/* Style important */
import './Login.css';

const Login = () => {
  /* Para el select */
  const selectDocumentProps = { inputProps: { 'aria-label': 'Without label' }};
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
        <FormLogin selectDocumentProps={selectDocumentProps} modalShow={modalShow} setModalShow={setModalShow}/>
      </div>
    </>
  );
}

function FormLogin({selectDocumentProps, modalShow, setModalShow}) {
  // Campos del select
  const elementSelectDocument = [
    {value:1, label: 'DNI'},
    {value:2, label: 'RUC'}
  ];

  // Campos
  const [selectDocument, setSelectDocument] = useState(1);
  const [selectDocumentText, setSelectDocumentText]  = useState('');
  const [numberDocument, setNumberDocument] = useState('');
  const [celphone, setCelphone] = useState('');
  const [checkPolicyOne, setCheckPolicyOne] = useState(false);
  const [checkPolicyTwo, setCheckPolicyTwo] = useState(false);
  const [checkPolicyOneError, setCheckPolicyOneError] = useState(false);
  const [checkPolicyTwoError, setCheckPolicyTwoError] = useState(false);

  // Para ir a la otra página
  const navigateUrl = useNavigate();

  // Estado de errors
  const [errors, setErrors] = useState({
    numberDocument: false,
    celphone: false
  });

  const selectDocumentChange = (e) => {
    const selectValue = e.target.value; // Obtenemos el value
    const selectText = elementSelectDocument.find((element) => element.value === selectValue);
    setSelectDocument(selectValue);
    setSelectDocumentText(selectText ? selectText.label : '');
  };

  const validationSubmit = (e) => {
    e.preventDefault();
    // Validar
    const newErrors = {
      numberDocument: numberDocument.trim() === '',
      celphone: celphone.trim() === '',
      checkPolicyOne: !checkPolicyOne,
      checkPolicyTwo: !checkPolicyTwo
    };
    setErrors(newErrors);
    setCheckPolicyOneError(newErrors.checkPolicyOne);
    setCheckPolicyTwoError(newErrors.checkPolicyTwo);

    // Revisand si hay errores
    const validation = !Object.values(newErrors).includes(true);
    if (validation) {
      // Aquí envías los datos
      const Data = {
        user: 'jesuspeña',
        detail: [
          {
            typDoc: selectDocumentText,
            dni: numberDocument, 
            cel: celphone
          }
        ]
      }
      Cookies.set('admin', JSON.stringify(Data), { expires: 7 }); // Crear Cookies y expira en 7 días
      navigateUrl('/plans'); // Cambia de ruta
    }
  }

  return (   
  <form onSubmit={validationSubmit}>
    <div className='row m-0 mt-3'>

      <div className='col-4 p-0'>
        {/* Campos select */}
        <FormControl 
        sx={{width: '100%', '& .MuiOutlinedInput-root': { '& fieldset': { borderEndEndRadius: '0px', borderStartEndRadius: '0px' } } }}>
          <Select 
          id='idSelectDocument'
          value={selectDocument} 
          onChange={selectDocumentChange} 
          displayEmpty {...selectDocumentProps} 
          >
            {
            elementSelectDocument.map((element) => (
              <MenuItem key={element.value} value={element.value}>{element.label}</MenuItem>
            ))
            }
          </Select>
        </FormControl>
        {/* Campos select */}
      </div>

      <div className='col-8 p-0'>
        {/* Campos text */}
        <Box 
        className='d-inline' 
        sx = {{width: '100%', '& .MuiTextField-root': { '& fieldset': { borderLeft: '0px', borderStartStartRadius: '0px', borderBottomLeftRadius: '0px' } } }}>
          <TextField 
          id='numberDocument' 
          label='Nor. de documento' 
          value={numberDocument} error={errors.numberDocument} helperText={errors.numberDocument ? '*El documento ingresado no es válido' : ''} 
          onChange={(e) => setNumberDocument(e.target.value)} 
          variant='outlined' 
          sx = {{width: '100%', '& .MuiFormHelperText-root': { margin: 0 } }}
          />
        </Box>
        {/* Campos text */}
      </div>

    </div>

    <div className='row m-0 mt-3'>

      <div className='col-12 p-0'>
        {/* Campos text */}
        <Box sx = {{width: '100%' }}>
          <TextField 
          id='numberCelphone' 
          label='Celular' 
          value={celphone} 
          error={errors.celphone} 
          helperText={errors.celphone ? '*El celular ingresado no es válido' : ''} 
          onChange={(e) => setCelphone(e.target.value)} 
          variant='outlined' 
          sx={{ width: '100%', '& .MuiFormHelperText-root': { margin: 0 } }}/>
        </Box>
        {/* Campos text */}
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

        {/* Campos Checkbox */}
        <Checkbox 
        id='checkboxPolitica1' 
        checked={checkPolicyOne}
        onChange={(e) => {
          setCheckPolicyOne(e.target.checked);
          if (e.target.checked) { 
            setCheckPolicyOneError(false); /* Vuevel a su estado normal */
          } else { 
            setCheckPolicyOneError(true); /* Regresa con el error */ }
          }}
        sx={{ color: checkPolicyOneError ? 'red' : 'black', '&.Mui-checked': { color: checkPolicyOneError ? 'red' : 'black'}, padding: 0 }}
        />
        <label style={{ color: checkPolicyOneError ? 'red' : '#0A051E' }}>Acepto la Política de Privacidad</label><br/>
        {/* Campos Checkbox */}

        {/* Campos Checkbox */}
        <Checkbox 
        id='checkboxPolitica2' 
        checked={checkPolicyTwo}
        onChange={(e) => {
          setCheckPolicyTwo(e.target.checked);
          if (e.target.checked) { 
            setCheckPolicyTwoError(false); /* Vuevel a su estado normal */
          } else { 
            setCheckPolicyTwoError(true); /* Regresa con el error */ }
          }}
        sx={{ color: checkPolicyTwoError ? 'red' : 'black', '&.Mui-checked': { color: checkPolicyTwoError ? 'red' : 'black'}, padding: 0 }}
        />
        <label style={{ color: checkPolicyTwoError ? 'red' : '#0A051E' }}>Acepto la Política Comunicaciones Comerciales</label>
        {/* Campos Checkbox */}

      </div>
    </div>

    <div className='row m-0 mt-3'>
      <div className='col-12 p-0'>
        {/* Campos Button */}
        <Box sx={{ '& button': { m: 1, backgroundColor: '#000', color: '#fff', borderRadius: 10, margin: 0 } }}>
          <Button className='login__condition--button' variant='outlined' size='large' type='submit'>
            Cotiza aqui
          </Button>
        </Box>
        {/* Campos Button */}
      </div>
    </div>

</form>
);
}

function FormConditionModal(modalShow) {
  return (
  <Modal 
  {...modalShow} 
  size='lg' 
  aria-labelledby='modal-condition' 
  style={{ backdropFilter: 'blur(5px)' }} 
  centered
  >
    <Modal.Header closeButton>
      <Modal.Title id='modal-condition'>
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
      <Button onClick={modalShow.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
  );
}

export default Login;
