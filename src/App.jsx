import React, { useEffect, useState } from 'react'
import clearSkyDay from './assets/01d.png'
import clearSkyNight from './assets/01n.png'
import fewCloudsDay from './assets/02d.png'
import fewCloudsNight from './assets/02n.png'
import scatteredCloudsDay from './assets/03d.png'
import scatteredCloudsNight from './assets/03n.png'
import brokenCloudsDay from './assets/04d.png'
import brokenCloudsNight from './assets/04n.png'
import showerRainDay from './assets/09d.png'
import showerRainNight from './assets/09n.png'
import rainDay from './assets/10d.png'
import rainNight from './assets/10n.png'
import thunderstormDay from './assets/11d.png'
import thunderstormNight from './assets/11n.png'
import snowDay from './assets/13d.png'
import snowNight from './assets/13n.png'
import mistDay from './assets/50d.png'
import mistNight from './assets/50n.png'

import SnowIcon from './assets/snow.png'
import { ImSearch } from 'react-icons/im'
import WeatherDetails from './components/WeatherDetails'

const App = () => {
  const api_key = '9622de3b82b01ead57aae40c425f47ee'

  const [text, setText] = useState('Kilinochchi')
  const [icon, setIcon] = useState(SnowIcon)
  const [temp, setTemp] = useState(0)
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [pressure, setPressure] = useState(0)
  const [wind, setWind] = useState(0)
  const [cityNotFound, setCityNotFound] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const weatherIcon = {
    '01d': clearSkyDay,
    '01n': clearSkyNight,
    '02d': fewCloudsDay,
    '02n': fewCloudsNight,
    '03d': scatteredCloudsDay,
    '03n': scatteredCloudsNight,
    '04d': brokenCloudsDay,
    '04n': brokenCloudsNight,
    '09d': showerRainDay,
    '09n': showerRainNight,
    '10d': rainDay,
    '10n': rainNight,
    '11d': thunderstormDay,
    '11n': thunderstormNight,
    '13d': snowDay,
    '13n': snowNight,
    '50d': mistDay,
    '50n': mistNight,
  }

  const search = async () => {
    setLoading(true)
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&unit=Metric`
    try {
      let result = await fetch(url)
      let data = await result.json()
      console.log(data)
      if (data.cod === '404') {
        console.log('city not found')
        setCityNotFound(true)
        setLoading(false)
        return
      }

      setTemp(Math.floor(data.main.temp - 273.15))
      setCity(data.name)
      setCountry(data.sys.country)
      setLat(data.coord.lat)
      setLon(data.coord.lon)
      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setPressure(data.main.pressure)
      const weatherIconCode = data.weather[0].icon
      setIcon(weatherIcon[weatherIconCode])
      setCityNotFound(false)
      setText('')
    } catch (error) {
      console.log('an error occurred: ', error.message)
      setError('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleCity = (e) => {
    setText(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search()
    }
  }

  useEffect(() => {
    search()
  }, [])

  return (
    <>
      <div className='w-full h-screen flex justify-center items-center font-poppins bg-gray-600'>
        <div className='flex flex-col w-[350px] p-5 bg-white rounded-md shadow-md'>
          <h1 className='text-center text-xl text-gray-500 py-3 font-bold'>
            <span className=' text-sky-600'>Weather</span> App
          </h1>
          <div className='flex w-full items-center overflow-hidden border border-sky-300 rounded-md px-3 py-1'>
            <input
              type='text'
              value={text}
              placeholder='Search City'
              className='flex-1 border-none outline-none'
              onChange={handleCity}
              onKeyDown={handleKeyDown}
            />
            <div onClick={() => search()}>
              <ImSearch className=' cursor-pointer text-gray-600' />
            </div>
          </div>

          {loading && (
            <div className='text-xl py-1 text-center text-gray-500'>
              Loading.....
            </div>
          )}
          {error && (
            <div className='text-xl py-1 text-center text-gray-500'>
              {error}
            </div>
          )}
          {cityNotFound && (
            <div className='text-xl py-1 text-center text-gray-500'>
              City not found
            </div>
          )}
          {!loading && !cityNotFound && (
            <WeatherDetails
              icon={icon}
              temp={temp}
              city={city}
              country={country}
              lat={lat}
              lon={lon}
              humidity={humidity}
              wind={wind}
              pressure={pressure}
            />
          )}
          <p className='text-center py-4 italic text-gray-400'>
            Designed by <span>Parmilan</span>
          </p>
        </div>
      </div>
    </>
  )
}

export default App
