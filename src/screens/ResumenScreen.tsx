import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { GlobalData } from '../types';
import { CharacterCard } from '../components/CharacterCard';

interface Props {
  globalData: GlobalData;
}

export const ResumenScreen = ({ globalData }: Props) => (
  <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
    <Text style={styles.title}>RESUMEN GLOBAL</Text>
    
    <View style={styles.statsCard}>
      <Text style={styles.statsLabel}>Total Imágenes Recuperadas</Text>
      <Text style={styles.statsValue}>{globalData.totalImages}</Text>
    </View>

    <View style={styles.resumenSection}>
      <Text style={styles.resumenSubtitle}>Últimas Búsquedas</Text>
      {Object.keys(globalData.lastConsulted).length === 0 ? (
        <Text style={styles.emptyText}>Aún no has consultado ningún personaje.</Text>
      ) : (
        Object.entries(globalData.lastConsulted).map(([cat, char]) => (
          <View key={cat} style={styles.resumenCardWrapper}>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{cat.toUpperCase()}</Text>
            </View>
            <CharacterCard character={char} onShowImages={globalData.openModal!} />
          </View>
        ))
      )}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0F13', padding: 20, paddingTop: 50 },
  title: { fontSize: 26, fontWeight: '900', color: '#FFF', marginBottom: 25, textAlign: 'center', letterSpacing: 1 },
  statsCard: { 
    backgroundColor: '#6C5CE7', 
    padding: 25, 
    borderRadius: 16, 
    alignItems: 'center', 
    marginBottom: 35,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  statsLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 'bold', marginBottom: 5, letterSpacing: 0.5 },
  statsValue: { color: '#FFF', fontSize: 48, fontWeight: '900' },
  resumenSection: { marginBottom: 30 },
  resumenSubtitle: { fontSize: 18, fontWeight: 'bold', color: '#FFF', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#2A2A36', paddingBottom: 10 },
  emptyText: { color: '#A0A0B0', textAlign: 'center', fontStyle: 'italic', marginTop: 10 },
  resumenCardWrapper: { marginBottom: 10 },
  badgeContainer: { 
    backgroundColor: '#1E1E28', 
    alignSelf: 'flex-start', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 8, 
    marginBottom: -10, 
    marginLeft: 15,
    zIndex: 1,
    borderWidth: 1,
    borderColor: '#00D2FF'
  },
  badgeText: { fontSize: 10, fontWeight: '900', color: '#00D2FF', letterSpacing: 1 },
});
