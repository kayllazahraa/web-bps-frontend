import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePublications } from '../hooks/usePublications';
import { uploadImageToCloudinary } from '../services/publicationService';

export default function EditPublicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPublication, editPublication } = usePublications();

  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [description, setDescription] = useState('');
  const [coverFile, setCoverFile] = useState(null);
  const [coverUrl, setCoverUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const pub = await getPublication(Number(id));
        if (pub) {
          setTitle(pub.title || '');
          setReleaseDate(pub.releaseDate || '');
          setDescription(pub.description || '');
          setCoverUrl(pub.coverUrl || '');
        }
      } catch (err) {
        alert('Gagal memuat data: ' + err.message);
        navigate('/publications');
      } finally {
        setLoading(false);
      }
    };

    fetchPublication();
  }, [id, getPublication, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !releaseDate) {
      alert('Judul dan Tanggal Rilis harus diisi!');
      return;
    }

    let newCoverUrl = coverUrl;
    if (coverFile) {
      try {
        newCoverUrl = await uploadImageToCloudinary(coverFile);
      } catch (err) {
        alert('Gagal upload gambar: ' + err.message);
        return;
      }
    }

    const updatedPublication = {
      title,
      releaseDate,
      description,
      coverUrl: newCoverUrl,
    };

    try {
      await editPublication(Number(id), updatedPublication);
      navigate('/publications');
    } catch (err) {
      alert('Gagal menyimpan perubahan: ' + err.message);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Memuat data publikasi...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Publikasi</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
            rows={4}
          />
        </div>
        <div>
          <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Rilis</label>
          <input
            type="date"
            id="releaseDate"
            value={releaseDate}
            onChange={e => setReleaseDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
          />
        </div>
        <div>
          <label htmlFor="cover" className="block text-sm font-medium text-gray-700 mb-1">Ganti Sampul (Gambar)</label>
          <input
            type="file"
            id="cover"
            accept="image/*"
            onChange={e => setCoverFile(e.target.files[0])}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          <p className="text-xs text-gray-500 mt-1">Kosongkan jika tidak ingin mengubah sampul.</p>
          {(coverFile || coverUrl) && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-1">Preview Sampul:</p>
              <img
                src={coverFile ? URL.createObjectURL(coverFile) : coverUrl}
                alt="Preview Sampul"
                className="h-40 w-auto rounded shadow-md"
              />
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => navigate('/publications')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}