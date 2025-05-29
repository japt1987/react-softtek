/* Import styles and script */
import { useState } from 'react';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

/* Style important */
import './CardCarousel.css';

const dataExample = ['-','-','-'];

const CardCarousel = ({data=dataExample, content=''}) => {
    // Variable para el conteo y funcionalidad de atras y adelante
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const prevSlide = () => {
    const newIndex = (currentIndex - 1 + data.length) % data.length;
    setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const newIndex = (currentIndex + 1) % data.length;
        setCurrentIndex(newIndex);
    };

    // Variables inicio y fin
    const cantStart = currentIndex + 1;
    const cantEnd = data.length;

    return (
        <div className="carousel-container">
            <div className="carousel-slide" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {content}
            </div>
            <div className="carousel-controls">
                <Button size="small" onClick={prevSlide} className={cantStart > 1 ? 'carousel--check' : 'carousel--not-check'}>
                <KeyboardArrowLeft />
                </Button>
                <label className='carousel--label'>{cantStart}/{data.length}</label>
                <Button size="small" onClick={nextSlide} className={cantStart < cantEnd ? 'carousel--check' : 'carousel--not-check'}>
                <KeyboardArrowRight />
                </Button>
            </div>
        </div>
    );
};

export default CardCarousel;
