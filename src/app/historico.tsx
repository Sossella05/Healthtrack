import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { db } from "@/config/firebaseConfig";
import { collection, onSnapshot, query } from "firebase/firestore";

export default function HistoricoScreen() {
  const [agua, setAgua] = useState<any[]>([]);
  const [sono, setSono] = useState<any[]>([]);
  const [atividade, setAtividade] = useState<any[]>([]);

  useEffect(() => {
    // Água
    const unsubAgua = onSnapshot(query(collection(db, "registrosAgua")), (snapshot) => {
      const lista: any[] = [];
      snapshot.forEach((doc) => lista.push({ id: doc.id, ...doc.data() }));
      setAgua(lista);
    });

    // Sono
    const unsubSono = onSnapshot(query(collection(db, "registrosSono")), (snapshot) => {
      const lista: any[] = [];
      snapshot.forEach((doc) => lista.push({ id: doc.id, ...doc.data() }));
      setSono(lista);
    });

    // Atividades
    const unsubAtividade = onSnapshot(query(collection(db, "atividadesFisicas")), (snapshot) => {
      const lista: any[] = [];
      snapshot.forEach((doc) => lista.push({ id: doc.id, ...doc.data() }));
      setAtividade(lista);
    });

    return () => {
      unsubAgua();
      unsubSono();
      unsubAtividade();
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>📋 Histórico Geral</Text>

      <Text style={styles.subtitulo}>💧 Água</Text>
      {agua.length > 0 ? (
        agua.map((item, i) => (
          <Text key={item.id} style={styles.item}>
            • {item.quantidade} ml ({item.data?.seconds
              ? new Date(item.data.seconds * 1000).toLocaleString()
              : item.data})
          </Text>
        ))
      ) : (
        <Text style={styles.vazio}>Nenhum registro</Text>
      )}

      <Text style={styles.subtitulo}>😴 Sono</Text>
      {sono.length > 0 ? (
        sono.map((item, i) => (
          <Text key={item.id} style={styles.item}>
            • {item.data} — {item.horas} horas
          </Text>
        ))
      ) : (
        <Text style={styles.vazio}>Nenhum registro</Text>
      )}

      <Text style={styles.subtitulo}>🏋️ Atividades</Text>
      {atividade.length > 0 ? (
        atividade.map((item, i) => (
          <Text key={item.id} style={styles.item}>
            • {item.data} — {item.nome} ({item.duracao} min)
          </Text>
        ))
      ) : (
        <Text style={styles.vazio}>Nenhum registro</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subtitulo: { fontSize: 18, marginTop: 20 },
  item: { padding: 8, fontSize: 16, borderBottomWidth: 1, borderColor: "#eee" },
  vazio: { color: "#888", fontStyle: "italic", marginBottom: 10 },
});