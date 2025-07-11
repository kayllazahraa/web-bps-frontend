// src/context/PublicationContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { publicationService } from '../services/publicationService';
import { useAuth } from '../hooks/useAuth';

const PublicationContext = createContext(null);

const PublicationProvider = ({ children }) => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth(); // Mengambil token dari AuthContext

    useEffect(() => {
        const fetchData = async () => {
            // Jangan fetch data jika tidak ada token (user belum login)
            if (!token) {
                setPublications([]); // Kosongkan data jika logout
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const data = await publicationService.getPublications();
                setPublications(data);
            } catch (err) {
                setError(err.message);
                console.error("Gagal mengambil data publikasi:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    // Interaksi fungsi tambah, edit, dan hapus publikasi dengan API
    const addPublication = async (newPub) => {
        try {
            const added = await publicationService.addPublication(newPub);
            setPublications((prev) => [added, ...prev]);
            setError(null);
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const editPublication = (updatedPub) => {
        setPublications(prev => prev.map(pub => pub.id === updatedPub.id ? updatedPub : pub));
    };

    const deletePublication = (id) => {
        setPublications(prev => prev.filter(pub => pub.id !== id));
    };

    return (
        <PublicationContext.Provider value={{
            publications,
            loading,
            error,
            addPublication,
            editPublication,
            deletePublication
        }}>
            {children}
        </PublicationContext.Provider>
    );
};

export { PublicationContext, PublicationProvider };