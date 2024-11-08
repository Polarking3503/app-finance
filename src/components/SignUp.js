import React, { useState } from 'react';
import { auth } from '../api/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Validaciones combinadas en un solo bloque
    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');

        // Validación del email y la contraseña
        const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
        const passwordValid = password.length >= 6;
        const passwordsMatch = password === confirmPassword;

        setError(
            !emailValid ? 'Correo inválido.' :
            !passwordValid ? 'La contraseña debe tener al menos 6 caracteres.' :
            !passwordsMatch ? 'Las contraseñas no coinciden.' :
            ''
        );

        if (error) return;
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Usuario registrado exitosamente');
            navigate('/login');
        } catch (err) {
            setError(
                err.code === 'auth/email-already-in-use'
                    ? 'El correo ya está registrado. Intenta con otro correo.'
                    : 'Hubo un error al intentar iniciar sesión. Por favor, inténtalo nuevamente.'
            );
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            <form onSubmit={handleSignUp}>
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
                <input
                    type="password"
                    placeholder="Confirmar Contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Registrarse</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
            <p>
                ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
            </p>
        </div>
    );
};

export default SignUp;
