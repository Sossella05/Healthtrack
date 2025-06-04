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

interface Atividade {
  nome: string;
  duracao: string;
  data: string;
}

export default function AtividadeScreen() {
  const [nome, setNome] = useState("");
  const [duracao, setDuracao] = useState("");
  const [data, setData] = useState("");
  const [atividades, setAtividades] = useState<any[]>([]);

  useEffect(() => {
    const subscriber = onSnapshot(query(collection(db, "atividadesFisicas")), (snapshot) => {
      const lista: any[] = [];
      snapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setAtividades(lista);
    });

    return () => subscriber();
  }, []);

  const adicionar = async () => {
    if (nome && duracao && data) {
      try {
        await addDoc(collection(db, "atividadesFisicas"), {
          nome,
          duracao,
          data,
        });
        Alert.alert("Sucesso", "Atividade registrada!");
        setNome("");
        setDuracao("");
        setData("");
      } catch (error) {
        Alert.alert("Erro", "Não foi possível registrar a atividade.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro de Atividades 🏃‍♀️</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da atividade"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Duração (minutos)"
        keyboardType="numeric"
        value={duracao}
        onChangeText={setDuracao}
      />
      <TextInput
        style={styles.input}
        placeholder="Data (ex: 20/05/2025)"
        value={data}
        onChangeText={setData}
      />

      <Button title="Adicionar" onPress={adicionar} />

      <Text style={styles.subtitulo}>Atividades cadastradas:</Text>
      <FlatList
        data={atividades}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.data} - {item.nome} ({item.duracao} min)
          </Text>
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
  item: { padding: 8, fontSize: 16, borderBottomWidth: 1, borderColor: "#eee" },
});
