// src/components/PublicationListPage.jsx
import React from 'react';
import { usePublications } from '../hooks/usePublications';
import { useNavigate } from 'react-router-dom';

// Komponen Card untuk setiap publikasi
const PublicationCard = ({ publication, onDelete }) => {
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <img
                src={publication.coverUrl}
                alt={`Sampul ${publication.title}`}
                className="w-full h-56 object-cover object-center"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/cccccc/ffffff?text=Image+Error'; }}
            />
            <div className="p-5">
                <p className="text-sm text-text-secondary mb-1">{formatDate(publication.releaseDate)}</p>
                
                <h3 className="font-bold text-lg text-brand-primary h-14" title={publication.title}>
                    {publication.title}
                </h3>

                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end gap-2">
                    {/* Tombol Detail */}
                    <button
                        onClick={() => navigate(`/publications/${publication.id}`)}
                        className="text-xs font-bold bg-green-500 text-white py-1 px-3 rounded-full hover:bg-green-600 transition-colors"
                    >
                        Detail
                    </button>
                    {/* Tombol Edit */}
                    <button
                        onClick={() => navigate(`/publications/edit/${publication.id}`)}
                        className="text-xs font-bold bg-yellow-500 text-white py-1 px-3 rounded-full hover:bg-yellow-600 transition-colors"
                    >
                        Edit
                    </button>
                    {/* Tombol Hapus */}
                    <button
                        onClick={() => onDelete(publication.id, publication.title)}
                        className="text-xs font-bold bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600 transition-colors"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function PublicationListPage() {
    const { publications, deletePublication, loading, error } = usePublications();

    const handleDelete = async (id, title) => {
        if (window.confirm(`Yakin ingin menghapus publikasi "${title}"?`)) {
            try {
                await deletePublication(id);
                alert('Publikasi berhasil dihapus.');
            } catch (err) {
                alert('Gagal menghapus: ' + err.message);
            }
        }
    };

    return (
        <div>
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold font-heading text-brand-primary">Daftar Publikasi</h1>
                <p className="text-lg text-text-secondary mt-2">Jelajahi data dan publikasi terkini dari BPS Provinsi Nusa Tenggara Timur.</p>
            </header>

            {loading && <p className="text-center">Memuat data...</p>}
            {error && <p className="text-center text-red-500">Gagal memuat data: {error}</p>}
            
            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {publications.map((pub) => (
                        <PublicationCard key={pub.id} publication={pub} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
}