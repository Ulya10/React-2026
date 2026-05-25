import { Outlet, Link } from 'react-router-dom';
import Flyout from './Flyout';
import { useTheme } from '../context/ThemeContext';

export default function Layout() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="app">
      <nav>
        <Link to="/about">About</Link>
        <button onClick={toggleTheme}>
          {theme === 'light' ? 'To Dark' : 'To Light'}
        </button>
      </nav>
      <Outlet />
      <Flyout />
    </div>
  );
}
