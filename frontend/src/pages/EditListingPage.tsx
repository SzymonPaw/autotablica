import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddListingForm from '../components/listings/AddListingForm';

const EditListingPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const listingId = id ? Number(id) : 0;

  if (!listingId) {
    return <div>Nieprawidłowy ID ogłoszenia</div>;
  }

  return (
    <div className="edit-listing-page">
      <AddListingForm 
        editingId={listingId}
        onSuccess={(updatedId) => {
          if (updatedId && updatedId > 0) {
            navigate(`/ogloszenie/${updatedId}`);
          } else {
            navigate('/moje-ogloszenia');
          }
        }} 
      />
    </div>
  );
};

export default EditListingPage;
