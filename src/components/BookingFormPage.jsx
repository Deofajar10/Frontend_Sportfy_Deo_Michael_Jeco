import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner'; // Import Toast

export function BookingFormPage({ bookingData, onNavigate, onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    teamName: '',
    findOpponent: false,
    findPlayers: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast.error('Mohon lengkapi data yang wajib diisi (Nama & No. HP)');
      return;
    }

    // Ambil user ID dari localStorage
    const userString = localStorage.getItem('user');
    if (!userString) {
        toast.error("Sesi habis, silakan login kembali.");
        return;
    }
    const user = JSON.parse(userString);

    setIsSubmitting(true);

    try {
        // Panggil API Backend di Port 4000
        const response = await fetch('http://localhost:4000/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user.id,
                courtId: bookingData.court, // ID ini didapat dari SchedulePage (statis)
                date: bookingData.date,
                time: bookingData.time,
                price: bookingData.price,
                teamName: formData.teamName,
                findOpponent: formData.findOpponent,
                findPlayers: formData.findPlayers
            })
        });

        const result = await response.json();

        if (result.success) {
            toast.success("Booking Berhasil Dibuat!");
            // Pindah ke halaman sukses
            onNavigate('complete', {
                ...bookingData,
                ...formData,
                bookingCode: result.booking.bookingCode, // Kode booking asli dari database
            });
        } else {
            toast.error("Gagal booking: " + result.error);
        }
    } catch (error) {
        console.error(error);
        toast.error("Terjadi kesalahan jaringan (Pastikan server backend jalan)");
    } finally {
        setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name.trim() !== '' && formData.phone.trim() !== '';

  return (
    <div className="min-h-screen bg-[#121212] py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          onClick={onBack}
          variant="outline"
          className="mb-6 bg-[#282828] text-white border-white/10 hover:bg-[#3E3E3E]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Button>

        <div className="bg-[#181818] rounded-xl shadow-sm p-8 border border-white/10">
          <h1 className="text-white mb-6 text-3xl">Formulir Pemesanan</h1>

          {/* Summary */}
          <div className="bg-[#1DB954]/10 border border-[#1DB954]/20 rounded-lg p-6 mb-8">
            <h2 className="text-white mb-4">Ringkasan Pesanan</h2>
            <div className="space-y-2">
              <p className="text-gray-300"><span className="text-gray-400">ID Lapangan:</span> {bookingData.court}</p>
              <p className="text-gray-300"><span className="text-gray-400">Jadwal:</span> {formatDate(bookingData.date)}, {bookingData.time}</p>
              <p className="text-white"><span className="text-gray-400">Total Harga:</span> Rp{bookingData.price.toLocaleString('id-ID')}</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-white">Data Diri</h2>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">Nama Lengkap <span className="text-red-500">*</span></Label>
              <Input id="name" type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Nama Lengkap" className="bg-[#282828] border-white/10 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-300">Nomor WhatsApp <span className="text-red-500">*</span></Label>
              <Input id="phone" type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="Contoh: 0812xxx" className="bg-[#282828] border-white/10 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email (opsional)</Label>
              <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-[#282828] border-white/10 text-white" />
            </div>

            <div className="border-t border-white/10 pt-6 mt-8">
              <h2 className="text-white mb-4">Opsi Tanding</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="teamName" className="text-gray-300">Nama Tim (opsional)</Label>
                  <Input id="teamName" type="text" value={formData.teamName} onChange={(e) => setFormData({ ...formData, teamName: e.target.value })} className="bg-[#282828] border-white/10 text-white" />
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox id="findOpponent" checked={formData.findOpponent} onCheckedChange={(checked) => setFormData({ ...formData, findOpponent: checked })} className="border-white/20" />
                  <div className="flex-1">
                    <label htmlFor="findOpponent" className="text-white cursor-pointer">✓ Cari Lawan Tanding</label>
                    <p className="text-sm text-gray-400">Slot Anda akan tampil di menu Laga Terbuka.</p>
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit" disabled={!isFormValid || isSubmitting} className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black py-6 rounded-full">
              {isSubmitting ? 'Memproses...' : 'Konfirmasi Booking'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}