import React, { useState } from "react";
import { FiSunrise, FiSunset, FiWind } from "react-icons/fi";
import avg_temp from "../images/icon/average.png";
import max_temp from "../images/icon/high-temperature.png";
import min_temp from "../images/icon/low-temperature.png";
import { WiHumidity, WiRain, WiWindDeg } from "react-icons/wi";

const Forecast = ({ data }) => {
  const [selected, setSelected] = useState(null);
  const {
    forecast: { forecastday },
  } = data;
  // console.log(forecastday);
  const handleClick = (i) => {
    console.log(i);
    if (i === selected) return setSelected(null);
    setSelected(i);
  };
  return (
    <div className="forecast--wrapper">
      {forecastday.map((day, i) => {
        const {
          date,
          astro: { sunrise, sunset },
          day: {
            avghumidity,
            avgtemp_c,
            maxtemp_c,
            maxwind_kph,
            mintemp_c,
            condition: { text, icon },
            daily_chance_of_rain,
          },
          hour,
        } = day;
        return (
          <React.Fragment>
            <div
              className="forecast--wrapper__day"
              key={i}
              onClick={() => handleClick(i)}>
              <div className="forecast--wrapper__day__info">
                <span className="icon">
                  <img src={icon} alt={text} />
                </span>
                <span className="text">{date}</span>
              </div>
              <div className="forecast--wrapper__day__sun">
                <span className="raise">
                  <span className="icon">
                    <FiSunrise size={30}/>
                  </span>
                  <span className="text">{sunrise}</span>
                </span>
                <span className="set">
                  <span className="icon">
                    <FiSunset size={30}/>
                  </span>
                  <span className="text">{sunset}</span>
                </span>
              </div>
              <div className="forecast--wrapper__day__temp">
                <span className="avg">
                  <span className="icon">
                    <img src={avg_temp} alt="avg" />
                  </span>
                  <span className="text">
                    {avgtemp_c}
                    <b>&deg;C</b>
                  </span>
                </span>
                <span className="max">
                  <span className="icon">
                    <img src={max_temp} alt="max" />
                  </span>
                  <span className="text">
                    {maxtemp_c}
                    <b>&deg;C</b>
                  </span>
                </span>
                <span className="min">
                  <span className="icon">
                    <img src={min_temp} alt="min" />
                  </span>
                  <span className="text">
                    {mintemp_c}
                    <b>&deg;C</b>
                  </span>
                </span>
              </div>
              <div className="forecast--wrapper__day__wind">
                <span className="humidity">
                  <span className="icon">
                    <WiHumidity size={30}/>
                  </span>
                  <span className="text">
                    {avghumidity}
                    <b>%</b>
                  </span>
                </span>
                <span className="wind">
                  <span className="icon">
                    <FiWind size={30}/>
                  </span>
                  <span className="text">
                    {maxwind_kph}
                    <b>kph</b>
                  </span>
                </span>
                <span className="rain">
                  <span className="icon">
                    <WiRain size={30}/>
                  </span>
                  <span className="text">
                    {daily_chance_of_rain}
                    <b>%</b>
                  </span>
                </span>
              </div>
            </div>
            {selected === i && (
              <div className="forecast--wrapper__hour">
                {hour.map((item, i) => {
                  const {
                    condition: { text, icon },
                    temp_c,
                    humidity,
                    wind_kph,
                    wind_dir,
                    chance_of_rain,
                    time,
                  } = item;
                  return (
                    <div className="forecast--wrapper__hour__single" key={i}>
                      <span className="time">
                        {new Date(time).toLocaleTimeString()}
                      </span>
                      <span className="climate">
                        <img src={icon} alt={text} />
                      </span>
                      <span className="temp">
                        <span className="icon">
                          <img src={max_temp} alt="max" />
                        </span>
                        <span className="text">
                          {temp_c} <b>&deg;C</b>
                        </span>
                      </span>
                      <span className="wind">
                        <span className="speed">
                          <span className="icon">
                            <FiWind size={30}/>
                          </span>
                          <span className="text">
                            {wind_kph}
                            <b>kph</b>
                          </span>
                        </span>
                        <span className="dir">
                          <span className="icon">
                            <WiWindDeg size={30}/>
                          </span>
                          <span className="text">{wind_dir}</span>
                        </span>
                        <span className="humidity">
                          <span className="icon">
                            <WiHumidity size={30}/>
                          </span>
                          <span className="text">
                            {humidity}
                            <b>%</b>
                          </span>
                        </span>
                        <span className="rain">
                          <span className="icon">
                            <WiRain size={30}/>
                          </span>
                          <span className="text">
                            {chance_of_rain}
                            <b>%</b>
                          </span>
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Forecast;
