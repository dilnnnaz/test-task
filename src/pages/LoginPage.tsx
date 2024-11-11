import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';

interface LoginFormInputs {
    username: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<LoginFormInputs>();
    const [error, setError] = useState<string | null>(null);

    // Фиктивные данные администратора
    const adminUser = { username: 'admin', password: 'password' };

    const onSubmit = (data: LoginFormInputs) => {
        setError(null);

        if (data.username !== adminUser.username) {
            setError('User does not exist');
        } else if (data.password !== adminUser.password) {
            setError('Incorrect password');
        } else {
            dispatch(login(data.username));
            navigate('/planets');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '400px' }}>
                <h2 className="text-center">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            {...register('username', { required: true })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            {...register('password', { required: true })}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
