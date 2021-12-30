import React,{useState} from 'react';

const api = {
  key:"02daf530d84aadebc85d644f1fa6b325",
  base:"https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then((result) => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month}, ${year}`;
  }

  return (
    <div className={(typeof weather.dt != "undefined") ? 
      ((weather.dt>=weather.sys.sunrise && weather.dt<weather.sys.sunset) ? "app":"app night"):"app"}>
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search..."
            onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} />
        </div>

        {(typeof weather.main != "undefined") ? (
          <div>
            <div className='location-box'>
              <h1 className='location'>{weather.name}, {weather.sys.country}</h1>
              <br />
              <h2 className="date">{dateBuilder(new Date())}</h2>
            </div>

            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">{weather.weather[0].main}</div><br />
              <div className="weather">Wind : {Math.round(weather.wind.speed*180/5)/10}km/h</div><br />
              <div className="weather">Humidity : {weather.main.humidity}%</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
