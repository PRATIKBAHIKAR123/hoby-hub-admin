import { Component } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-privacy-policies',
  templateUrl: './privacy-policies.component.html',
  styleUrls: ['./privacy-policies.component.scss']
})
export class PrivacyPoliciesComponent {
  public Editor = ClassicEditor;
  termsContent: string = `<h3>Privacy policy</h3><ul><li>Use of this platform is subject to the following terms.</li><li>All content is for general information only.</li><li>Do not misuse the service.</li></ul><p>By using this site, you agree to comply with these terms.</p>`;
}
