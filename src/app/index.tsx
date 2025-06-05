import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/icon.png')} style={styles.icon} />
        <Text style={styles.title}>Bem-vindo ao HealthTrack!</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <CustomButton text="💧 REGISTRO DE ÁGUA" onPress={() => router.push('/agua')} />
        <CustomButton text="🏃‍♂️ ATIVIDADES FÍSICAS" onPress={() => router.push('/atividade')} />
        <CustomButton text="😴 MONITORAMENTO DO SONO" onPress={() => router.push('/sono')} />
        <CustomButton text="📊 HISTÓRICO GERAL" onPress={() => router.push('/historico')} />
      </View>
    </View>
  );
}

function CustomButton({ text, onPress }: { text: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f2ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
    backgroundColor: '#fff',
    elevation: 5, // sombra Android
    shadowColor: '#000', // sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0077b6',
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f8f8f8',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginVertical: 10,
    width: 260,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#0077b6',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
});