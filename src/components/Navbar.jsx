// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const BpsLogo = () => (
    <img
        src="https://res.cloudinary.com/djcm0swgo/image/upload/v1751775675/bps-logo_1_ldppzk.png"
        alt="BPS Logo"
        className="h-10 w-10"
    />
);

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logoutAction, user } = useAuth();

    const handleLogout = async () => {
        try {
            await logoutAction();
            navigate('/login');
        } catch (error) {
            alert('Gagal logout: ' + error.message);
        }
    };

    const navItems = [
        { id: "publications", label: "Daftar Publikasi", path: "/publications" },
        { id: "add", label: "Tambah Publikasi", path: "/publications/add" },
    ];

    // Jika user sudah login, tampilkan navbar lengkap
    if (user) {
        return (
            <header className="bg-[#0369A1] shadow-lg sticky top-0 z-50">
                <nav className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        <Link to="/publications" className="flex items-center gap-3">
                            <BpsLogo />
                            <span className="text-white text-lg font-bold tracking-wider hidden sm:block">
                                BPS PROVINSI NUSA TENGGARA TIMUR
                            </span>
                        </Link>
                        <div className="flex items-center gap-2">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.id}
                                        to={item.path}
                                        className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-300 ${
                                            isActive
                                                ? "bg-white text-[#0369A1]"
                                                : "text-slate-100 hover:bg-white/20 hover:text-white"
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 rounded-md text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 shadow-sm"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }

    // Jika user belum login tampil header sederhana
    return (
        <header className="bg-[#0369A1] shadow-lg sticky top-0 z-50">
            <nav className="container mx-auto px-4">
                <div className="flex items-center justify-start h-20">
                    <div className="flex items-center gap-3">
                        <BpsLogo />
                        <span className="text-white text-lg font-bold tracking-wider hidden sm:block">
                            BPS PROVINSI NUSA TENGGARA TIMUR
                        </span>
                    </div>
                </div>
            </nav>
        </header>
    );
}