import React from 'react';
import { useAppContext } from '../../context/AppContext';

const MatchItem = ({ match }) => {
  const { loadTeamStats } = useAppContext();
  
  // Formatage de l'heure du match
  const matchTime = new Date(match.date).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  // Déterminer si le match est en direct
  const isLive = match.status === 'LIVE';
  
  // Déterminer si le match est terminé
  const isFinished = match.status === 'FINISHED';
  
  // Classe CSS pour le score
  const scoreClass = isLive ? 'score live' : 'score';
  
  // Gérer le clic sur une équipe
  const handleTeamClick = (teamId) => {
    loadTeamStats(teamId);
  };
  
  return (
    <div className={`match-item ${isLive ? 'live-match' : ''}`}>
      <div className="match-time">
        {matchTime}
        {isLive && <span className="live-indicator">LIVE</span>}
        {isFinished && <span className="finished-indicator">TERMINÉ</span>}
      </div>
      
      <div className="match-teams">
        <div 
          className="team home-team" 
          onClick={() => handleTeamClick(match.homeTeam.id)}
        >
          <span className="team-name">{match.homeTeam.name}</span>
          {match.homeTeam.logo && (
            <img 
              src={match.homeTeam.logo} 
              alt={match.homeTeam.name} 
              className="team-logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-team.png';
              }}
            />
          )}
        </div>
        
        <div className={scoreClass}>
          {match.score.home !== null ? match.score.home : '-'}
          :
          {match.score.away !== null ? match.score.away : '-'}
        </div>
        
        <div 
          className="team away-team"
          onClick={() => handleTeamClick(match.awayTeam.id)}
        >
          {match.awayTeam.logo && (
            <img 
              src={match.awayTeam.logo} 
              alt={match.awayTeam.name} 
              className="team-logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-team.png';
              }}
            />
          )}
          <span className="team-name">{match.awayTeam.name}</span>
        </div>
      </div>
      
      {match.odds && (
        <div className="match-odds">
          <div className="odd">
            <span className="odd-label">1</span>
            <span className="odd-value">{match.odds.home}</span>
          </div>
          <div className="odd">
            <span className="odd-label">X</span>
            <span className="odd-value">{match.odds.draw}</span>
          </div>
          <div className="odd">
            <span className="odd-label">2</span>
            <span className="odd-value">{match.odds.away}</span>
          </div>
        </div>
      )}
    </div>
  );
};
