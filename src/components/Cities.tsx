import { useState, useEffect } from 'react';
import { WEATHER_API_URL } from '../api';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';

const API_KEY = process.env.REACT_APP_SEECRET_KEY;

interface WeatherData {
  weather: {
    icon: string;
    main: string;
  }[];
  main: {
    temp: number;
  };
}

const cities: string[] = ['Kyiv', 'Tofino', 'Yuma'];
const position: { [key: string]: { latitude: number; longitude: number } } = {
  Kyiv: { latitude: 50.4501, longitude: 30.5234 },
  Tofino: { latitude: 49.1530, longitude: 125.9066 },
  Yuma: { latitude: 32.6927, longitude: 114.6277 }
}

const Cities = () => {

  const [activeCity, setActiveCity] = useState<string>(cities[0]);
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState(null);

  const handleCityClick = (city: string) => {
    setActiveCity(city);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {

      const currentWeather = fetch(
        `${WEATHER_API_URL}/weather?lat=${position[activeCity].latitude}&lon=${position[activeCity].longitude}&appid=${API_KEY}&units=metric`
      );

      const forecastWeather = fetch(
        `${WEATHER_API_URL}/forecast?lat=${position[activeCity].latitude}&lon=${position[activeCity].longitude}&appid=${API_KEY}&units=metric`
      )

      Promise.all([currentWeather, forecastWeather]).then(async (res) => {
        const weatherResponse = await res[0].json();
        const forecastResponse = await res[1].json();

        setCurrentWeather(weatherResponse);
        setForecast(forecastResponse);

      }).catch((err) => {
        console.log(err);
      });

    };
    fetchWeatherData();
  }, [activeCity]);

  return (
    <div>
      <div className='flex flex-row justify-center my-5'>
        {cities.map((city) => (
          <button className={`px-5 py-1 mx-3 rounded-lg text-xl ${activeCity === city
            ? 'bg-blue-400 text-bold' : 'bg-gray-200'}`}
            key={city} onClick={() => handleCityClick(city)}>
            {city}
          </button>
        ))}
      </div>
      <div className='flex items-center justify-center'>
        <div className="justify-center items-center w-2/3 h-1/2 border-2 border-white shadow-lg">
          {currentWeather && (<CurrentWeather currentWeather={currentWeather} />)}
          {forecast && <Forecast forecast={forecast} />}
        </div>
      </div>
    </div>
  );
};

export default Cities;
