import { useState, useEffect, useCallback } from 'react';

const AUTH_KEY = 'axs_admin_auth';

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = sessionStorage.getItem(AUTH_KEY);
    setIsAuthenticated(auth === '1');
    setIsLoading(false);
  }, []);

  const login = useCallback((password: string, adminPassword: string) => {
    if (password === adminPassword) {
      sessionStorage.setItem(AUTH_KEY, '1');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    isLoading,
    login,
    logout
  };
}
