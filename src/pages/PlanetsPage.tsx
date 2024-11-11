import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Planet {
    name: string;
    climate: string;
}

interface PlanetsPageProps {
    planets: Planet[];
}

const PlanetsPage: React.FC<PlanetsPageProps> = ({ planets }) => {
    const navigate = useNavigate();

    return (
        <div className="container mt-4">
            <h2>Planets</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Climate</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {planets.map((planet: Planet, index: number) => (
                    <tr key={index}>
                        <td>{planet.name}</td>
                        <td>{planet.climate}</td>
                        <td>
                            <button
                                className="btn btn-info"
                                onClick={() => navigate(`/planets/${index + 1}`)}
                            >
                                View Details
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlanetsPage;