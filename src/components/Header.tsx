import React, { useState, useRef, useEffect } from 'react';
import { Bell, Menu, LogOut, Settings, User } from 'lucide-react';

interface HeaderProps {
  setIsSidebarOpen: (open: boolean) => void;
  currentPage?: string;
  isMobile?: boolean;
}

const getPageTitle = (page: string = 'dashboard') => {
  return page.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function Header({ setIsSidebarOpen, currentPage, isMobile }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {isMobile && (
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsSidebarOpen(open => !open)}
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-lg md:text-xl font-bold text-gray-800">{getPageTitle(currentPage)}</h1>
        </div>

        <div className="flex items-center space-x-3">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5 text-gray-500" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 px-2 py-1.5 hover:bg-gray-100 rounded-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-700">Json Taylor</p>
                <p className="text-xs text-gray-500">Web Designer</p>
              </div>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </button>
                <div className="border-t border-gray-200 my-1" />
                <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}