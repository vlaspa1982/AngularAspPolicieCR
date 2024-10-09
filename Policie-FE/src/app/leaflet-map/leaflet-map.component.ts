// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import * as L from 'leaflet';
// import { BtsData } from '../Models/BtsData';  // Import modelu
// import { GpsData } from '../Models/GpsData';

// @Component({
//   selector: 'app-leaflet-map',
//   templateUrl: './leaflet-map.component.html',
//   styleUrls: ['./leaflet-map.component.css'],
//   standalone: true,
//   imports: [CommonModule]
// })
// export class LeafletMapComponent implements OnInit {
//   map: any;
//   btsData: BtsData[] = [];  // Array pro uložená BTS data
//   gpsData: GpsData[] = [];  // Array pro GPS data
//   btsLayerGroup = L.layerGroup();  // LayerGroup pro BTS
//   gpsLayerGroup = L.layerGroup();  // LayerGroup pro GPS
//   btsDataLoaded: boolean = false;
//   gpsDataLoaded: boolean = false;

//   ngOnInit(): void {
//     this.configMap();
//   }

//   // Inicializace a konfigurace mapy
//   configMap() {
//     this.map = L.map('map').setView([51.505, -0.09], 10);
//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(this.map);

//     this.btsLayerGroup.addTo(this.map);
//     this.gpsLayerGroup.addTo(this.map);

//     // Ovládací vrstvy pro zapínání/vypínání BTS a GPS dat
//     const overlayMaps = {
//       "BTS Data": this.btsLayerGroup,
//       "GPS Data": this.gpsLayerGroup,
//     };
//     L.control.layers(overlayMaps).addTo(this.map);
//   }

//   // Funkce pro načtení BTS dat ze souboru JSON
//   onJsonFileSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (!input.files?.length) return;

//     const file = input.files[0];
//     const reader = new FileReader();
//     reader.onload = () => {
//       const fileContent = reader.result as string;
//       this.btsData = JSON.parse(fileContent).items;  // Uložení dat do btsData
//       this.btsDataLoaded = true;
//       this.addDataToMap();
//     };
//     reader.readAsText(file);
//   }

//   // Funkce pro přidání BTS dat na mapu
//   addDataToMap(): void {
//     if (!this.btsDataLoaded) return;

//     const latlngs = this.btsData.map(data => [data.position.latitude, data.position.longitude] as [number, number]);
//     L.polyline(latlngs, { color: 'blue' }).addTo(this.btsLayerGroup);

//     this.btsData.forEach(data => {
//       const marker = L.marker([data.position.latitude, data.position.longitude], { riseOnHover: true });
//       const cellTowerInfo = data.cellTowers.map(tower => `
//         <b>Cell ID:</b> ${tower.cellId}<br>
//         <b>Radio Type:</b> ${tower.radioType}<br>
//         <b>Signal Strength:</b> ${tower.signalStrength} dBm<br>
//       `).join('<br>');

//       const btsDataInfo = `
//         <b>Time:</b> ${data.timestamp}<br>
//         <b>Latitude:</b> ${data.position.latitude}<br>
//         <b>Longitude:</b> ${data.position.longitude}<br>
//         ${cellTowerInfo}
//       `;

//       marker.bindPopup(btsDataInfo).addTo(this.btsLayerGroup);
//     });

//     this.map.fitBounds(L.polyline(latlngs).getBounds());
//   }

//   // Funkce pro načtení GPS dat ze souboru TXT
//   onTxtFileSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (!input.files?.length) return;

//     const file = input.files[0];
//     const reader = new FileReader();
//     reader.onload = () => {
//       this.parseTxt(reader.result as string);
//       this.gpsDataLoaded = true;
//       this.addGpsDataToMap();
//     };
//     reader.readAsText(file);
//   }

