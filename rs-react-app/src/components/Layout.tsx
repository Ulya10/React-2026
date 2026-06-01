import { Outlet, Link } from 'react-router-dom';
import Flyout from './Flyout';
import { useTheme } from '../context/ThemeContext';
import { useQueryClient } from '@tanstack/react-query';
import { useSelectedStore } from '../store/useSelectedStore';

export default function Layout() {
  const { theme, toggleTheme } = useTheme();
  const queryClient = useQueryClient();
  const unselectAll = useSelectedStore((state) => state.unselectAll);
  const refreshItems = () => {
    queryClient.invalidateQueries({ queryKey: ['items'] });
    unselectAll();
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
