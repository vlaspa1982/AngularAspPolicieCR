export interface GpsData {
  type: string;
  dateTime: Date;
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  geoidHeight: number | null;
  speed: number | null;
  bearing: number | null;
  satUsed: number;
  satInView: number;
  name: string | null;
  description: string | null;
}