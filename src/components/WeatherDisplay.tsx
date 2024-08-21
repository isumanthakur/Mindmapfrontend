"use client";

import React from "react";

interface WeatherDisplayProps {
  locationDenied: boolean;
  weather: {
    location: string;
    temperature: string;
    condition: string;
  } | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ locationDenied, weather }) => {
  return (
    <div
      className="rounded-3xl p-6 h-48 md:h-60"
      style={{
        backdropFilter: 'blur(10px)',
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 20,
      }}
    >
      <h2 className="text-lg font-semibold">Weather Information</h2>
      {locationDenied && (
        <p className="text-purple-500 mb-2">Permission denied. Showing default location.</p>
      )}
      {weather ? (
        <div>
          <p>Location: {weather.location}</p>
          <p>Temperature: {weather.temperature} °C</p>
          <p>Condition: {weather.condition}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherDisplay;
