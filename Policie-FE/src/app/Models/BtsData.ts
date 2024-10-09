export interface CellTower {
  radioType: string;
  mobileCountryCode: number;
  mobileNetworkCode: number;
  locationAreaCode: number;
  cellId: number;
  primaryScramblingCode: number;
  serving: number;
  signalStrength: number;
}

export interface Position {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number;
  heading: number;
  speed: number;
  source: string;
}

export interface BtsData {
  timestamp: number;
  position: Position;
  cellTowers: CellTower[];
}