//   // Funkce pro parsování TXT souboru s GPS daty
//   parseTxt(fileContent: string): void {
//     const lines = fileContent.split('\n').slice(1); // Přejdeme hlavičku
//     this.gpsData = lines.map(line => {
//       const values = line.split(',');
  
//       const latitude = parseFloat(values[2]);
//       const longitude = parseFloat(values[3]);
  
//       // Zkontrolujeme, jestli jsou souřadnice platná čísla
//       if (isNaN(latitude) || isNaN(longitude)) {
//         console.error(`Invalid GPS coordinates: ${values[2]}, ${values[3]}`);
//         return null;  // Vrátíme null pro neplatný řádek
//       }
  
//       return {
//         type: values[0],
//         dateTime: new Date(values[1]),
//         latitude: latitude,
//         longitude: longitude,
//         accuracy: parseFloat(values[4]),
//         altitude: values[5] ? parseFloat(values[5]) : null,
//         speed: values[7] ? parseFloat(values[7]) : null,
//       } as GpsData;
//     }).filter(data => data !== null);  // Odstraníme neplatné řádky
//     console.log('GPS Data:', this.gpsData);  // Výpis validních GPS dat do konzole
//   }
  
  

//   // Funkce pro přidání GPS dat na mapu
//   addGpsDataToMap(): void {
//     if (!this.gpsDataLoaded) return;
  
//     console.log('Adding GPS data to map', this.gpsData);
  
//     const latlngs = this.gpsData.map(data => {
//       if (isNaN(data.latitude) || isNaN(data.longitude)) {
//         console.error(`Invalid GPS point: ${data.latitude}, ${data.longitude}`);
//         return null;
//       }
//       return [data.latitude, data.longitude] as [number, number];
//     }).filter(latlng => latlng !== null);  // Odstraníme neplatné body
  
//     if (latlngs.length === 0) {
//       console.log('No valid GPS coordinates found');
//     } else {
//       console.log('Valid GPS coordinates:', latlngs);
//       L.polyline(latlngs, { color: 'red' }).addTo(this.gpsLayerGroup);
//     }
  
//     this.gpsData.forEach(data => {
//       if (!isNaN(data.latitude) && !isNaN(data.longitude)) {
//         const marker = L.marker([data.latitude, data.longitude]);
//         const gpsDataInfo = `
//           <b>Time:</b> ${data.dateTime.toLocaleString()}<br>
//           <b>Latitude:</b> ${data.latitude}<br>
//           <b>Longitude:</b> ${data.longitude}<br>
//           <b>Accuracy:</b> ${data.accuracy} m<br>
//           <b>Altitude:</b> ${data.altitude ?? 'N/A'} m<br>
//           <b>Speed:</b> ${data.speed ?? 'N/A'} m/s<br>
//         `;
//         marker.bindPopup(gpsDataInfo).addTo(this.gpsLayerGroup);
//       }
//     });
  
