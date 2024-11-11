import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface PlanetDetails {
    name: string;
    climate: string;
    population: string;
    diameter: string;
}

interface DetailsPlanetsPageProps {
    isEditable: boolean;
}

const DetailsPlanetsPage: React.FC<DetailsPlanetsPageProps> = ({ isEditable }) => {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, setValue } = useForm<PlanetDetails>();

    const [planet, setPlanet] = useState<PlanetDetails | null>(null);

    useEffect(() => {
        fetch(`https://swapi.dev/api/planets/${id}/`)
            .then(response => response.json())
            .then(data => {
                setPlanet(data);
                Object.keys(data).forEach(key => {
                    setValue(key as keyof PlanetDetails, data[key]);
                });
            })
            .catch(error => console.error('Error fetching planet details:', error));
    }, [id, setValue]);

    const onSubmit = (data: PlanetDetails) => {
        console.log('Updated Data:', data);
        setPlanet(data);
        setIsEditing(false);
    };

    if (!planet) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Planet Details</h2>
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
                        <label htmlFor="climate">Climate</label>
                        <input type="text" id="climate" {...register('climate')} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="population">Population</label>
                        <input type="text" id="population" {...register('population')} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="diameter">Diameter</label>
                        <input type="text" id="diameter" {...register('diameter')} className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-success mt-3">Save</button>
                </form>
            ) : (
                <div>
                    <p><strong>Name:</strong> {planet.name}</p>
                    <p><strong>Climate:</strong> {planet.climate}</p>
                    <p><strong>Population:</strong> {planet.population}</p>
                    <p><strong>Diameter:</strong> {planet.diameter}</p>
                </div>
            )}
        </div>
    );
};

export default DetailsPlanetsPage;
