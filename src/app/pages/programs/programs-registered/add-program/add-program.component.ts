import { Component } from '@angular/core';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.scss']
})
export class AddProgramComponent {


  handleFile(file: File) {
    console.log('File selected:', file);
    // Upload logic here
  }
}
