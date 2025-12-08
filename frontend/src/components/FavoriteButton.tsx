import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { REQUIRE_AUTH_EVENT } from '../constants/events';
import './FavoriteButton.css';

interface FavoriteButtonProps {
  listingId: number;
  variant?: 'icon' | 'button';
  className?: string;
  labelAdd?: string;
  labelRemove?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  listingId,
  variant = 'icon',
  className,
  labelAdd = 'Dodaj do ulubionych',
  labelRemove = 'Usuń z ulubionych',
}) => {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  const showFeedback = (message: string) => {
    setFeedback(message);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => setFeedback(null), 2500);
  };

  useEffect(() => () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
  }, []);

  const active = isFavorite(listingId);
  const title = active ? labelRemove : labelAdd;

  const handleClick = async () => {
    if (!user) {
      window.dispatchEvent(new CustomEvent(REQUIRE_AUTH_EVENT));
      showFeedback('Zaloguj się, aby korzystać z ulubionych.');
      return;
    }

    setPending(true);
    try {
      await toggleFavorite(listingId);
      setFeedback(null);
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : 'Nie udało się zaktualizować ulubionych.';
      showFeedback(message);
    } finally {
      setPending(false);
    }
  };

  const containerClassName = ['favorite-toggle-container', className ?? ''].filter(Boolean).join(' ');
  const buttonClassName = [
    'favorite-toggle',
    `favorite-toggle--${variant}`,
    active ? 'favorite-toggle--active' : '',
    pending ? 'favorite-toggle--pending' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClassName}>
      <button
        type="button"
        className={buttonClassName}
        aria-pressed={active}
        aria-busy={pending}
        aria-label={title}
        onClick={handleClick}
        disabled={pending}
        title={title}
      >
        <span className="favorite-toggle__icon" aria-hidden="true">
          {active ? '❤' : '♡'}
        </span>
        {variant === 'button' && (
          <span className="favorite-toggle__label">{title}</span>
        )}
      </button>
      {variant === 'button' && feedback && (
        <span className="favorite-toggle__feedback" role="status" aria-live="polite">
          {feedback}
        </span>
      )}
    </div>
  );
};

export default FavoriteButton;
