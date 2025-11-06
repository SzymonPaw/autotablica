import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddListingForm from '../components/listings/AddListingForm';

const AddListingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="add-listing-page">
      <AddListingForm onSuccess={(id) => {
        if (id && id > 0) {
          navigate(`/ogloszenie/${id}`); // Przekieruj bezpośrednio na stronę ogłoszenia
        } else {
          navigate('/');
        }
      }} />
    </div>
  );
};

export default AddListingPage;