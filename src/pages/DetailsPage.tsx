import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface DetailsData {
    name: string;
    description: string;
}

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
});

const DetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [details, setDetails] = useState<DetailsData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<DetailsData>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        fetch(`https://swapi.dev/api/planets/${id}/`)
            .then(response => response.json())
            .then(data => {
                setDetails(data);
                Object.entries(data).forEach(([key, value]) => {
                    if (key in data) {
                        setValue(key as keyof DetailsData, value as any);
                    }
                });
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching details:', err);
                setError('Failed to fetch details');
                setLoading(false);
            });
    }, [id, setValue]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Details</h2>
            <form onSubmit={handleSubmit(data => console.log(data))}>
                <div className="form-group">
                    <label>Name</label>
                    <input {...register('name')} className="form-control" />
                    {errors.name && <p className="text-danger">{errors.name.message}</p>}
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input {...register('description')} className="form-control" />
                    {errors.description && <p className="text-danger">{errors.description.message}</p>}
                </div>
                <button type="submit" className="btn btn-primary mt-3">Save</button>
            </form>
        </div>
    );
};

export default DetailsPage;