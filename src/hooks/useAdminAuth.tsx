import { useState, createContext, useContext, useEffect, ReactNode } from 'react';

interface AdminUser {
  email: string;
  isAuthenticated: boolean;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

// Credenciais temporárias (será substituído por Supabase)
const TEMP_ADMIN_EMAIL = 'admin@advanx.com.br';
const TEMP_ADMIN_PASSWORD = 'advanx2024';

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifica sessão salva
    const savedSession = sessionStorage.getItem('admin_session');
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        setUser(parsed);
      } catch {
        sessionStorage.removeItem('admin_session');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simula delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Autenticação temporária (será substituída por Supabase)
    if (email === TEMP_ADMIN_EMAIL && password === TEMP_ADMIN_PASSWORD) {
      const adminUser: AdminUser = { email, isAuthenticated: true };
      setUser(adminUser);
      sessionStorage.setItem('admin_session', JSON.stringify(adminUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('admin_session');
  };

  return (
    <AdminAuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
