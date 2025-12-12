import React, { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './VerifiedBadge.css';

interface VerifiedBadgeProps {
  title?: string;
  tooltipText?: string;
}

const DEFAULT_LABEL = 'CEPiK potwierdził dane pojazdu';
const DEFAULT_TOOLTIP = 'Zweryfikowane dane';

const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  title = DEFAULT_LABEL,
  tooltipText = DEFAULT_TOOLTIP,
}) => {
  const badgeRef = useRef<HTMLSpanElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const updatePosition = useCallback(() => {
    if (typeof window === 'undefined' || !badgeRef.current) {
      return;
    }
    const rect = badgeRef.current.getBoundingClientRect();
    setPosition({
      top: rect.top,
      left: rect.left + rect.width / 2,
    });
  }, []);

  const showTooltip = () => {
    updatePosition();
    setVisible(true);
  };

  const hideTooltip = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (!visible || typeof window === 'undefined') {
      return undefined;
    }
    const handleHide = () => setVisible(false);
    window.addEventListener('scroll', handleHide, true);
    window.addEventListener('resize', handleHide);
    return () => {
      window.removeEventListener('scroll', handleHide, true);
      window.removeEventListener('resize', handleHide);
    };
  }, [visible]);

  const tooltipNode = visible && typeof document !== 'undefined'
    ? createPortal(
        <div
          className="verified-tooltip"
          style={{ top: position.top, left: position.left }}
          role="status"
          aria-live="polite"
        >
          {tooltipText}
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <span
        ref={badgeRef}
        className="verified-badge"
        title={title}
        aria-label={title}
        role="img"
        tabIndex={0}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        onMouseMove={visible ? updatePosition : undefined}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="10" cy="10" r="9" />
          <polyline points="6 10.5 9 13.5 14.5 7.5" />
        </svg>
      </span>
      {tooltipNode}
    </>
  );
};

export default VerifiedBadge;
