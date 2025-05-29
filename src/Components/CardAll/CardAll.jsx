/* Import styles and script */
import { FormControlLabel, Radio } from '@mui/material';
import Card from 'react-bootstrap/Card';
import { green } from '@mui/material/colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { HiUsers } from 'react-icons/hi2';

const CardAll = ({type='', title='', subtitle='', line=true, text='', button='', option={label:'', img:''}, checkedEvent, onChangeEvent, colorCheck}) => {
  return (
    type === 'radio' ? (
      <CardRadio title={title} subtitle={subtitle} text={text} option={option} checkedEvent={checkedEvent} onChangeEvent={onChangeEvent} colorCheck={colorCheck}/>
    ) : type === 'sumary' ? (
      <CardSumary title={title} subtitle={subtitle} line={line} text={text}/>
    ) : type === 'list' ? (
      <CardList title={title} subtitle={subtitle} line={line} text={text} button={button}/>
    ) : (
      ''
    )
  )
}

function CardRadio({title, subtitle, text, option, checkedEvent, onChangeEvent, colorCheck}) {
    // Esta variable es para el evento checked
    const checkOptionGroup = checkedEvent === option.label;

    return (
    <Card 
    style={{ width: '256px', minHeight: '212px', borderRadius: 24, boxShadow: 'rgba(174, 172, 243, 0.35) 0px 1px 32px', ...(checkOptionGroup ? colorCheck : {}) }}>
      <Card.Body>
        <Card.Title>
          {
          title === '*' ? (
          <div className='row'>
            <div className='col-12 text-end'>
              {/* Checkbox para la opción Card */}
              <FormControlLabel 
              control = {
              <Radio 
              checked={checkOptionGroup}
              onChange={() => onChangeEvent(option.label)}
              icon={<RadioButtonUncheckedIcon sx={{ fontSize: 30, color: green[800] }} />}
              checkedIcon={<CheckCircleIcon sx={{ fontSize: 30, color: green[600] }} />}
              sx={{ padding: 0 }}
              />
              }
              />
              {/* Checkbox para la opción Card */}
            </div>
            <div className='col-12'>{option.img}</div>
          </div>
          ) : (
            {title}
          )
          }
        </Card.Title>
        <Card.Subtitle className="mb-2 mt-3 text-muted plans__card">{subtitle}</Card.Subtitle>
        <Card.Text className='plans__card__content'>{text}</Card.Text>
      </Card.Body>
    </Card>
    );
}

function CardSumary({title, subtitle, line, text}) {
    return (
      <Card style={{ borderRadius: 24, boxShadow: 'rgba(174, 172, 243, 0.35) 0px 1px 32px' }}>
          <Card.Body>
            <Card.Title>
              <div className='row mt-2'>
                <div className='col-12 detalle__title'>{title}</div>
              </div>
            </Card.Title>
            <Card.Subtitle>
              {/* Nombre de la persona */}
              <div className='row mt-3'>
                <div className='col-12 detalle--name'>
                  <HiUsers className='me-2'/><label>{subtitle}</label>
                </div>
              </div>
              {/* Nombre de la persona */}
            </Card.Subtitle>
            {
              line === true && <div className='row mt-2'><div className='col-12'><hr className='line d-block'/></div></div>
            }
            {/* Contenido para la data del resumen */}
            <div className='row'>
              <div className='col-12'>
                <Card.Text>{text}</Card.Text>
              </div>
            </div>
            {/* Contenido para la data del resumen */}
          </Card.Body>
        </Card>
    );
}

function CardList({title, subtitle, line, text, button}) {
  return (
  <Card style={{ borderRadius: 24, minHeight: 687, boxShadow: 'rgba(174, 172, 243, 0.35) 0px 1px 32px' }}>
    <Card.Body className='d-flex flex-column' >
      <Card.Title>{title}</Card.Title>
      <Card.Subtitle className="mb-2 mt-3 text-muted">{subtitle}</Card.Subtitle>
      {
      line === true && <div className='row'><div className='col-12'><hr className='mt-4'/></div></div>
      }
      {/* Contenido por cada plan despues de dar click a cada opción */}
      <div className='row listCard__row'>
        <div className='col-12'>
          <Card.Text>{text}</Card.Text>
        </div>
      </div>
      {/* Contenido por cada plan despues de dar click a cada opción */}
      {
      button !== '' && <>{button}</>
      }
    </Card.Body>
  </Card>
  );
}

export default CardAll;
