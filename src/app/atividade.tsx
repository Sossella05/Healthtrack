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
import { collection, addDoc, onSnapshot, query, deleteDoc, doc } from "firebase/firestore";

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

  const excluirAtividade = async (id: string) => {
    console.log('Tentando excluir atividade com id:', id);
    if (Platform.OS === "web") {
      if (window.confirm("Tem certeza que deseja excluir esta atividade?")) {
        try {
          await deleteDoc(doc(db, 'atividadesFisicas', id));
          console.log('Atividade excluída:', id);
        } catch (error) {
          console.error('Erro ao excluir:', error);
          window.alert('Não foi possível excluir a atividade.');
        }
      }
    } else {
      Alert.alert(
        'Excluir atividade',
        'Tem certeza que deseja excluir esta atividade?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Excluir', style: 'destructive', onPress: async () => {
              try {
                await deleteDoc(doc(db, 'atividadesFisicas', id));
                console.log('Atividade excluída:', id);
              } catch (error) {
                console.error('Erro ao excluir:', error);
                Alert.alert('Erro', 'Não foi possível excluir a atividade.');
              }
            }
          }
        ]
      );
    }
  };

  function formatarData(text: string) {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 4) {
      cleaned = cleaned.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
    } else if (cleaned.length > 2) {
      cleaned = cleaned.replace(/(\d{2})(\d{0,2})/, '$1/$2');
    }
    return cleaned;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.titulo}>Registro de Atividades 🏃‍♀️</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da atividade"
        value={nome}
        onChangeText={setNome}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Duração (minutos)"
        keyboardType="numeric"
        value={duracao}
        onChangeText={setDuracao}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Data (ex: 20/05/2025)"
        value={data}
        onChangeText={text => setData(formatarData(text))}
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={adicionar} activeOpacity={0.8}>
        <Text style={styles.buttonText}>ADICIONAR</Text>
      </TouchableOpacity>
      <Text style={styles.subtitulo}>Atividades cadastradas:</Text>
      <FlatList
        data={atividades}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={styles.cardNome}>{item.data} - {item.nome} ({item.duracao} min)</Text>
              <TouchableOpacity onPress={() => excluirAtividade(item.id)} style={styles.excluirBtn}>
                <Text style={styles.excluirTxt}>✕</Text>
              </TouchableOpacity>
            </View>
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
  cardNome: {
    fontSize: 16,
    color: '#222',
  },
  excluirBtn: {
    marginLeft: 12,
    backgroundColor: '#ffdddd',
    borderRadius: 16,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  excluirTxt: {
    color: '#d90429',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
