import { Component } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.component.html',
  styleUrls: ['./terms-and-condition.component.scss']
})
export class TermsAndConditionComponent {
  public Editor = ClassicEditor;
  termsContent: string = `<h3>Welcome to HobbyHub Terms & Conditions</h3><ul><li>Use of this platform is subject to the following terms.</li><li>All content is for general information only.</li><li>Do not misuse the service.</li></ul><p>By using this site, you agree to comply with these terms.</p>`;
}
