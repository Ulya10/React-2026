import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="app">
      <nav>
        <Link to="/1">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Outlet />
    </div>
  );
}
