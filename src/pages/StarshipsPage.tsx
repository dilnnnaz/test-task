import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Starship {
    name: string;
    model: string;
}

interface StarshipsPageProps {
    starships: Starship[];
}

const StarshipsPage: React.FC<StarshipsPageProps> = ({ starships }) => {
    const navigate = useNavigate();

    return (
        <div className="container mt-4">
            <h2>Starships</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Model</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {starships.map((starship: Starship, index: number) => (
                    <tr key={index}>
                        <td>{starship.name}</td>
                        <td>{starship.model}</td>
                        <td>
                            <button
                                className="btn btn-info"
                                onClick={() => navigate(`/starships/${index + 1}`)}
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

export default StarshipsPage;
