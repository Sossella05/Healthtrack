import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { db } from "@/config/firebaseConfig";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";

export default function SonoScreen() {
  const [data, setData] = useState("");
  const [horas, setHoras] = useState("");
  const [registros, setRegistros] = useState<any[]>([]);

  useEffect(() => {
    const subscriber = onSnapshot(query(collection(db, "registrosSono")), (snapshot) => {
      const lista: any[] = [];
      snapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setRegistros(lista);
    });
    return () => subscriber();
  }, []);

  const adicionar = async () => {
    if (!data || !horas || isNaN(Number(horas)) || Number(horas) <= 0) {
      Alert.alert("Erro", "Por favor, insira uma data e horas válidas.");
      return;
    }
    try {
      await addDoc(collection(db, "registrosSono"), {
        data,
        horas: Number(horas),
      });
      Alert.alert("Sucesso", "Registro de sono salvo!");
      setData("");
      setHoras("");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o registro.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.titulo}>Monitoramento do Sono 🛌</Text>
      <TextInput
        style={styles.input}
        placeholder="Data (ex: 20/05/2025)"
        value={data}
        onChangeText={setData}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Horas de sono (ex: 7.5)"
        keyboardType="numeric"
        value={horas}
        onChangeText={setHoras}
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={adicionar} activeOpacity={0.8}>
        <Text style={styles.buttonText}>ADICIONAR</Text>
      </TouchableOpacity>
      <Text style={styles.subtitulo}>Registros:</Text>
      <FlatList
        data={registros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardInfo}>{item.data} - {item.horas} horas</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f2ff',
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0077b6',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 12,
    marginBottom: 12,
    borderRadius: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#222',
  },
  button: {
    backgroundColor: '#f8f8f8',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
    elevation: 2,
  },
  buttonText: {
    color: '#0077b6',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 20,
    color: '#0077b6',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 1,
  },
  cardInfo: {
    fontSize: 16,
    color: '#222',
  },
});