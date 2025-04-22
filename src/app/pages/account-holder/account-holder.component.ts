import { Component } from '@angular/core';

@Component({
  selector: 'app-account-holder',
  templateUrl: './account-holder.component.html',
  styleUrls: ['./account-holder.component.scss']
})
export class AccountHolderComponent {
  handleFile(file: File) {
    console.log('File selected:', file);
    // Upload logic here
  }
}
