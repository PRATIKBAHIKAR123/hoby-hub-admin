import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Input() acceptedFormats: string = '.jpg,.png,.zip,.mp4'; // Default formats
  @Output() fileSelected = new EventEmitter<File>();

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileSelected.emit(file);
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      this.fileSelected.emit(event.dataTransfer.files[0]);
    }
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }
}
