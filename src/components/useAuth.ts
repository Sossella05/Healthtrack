import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('useAuth: Iniciando listener de autenticação');
    console.log('useAuth: Auth instance:', auth);
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('useAuth: Estado de autenticação mudou:', user ? 'Usuário logado' : 'Usuário não logado');
      
      if (user) {
        // Usuário está autenticado
        console.log('useAuth: Definindo usuário como autenticado:', user.uid);
        setUser(user);
        setIsAuthenticated(true);
        await AsyncStorage.setItem('userToken', user.uid);
        await AsyncStorage.setItem('userEmail', user.email || '');
      } else {
        // Usuário não está autenticado
        console.log('useAuth: Definindo usuário como não autenticado');
        setUser(null);
        setIsAuthenticated(false);
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userEmail');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      console.log('useAuth: Fazendo logout...');
      await signOut(auth);
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userEmail');
      console.log('useAuth: Logout concluído');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return {
    isAuthenticated,
    user,
    loading,
    logout,
  };
} 