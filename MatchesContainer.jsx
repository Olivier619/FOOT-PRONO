import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { LoadingSpinner, ErrorMessage } from '../common/LoadingStates';
import MatchItem from './MatchItem';

const MatchesContainer = () => {
  const { 
    matches, 
    isLoading, 
    error, 
    isSimulatedData, 
    lastUpdated,
    activeTab
  } = useAppContext();

  // Formatage de la date de dernière mise à jour
  const formattedLastUpdated = lastUpdated 
    ? new Date(lastUpdated).toLocaleString() 
    : '';

  if (isLoading) {
    return <LoadingSpinner message="Chargement des matchs en cours..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="no-matches">
        <p>Aucun match disponible pour cette période.</p>
      </div>
    );
  }

  return (
    <div className="matches-container">
      {isSimulatedData && (
        <div className="simulated-data-notice">
          <p>
            <strong>Note:</strong> Affichage de données simulées. 
            Les données réelles ne sont pas disponibles pour le moment.
          </p>
        </div>
      )}
      
      <div className="last-updated">
        Dernière mise à jour: {formattedLastUpdated}
      </div>
      
      {matches.map((leagueData, index) => (
        <div key={`league-${leagueData.league.id}-${index}`} className="league-section">
          <div className="league-header">
            {leagueData.league.logo && (
              <img 
                src={leagueData.league.logo} 
                alt={leagueData.league.name} 
                className="league-logo" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder-logo.png';
                }}
              />
            )}
            <h3>{leagueData.league.name} ({leagueData.league.country})</h3>
          </div>
          
          <div className="matches-list">
            {leagueData.matches.map((match) => (
              <MatchItem 
                key={`match-${match.id}`} 
                match={match} 
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
