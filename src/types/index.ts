export interface Character {
  nombre: string;
  edad: string;
  poder_tecnica: string;
  imagenes: string[];
}

export interface GlobalData {
  lastConsulted: Record<string, Character>;
  totalImages: number;
  modalVisible: boolean;
  selectedCharacter: Character | null;
  openModal?: (character: Character) => void;
}

export type RootTabParamList = {
  'Saint Seiya': undefined;
  'Hunter x Hunter': undefined;
  'One Piece': undefined;
  'Resumen': undefined;
};
