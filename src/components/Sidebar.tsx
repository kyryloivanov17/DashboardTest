import React, { useState } from 'react';
import { 
  LayoutGrid,
  Megaphone,
  MessageSquare,
  Users,
  GraduationCap,
  Settings,
  Calendar,
  Plus
} from 'lucide-react';
import AddLeadModal from './modals/AddLeadModal';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const menuItems = [
  { id: 'dashboard', icon: LayoutGrid, label: 'Dashboard' },
  { id: 'campaigns', icon: Megaphone, label: 'Campaigns' },
  { id: 'leads', icon: MessageSquare, label: 'Leads' },
  { id: 'clients', icon: Users, label: 'Clients' },
  { id: 'agent-training', icon: GraduationCap, label: 'Agent Training' },
  { id: 'appointments', icon: Calendar, label: 'Appointments' }
];

export default function Sidebar({ isMobile, isOpen, setIsOpen, currentPage, setCurrentPage }: SidebarProps) {
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const campaigns = useSelector((state: RootState) => state.campaigns.items);

  return (
    <>
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside className={`
        ${isMobile ? 'fixed' : 'sticky'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        top-0 left-0 z-40 h-screen transition-transform
        bg-gradient-to-b from-indigo-900 to-indigo-800
        w-64 md:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="h-16 flex items-center justify-center border-b border-indigo-700/50">
            <img 
              src="https://i.ibb.co/DC2Dv7L/Tectika-ai.png" 
              alt="Tectika AI Logo" 
              className="h-10 w-auto"
            />
          </div>
          
          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    if (isMobile) setIsOpen(false);
                  }}
                  className={`
                    flex items-center w-full px-4 py-3 rounded-lg
                    transition-all duration-200 group
                    ${isActive 
                      ? 'bg-white/10 text-white' 
                      : 'text-indigo-100/80 hover:bg-white/5 hover:text-white'
                    }
                  `}
                >
                  <item.icon className={`
                    w-5 h-5 mr-3 transition-transform duration-200
                    ${isActive 
                      ? 'text-white transform scale-110' 
                      : 'text-indigo-100/80 group-hover:text-white'
                    }
                  `} />
                  <span className={`
                    font-medium transition-all duration-200
                    ${isActive 
                      ? 'text-white transform translate-x-1' 
                      : 'group-hover:translate-x-1'
                    }
                  `}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Settings and Add Lead Buttons */}
          <div className="p-4 mt-auto space-y-3 border-t border-indigo-700/50">
            <button
              onClick={() => {
                setCurrentPage('settings');
                if (isMobile) setIsOpen(false);
              }}
              className={`
                flex items-center w-full px-4 py-3 rounded-lg
                transition-all duration-200 group
                ${currentPage === 'settings'
                  ? 'bg-white/10 text-white' 
                  : 'text-indigo-100/80 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              <Settings className={`
                w-5 h-5 mr-3 transition-transform duration-200
                ${currentPage === 'settings'
                  ? 'text-white transform scale-110' 
                  : 'text-indigo-100/80 group-hover:text-white'
                }
              `} />
              <span className={`
                font-medium transition-all duration-200
                ${currentPage === 'settings'
                  ? 'text-white transform translate-x-1' 
                  : 'group-hover:translate-x-1'
                }
              `}>
                Settings
              </span>
            </button>

            <button
              onClick={() => setIsAddLeadModalOpen(true)}
              className="w-full h-11 bg-white/10 hover:bg-white/15 rounded-lg flex items-center justify-center space-x-2 text-white transition-colors group"
            >
              <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
              <span className="font-medium">Add Lead</span>
            </button>
          </div>
        </div>
      </aside>

      <AddLeadModal 
        isOpen={isAddLeadModalOpen}
        onClose={() => setIsAddLeadModalOpen(false)}
        campaigns={campaigns}
      />
    </>
  );
}