/* Import styles and script */
import { FaPhoneAlt } from "react-icons/fa";

/* Img */
import Rimac from '../../Assets/img/png/Rimac.png';

/* Style important */
import './Header.css';

export const Header = () => {
  return (
  <header className='header'>
    <div className='row m-0 justify-content-center'>
      <div className='col-sm-12 col-md-10 col-lg-9 col-xl-8 header_content'>

        {/* Content for modif and changes */}
        <div className='row'>
          <div className='col-6 col-sm-4 col-md-4 col-lg-6 col-xl-6 text-start'>
            <img src={ Rimac } alt='Rimac' loading="lazy"/>
          </div>
          <div className='col-6 col-sm-8 col-md-8 col-lg-6 col-xl-6 text-end'>
            <label className='me-3 header__message'>¡Compra por este medio!</label>
            <FaPhoneAlt className='me-3'/>
            <label className='me-3 header__number'><b>(01) 411 6001</b></label>
          </div>
        </div>
        {/* Content for modif and changes */}

      </div>
    </div>
  </header>
  );
}

export default Header;