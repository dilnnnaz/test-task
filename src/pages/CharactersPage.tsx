import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Character {
    name: string;
    height: string;
}

interface CharactersPageProps {
    characters: Character[];
}

const CharactersPage: React.FC<CharactersPageProps> = ({ characters }) => {
    const navigate = useNavigate();

    return (
        <div className="container mt-4">
            <h2>Characters</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Height</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {characters.map((character: Character, index: number) => (
                    <tr key={index}>
                        <td>{character.name}</td>
                        <td>{character.height}</td>
                        <td>
                            <button
                                className="btn btn-info"
                                onClick={() => navigate(`/characters/${index + 1}`)}
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

export default CharactersPage;