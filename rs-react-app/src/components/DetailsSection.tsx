import { useParams, useNavigate } from 'react-router-dom';

export default function DetailsSection() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const index = Number(id);
  const navigate = useNavigate();

  return (
    <div>
      <h2>Details</h2>
      <p>Item #{index}</p>
      <button onClick={() => navigate(-1)}>Close</button>
    </div>
  );
}
