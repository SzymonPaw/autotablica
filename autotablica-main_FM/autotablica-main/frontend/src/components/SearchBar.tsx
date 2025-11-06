import React from 'react';

type Props = {
  value: string;
  onChange: (v: string) => void;
  onEnter?: () => void;
};

const SearchBar: React.FC<Props> = ({ value, onChange, onEnter }) => {
  return (
    <div className="search-bar">
      <input
        type="search"
        placeholder="Szukaj po tytule, VIN, numerze rejestracyjnym..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onEnter) {
            onEnter();
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
