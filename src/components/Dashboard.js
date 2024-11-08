import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../api/firebase';
import { signOut } from 'firebase/auth';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("Sesión cerrada correctamente");
            navigate('/login'); // Redirige al inicio de sesión
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <div>
            <h1>Bienvenido/a</h1>
            <p>Has iniciado sesión correctamente.</p>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};

export default Dashboard;
