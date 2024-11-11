import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface CharacterDetails {
    name: string;
    height: string;
    mass: string;
    birth_year: string;
}

interface DetailsCharactersPageProps {
    isEditable: boolean;
}

const DetailsCharactersPage: React.FC<DetailsCharactersPageProps> = ({ isEditable }) => {
    const { id } = useParams();
    const [character, setCharacter] = useState<CharacterDetails | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, setValue } = useForm<CharacterDetails>();

    useEffect(() => {
        fetch(`https://swapi.dev/api/people/${id}/`)
            .then(response => response.json())
            .then(data => {
                setCharacter(data);
                Object.keys(data).forEach(key => {
                    setValue(key as keyof CharacterDetails, data[key]);
                });
            })
            .catch(error => console.error('Error fetching character details:', error));
    }, [id, setValue]);

    const onSubmit = (data: CharacterDetails) => {
        console.log('Updated Data:', data);
        setCharacter(data);
        setIsEditing(false);
    };

    if (!character) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Character Details</h2>
            {isEditable && !isEditing && (
                <button className="btn btn-primary mb-3" onClick={() => setIsEditing(true)}>
                    Edit
                </button>
            )}
            {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" {...register('name')} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="height">Height</label>
                        <input type="text" id="height" {...register('height')} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mass">Mass</label>
                        <input type="text" id="mass" {...register('mass')} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="birth_year">Birth Year</label>
                        <input type="text" id="birth_year" {...register('birth_year')} className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-success mt-3">Save</button>
                </form>
            ) : (
                <div>
                    <p><strong>Name:</strong> {character.name}</p>
                    <p><strong>Height:</strong> {character.height}</p>
                    <p><strong>Mass:</strong> {character.mass}</p>
                    <p><strong>Birth Year:</strong> {character.birth_year}</p>
                </div>
            )}
        </div>
    );
};

export default DetailsCharactersPage;
