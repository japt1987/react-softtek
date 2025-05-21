import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const HorizontalLinearStepper = ({steps = ['Prueba 1', 'Prueba 2', 'Prueba 3'], active = 0, text = true, back = true, next = true, end = true, click=true}) => {
  const [activeStep, setActiveStep] = React.useState(active);
  const [completed, setCompleted] = React.useState({});

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
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
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

  return (
    <Box sx={{ width: '100%', height: '56px', 
    '& .MuiStepConnector-line': { borderStyle: 'dashed', borderWidth: '2px', borderColor: '#4F4FFF'}, 
    '& .MuiStepLabel-iconContainer.Mui-active .MuiSvgIcon-root.Mui-active ' : { fill: '#4F4FFF', '& .MuiStepIcon-text': { fill: '#fff' }},
    '& .MuiStepLabel-iconContainer .MuiSvgIcon-root' : { color: 'transparent', borderStyle: 'solid', borderWidth: '1px', borderColor: '#7981B2', borderRadius: '20px', '& .MuiStepIcon-text': { fill: '#4F4FFF' }},
    '& .MuiStepLabel-labelContainer .MuiStepLabel-label.Mui-active': { color: '#141938'},
    '& .MuiStepLabel-labelContainer .MuiStepLabel-label': { color: '#7981B2'}
     }}>
      <Stepper nonLinear activeStep={activeStep} className='pt-3'>
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
              <Button onClick={handleReset}>Resetear</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              { text === true ? (
                <label> Step {activeStep + 1} de {steps.length} </label>
              ) : ( 
                ''
              )}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              { back === true ? (
                <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                > Atras
                </Button>
              ) : ( 
                ''
              )}
              <Box sx={{ flex: '1 1 auto' }} />
              { next === true ? (
                <Button onClick={handleNext} sx={{ mr: 1 }}>
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
                  <Button onClick={handleComplete}>
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
  );
}

export default HorizontalLinearStepper;