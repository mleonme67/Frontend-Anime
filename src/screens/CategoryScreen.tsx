import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import { Character, GlobalData } from '../types';
import { CharacterCard } from '../components/CharacterCard';

const API_BASE = 'https://backend-anime-2brq.onrender.com';
const API_URL = `${API_BASE}/api/animes`;

interface Props {
  category: string;
  globalData: GlobalData;
  setGlobalData: React.Dispatch<React.SetStateAction<GlobalData>>;
}

export const CategoryScreen = ({ category, globalData, setGlobalData }: Props) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [searchName, setSearchName] = useState<string>('');

  const fetchCharacters = async () => {
    try {
      setError(null);
      setSuccessMsg(null);
      
      let cleanCategory = category.trim().toLowerCase();
      const encodedCategory = encodeURIComponent(cleanCategory);
      const encodedName = encodeURIComponent(searchName.trim());
      
      let url = `${API_URL}?category=${encodedCategory}`;
      if (searchName) url += `&nombre=${encodedName}`;

      const response = await axios.get<Character[]>(url);
      
      const charactersWithDynamicImages = response.data.map(char => ({
        ...char,
        imagenes: char.imagenes?.map((img: string) => img.startsWith('http') ? img : `${API_BASE}${img}`) || []
      }));

      setCharacters(charactersWithDynamicImages);
      
      if (charactersWithDynamicImages.length === 0) {
        if (searchName.trim()) {
          setError(`No se encontró a "${searchName}" en ${category.toUpperCase()}.`);
        } else {
          setError(`No hay personajes registrados en ${category.toUpperCase()}.`);
        }
      } else {
        const newImagesCount = charactersWithDynamicImages.reduce((acc, c) => acc + (c.imagenes?.length || 0), 0);
        setSuccessMsg(`¡Éxito! Se recuperaron ${newImagesCount} imágenes.`);
        
        setGlobalData(prev => {
          const firstChar = charactersWithDynamicImages[0];
          const prevChar = prev.lastConsulted[category];
          
          // Solo sumamos si es un personaje distinto al que ya estaba registrado en esta categoría
          const isSameCharacter = prevChar && prevChar.nombre === firstChar.nombre;
          const imagesToAdd = isSameCharacter ? 0 : newImagesCount;

          return {
            ...prev,
            lastConsulted: { ...prev.lastConsulted, [category]: firstChar },
            totalImages: prev.totalImages + imagesToAdd
          };
        });
      }
    } catch (err) {
      setError('Error de conexión con el servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category.toUpperCase()}</Text>
      
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput} 
            value={searchName} 
            onChangeText={setSearchName} 
            placeholder="Buscar personaje..." 
            placeholderTextColor="#A0A0B0"
          />
          <TouchableOpacity style={styles.consultButton} onPress={fetchCharacters} activeOpacity={0.8}>
            <Text style={styles.consultButtonText}>BUSCAR</Text>
          </TouchableOpacity>
        </View>
      </View>

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      {successMsg && (
        <View style={styles.successBox}>
          <Text style={styles.successText}>{successMsg}</Text>
        </View>
      )}

      <FlatList
        data={characters}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <CharacterCard character={item} onShowImages={globalData.openModal!} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Presiona Buscar para ver a los guerreros.</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0F13', paddingHorizontal: 20, paddingTop: 50 },
  title: { fontSize: 28, fontWeight: '900', color: '#FFF', marginBottom: 20, textAlign: 'center', letterSpacing: 1 },
  searchWrapper: { marginBottom: 20 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E28', borderRadius: 12, paddingHorizontal: 5, paddingVertical: 5, borderWidth: 1, borderColor: '#2A2A36' },
  searchInput: { flex: 1, color: '#FFF', fontSize: 16, paddingHorizontal: 15, paddingVertical: 10 },
  consultButton: { backgroundColor: '#6C5CE7', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8 },
  consultButtonText: { color: '#FFF', fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  errorBox: { backgroundColor: 'rgba(255, 71, 87, 0.1)', padding: 12, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: 'rgba(255, 71, 87, 0.3)' },
  errorText: { color: '#FF4757', textAlign: 'center', fontWeight: '600' },
  successBox: { backgroundColor: 'rgba(46, 213, 115, 0.1)', padding: 12, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: 'rgba(46, 213, 115, 0.3)' },
  successText: { color: '#2ED573', textAlign: 'center', fontWeight: 'bold' },
  emptyContainer: { alignItems: 'center', marginTop: 40 },
  emptyText: { color: '#666', fontSize: 16, fontStyle: 'italic' }
});
