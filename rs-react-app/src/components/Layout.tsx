import { Outlet, Link } from 'react-router-dom';
import Flyout from './Flyout';
import { useTheme } from '../context/ThemeContext';
import { useQueryClient } from '@tanstack/react-query';

export default function Layout() {
  const { theme, toggleTheme } = useTheme();
  const queryClient = useQueryClient();
  const refreshItems = () => {
    queryClient.invalidateQueries({ queryKey: ['items'] });
  };

  return (
    <div className="app">
      <nav>
        <Link to="/about">About</Link>
        <button onClick={toggleTheme}>
          {theme === 'light' ? 'To Dark Humor' : 'To Light Humor'}
        </button>
        <button onClick={refreshItems}>Refresh</button>
      </nav>
      <Outlet />
      <Flyout />
    </div>
  );
}
