import React, { useState, useEffect, createContext, useContext } from 'react';
import SportDataService from '../api/sportDataService';
import cacheService from '../api/cacheService';

// Création du contexte
const AppContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useAppContext = () => useContext(AppContext);

// Fournisseur du contexte
export const AppProvider = ({ children }) => {
  // État pour les matchs
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSimulatedData, setIsSimulatedData] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  
  // État pour la recherche
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  
  // État pour les statistiques d'équipe
  const [teamStats, setTeamStats] = useState(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [statsError, setStatsError] = useState(null);
  
  // État pour l'onglet actif
  const [activeTab, setActiveTab] = useState('today');
  
  // Création d'une instance du service
  const sportDataService = new SportDataService();
  
  // Fonction pour charger les matchs
  const loadMatches = async (date) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await sportDataService.getMatches(date);
      setMatches(data.matches || []);
      setIsSimulatedData(data.isSimulated || false);
      setLastUpdated(data.lastUpdated || new Date().toISOString());
    } catch (err) {
      console.error('Erreur lors du chargement des matchs:', err);
      setError('Impossible de charger les matchs. Veuillez réessayer plus tard.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fonction pour rechercher des équipes
  const searchTeams = async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    setSearchError(null);
    
    try {
      const results = await sportDataService.searchTeams(query);
      setSearchResults(results);
    } catch (err) {
      console.error('Erreur lors de la recherche d\'équipes:', err);
      setSearchError('Impossible de rechercher des équipes. Veuillez réessayer plus tard.');
    } finally {
      setIsSearching(false);
    }
  };
  
  // Fonction pour charger les statistiques d'une équipe
  const loadTeamStats = async (teamId) => {
    setIsLoadingStats(true);
    setStatsError(null);
    
    try {
      const stats = await sportDataService.getTeamStats(teamId);
      setTeamStats(stats);
    } catch (err) {
      console.error('Erreur lors du chargement des statistiques:', err);
      setStatsError('Impossible de charger les statistiques. Veuillez réessayer plus tard.');
    } finally {
      setIsLoadingStats(false);
    }
  };
  
  // Fonction pour obtenir la date en fonction de l'onglet
  const getDateForTab = (tab) => {
    const today = new Date();
    
    switch(tab) {
      case 'today':
        return formatDate(today);
      case 'tomorrow':
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return formatDate(tomorrow);
      case 'after-tomorrow':
        const afterTomorrow = new Date(today);
        afterTomorrow.setDate(afterTomorrow.getDate() + 2);
        return formatDate(afterTomorrow);
      case 'last-matches':
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        return formatDate(yesterday);
      default:
        return formatDate(today);
    }
  };
  
  // Fonction pour formater la date
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Chargement initial des matchs
  useEffect(() => {
    const date = getDateForTab(activeTab);
    loadMatches(date);
  }, [activeTab, getDateForTab, loadMatches]);
  
  // Valeur du contexte
  const contextValue = {
    matches,
    isLoading,
    error,
    isSimulatedData,
    lastUpdated,
    searchResults,
    isSearching,
    searchError,
    teamStats,
    isLoadingStats,
    statsError,
    activeTab,
    setActiveTab,
    loadMatches,
    searchTeams,
    loadTeamStats,
    getDateForTab
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
