import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
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
    <View style={styles.container}>
      <Text style={styles.titulo}>Monitoramento do Sono 🛌</Text>
      <TextInput
        style={styles.input}
        placeholder="Data (ex: 20/05/2025)"
        value={data}
        onChangeText={setData}
      />
      <TextInput
        style={styles.input}
        placeholder="Horas de sono (ex: 7.5)"
        keyboardType="numeric"
        value={horas}
        onChangeText={setHoras}
      />
      <Button title="Adicionar" onPress={adicionar} />
      <Text style={styles.subtitulo}>Registros:</Text>
      <FlatList
        data={registros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.item}>{item.data} - {item.horas} horas</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subtitulo: { fontSize: 18, marginTop: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  item: { fontSize: 16 },
});