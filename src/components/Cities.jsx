import { useState, useEffect } from 'react';
import { WEATHER_API_URL } from '../api';
import CurrentWeather from './CurrentWeather';
// const API_KEY = process.env.REACT_APP_SEECRET_KEY;
const API_KEY = 'f6316096de3f346b8dbc2cf5db80a94d'


// interface WeatherData {
//   location: string;
//   temperature: number;
//   description: string;
// }

const cities = ['Kyiv', 'Calgary', 'Tofino'];
// const position: { [key: string]: { latitude: number, longitude: number } } = {
const position = {
  Kyiv: {
    latitude: 50.4501,
    longitude: 30.5234
  },
  Calgary: {
    latitude: 51.0447,
    longitude: 114.071
  },
  Tofino: {
    latitude: 49.1530,
    longitude: 125.9066
  }
}

const Cities = () => {

  const [activeCity, setActiveCity] = useState(cities[0]);
  // const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);


  const handleCityClick = (city) => {
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

        console.log(weatherResponse);
        console.log(forecastResponse);

        setCurrentWeather(weatherResponse);
        setForecast(forecastResponse);

      }).catch((err) => {
        console.log(err);
      });

    };
    fetchWeatherData();
  }, [activeCity]);


  return (
    <>
      <div className='flex flex-row justify-center'>
        {cities.map((city) => (
          <button className={`px-4 py-2 rounded-lg ${activeCity === city
            ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            key={city} onClick={() => handleCityClick(city)}>
            {city}
          </button>
        ))}
      </div>
      {currentWeather && (
        <CurrentWeather
          currentWeather={currentWeather}
          
        />
      )}
    </>
  );
};


export default Cities;
