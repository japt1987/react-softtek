/* Import styles and script */
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate } from 'react-router-dom';

/* Components */
import StepperProgess from '../StepperProgess/StepperProgess';

/* Utils */
import { UtilResponsive } from '../../Utils/UtilResponsive';
import { DeleteAllCookies } from '../../Utils/UtilCookie ';

/* Style important */
import './Stepper.css';

const HorizontalLinearStepper = ({steps = ['Prueba 1', 'Prueba 2', 'Prueba 3'], active = 0, router= '',  text = true, back = true, next = true, end = true, click=true, responsive={ active: 0, router: '', text: true, icons: true, click: true, center: true}}) => {
  /*const [activeStep, setActiveStep] = React.useState(0);*/
  const [activeStep, setActiveStep] = React.useState(active-1);
  const [completed, setCompleted] = React.useState({});
  const navigateUrl = useNavigate();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // Es el último paso, pero no se han completado todos los pasos.
          // Encuentra el primer paso que se ha completado
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    if (click === true) {
      setActiveStep(step)
    }
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  
  // Ir atras y remover Cookies
  const ckicAfter = () => {
    if (router === '/') {
      DeleteAllCookies();
    }
    navigateUrl(router); // Evento para retroceder  
  }

  // Tamaño de la pantalla
  const width = UtilResponsive();

  return (
    <>
    {
      width < 576 ?
      (
      <div className={ responsive.center === true ? 'row justify-content-center d-flex stepper__color--responsive' : 'row stepper__color--responsive' }>
        <div className='col-12 text-center'>
            <Button size="small" onClick={ckicAfter} className='Stepper--Check'>
              <KeyboardArrowLeft />
            </Button>
            <React.Fragment>
              { responsive.text === true ? (
                <Typography className={ responsive.center === true ? 'd-inline' : ''} sx={{ mt: 2, mb: 1, py: 1 }}>
                  <label> Paso {activeStep + 1} de {steps.length} </label>
                </Typography>
                ) : ( 
                  ''
              )}
            </React.Fragment>
            <StepperProgess steps={steps} responsive={responsive}/>
          </div>
      </div>
      ) :
      (
     <Box sx={{ width: '100%', height: '56px'}}>
      <Stepper nonLinear activeStep={activeStep} className='pt-3' sx={{marginBottom: text === false && (back === false && next === false && end === false) ? '16px' : '0px'}}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Todos los pasos completados - terminados
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reiniciar</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            { text === true ? (
              <Typography sx={{ mt: 2, mb: 1, py: 1, marginBottom: back === true || next === true || end === true ? '0px' : '8px' }}>
                Paso {activeStep + 1} de {steps.length} 
              </Typography>
              ) : ( 
                ''
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              { back === true ? (
                <Button 
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1, marginTop: text === false ? '4px' : '' }}
                > Atras
                </Button>
              ) : ( 
                ''
              )}
              <Box sx={{ flex: '1 1 auto' }} />
              { next === true ? (
                <Button onClick={handleNext} sx={{ mr: 1, marginTop: text === false ? '4px' : '' }}>
                  Siguiente
                </Button>
              ) : (
                ''
              )}
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} ya completado
                  </Typography>
                ) : (
                  <>
                  { end === true ? (
                  <Button onClick={handleComplete} sx={{ marginTop: text === false ? '4px' : ''}}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Final'
                      : 'Completar todo'}
                  </Button>
                  ) : (
                    ''
                  )}
                  </>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
      )
    }
    </>
  );
}

export default HorizontalLinearStepper;