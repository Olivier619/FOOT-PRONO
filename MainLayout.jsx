import React from 'react';
import { useAppContext } from '../../context/AppContext';

const MainLayout = () => {
  const { 
    activeTab, 
    setActiveTab, 
    searchTeams,
    isSearching,
    searchResults,
    searchError,
    getDateForTab,
    loadMatches
  } = useAppContext();
  
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // Charger explicitement les matchs pour le nouvel onglet
    const date = getDateForTab(tab);
    loadMatches(date);
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchTeams(searchQuery);
  };
  
  return (
    <div className="main-layout">
      <header className="app-header">
        <h1>PronoExpert</h1>
        <p className="app-subtitle">Prédictions sportives en temps réel</p>
      </header>
      
      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'today' ? 'active' : ''}`}
            onClick={() => handleTabClick('today')}
          >
            Aujourd'hui
          </button>
          <button 
            className={`tab ${activeTab === 'tomorrow' ? 'active' : ''}`}
            onClick={() => handleTabClick('tomorrow')}
          >
            Demain
          </button>
          <button 
            className={`tab ${activeTab === 'after-tomorrow' ? 'active' : ''}`}
            onClick={() => handleTabClick('after-tomorrow')}
          >
            Après-demain
          </button>
          <button 
            className={`tab ${activeTab === 'last-matches' ? 'active' : ''}`}
            onClick={() => handleTabClick('last-matches')}
          >
            Derniers matchs
          </button>
        </div>
      </div>
      
      <div className="search-container">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Rechercher une équipe..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={isSearching}
          >
            {isSearching ? 'Recherche...' : 'Rechercher'}
          </button>
        </form>
      </div>
      
      <main className="content">
        {/* Dynamically import components based on current view */}
        {(() => {
          // Import the component dynamically
          const MatchesContainer = React.lazy(() => import('../matches/MatchesContainer'));
          const SearchResults = React.lazy(() => import('../matches/SearchResults'));
          
          // Show search results if available
          if (searchResults && searchResults.length > 0) {
            return (
              <React.Suspense fallback={<div>Chargement des résultats...</div>}>
                <SearchResults results={searchResults} />
              </React.Suspense>
            );
          }
          
          // Show error if search failed
          if (searchError) {
            return (
              <div className="search-error">
                <p>{searchError}</p>
              </div>
            );
          }
          
          // Default view: matches container
          return (
            <React.Suspense fallback={<div>Chargement des matchs...</div>}>
              <MatchesContainer />
            </React.Suspense>
          );
        })()}
      </main>
      
      <footer className="app-footer">
        <p>© 2025 PronoExpert - Prédictions sportives basées sur l'intelligence artificielle</p>
        <p className="disclaimer">Les prédictions sont fournies à titre informatif seulement.</p>
      </footer>
    </div>
  );
};