//     this.map.fitBounds(L.polyline(latlngs).getBounds());
//   }
  
  
// }
import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { BtsData } from '../Models/BtsData';  // Import modelu
import { GpsData } from '../Models/GpsData';
import { DataService } from '../Services/dataservice.service';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class LeafletMapComponent implements OnInit {
  map: any;
  btsData: BtsData[] = [];  // Array pro uložená BTS data
  gpsData: GpsData[] = [];  // Array pro GPS data
  btsLayerGroup = L.layerGroup();  // LayerGroup pro BTS
  gpsLayerGroup = L.layerGroup();  // LayerGroup pro GPS
  btsDataLoaded: boolean = false;
  gpsDataLoaded: boolean = false;
  gpsInformace:any;
  totalInformace:any;
  activeButton: string = 'total';  // Výchozí aktivní tlačítko

  // Nastavení aktivního tlačítka
  setActiveButton(button: string) {
    this.activeButton = button;
  }

  ngOnInit(): void {
    this.configMap();
  }

  // Inicializace a konfigurace mapy
  configMap() {
    this.map = L.map('map').setView([51.505, -0.09], 10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.btsLayerGroup.addTo(this.map);
    this.gpsLayerGroup.addTo(this.map);

    // Ovládací vrstvy pro zapínání/vypínání BTS a GPS dat
    const overlayMaps = {
      "BTS Data": this.btsLayerGroup,
      "GPS Data": this.gpsLayerGroup,
    };
    L.control.layers(overlayMaps).addTo(this.map);
  }

  // Funkce pro načtení BTS dat ze souboru JSON
  onJsonFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result as string;
      this.btsData = JSON.parse(fileContent).items;  // Uložení dat do btsData
      this.btsDataLoaded = true;
      this.addDataToMap();
    };
    reader.readAsText(file);
  }

  // Funkce pro přidání BTS dat na mapu
  addDataToMap(): void {
    if (!this.btsDataLoaded) return;

    const latlngs = this.btsData.map(data => [data.position.latitude, data.position.longitude] as [number, number]);
    L.polyline(latlngs, { color: 'blue' }).addTo(this.btsLayerGroup);

    this.btsData.forEach(data => {
      const marker = L.marker([data.position.latitude, data.position.longitude], { riseOnHover: true });
      const cellTowerInfo = data.cellTowers.map(tower => `
        <b>Cell ID:</b> ${tower.cellId}<br>
        <b>Radio Type:</b> ${tower.radioType}<br>
        <b>Signal Strength:</b> ${tower.signalStrength} dBm<br>
      `).join('<br>');

      const btsDataInfo = `
        <b>Time:</b> ${new Date(data.timestamp).toLocaleString()}<br>
        <b>Latitude:</b> ${data.position.latitude}<br>
        <b>Longitude:</b> ${data.position.longitude}<br>
        ${cellTowerInfo}
      `;

      marker.bindPopup(btsDataInfo).addTo(this.btsLayerGroup);
    });

    this.map.fitBounds(L.polyline(latlngs).getBounds());
  }

  // Funkce pro načtení GPS dat ze souboru TXT
  onTxtFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.parseTxt(reader.result as string);
      this.gpsDataLoaded = true;
      this.addGpsDataToMap();
    };
    reader.readAsText(file);
  }

  // Funkce pro parsování TXT souboru s GPS daty
  parseTxt(fileContent: string): void {
    const lines = fileContent.split('\n').slice(1); // Přejdeme hlavičku
    this.gpsData = lines.map(line => {
      const values = line.split(',');

      const latitude = parseFloat(values[2]);
      const longitude = parseFloat(values[3]);

      // Zkontrolujeme, jestli jsou souřadnice platná čísla
      if (isNaN(latitude) || isNaN(longitude)) {
        console.error(`Invalid GPS coordinates: ${values[2]}, ${values[3]}`);
        return null;  // Vrátíme null pro neplatný řádek
      }

      return {
        type: values[0],
        dateTime: new Date(values[1]), // Převod na Date objekt
        latitude: latitude,
        longitude: longitude,
        accuracy: parseFloat(values[4]),
        altitude: values[5] ? parseFloat(values[5]) : null,
        speed: values[7] ? parseFloat(values[7]) : null,
      } as GpsData;
    }).filter(data => data !== null);  // Odstraníme neplatné řádky
    console.log('GPS Data:', this.gpsData);  // Výpis validních GPS dat do konzole
  }

  // Funkce pro přidání GPS dat na mapu
  addGpsDataToMap(): void {
    if (!this.gpsDataLoaded) return;

    console.log('Adding GPS data to map', this.gpsData);

    const latlngs = this.gpsData.map(data => {
      if (isNaN(data.latitude) || isNaN(data.longitude)) {
        console.error(`Invalid GPS point: ${data.latitude}, ${data.longitude}`);
        return null;
      }
      return [data.latitude, data.longitude] as [number, number];
    }).filter(latlng => latlng !== null);  // Odstraníme neplatné body

    if (latlngs.length === 0) {
      console.log('No valid GPS coordinates found');
    } else {
      console.log('Valid GPS coordinates:', latlngs);
      L.polyline(latlngs, { color: 'red' }).addTo(this.gpsLayerGroup);
    }

    this.gpsData.forEach(data => {
      if (!isNaN(data.latitude) && !isNaN(data.longitude)) {
        const marker = L.marker([data.latitude, data.longitude]);
        marker.on('click', () => this.updateGpsPopup(marker, data)); // Přidání události pro kliknutí na marker
        marker.addTo(this.gpsLayerGroup);
      }
    });

    this.map.fitBounds(L.polyline(latlngs).getBounds());
  }

  // Funkce pro hledání nejbližší BTS na základě timestampu GPS dat
  findClosestBts(gpsTimestamp: Date): BtsData | null {
    const gpsTimeInMs = gpsTimestamp.getTime(); // Získání timestampu GPS v milisekundách

    // Hledání nejbližší BTS
    let closestBts: BtsData | null = null;
    let closestTimeDiff = Infinity; // Inicializace s nekonečnou hodnotou pro rozdíl

    this.btsData.forEach(bts => {
      const btsTimeInMs = bts.timestamp; // Timestamp BTS je již v ms
      const timeDiff = Math.abs(gpsTimeInMs - btsTimeInMs); // Rozdíl v čase

      // Pokud je rozdíl menší, než dosud nalezený, aktualizujeme closestBts
      if (timeDiff < closestTimeDiff) {
        closestTimeDiff = timeDiff;
        closestBts = bts;
      }
    });

    return closestBts; // Vracíme nejbližší BTS nebo null
  }

  // Funkce pro aktualizaci popupu GPS markeru
  updateGpsPopup(marker: L.Marker, gpsData: GpsData): void {
    const closestBts = this.findClosestBts(gpsData.dateTime); // Hledání nejbližší BTS

    // Sestavení obsahu popupu
    let popupContent = `
      <b>Time:</b> ${gpsData.dateTime.toLocaleString()}<br>
      <b>Latitude:</b> ${gpsData.latitude}<br>
      <b>Longitude:</b> ${gpsData.longitude}<br>
      <b>Accuracy:</b> ${gpsData.accuracy} m<br>
      <b>Altitude:</b> ${gpsData.altitude ?? 'N/A'} m<br>
      <b>Speed:</b> ${gpsData.speed ?? 'N/A'} m/s<br>
    `;
    this.gpsInformace = popupContent;
    if (closestBts) {
      const cellTowerInfo = closestBts.cellTowers.map(tower => `
        <b>Cell ID:</b> ${tower.cellId}<br>
        <b>Radio Type:</b> ${tower.radioType}<br>
        <b>Signal Strength:</b> ${tower.signalStrength} dBm<br>
      `).join('<br>');

      popupContent += `
        <b>Closest BTS:</b><br>
        <b>Cell ID:</b> ${closestBts.cellTowers[0].cellId}<br>
        <b>Time:</b> ${new Date(closestBts.timestamp).toLocaleString()}<br>
        ${cellTowerInfo}
      `;
      this.totalInformace = popupContent;
    } else {
      popupContent += `<b>No BTS data available</b>`;
      this.totalInformace += `<b>No BTS data available</b>`;
    }

    marker.bindPopup(popupContent).openPopup(); // Otevření popupu s novým obsahem
  }
  
  // ukládání dat do databáze
  
  constructor(private dataService: DataService) {}  // Injektování služby
  // Funkce pro uložení BTS a GPS dat po stisknutí tlačítka

  saveData(): void {
    this.dataService.saveData(this.btsData, this.gpsData).subscribe(
      (response) => {
        console.log('Data successfully saved to the database', response);
        alert('Data successfully saved to the database!');
      },
      (error) => {
        console.error('Error saving data to the database', error);
        alert('Error saving data to the database.');
      }
    );
  }
}
