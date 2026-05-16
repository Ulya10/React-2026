import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <h2>You must be joking!</h2>
      <p>Page not found</p>
      <Link to="/">Back Home</Link>
    </div>
  );
}
