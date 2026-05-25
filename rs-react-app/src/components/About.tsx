import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div>
      <h2>About page</h2>
      <p>
        Made by <a href="https://github.com/Ulya10">Ulya10</a>
      </p>
      <p>
        As a task for{' '}
        <a
          href="https://rs.school/courses/reactjs/"
          target="_blank"
          rel="noreferrer"
        >
          RS School React course
        </a>
      </p>
      <Link to="/">Back Home</Link>
    </div>
  );
}
