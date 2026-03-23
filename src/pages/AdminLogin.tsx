import { useState } from 'react';
import { LockOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AdminLoginProps {
  siteName: string;
  onLogin: (password: string) => boolean;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(password)) {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080f] flex items-center justify-center p-4">
      <div className="bg-[#0e0e1a] border border-white/[0.08] rounded-2xl p-8 w-full max-w-sm text-center">
        <h2 className="font-['Bebas_Neue'] text-3xl tracking-wider text-[#f0f0f0] mb-1">
          Admin <span className="text-[#e63946]">Panel</span>
        </h2>
        <p className="text-sm text-[#888] mb-7">Masukkan password untuk mengakses dashboard</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Password admin"
            className="bg-white/[0.06] border-white/[0.08] text-center"
            autoComplete="current-password"
          />
          
          {error && (
            <p className="text-sm text-[#e63946]">Password salah. Coba lagi.</p>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-[#e63946] hover:bg-[#ff4d5a]"
          >
            <LockOpen className="w-4 h-4 mr-1.5" />
            Masuk
          </Button>
        </form>
        
        <p className="text-xs text-[#888] mt-4">
          Default: <code className="text-[#e63946]">admin123</code>
        </p>
      </div>
    </div>
  );
}
