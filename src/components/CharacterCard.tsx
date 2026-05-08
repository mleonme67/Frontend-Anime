import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Character } from '../types';

interface Props {
  character: Character;
  onShowImages: (char: Character) => void;
}

export const CharacterCard = ({ character, onShowImages }: Props) => {
  const avatarUrl = character.imagenes && character.imagenes.length > 0 ? character.imagenes[0] : null;

  return (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]} />
        )}
        <View style={styles.cardContent}>
          <Text style={styles.name}>{character.nombre}</Text>
          <Text style={styles.label}>Edad: <Text style={styles.value}>{character.edad}</Text></Text>
          <Text style={styles.label}>Técnica: <Text style={styles.value}>{character.poder_tecnica}</Text></Text>
        </View>
      </View>
      <TouchableOpacity style={styles.imageButton} onPress={() => onShowImages(character)} activeOpacity={0.8}>
        <Text style={styles.imageButtonText}>VER GALERÍA ({character.imagenes?.length || 0} FOTOS)</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { 
    backgroundColor: '#1E1E28', 
    padding: 16, 
    borderRadius: 16, 
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#2A2A36'
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#6C5CE7',
  },
  avatarPlaceholder: {
    backgroundColor: '#2A2A36',
  },
  cardContent: { 
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  label: { 
    fontWeight: '600', 
    color: '#A0A0B0',
    fontSize: 13,
    marginBottom: 2,
  },
  value: { 
    fontWeight: '400', 
    color: '#E0E0E0' 
  },
  imageButton: { 
    backgroundColor: 'rgba(108, 92, 231, 0.15)', 
    paddingVertical: 12, 
    borderRadius: 12, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(108, 92, 231, 0.3)',
  },
  imageButtonText: { 
    color: '#8C7AE6',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 0.5,
  }
});
