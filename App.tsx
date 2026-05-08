import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Character, GlobalData, RootTabParamList } from './src/types';
import { CategoryScreen } from './src/screens/CategoryScreen';
import { ResumenScreen } from './src/screens/ResumenScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0F0F13',
    card: '#1E1E28',
    text: '#FFF',
    border: '#2A2A36',
  },
};

export default function App() {
  const [globalData, setGlobalData] = useState<GlobalData>({
    lastConsulted: {},
    totalImages: 0,
    modalVisible: false,
    selectedCharacter: null
  });

  const openModal = (char: Character) => setGlobalData(p => ({ ...p, modalVisible: true, selectedCharacter: char }));
  const closeModal = () => setGlobalData(p => ({ ...p, modalVisible: false, selectedCharacter: null }));

  return (
    <NavigationContainer theme={DarkTheme}>
      <Tab.Navigator 
        id="main-tabs"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1E1E28',
            borderTopColor: '#2A2A36',
            height: 60,
            paddingBottom: 5,
            paddingTop: 5,
          },
          tabBarActiveTintColor: '#6C5CE7',
          tabBarInactiveTintColor: '#A0A0B0',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            paddingBottom: 5
          }
        }}
      >
        <Tab.Screen name="Saint Seiya">
          {() => <CategoryScreen category="saint seiya" globalData={{...globalData, openModal}} setGlobalData={setGlobalData} />}
        </Tab.Screen>
        <Tab.Screen name="Hunter x Hunter">
          {() => <CategoryScreen category="hunter x hunter" globalData={{...globalData, openModal}} setGlobalData={setGlobalData} />}
        </Tab.Screen>
        <Tab.Screen name="One Piece">
          {() => <CategoryScreen category="one piece" globalData={{...globalData, openModal}} setGlobalData={setGlobalData} />}
        </Tab.Screen>
        <Tab.Screen name="Resumen">
          {() => <ResumenScreen globalData={{...globalData, openModal}} />}
        </Tab.Screen>
      </Tab.Navigator>

      <Modal visible={globalData.modalVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{globalData.selectedCharacter?.nombre}</Text>
            <View style={styles.imageGrid}>
              {globalData.selectedCharacter?.imagenes?.slice(0, 4).map((img, idx) => (
                <View key={idx} style={styles.imageWrapper}>
                  <Image source={{ uri: img }} style={styles.image} />
                  <Text style={styles.imageCaption}>Ángulo {idx + 1}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal} activeOpacity={0.8}>
              <Text style={styles.closeButtonText}>CERRAR GALERÍA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#1E1E28', padding: 25, borderRadius: 16, width: '90%', borderWidth: 1, borderColor: '#2A2A36' },
  modalTitle: { fontSize: 22, fontWeight: '900', color: '#FFF', marginBottom: 20, textAlign: 'center', letterSpacing: 0.5 },
  imageGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  imageWrapper: { alignItems: 'center', marginBottom: 20, width: '48%' },
  image: { width: 130, height: 130, borderRadius: 12, backgroundColor: '#2A2A36', marginBottom: 8, borderWidth: 1, borderColor: '#333' },
  imageCaption: { color: '#A0A0B0', fontSize: 12, fontWeight: '600' },
  closeButton: { backgroundColor: '#FF4757', paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  closeButtonText: { color: '#FFF', fontWeight: 'bold', letterSpacing: 1, fontSize: 14 }
});
