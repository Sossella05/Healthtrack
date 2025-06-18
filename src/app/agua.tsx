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

export default function AguaScreen() {
  const [quantidade, setQuantidade] = useState("");
  const [registros, setRegistros] = useState<any[]>([]);

  useEffect(() => {
    const subscriber = onSnapshot(query(collection(db, "registrosAgua")), (snapshot) => {
      const lista: any[] = [];
      snapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setRegistros(lista);
    });
    return () => subscriber();
  }, []);

  const adicionarRegistro = async () => {
    if (!quantidade || isNaN(Number(quantidade)) || Number(quantidade) <= 0) {
      Alert.alert("Erro", "Por favor, insira uma quantidade válida.");
      return;
    }
    try {
      await addDoc(collection(db, "registrosAgua"), {
        quantidade: Number(quantidade),
        data: new Date(),
      });
      Alert.alert("Sucesso", "Registro salvo com sucesso!");
      setQuantidade("");
    } catch (error) {
      console.error("Erro ao salvar no Firebase:", error);
      Alert.alert("Erro", "Não foi possível salvar o registro.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.titulo}>Registro de Água 💧</Text>
      <TextInput
        style={styles.input}
        placeholder="Quantidade (ml)"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={adicionarRegistro} activeOpacity={0.8}>
        <Text style={styles.buttonText}>ADICIONAR</Text>
      </TouchableOpacity>
      <Text style={styles.subtitulo}>Registros:</Text>
      <FlatList
        data={registros.sort((a, b) => b.data.seconds - a.data.seconds)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardQuantidade}>{item.quantidade} ml</Text>
            <Text style={styles.cardData}>
              {item.data?.seconds
                ? new Date(item.data.seconds * 1000).toLocaleString()
                : item.data}
            </Text>
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
  cardQuantidade: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0077b6',
  },
  cardData: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
});