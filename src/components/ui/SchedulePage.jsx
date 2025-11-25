import { useState } from 'react';
import { ArrowLeft, Calendar as CalendarIcon, ChevronRight, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function SchedulePage({ selectedDate, onNavigate, onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');

  // DATA MANUAL (HARDCODED) - Agar tampilan tetap lengkap & gambar muncul
  const courts = [
    {
      id: 'futsal-sintetis-1',
      name: 'Lapangan Futsal Sintetis A',
      sport: 'Futsal',
      facilities: ['Kamera CCTV', 'Shower', 'Ruang Ganti', 'Toilet'],
      priceFrom: 150000,
      image: 'https://images.unsplash.com/photo-1712325485668-6b6830ba814e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXRzYWwlMjBjb3VydCUyMGluZG9vcnxlbnwxfHx8fDE3NjE2NTQ0MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'futsal-sintetis-2',
      name: 'Lapangan Futsal Sintetis B',
      sport: 'Futsal',
      facilities: ['Kamera CCTV', 'Shower', 'Ruang Ganti', 'Toilet'],
      priceFrom: 150000,
      image: 'https://images.unsplash.com/photo-1712325485668-6b6830ba814e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXRzYWwlMjBjb3VydCUyMGluZG9vcnxlbnwxfHx8fDE3NjE2NTQ0MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'futsal-sintetis-3',
      name: 'Lapangan Futsal Sintetis C',
      sport: 'Futsal',
      facilities: ['Kamera CCTV', 'Shower', 'Ruang Ganti', 'Toilet'],
      priceFrom: 150000,
      image: 'https://images.unsplash.com/photo-1712325485668-6b6830ba814e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXRzYWwlMjBjb3VydCUyMGluZG9vcnxlbnwxfHx8fDE3NjE2NTQ0MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'futsal-semen-1',
      name: 'Lapangan Futsal Semen A',
      sport: 'Futsal',
      facilities: ['Kamera CCTV', 'Toilet', 'Parkir Luas'],
      priceFrom: 120000,
      image: 'https://images.unsplash.com/photo-1712325485668-6b6830ba814e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXRzYWwlMjBjb3VydCUyMGluZG9vcnxlbnwxfHx8fDE3NjE2NTQ0MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'futsal-semen-2',
      name: 'Lapangan Futsal Semen B',
      sport: 'Futsal',
      facilities: ['Kamera CCTV', 'Toilet', 'Parkir Luas'],
      priceFrom: 120000,
      image: 'https://images.unsplash.com/photo-1712325485668-6b6830ba814e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXRzYWwlMjBjb3VydCUyMGluZG9vcnxlbnwxfHx8fDE3NjE2NTQ0MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'futsal-semen-3',
      name: 'Lapangan Futsal Semen C',
      sport: 'Futsal',
      facilities: ['Kamera CCTV', 'Toilet', 'Parkir Luas'],
      priceFrom: 120000,
      image: 'https://images.unsplash.com/photo-1712325485668-6b6830ba814e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXRzYWwlMjBjb3VydCUyMGluZG9vcnxlbnwxfHx8fDE3NjE2NTQ0MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'voli-indoor-1',
      name: 'Lapangan Voli Indoor A',
      sport: 'Voli',
      facilities: ['AC', 'Shower', 'Ruang Ganti', 'Toilet', 'Kamera CCTV'],
      priceFrom: 180000,
      image: 'https://images.unsplash.com/photo-1693517235862-a1b8c3323efb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xsZXliYWxsJTIwaW5kb29yJTIwY291cnR8ZW58MXx8fHwxNzYxNjU2MTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'voli-indoor-2',
      name: 'Lapangan Voli Indoor B',
      sport: 'Voli',
      facilities: ['AC', 'Shower', 'Ruang Ganti', 'Toilet', 'Kamera CCTV'],
      priceFrom: 180000,
      image: 'https://images.unsplash.com/photo-1693517235862-a1b8c3323efb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xsZXliYWxsJTIwaW5kb29yJTIwY291cnR8ZW58MXx8fHwxNzYxNjU2MTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'voli-indoor-3',
      name: 'Lapangan Voli Indoor C',
      sport: 'Voli',
      facilities: ['AC', 'Shower', 'Ruang Ganti', 'Toilet', 'Kamera CCTV'],
      priceFrom: 180000,
      image: 'https://images.unsplash.com/photo-1693517235862-a1b8c3323efb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xsZXliYWxsJTIwaW5kb29yJTIwY291cnR8ZW58MXx8fHwxNzYxNjU2MTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'voli-outdoor-1',
      name: 'Lapangan Voli Outdoor A',
      sport: 'Voli',
      facilities: ['Pencahayaan Malam', 'Toilet', 'Parkir Luas'],
      priceFrom: 120000,
      image: 'https://images.unsplash.com/photo-1693517235862-a1b8c3323efb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xsZXliYWxsJTIwaW5kb29yJTIwY291cnR8ZW58MXx8fHwxNzYxNjU2MTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'voli-outdoor-2',
      name: 'Lapangan Voli Outdoor B',
      sport: 'Voli',
      facilities: ['Pencahayaan Malam', 'Toilet', 'Parkir Luas'],
      priceFrom: 120000,
      image: 'https://images.unsplash.com/photo-1693517235862-a1b8c3323efb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xsZXliYWxsJTIwaW5kb29yJTIwY291cnR8ZW58MXx8fHwxNzYxNjU2MTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'basket-indoor-1',
      name: 'Lapangan Basket Indoor A',
      sport: 'Basket',
      facilities: ['AC', 'Shower', 'Ruang Ganti', 'Toilet', 'Kamera CCTV'],
      priceFrom: 200000,
      image: 'https://images.unsplash.com/photo-1559369064-c4d65141e408?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwaW5kb29yJTIwY291cnR8ZW58MXx8fHwxNzYxNjU2MTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'basket-indoor-2',
      name: 'Lapangan Basket Indoor B',
      sport: 'Basket',
      facilities: ['AC', 'Shower', 'Ruang Ganti', 'Toilet', 'Kamera CCTV'],
      priceFrom: 200000,
      image: 'https://images.unsplash.com/photo-1559369064-c4d65141e408?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwaW5kb29yJTIwY291cnR8ZW58MXx8fHwxNzYxNjU2MTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'basket-indoor-3',
      name: 'Lapangan Basket Indoor C',
      sport: 'Basket',
      facilities: ['AC', 'Shower', 'Ruang Ganti', 'Toilet', 'Kamera CCTV'],
      priceFrom: 200000,
      image: 'https://images.unsplash.com/photo-1559369064-c4d65141e408?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwaW5kb29yJTIwY291cnR8ZW58MXx8fHwxNzYxNjU2MTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'basket-indoor-4',
      name: 'Lapangan Basket Indoor D',
      sport: 'Basket',
      facilities: ['AC', 'Shower', 'Ruang Ganti', 'Toilet', 'Kamera CCTV'],
      priceFrom: 200000,
      image: 'https://images.unsplash.com/photo-1559369064-c4d65141e408?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwaW5kb29yJTIwY291cnR8ZW58MXx8fHwxNzYxNjU2MTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const getSportIcon = (sport) => {
    const icons = {
      'Futsal': '⚽',
      'Basket': '🏀',
      'Voli': '🏐',
    };
    return icons[sport] || '🏅';
  };

  const filteredCourts = courts.filter((court) => {
    const matchesSearch = court.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = selectedSport === 'all' || court.sport === selectedSport;
    return matchesSearch && matchesSport;
  });

  const handleCourtClick = (court) => {
    // Kirim data manual ini ke halaman detail
    // Nanti halaman detail yang akan "fetch" ketersediaan slot dari DB
    onNavigate('venue-detail', { venue: court, date: selectedDate });
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button onClick={onBack} variant="outline" className="mb-6 bg-[#282828] text-white border-white/10 hover:bg-[#3E3E3E]">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
        </Button>

        <div className="mb-8">
          <h1 className="text-white mb-3 text-4xl">Sewa Lapangan</h1>
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <MapPin className="w-5 h-5 text-[#1DB954]" />
            <span className="text-lg">Lokasi: Jl. Jamin Ginting No 37</span>
          </div>
          <p className="text-gray-300 text-lg">Tanggal: {formatDate(selectedDate)}</p>
        </div>

        <div className="bg-[#181818] rounded-xl shadow-sm p-6 mb-8 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><Input placeholder="Cari nama lapangan" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#282828] border-white/10 text-white placeholder:text-gray-500" /></div>
            <div>
              <Select value={selectedSport} onValueChange={setSelectedSport}>
                <SelectTrigger className="bg-[#282828] border-white/10 text-white"><SelectValue placeholder="Pilih Cabang Olahraga" /></SelectTrigger>
                <SelectContent className="bg-[#282828] border-white/10">
                  <SelectItem value="all">Semua Olahraga</SelectItem>
                  <SelectItem value="Futsal">Futsal</SelectItem>
                  <SelectItem value="Voli">Voli</SelectItem>
                  <SelectItem value="Basket">Basket</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-[#1DB954] hover:bg-[#1ed760] text-black rounded-full">Cari lapangan</Button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-white text-2xl">Pilih Lapangan</h2>
          <p className="text-gray-300 mt-1">{filteredCourts.length} lapangan tersedia</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourts.map((court) => (
            <div key={court.id} className="bg-[#181818] rounded-xl overflow-hidden hover:bg-[#282828] transition-all cursor-pointer group border border-white/10" onClick={() => handleCourtClick(court)}>
              <div className="aspect-[4/3] overflow-hidden relative">
                <ImageWithFallback src={court.image} alt={court.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute top-3 left-3 bg-[#1DB954] px-3 py-1 rounded-full text-xs text-black">{getSportIcon(court.sport)} {court.sport}</div>
              </div>
              <div className="p-4">
                <h3 className="text-white mb-3 group-hover:text-[#1DB954] transition-colors">{court.name}</h3>
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">Fasilitas:</p>
                  <div className="flex flex-wrap gap-1">{court.facilities.map((facility, idx) => (<span key={idx} className="text-xs bg-[#282828] text-gray-300 px-2 py-1 rounded-md">{facility}</span>))}</div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div><p className="text-xs text-gray-500">Mulai</p><p className="text-white">Rp{court.priceFrom.toLocaleString('id-ID')} <span className="text-gray-400 text-sm">/jam</span></p></div>
                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-[#1DB954] transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}