// src/context/PublicationContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { publicationService } from '../services/publicationService';
import { useAuth } from '../hooks/useAuth';

const PublicationContext = createContext(null);

const PublicationProvider = ({ children }) => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true); // Set loading ke true di awal
    const [error, setError] = useState(null);
    const { token } = useAuth();

    // Menggunakan useCallback untuk stabilitas fungsi
    const fetchPublications = useCallback(async () => {
        // Hanya fetch data jika ada token
        if (token) {
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
        } else {
            // Jika tidak ada token (logout atau sesi habis), kosongkan data
            setPublications([]);
            setLoading(false);
        }
    }, [token]); // Dependensi hanya pada token

    // Jalankan fetchPublications setiap kali nilai token berubah
    useEffect(() => {
        fetchPublications();
    }, [fetchPublications]);

    const addPublication = async (newPub) => {
        try {
            const added = await publicationService.addPublication(newPub);
            // Refresh daftar setelah menambah
            fetchPublications(); 
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
            // Tidak perlu loading state di sini agar UI tidak berkedip
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