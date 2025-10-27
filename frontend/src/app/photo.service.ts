import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  // Tomar foto con la cámara
  async takePhoto(): Promise<Blob> {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });
    const response = await fetch(image.webPath!);
    return await response.blob();
  }

  // Elegir imagen desde la galería
  async pickImage(): Promise<Blob> {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });
    const response = await fetch(image.webPath!);
    return await response.blob();
  }
}
