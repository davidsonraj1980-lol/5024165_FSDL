import { useState } from 'react';
import './App.css';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

function App() {
  const [city, setCity] = useState('');
  const [weatherCards, setWeatherCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // 1. New state to hold our auto-complete suggestions
  const [suggestions, setSuggestions] = useState([]);

  // 2. Fetch suggestions as the user types
  const handleInputChange = async (event) => {
    const value = event.target.value;
    setCity(value);

    // Only start searching if they typed at least 3 letters
    if (value.length > 2) {
      try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=5&language=en&format=json`);
        const data = await response.json();
        
        if (data.results) {
          setSuggestions(data.results);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      // Clear suggestions if the box is empty or has < 3 letters
      setSuggestions([]); 
    }
  };

  // 3. What happens when they click a suggestion from the dropdown
  const handleSuggestionClick = (selectedCity) => {
    setCity(selectedCity.name); // Fill the search box with the clicked city
    setSuggestions([]); // Hide the dropdown
    performSearch(selectedCity.name); // Automatically run the search!
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setSuggestions([]); // Hide dropdown if they press Enter
      performSearch(city);
    }
  };

  // 4. We slightly tweaked this function to accept a specific city name
  const performSearch = async (searchQuery) => {
    if (!searchQuery) return;
    setIsLoading(true);

    try {
      const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=1&language=en&format=json`);
      const geoData = await geoResponse.json();

      if (!geoData.results) {
        alert("City not found! Please check your spelling.");
        setIsLoading(false);
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];

      const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`);
      const weatherData = await weatherResponse.json();

      const newCityWeather = {
        name: name,
        temp: `${Math.round(weatherData.current.temperature_2m)}°C`,
        condition: getWeatherEmoji(weatherData.current.weather_code)
      };

      setWeatherCards([newCityWeather, ...weatherCards]);
      setCity(''); 

    } catch (error) {
      console.error("Failed to fetch data:", error);
      alert("Something went wrong with the network.");
    } finally {
      setIsLoading(false);
    }
  };

  const getWeatherEmoji = (code) => {
    if (code === 0) return "Clear Sky ☀️";
    if (code > 0 && code < 4) return "Partly Cloudy ⛅";
    if (code >= 51 && code <= 67) return "Rain 🌧️";
    if (code >= 71 && code <= 77) return "Snow ❄️";
    if (code >= 95) return "Thunderstorm ⛈️";
    return "Cloudy ☁️";
  };

  return (
    <div className="app-container">
      <h1 className="title">🌤️ Weather App</h1>
      
      <div className="search-container">
        <input 
          type="text" 
          className="search-input"
          placeholder="Enter city name..." 
          value={city}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button 
          className="search-button" 
          onClick={() => {
            setSuggestions([]);
            performSearch(city);
          }}
          disabled={isLoading}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {isLoading ? "⏳" : <SearchIcon />}
        </button>

        {/* 5. THE DROPDOWN MENU */}
        {/* This only renders if the suggestions array has items in it */}
        {suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map((item, index) => (
              <div 
                key={index} 
                className="suggestion-item"
                onClick={() => handleSuggestionClick(item)}
              >
                {item.name} 
                {/* Show the country name so users can tell 'London, UK' apart from 'London, Canada' */}
                <span className="suggestion-subtext">{item.admin1 ? `${item.admin1}, ` : ''}{item.country}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="cards-container">
        {weatherCards.map((cityData, index) => (
          <div className="glass-card" key={index}>
            <h2>{cityData.name}</h2>
            <div className="temp">{cityData.temp}</div>
            <p>{cityData.condition}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;