import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'popup',
  templateUrl: 'popup.component.html',
  styles: [
    `
      :host {
        display: flex;
      }

      .example-pizza-party {
        color: hotpink;
      }
    `,
  ],
  standalone: true,
  imports: [MatButtonModule, MatSnackBarModule],
})
export class PopupComponent {
  snackBarRef = inject(MatSnackBarRef);
}
