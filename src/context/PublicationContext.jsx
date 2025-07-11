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

    const fetchPublications = useCallback(async () => {
        if (!token) {
            setPublications([]);
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
    }, [token]);

    useEffect(() => {
        fetchPublications();
    }, [fetchPublications]);

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

    const editPublication = async (id, updatedPub) => {
        try {
            const updated = await publicationService.updatePublication(id, updatedPub);
            setPublications(prev => prev.map(pub => (pub.id === updated.id ? updated : pub)));
            setError(null);
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const deletePublication = async (id) => {
        try {
            await publicationService.deletePublication(id);
            setPublications(prev => prev.filter(pub => pub.id !== id));
            setError(null);
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const getPublication = async (id) => {
        try {
            return await publicationService.getPublicationById(id);
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    return (
        <PublicationContext.Provider value={{
            publications,
            loading,
            error,
            addPublication,
            editPublication,
            deletePublication,
            getPublication
        }}>
            {children}
        </PublicationContext.Provider>
    );
};

export { PublicationContext, PublicationProvider };