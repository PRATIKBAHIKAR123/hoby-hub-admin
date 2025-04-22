import { Component } from '@angular/core';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent {
  invoices = [
    {
      sno: "01",
      text: "Some Line is gonna come here Need to figure out",
      image: "assets/images/table.png",
      extra: "Something",
    },
    {
      sno: "02",
      text: "Some Line is gonna come here Need to figure out",
      image: "assets/images/table.png",
      extra: "Something",
    }
  ];
}
