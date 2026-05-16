import { useParams, Link } from 'react-router-dom';

export default function DetailsSection() {
  const { id } = useParams<{ id: string }>();
  const index = Number(id);

  return (
    <div className="details-section">
      <h3>Details</h3>
      <p>Item #{index}</p>
      <Link to="..">Close</Link>
    </div>
  );
}
