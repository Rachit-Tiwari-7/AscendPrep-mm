'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/app/store/auth-store';
import { Loader2 } from 'lucide-react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, token } = useAuthStore();
  const [hasHydrated, setHasHydrated] = useState(false);

  // Demo Bypass: Always allow access during hackathon demo
  return <>{children}</>;
}








