import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-action-buttons-column',
  template: `
    <div class="d-flex gap-2 align-items-center">
      <img src="assets/images/icons/Edit Square.png" width="16" height="16"
           class="action-icon edit-icon" (click)="onEdit()" />
      <img src="assets/images/icons/Delete 2.png" width="16" height="16"
           class="action-icon delete-icon" (click)="onDelete()" />
    </div>
  `,
  styles: [`.action-icon { cursor: pointer; }`]
})
export class ActionButtonsColumnComponent implements ICellRendererAngularComp{
    params: any;
  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  onEdit() {
    this.params.context.componentParent.onEdit(this.params.data);
  }

  onDelete() {
    this.params.context.componentParent.onDelete(this.params.data);
  }
}
