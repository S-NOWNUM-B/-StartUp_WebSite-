'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface SidebarContextType {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isMobile: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setMobileMenuOpen(false);
        setCollapsed(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Применяем классы к body для управления отступами
  useEffect(() => {
    const body = document.body;
    
    if (isMobile) {
      body.className = 'mobile-layout';
    } else if (collapsed) {
      body.className = 'sidebar-collapsed';
    } else {
      body.className = 'sidebar-expanded';
    }

    return () => {
      body.className = '';
    };
  }, [collapsed, isMobile]);

  const sidebarContextValue: SidebarContextType = {
    collapsed,
    setCollapsed,
    isMobile,
    mobileMenuOpen,
    setMobileMenuOpen,
  };

  return (
    <SidebarContext.Provider value={sidebarContextValue}>
      <div className="dashboard-layout-student">
        {/* Сайдбар */}
        <Sidebar />

        {/* Хедер */}
        <Header />

        {/* Основной контент */}
        <motion.main 
          className={`main-content-student ${isMobile ? 'mobile' : ''} ${collapsed && !isMobile ? 'collapsed' : ''}`}
          layout
          transition={{ duration: 0.3 }}
        >
          <div className="content-container-student">
            <motion.div 
              className="content-wrapper-student"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>
          </div>
        </motion.main>

        {/* Мобильный overlay */}
        <AnimatePresence>
          {isMobile && mobileMenuOpen && (
            <motion.div
              className="mobile-overlay-student"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              style={{ zIndex: 90 }}
            />
          )}
        </AnimatePresence>

        {/* Порталы для модальных окон */}
        <div id="notifications-portal"></div>
        <div id="modals-portal"></div>
      </div>
    </SidebarContext.Provider>
  );
} 