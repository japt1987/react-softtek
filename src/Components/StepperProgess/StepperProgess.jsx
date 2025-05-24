/* Import styles and script */
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

/* Style important */
import './StepperProgess.css';

export const StepperProgess = ({steps = ['Prueba 1', 'Prueba 2', 'Prueba 3'], responsive = { active: 0, router: '', text: true, icons: true, click: true, center: true}}) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        if (responsive.click === true) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        if (responsive.click === true) {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };

    return (
        <MobileStepper
        variant="progress"
        /*steps={2}*/
        steps={steps.length + 1}
        position="static"
        /*activeStep={activeStep}*/
        activeStep={responsive.click === true ? activeStep : responsive.active}
        sx={{ maxWidth: 400, flexGrow: 1, display: responsive.center === true ? 'ruby' : ''}}
        nextButton={
            responsive.icons &&
            /* <Button size="small" onClick={handleNext} disabled={activeStep = 2}> */
            <Button size="small" onClick={handleNext} disabled={responsive.click === true ? activeStep : responsive.active === steps.length}>
            {responsive.text && <>Next</>}
            {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
            ) : (
                <KeyboardArrowRight />
            )}
            </Button>
        }
        backButton={
            responsive.icons &&
            /* <Button size="small" onClick={handleBack} disabled={activeStep  === 1}> */
            <Button size="small" onClick={handleBack} disabled={responsive.click === true ? activeStep : responsive.active === 1}>
            {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
            ) : (
                <KeyboardArrowLeft />
            )}
            {responsive.text && <>Back</>}
            </Button>
        }
        />
    );
}

export default StepperProgess;