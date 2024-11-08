import React, { useState } from 'react';
import { auth } from '../api/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    // Manejo del inicio de sesión
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!isValidEmail(email)) {
            setError('Correo inválido. Por favor, verifica que sea correcto.');
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(
                err.code === 'auth/invalid-credential'
                    ? 'Verifica que tu correo y contraseña sean correctos.'
                    : 'Hubo un error al intentar iniciar sesión. Por favor, inténtalo nuevamente.'
            );
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Iniciar Sesión</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
            <p>
                ¿No tienes una cuenta? <Link to="/signup">Regístrate aquí</Link>
            </p>
        </div>
    );
};

export default Login;
