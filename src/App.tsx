import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import PlanetsPage from './pages/PlanetsPage';
import CharactersPage from './pages/CharactersPage';
import StarshipsPage from './pages/StarshipsPage';
import LoginPage from './pages/LoginPage';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import DetailsPlanetsPage from './pages/DetailsPlanetsPage';
import DetailsCharactersPage from './pages/DetailsCharactersPage';
import DetailsStarshipsPage from './pages/DetailsStarshipsPage';

const App = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const [planets, setPlanets] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [starships, setStarships] = useState([]);

    useEffect(() => {
        fetch('https://swapi.dev/api/planets/')
            .then(response => response.json())
            .then(data => setPlanets(data.results))
            .catch(error => console.error('Error fetching planets:', error));

        fetch('https://swapi.dev/api/people/')
            .then(response => response.json())
            .then(data => setCharacters(data.results))
            .catch(error => console.error('Error fetching characters:', error));

        fetch('https://swapi.dev/api/starships/')
            .then(response => response.json())
            .then(data => setStarships(data.results))
            .catch(error => console.error('Error fetching starships:', error));
    }, []);

    return (
        <Router>
            {isAuthenticated && <Navigation />}
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/planets"
                    element={
                        <ProtectedRoute>
                            <PlanetsPage planets={planets} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/planets/:id"
                    element={
                        <ProtectedRoute>
                            <DetailsPlanetsPage isEditable={true} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/characters"
                    element={
                        <ProtectedRoute>
                            <CharactersPage characters={characters} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/characters/:id"
                    element={
                        <ProtectedRoute>
                            <DetailsCharactersPage isEditable={true} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/starships"
                    element={
                        <ProtectedRoute>
                            <StarshipsPage starships={starships} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/starships/:id"
                    element={
                        <ProtectedRoute>
                            <DetailsStarshipsPage isEditable={true} />
                        </ProtectedRoute>
                    }
                />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;