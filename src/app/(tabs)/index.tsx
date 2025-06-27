import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../components/useAuth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

export default function HomeScreen() {
  const { logout, user } = useAuth();
  const [nome, setNome] = useState<string | null>(null);

  useEffect(() => {
    const fetchNome = async () => {
      if (user && user.uid) {
        try {
          const docRef = doc(db, 'usuarios', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setNome(docSnap.data().nome);
          } else {
            setNome(null);
          }
        } catch (e) {
          setNome(null);
        }
      }
    };
    fetchNome();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.replace('/auth');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/icon.png')} style={styles.icon} />
        <Text style={styles.title}>Bem-vindo ao HealthTrack!</Text>
        {user && (
          <Text style={styles.userEmail}>Olá, {nome ? nome : '...'}</Text>
        )}
      </View>
      <View style={styles.buttonsContainer}>
        <CustomButton text="💧 REGISTRO DE ÁGUA" onPress={() => router.push('/agua')} />
        <CustomButton text="🏃‍♂️ ATIVIDADES FÍSICAS" onPress={() => router.push('/atividade')} />
        <CustomButton text="😴 MONITORAMENTO DO SONO" onPress={() => router.push('/sono')} />
        <CustomButton text="📊 HISTÓRICO GERAL" onPress={() => router.push('/historico')} />
        <CustomButton text="🚪 SAIR" onPress={handleLogout} customStyle={styles.logoutButton} />
      </View>
    </View>
  );
}

function CustomButton({ text, onPress, customStyle }: { text: string; onPress: () => void; customStyle?: any }) {
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={[styles.button, customStyle]}
        onPress={onPress}
        activeOpacity={0.85}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text style={[styles.buttonText, customStyle && styles.logoutButtonText]}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f2ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 36,
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 18,
    borderRadius: 60,
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0077b6',
    textAlign: 'center',
    fontFamily: 'SpaceMono',
    letterSpacing: 1,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginVertical: 10,
    width: 260,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    borderWidth: 1.5,
    borderColor: '#90e0ef',
    shadowColor: '#0077b6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  buttonText: {
    color: '#0077b6',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    fontFamily: 'SpaceMono',
  },
  logoutButton: {
    backgroundColor: '#ff6b6b',
    borderColor: '#ff5252',
  },
  logoutButtonText: {
    color: '#fff',
  },
  userEmail: {
    color: '#0077b6',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    fontFamily: 'SpaceMono',
    marginTop: 8,
  },
});
