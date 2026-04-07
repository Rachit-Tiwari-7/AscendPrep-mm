'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/app/store/auth-store';
import {
  LayoutDashboard, MessageSquare, FileText, LogOut, User, Github,
  Linkedin, Code2, Brain, Sparkles, ChevronDown,
} from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Interviews', href: '/dashboard/interviews', icon: MessageSquare },
  { name: 'DSA Practice', href: '/dashboard/dsa', icon: Code2 },
  { name: 'Resume AI', href: '/dashboard/resume-intelligence', icon: Brain },
  { name: 'Resumes', href: '/dashboard/resumes', icon: FileText },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuthStore();

  // Hide navbar on auth pages
  if (pathname?.startsWith('/login') || pathname?.startsWith('/register')) {
    return null;
  }

  // Don't show navbar if not authenticated on other pages
  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const getUserInitials = () => {
    if (!user?.full_name) return 'U';
    return user.full_name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b-2 border-gray-900"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary border-2 border-gray-900 shadow-[3px_3px_0px_0px_#000] flex items-center justify-center transform group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none transition-all">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight">AscendPrep AI</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link key={item.name} href={item.href}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-primary/10 text-primary border-2 border-gray-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-2 border-transparent hover:border-gray-200'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button 
              whileHover={{ y: -2 }}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 transition-colors border-2 border-transparent hover:border-gray-200"
            >
              <div className="h-8 w-8 bg-primary border-2 border-gray-900 flex items-center justify-center text-white text-sm font-black">
                {getUserInitials()}
              </div>
              <span className="hidden md:block text-sm font-black">{user?.full_name || 'User'}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_#000]">
            <DropdownMenuLabel className="text-gray-900 font-black">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                My Account
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-200" />
            <DropdownMenuItem className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-bold">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-200" />
            <DropdownMenuItem onClick={handleLogout} className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-bold">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
}
