import { Outlet, Link } from 'react-router-dom';
import Flyout from './Flyout';

export default function Layout() {
  return (
    <div className="app">
      <nav>
        <Link to="/about">About</Link>
      </nav>
      <Outlet />
      <Flyout />
    </div>
  );
}
