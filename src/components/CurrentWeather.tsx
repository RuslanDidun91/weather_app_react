
interface Weather {
  main: string;
  icon: string;
}

interface Main {
  temp: number;  
}

interface WeatherData {
  weather: Weather[];
  main: Main;
}

interface CurrentWeatherProps {
  currentWeather: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ currentWeather }) => {

  if (!currentWeather) {
    return null;
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-5 gap-4 border-2 border-white'>
      <div className="col-span-1 lg:col-span-4 p-6">
        <div className='text-center text-lg'>Today</div>
        <div className='flex flex-row justify-center'>
          <img className='w-1/4'
            src={`icons/${currentWeather.weather[0].icon}.png`}
            alt="weather-icon" />
          <div className='pt-4'>
            <p className="text-5xl font-bold p-2">
              {Math.round(currentWeather.main.temp)}°
            </p>
            <div className='text-lg'>{currentWeather.weather[0].main}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;