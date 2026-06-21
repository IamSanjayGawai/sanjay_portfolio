
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';
export type Weather = 'clear' | 'summer' | 'winter' | 'rainy';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  weather: Weather;
  setWeather: (w: Weather) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [weather, setWeather] = useState<Weather>('winter');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Automatic Sunrise / Sunset logic based on local time
      const currentHour = new Date().getHours();
      const isDayTime = currentHour >= 6 && currentHour < 18; // 6:00 AM to 5:59 PM is Day
      setTheme(isDayTime ? 'light' : 'dark');
    }

    const savedWeather = localStorage.getItem('weather') as Weather;
    if (savedWeather) {
      setWeather(savedWeather);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('weather', weather);
  }, [weather]);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      if (newTheme === 'dark' && weather === 'summer') {
        setWeather('winter');
      }
      return newTheme;
    });
  };

  const handleSetWeather = (w: Weather) => {
    if (w === 'summer' && theme === 'dark') {
      setTheme('light');
    }
    setWeather(w);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, weather, setWeather: handleSetWeather }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
