import '../styles.css';

// interface CurrentWeatherProps {

// }

const CurrentWeather = ({ currentWeather }) => {

  if (!currentWeather) {
    return null;
  }

  return (
    <div>
      <div className="w-1/3 h-[50vh]">
        <div className='text-center'>Today</div>
        <div className='flex flex-row'>
          <img className='w-1/3'
            src={`icons/${currentWeather.weather[0].icon}.png`}
            alt="weather" />
          <div>
            <p className="text-4xl font-bold pt-2">
              {Math.round(currentWeather.main.temp)}°
            </p>
            <div className='text-sm'>{currentWeather.weather[0].main}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;