import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';

interface LoginFormInputs {
    username: string;
    password: string;
}

const Login: React.FC = () => {
    const { register, handleSubmit } = useForm<LoginFormInputs>();
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        setError(null);

        dispatch(login(data.username));

        navigate('/');
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input
                        id="username"
                        className="form-control"
                        {...register('username', { required: true })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        id="password"
                        type="password"
                        className="form-control"
                        {...register('password', { required: true })}
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;