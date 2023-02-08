import React from "react";
import { TbTemperatureCelsius } from "react-icons/tb";
import { FaMale } from "react-icons/fa";
import { WiHumidity, WiWindDeg } from "react-icons/wi";
import { CiTempHigh, CiLocationOn } from "react-icons/ci";
import { FiWind } from "react-icons/fi";
import clear from "../images/clear.jpg";
const CurrentWeather = ({ data }) => {
  const {
    location: { name, lat, lon, localtime },
    current: {
      condition: { text, icon },
      temp_c,
      feelslike_c,
      humidity,
      wind_kph,
      wind_dir,
    },
  } = data;

  const backgroundImage = () => {
    switch (text) {
      case "Clear":
        return clear;
      default:
        return;
    }
  };
  const bg = backgroundImage();
  console.log(bg);
  return (
    <div className="weather" style={{ background: bg }}>
      <div className="weather--location">
        <span className="weather--location__name">
          <span className="icon">
            <CiLocationOn size={20} />
          </span>
          <span className="text">{name}</span>
        </span>
        <span className="weather--location__coords">
          <span className="text">{`Lattitude:${lat}`}</span>
          <span className="text">{`Longitude:${lon}`}</span>
        </span>
      </div>
      <div className="weather--details">
        <div className="weather--details__temp">
          <span className="weather--details__temp__curr">
            <span className="icon">
              <TbTemperatureCelsius size={30} />
            </span>
            <span className="text">{temp_c}</span>
          </span>
          <span className="weather--details__temp__feels">
            <span className="icon">
              <FaMale size={30} />
            </span>
            <span className="icon">
              <CiTempHigh size={30} />
            </span>
            <span className="text">{feelslike_c}</span>
          </span>
        </div>
        <div className="weather--condition">
          <img src={icon} alt={text} />
        </div>
        <div className="weather--wind">
          <span className="weather--wind__text">{text}</span>
          <span className="weather--wind__humidity">
            <span className="icon">
              <WiHumidity size={30} />
            </span>
            <span className="text">{humidity}</span>
          </span>
          <span className="weather--wind__speed">
            <span className="icon">
              <FiWind size={30} />
            </span>
            <span className="text">{wind_kph}</span>
          </span>
          <span className="weather--wind__dir">
            <span className="icon">
              <WiWindDeg size={30} />
            </span>
            <span className="text">{wind_dir}</span>
          </span>
        </div>
      </div>
      <p className="text">{localtime}</p>
    </div>
  );
};

export default CurrentWeather;
