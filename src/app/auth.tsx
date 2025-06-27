import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebaseConfig';
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';

console.log('Auth: Importando auth instance:', auth);

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  console.log('Auth: Componente renderizado, auth instance:', auth);

  const handleAuth = async () => {
    if (!email || !password || (!isLogin && !nome)) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Login
        console.log('Tentando fazer login...');
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Login bem-sucedido:', userCredential.user.uid);
        await AsyncStorage.setItem('userToken', userCredential.user.uid);
        await AsyncStorage.setItem('userEmail', email);
        console.log('Token salvo no AsyncStorage');
        // Redireciona para a tela principal após login
        router.replace('/(tabs)');
      } else {
        // Registro
        console.log('Tentando criar conta...');
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Conta criada com sucesso:', userCredential.user.uid);
        await AsyncStorage.setItem('userToken', userCredential.user.uid);
        await AsyncStorage.setItem('userEmail', email);
        // Salva o nome do usuário no Firestore
        await setDoc(doc(db, 'usuarios', userCredential.user.uid), { nome, email });
        console.log('Token salvo no AsyncStorage');
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        // Redireciona para tela de login
        setIsLogin(true);
        setNome('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error: any) {
      console.error('Erro na autenticação:', error);
      let errorMessage = 'Ocorreu um erro. Tente novamente.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Usuário não encontrado.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Senha incorreta.';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este email já está em uso.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email inválido.';
      }
      
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image source={require('../assets/images/icon.png')} style={styles.icon} />
          <Text style={styles.title}>HealthTrack</Text>
          <Text style={styles.subtitle}>
            {isLogin ? 'Faça login para continuar' : 'Crie sua conta'}
          </Text>
        </View>

        <View style={styles.form}>
          {!isLogin && (
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          {!isLogin && (
            <TextInput
              style={styles.input}
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          )}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleAuth}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Criar Conta'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => {
              setIsLogin(!isLogin);
              setEmail('');
              setPassword('');
              setConfirmPassword('');
              setNome('');
            }}
          >
            <Text style={styles.switchText}>
              {isLogin ? 'Não tem uma conta? Registre-se' : 'Já tem uma conta? Faça login'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f2ff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 16,
    borderRadius: 50,
    backgroundColor: '#fff',
    elevation: 8,
    shadowColor: '#0077b6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    borderWidth: 2,
    borderColor: '#90e0ef',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0077b6',
    marginBottom: 8,
    fontFamily: 'SpaceMono',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  button: {
    backgroundColor: '#0077b6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    elevation: 3,
    shadowColor: '#0077b6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
  },
  switchButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchText: {
    color: '#0077b6',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
}); 