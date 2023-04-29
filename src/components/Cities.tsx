import { useState, useEffect } from 'react';
import { WEATHER_API_URL } from '../api';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';

const API_KEY = process.env.REACT_APP_SECRET_KEY;

interface WeatherData {
  weather: {
    icon: string;
    main: string;
  }[];
  main: {
    temp: number;
  };
}

interface CityPosition {
  name: string;
  latitude: number;
  longitude: number;
}

const cities: CityPosition[] = [
  { name: 'Kyiv', latitude: 50.4501, longitude: 30.5234 },
  { name: 'Tofino', latitude: 49.1530, longitude: 125.9066 },
  { name: 'Yuma', latitude: 32.6927, longitude: 114.6277 },
];

const Cities = () => {

  const [selectedCity, setSelectedCity] = useState<string>(cities[0].name);
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState<string | null>(null);


  const handleCityClick = (city: string) => {
    setSelectedCity(city);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      const { latitude, longitude } = cities.find(city => city.name === selectedCity)!;

      try {
        const [currentWeatherRes, forecastRes] = await Promise.all([
          fetch(`${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`),
          fetch(`${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`),
        ]);

        if (!currentWeatherRes.ok || !forecastRes.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const [currentWeatherData, forecastData] = await Promise.all([
          currentWeatherRes.json(),
          forecastRes.json(),
        ]);

        setCurrentWeather(currentWeatherData);
        setForecast(forecastData);
        setError(null);
      } catch (error) {
        console.error(error);
        setCurrentWeather(null);
        setError('Oops! Something went wrong. Please try again later.');
        setForecast(null);
      }
    };

    fetchWeatherData();
  }, [selectedCity]);

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
      <div className='flex flex-row justify-center my-5'>
        {cities.map((city) => (
          <button
            className={`px-5 py-1 mx-3 rounded-lg text-xl ${selectedCity === city.name
              ? 'bg-blue-400 text-bold'
              : 'bg-gray-200'}`}
            key={city.name}
            onClick={() => handleCityClick(city.name)}
          >
            {city.name}
          </button>
        ))}
      </div>
      <div className='flex items-center justify-center'>
        <div className="justify-center items-center w-2/3 h-1/2 border-2 border-white shadow-lg rounded-lg">
          {currentWeather && (<CurrentWeather currentWeather={currentWeather} />)}
          {forecast && <Forecast forecast={forecast} />}
        </div>
      </div>
    </div>
  );
};


export default Cities;
