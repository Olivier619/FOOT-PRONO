import React from 'react';

export const LoadingSpinner = ({ message = 'Chargement...' }) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export const ErrorMessage = ({ message = 'Une erreur est survenue.' }) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <p className="error-message">{message}</p>
    </div>
  );
};

export const EmptyState = ({ message = 'Aucun résultat trouvé.' }) => {
  return (
    <div className="empty-container">
      <div className="empty-icon">📭</div>
      <p className="empty-message">{message}</p>
    </div>
  );
};

export const SimulatedDataNotice = () => {
  return (
    <div className="simulated-data-notice">
      <p>
        <strong>Note:</strong> Les données affichées sont simulées car les données réelles ne sont pas disponibles actuellement.
      </p>
    </div>
  );
};
