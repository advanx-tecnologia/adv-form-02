import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Globe, 
  LogOut, 
  Menu, 
  X,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { DashboardMetrics } from './DashboardMetrics';
import { LeadsTable } from './LeadsTable';
import { PixelManager } from './PixelManager';
import { cn } from '@/lib/utils';

type AdminView = 'dashboard' | 'leads' | 'pixels';

const navItems = [
  { id: 'dashboard' as AdminView, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'leads' as AdminView, label: 'Leads', icon: Users },
  { id: 'pixels' as AdminView, label: 'Pixels', icon: Globe },
];

export function AdminDashboard() {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardMetrics />;
      case 'leads':
        return <LeadsTable />;
      case 'pixels':
        return <PixelManager />;
      default:
        return <DashboardMetrics />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-card border-b border-border p-4 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-muted rounded-lg">
          <Menu className="w-6 h-6" />
        </button>
        <img 
          src="https://lhbwfbquxkutcyqazpnw.supabase.co/storage/v1/object/public/images/logo/v3%20png.webp" 
          alt="Advanx Logo" 
          className="h-8"
        />
        <div className="w-10" />
      </header>

      <div className="flex">
        {/* Sidebar Overlay (Mobile) */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={cn(
          "fixed lg:sticky top-0 left-0 h-screen w-64 bg-card border-r border-border z-50 transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <img 
                src="https://lhbwfbquxkutcyqazpnw.supabase.co/storage/v1/object/public/images/logo/v3%20png.webp" 
                alt="Advanx Logo" 
                className="h-8"
              />
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-muted rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setSidebarOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    currentView === item.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="p-4 border-t border-border space-y-4">
              <div className="px-4 py-2">
                <p className="text-xs text-muted-foreground">Logado como</p>
                <p className="text-sm font-medium truncate">{user?.email}</p>
              </div>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate('/')}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Ver Funil
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 min-h-screen">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
