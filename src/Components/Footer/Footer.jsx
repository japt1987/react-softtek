/* Img */
import RimacWhite from '../../Assets/img/png/Vector.png';

export const Footer = () => {
  return (
  <footer className='footer'>
    <div className='row m-0 justify-content-center'>
      <div className='col-sm-12 col-md-10 col-lg-9 col-xl-8'>

        {/* Content for modif and changes */}
        <div className='row pt-3 pb-3'>
          <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6 align-content-center text-start'>
            <img src={ RimacWhite } alt='Rimac' loading="lazy"/>
          </div>
          <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6 text-end'>
            <label className='align-content-center footer__message'>© 2023 RIMAC Seguros y Reaseguros.</label>
          </div>
        </div>
        {/* Content for modif and changes */}

      </div>
    </div>
  </footer>
  );
}

export default Footer;