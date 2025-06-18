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
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.titulo}>📋 Histórico Geral</Text>

      <Text style={styles.subtitulo}>💧 Água</Text>
      {agua.length > 0 ? (
        agua.map((item, i) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardInfo}>{item.quantidade} ml</Text>
            <Text style={styles.cardData}>
              {item.data?.seconds
                ? new Date(item.data.seconds * 1000).toLocaleString()
                : item.data}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.vazio}>Nenhum registro</Text>
      )}

      <Text style={styles.subtitulo}>😴 Sono</Text>
      {sono.length > 0 ? (
        sono.map((item, i) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardInfo}>{item.data} — {item.horas} horas</Text>
          </View>
        ))
      ) : (
        <Text style={styles.vazio}>Nenhum registro</Text>
      )}

      <Text style={styles.subtitulo}>🏋️ Atividades</Text>
      {atividade.length > 0 ? (
        atividade.map((item, i) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardInfo}>{item.data} — {item.nome} ({item.duracao} min)</Text>
          </View>
        ))
      ) : (
        <Text style={styles.vazio}>Nenhum registro</Text>
      )}
    </ScrollView>
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
  cardData: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  vazio: {
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 10,
  },
});