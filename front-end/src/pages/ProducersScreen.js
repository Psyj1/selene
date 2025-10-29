// pages/ProducersScreen.js - CÓDIGO COMPLETO
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProducersScreen = ({ navigation }) => {
  const [producers] = useState([
    {
      _id: '1',
      nome: 'Fazenda Cogumelo Azul',
      cidade: 'Eldorado',
      estado: 'SP',
      responsavel: 'Maria Oliveira',
      status_operacional: 'Ativa',
      capacidade_producao: '350 kg/mês',
      numero_estufas: 6
    },
    {
      _id: '2', 
      nome: 'Cogumelos São Paulo',
      cidade: 'São Paulo',
      estado: 'SP',
      responsavel: 'João Silva',
      status_operacional: 'Ativa',
      capacidade_producao: '280 kg/mês',
      numero_estufas: 4
    }
  ]);

  const handleProducerPress = (producer) => {
    Alert.alert(
      producer.nome,
      `Responsável: ${producer.responsavel}\nLocal: ${producer.cidade} - ${producer.estado}\nProdução: ${producer.capacidade_producao}\nEstufas: ${producer.numero_estufas}`,
      [{ text: 'OK' }]
    );
  };

  const renderProducerItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.producerCard}
      onPress={() => handleProducerPress(item)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.producerName}>{item.nome}</Text>
        <View style={[
          styles.statusBadge, 
          { backgroundColor: item.status_operacional === 'Ativa' ? '#4CAF50' : '#FF9800' }
        ]}>
          <Text style={styles.statusText}>{item.status_operacional}</Text>
        </View>
      </View>
      
      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.infoText}>{item.cidade} - {item.estado}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={16} color="#666" />
          <Text style={styles.infoText}>{item.responsavel}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="stats-chart-outline" size={16} color="#666" />
          <Text style={styles.infoText}>{item.capacidade_producao}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Produtores</Text>
        <Text style={styles.subtitle}>{producers.length} produtores cadastrados</Text>
      </View>

      <FlatList
        data={producers}
        renderItem={renderProducerItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  listContent: {
    padding: 16,
  },
  producerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  producerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardBody: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProducersScreen;