type Weather = {
  icon: string;
};

type Temperature = {
  temp: number;
};

type ForecastItem = {
  weather: Weather[];
  main: Temperature;
};

type ForecastData = {
  list: ForecastItem[];
};

type ForecastProps = {
  forecast: ForecastData;
};

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Forecast: React.FC<ForecastProps> = ({ forecast }) => {

  if (!forecast) {
    return null;
  }

  const dayInAWeek = new Date().getDay();
  const forecastDays = DAYS.slice(dayInAWeek, DAYS.length).concat(DAYS.slice(0, dayInAWeek));

  return (
    <div className="col-span-1 lg:col-span-1 grid grid-cols-4">
      {forecast?.list?.splice(0, 4).map((item, idx) => (
        <div key={idx} className="border-2 border-white flex flex-col items-center py-5">
          <div>{forecastDays[idx]}</div>
          <img src={`icons/${item.weather[0].icon}.png`}
            className='w-1/3' alt="weather-icon" />
          <div className="text-2xl font-bold pt-2">
            {Math.round(item.main.temp)}°
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;