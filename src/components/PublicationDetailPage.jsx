// src/components/PublicationDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePublications } from '../hooks/usePublications';

export default function PublicationDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getPublication } = usePublications();
    const [publication, setPublication] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPublication = async () => {
            try {
                const pub = await getPublication(Number(id));
                setPublication(pub);
            } catch (err) {
                alert('Gagal memuat data: ' + err.message);
                navigate('/publications');
            } finally {
                setLoading(false);
            }
        };

        fetchPublication();
    }, [id, getPublication, navigate]);

    if (loading) {
        return <div className="text-center mt-10">Memuat data publikasi...</div>;
    }

    if (!publication) {
        return <div className="text-center mt-10">Publikasi tidak ditemukan.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                    <img
                        src={publication.coverUrl}
                        alt={`Sampul ${publication.title}`}
                        className="h-80 w-auto object-cover rounded-lg shadow-md"
                        onError={e => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x280/cccccc/ffffff?text=Error'; }}
                    />
                </div>
                <div className="flex-grow">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{publication.title}</h1>
                    <p className="text-md text-gray-500 mb-4">
                        Tanggal Rilis: <span className="font-semibold">{publication.releaseDate}</span>
                    </p>
                    <div className="prose max-w-none">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Deskripsi</h2>
                        <p>{publication.description || 'Tidak ada deskripsi.'}</p>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={() => navigate('/publications')}
                            className="bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
                        >
                            Kembali ke Daftar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}