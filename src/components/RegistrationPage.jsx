// src/components/RegistrationPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';

const BpsLogo = () => (
    <img
        src="https://res.cloudinary.com/djcm0swgo/image/upload/v1751775675/bps-logo_1_ldppzk.png"
        alt="BPS Logo"
        className="h-16 w-16 mb-2"
    />
);

export default function RegistrationPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            alert('Semua field harus diisi!');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            await authService.register(name, email, password);
            alert('Registrasi berhasil! Silakan login dengan akun Anda.');
            navigate('/login');
        } catch (err) {
            setError(err.message);
            console.error('Registration failed:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
                <div className="flex flex-col items-center mb-6">
                    <BpsLogo />
                    <h1 className="text-2xl font-bold text-gray-800 text-center">Registrasi Akun Baru</h1>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">Nama</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                            placeholder="Masukkan nama lengkap"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                            placeholder="Masukkan email"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                            placeholder="Buat password"
                            disabled={loading}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center ${
                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700 text-white'
                        }`}
                    >
                        {loading ? 'Memproses...' : 'Daftar'}
                    </button>
                </form>
                 <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Sudah punya akun?{' '}
                        <Link to="/login" className="font-semibold text-sky-600 hover:text-sky-700">
                            Login di sini
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}