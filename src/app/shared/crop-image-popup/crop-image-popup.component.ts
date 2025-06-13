import { Component, EventEmitter, Output, Input } from '@angular/core';
import {  ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-crop-image-popup',
  templateUrl: './crop-image-popup.component.html',
  styleUrls: ['./crop-image-popup.component.scss'],
})
export class CropImagePopupComponent {
  @Input() imageUrl: string = '';
  @Output() cropComplete = new EventEmitter<File>();
  @Output() close = new EventEmitter<void>();

  croppedImage: string | null = null;

  onImageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64 || null;
  }

  onCropConfirm() {
    if (this.croppedImage) {
      const file = this.base64ToFile(this.croppedImage, 'cropped.png');
      this.cropComplete.emit(file);
    }
  }

  onClose() {
    this.close.emit();
  }

  onImageLoaded() {}
  onCropperReady() {}
  onLoadImageFailed() {
    this.croppedImage = null;
  }

  private base64ToFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : '';
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new File([u8arr], filename, { type: mime });
  }
}
