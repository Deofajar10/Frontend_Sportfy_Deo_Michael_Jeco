import { useState } from 'react';
import { Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HomePage({ onNavigate }) {
  const [selectedDate, setSelectedDate] = useState('');

  const handleCheckSchedule = () => {
    if (selectedDate) {
      onNavigate('schedule', selectedDate);
    } else {
      // Default to today's date
      const today = new Date().toISOString().split('T')[0];
      onNavigate('schedule', today);
    }
  };

  const courts = [
    { name: 'Lapangan Futsal A (Sintetis)', sport: 'Futsal', image: 'https://images.unsplash.com/photo-1712325485668-6b6830ba814e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXRzYWwlMjBpbmRvb3IlMjBjb3VydHxlbnwxfHx8fDE3NjE2NTQ4MTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { name: 'Lapangan Badminton B (Karpet)', sport: 'Badminton', image: 'https://images.unsplash.com/photo-1626926938421-90124a4b83fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBjb3VydHxlbnwxfHx8fDE3NjE2NTU3MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { name: 'Lapangan Basket C (Indoor)', sport: 'Basket', image: 'https://images.unsplash.com/photo-1710378844976-93a6538671ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwY291cnQlMjBpbmRvb3J8ZW58MXx8fHwxNzYxNTUyNDQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { name: 'Lapangan Voli D (Indoor)', sport: 'Voli', image: 'https://images.unsplash.com/photo-1479859546309-cd77fa21c8f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xsZXliYWxsJTIwY291cnR8ZW58MXx8fHwxNzYxNjU1NzAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  ];

  const features = [
    'Booking online 24/7',
    'Konfirmasi instan',
    'Pembayaran mudah',
    'Cari lawan tanding',
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#1DB954]/20 to-transparent py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-white mb-4 text-5xl">
              Booking Lapangan Olahraga Jadi Mudah
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Platform terpercaya untuk memesan lapangan futsal, badminton, basket, dan voli.
              Cek jadwal real-time dan booking dalam hitungan detik.
            </p>
          </div>

          {/* CTA Box */}
          <div className="bg-[#181818] rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto border border-white/10">
            <h2 className="text-white mb-6 text-center text-2xl">
              Mulai Booking Sekarang
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="date" className="block text-gray-300 mb-2">
                  Pilih Tanggal
                </label>
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 bg-[#282828] border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <Button
                onClick={handleCheckSchedule}
                className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black py-6 rounded-full transition-all transform hover:scale-105"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Cek Jadwal
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-[#1DB954] flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Courts Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-white mb-8 text-center text-3xl">
          Lapangan Yang Tersedia
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courts.map((court, index) => (
            <div
              key={index}
              className="bg-[#181818] rounded-xl overflow-hidden hover:bg-[#282828] transition-all group"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={court.image}
                  alt={court.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-[#1DB954] mb-1">{court.sport}</div>
                <h3 className="text-white">{court.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Court List */}
        <div className="mt-12 bg-[#181818] rounded-xl p-8 border border-white/10">
          <h3 className="text-white mb-6 text-center text-2xl">
            Daftar Lengkap Lapangan Kami
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#282828] rounded-lg p-6 border border-white/10">
              <h4 className="text-white mb-3">Lapangan Futsal (6 Lapangan)</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Lapangan Futsal A (Sintetis)</li>
                <li>• Lapangan Futsal B (Sintetis)</li>
                <li>• Lapangan Futsal C (Sintetis)</li>
                <li>• Lapangan Futsal D (Sintetis)</li>
                <li>• Lapangan Futsal E (Sintetis)</li>
                <li>• Lapangan Futsal F (Sintetis)</li>
              </ul>
            </div>

            <div className="bg-[#282828] rounded-lg p-6 border border-white/10">
              <h4 className="text-white mb-3">Lapangan Voli (5 Lapangan)</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Lapangan Voli A (Indoor)</li>
                <li>• Lapangan Voli B (Indoor)</li>
                <li>• Lapangan Voli C (Indoor)</li>
                <li>• Lapangan Voli D (Indoor)</li>
                <li>• Lapangan Voli E (Indoor)</li>
              </ul>
            </div>

            <div className="bg-[#282828] rounded-lg p-6 border border-white/10">
              <h4 className="text-white mb-3">Lapangan Basket (4 Lapangan)</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Lapangan Basket A (Indoor)</li>
                <li>• Lapangan Basket B (Indoor)</li>
                <li>• Lapangan Basket C (Indoor)</li>
                <li>• Lapangan Basket D (Indoor)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
