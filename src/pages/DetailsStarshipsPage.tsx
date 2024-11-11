import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface StarshipDetails {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
}

interface DetailsStarshipsPageProps {
    isEditable: boolean;
}

const DetailsStarshipsPage: React.FC<DetailsStarshipsPageProps> = ({ isEditable }) => {
    const { id } = useParams();
    const [starship, setStarship] = useState<StarshipDetails | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, setValue } = useForm<StarshipDetails>();

    useEffect(() => {
        fetch(`https://swapi.dev/api/starships/${id}/`)
            .then(response => response.json())
            .then(data => {
                setStarship(data);
                Object.keys(data).forEach(key => {
                    setValue(key as keyof StarshipDetails, data[key]);
                });
            })
            .catch(error => console.error('Error fetching starship details:', error));
    }, [id, setValue]);

    const onSubmit = (data: StarshipDetails) => {
        console.log('Updated Data:', data);
        setStarship(data);
        setIsEditing(false);
    };

    if (!starship) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Starship Details</h2>
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
                        <label htmlFor="model">Model</label>
                        <input type="text" id="model" {...register('model')} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="manufacturer">Manufacturer</label>
                        <input type="text" id="manufacturer" {...register('manufacturer')} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cost_in_credits">Cost in Credits</label>
                        <input type="text" id="cost_in_credits" {...register('cost_in_credits')} className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-success mt-3">Save</button>
                </form>
            ) : (
                <div>
                    <p><strong>Name:</strong> {starship.name}</p>
                    <p><strong>Model:</strong> {starship.model}</p>
                    <p><strong>Manufacturer:</strong> {starship.manufacturer}</p>
                    <p><strong>Cost in Credits:</strong> {starship.cost_in_credits}</p>
                </div>
            )}
        </div>
    );
};

export default DetailsStarshipsPage;