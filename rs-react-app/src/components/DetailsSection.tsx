import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getDetails } from '../api/api';
import { useQuery } from '@tanstack/react-query';

export default function DetailsSection() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const navigate = useNavigate();
  const location = useLocation();

  const page = location.pathname.split('/')[1];

  if (!id) {
    return <p>Invalid item ID</p>;
  }

  const {
    data: item,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['item', id],
    queryFn: () => {
      return getDetails(id);
    },
  });

  const oneClose = () => {
    navigate(`/${page}`);
  };

  if (isLoading) return <p>Loading details...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!item) return <p>Item not found</p>;

  return (
    <div>
      <h2>Details</h2>
      <p>Item #{id}</p>
      <p>Type{item.type}</p>
      <button onClick={oneClose}>Close</button>
    </div>
  );
}
