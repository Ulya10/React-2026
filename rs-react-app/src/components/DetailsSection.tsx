import { useParams, useNavigate, useLocation } from 'react-router-dom';

export default function DetailsSection() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const index = Number(id);
  const navigate = useNavigate();
  const location = useLocation();

  const page = location.pathname.split('/')[1];

  const oneClose = () => {
    navigate(`/${page}`);
  };

  return (
    <div>
      <h2>Details</h2>
      <p>Item #{index}</p>
      <button onClick={oneClose}>Close</button>
    </div>
  );
}
