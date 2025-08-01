import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#0369A1] text-white text-sm mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-3 gap-8">
        
        {/* Logo dan Kontak */}
        <div>
          <div className="flex items-center space-x-3 mb-3">
            <img
              src="https://res.cloudinary.com/djcm0swgo/image/upload/v1751775675/bps-logo_1_ldppzk.png"
              alt="Logo BPS"
              className="h-12 w-auto"
            />
            <span className="text-base font-bold uppercase tracking-wide">
              Badan Pusat Statistik Provinsi Nusa Tenggara Timur
            </span>
          </div>
          <p className="leading-relaxed text-white/90">
            Jl. R. Suprapto No. 5<br />
            Kupang - 85111 Indonesia<br />
            Telp (0380) 826289; 821755; <br />
            Mailbox:{' '}
            <a
              href="mailto:ntt@bps.go.id"
              className="hover:text-gray-300"
            >
              ntt@bps.go.id
            </a>
          </p>
          <img
            src="https://i.postimg.cc/zvPQF7rw/Ber-AKHLAK.webp"
            alt="BerAKHLAK"
            className="mt-4 h-15"
          />
        </div>

        {/* Tentang Kami */}
        <div>
          <h4 className="text-white font-semibold mb-2">Tentang Kami</h4>
          <ul className="space-y-1">
            <li>
              <a
                href="https://ppid.bps.go.id/app/konten/0000/Profil-BPS.html"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                Profil BPS
              </a>
            </li>
            <li>
              <a
                href="https://ppid.bps.go.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                PPID
              </a>
            </li>
            <li>
              <a
                href="https://ppid.bps.go.id/app/konten/0000/Layanan-BPS.html"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                Kebijakan Diseminasi
              </a>
            </li>
          </ul>
        </div>

        {/* Tautan Lainnya */}
        <div>
          <h4 className="text-white font-semibold mb-2">Tautan Lainnya</h4>
          <ul className="space-y-1">
            <li><a href="https://www.aseanstats.org/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">ASEAN Stats</a></li>
            <li><a href="https://fmsindonesia.id/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Forum Statistik</a></li>
            <li><a href="https://rb.bps.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Reformasi Birokrasi</a></li>
            <li><a href="https://lpse.bps.go.id/eproc4" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Layanan Pengadaan</a></li>
            <li><a href="https://www.stis.ac.id/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Politeknik Statistika STIS</a></li>
            <li><a href="https://pusdiklat.bps.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Pusdiklat BPS</a></li>
            <li><a href="https://jdih.web.bps.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">JDIH BPS</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center py-4 text-xs sm:text-sm">
        <p>© 2025 Politeknik Statistika STIS</p>
        <p>
          Created by Kaylla Zahrani{' '}
          <a href="mailto:222313161@stis.ac.id" className="underline hover:text-slate-100">222313161@stis.ac.id</a>
        </p>
      </div>
    </footer>
  );
}