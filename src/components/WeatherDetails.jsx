import React from 'react'
import PropTypes from 'prop-types'
import HumidityIcon from '../assets/humidity.png'
import WindIcon from '../assets/wind.png'
import PressureIcon from '../assets/pressure.png'

const WeatherDetails = ({
  icon,
  temp,
  city,
  country,
  lat,
  lon,
  humidity,
  pressure,
  wind,
}) => {
  return (
    <div className=' font-poppins'>
      <div className='flex justify-center mb-1'>
        <img src={icon} alt='Image' className=' w-32' />
      </div>
      <div className='text-center uppercase font-semibold text-xl text-gray-500'>
        {temp}°C
      </div>
      <div className='text-center uppercase font-normal text-2xl text-orange-400'>
        {city}
      </div>
      <div className='text-center uppercase font-medium text-lg'>{country}</div>
      <div className='flex justify-center items-center gap-3 mt-2'>
        <div className='flex flex-col justify-center items-center p-3'>
          <span className=' text-md font-marker'>Latitude</span>
          <span className='font-bold '>{lat}</span>
        </div>
        <div className='flex flex-col justify-center items-center p-3'>
          <span className=' text-md font-marker'>longitude</span>
          <span className='font-bold '>{lon}</span>
        </div>
      </div>
      <div className='flex justify-between py-3'>
        <div className='flex flex-col justify-center items-center text-center'>
          <img src={HumidityIcon} alt='HumidityIcon' className='w-8 h-8 text-sky-500' />
          <div>
            <div className=' font-inter font-bold text-sky-500'>{humidity}%</div>
            <div className='text-gray-500 font-marker '>Humidity</div>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center text-center'>
          <img src={PressureIcon} alt='HumidityIcon' className='w-8 h-8 text-sky-500' />
          <div>
            <div className=' font-inter font-bold text-sky-500'>{pressure}</div>
            <div className='text-gray-500 font-marker '>Pressure</div>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center text-center'>
          <img src={WindIcon} alt='WindIcon' className='w-8 h-8' />
          <div>
            <div className=' font-inter font-bold text-sky-500'>{wind} km/h</div>
            <div className='text-gray-500 font-marker'>Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

WeatherDetails.propTypes = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  pressure: PropTypes.number.isRequired,
}

export default WeatherDetails
