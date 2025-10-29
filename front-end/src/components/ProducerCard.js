import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProducerCard = ({ producer, onPress }) => {
  const handlePress = () => {
    if (onPress) {
      onPress(producer);
    } else {
      Alert.alert(
        producer.nome,
        `Responsável: ${producer.responsavel}\nTelefone: ${producer.telefone_responsavel}\nProdução: ${producer.capacidade_producao}`
      );
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.name}>{producer.nome}</Text>
          <Text style={styles.location}>{producer.cidade} - {producer.estado}</Text>
        </View>
        <View style={[
          styles.statusBadge, 
          { backgroundColor: producer.status_operacional === 'Ativa' ? '#4CAF50' : '#FF9800' }
        ]}>
          <Text style={styles.statusText}>{producer.status_operacional}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={16} color="#666" />
          <Text style={styles.infoText}>{producer.responsavel}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="leaf-outline" size={16} color="#666" />
          <Text style={styles.infoText}>{producer.foco_producao}</Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Ionicons name="business-outline" size={14} color="#666" />
            <Text style={styles.statText}>{producer.numero_estufas} estufas</Text>
          </View>
          
          <View style={styles.stat}>
            <Ionicons name="analytics-outline" size={14} color="#666" />
            <Text style={styles.statText}>{producer.capacidade_producao}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  location: {
    fontSize: 14,
    color: '#666',
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
  body: {
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
  stats: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 12,
    color: '#666',
  },
});

export default ProducerCard;