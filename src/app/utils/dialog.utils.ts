import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ImageCropperUtilComponent } from '../components/image-cropper-util/image-cropper-util.component';

export function openCropperDialog(dialog: MatDialog): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.width = '100%';
  dialogConfig.height = '100%';
  dialogConfig.panelClass = 'full-screen-modal';
  dialogConfig.maxHeight = '100vh';
  dialogConfig.maxWidth = '100vw';

  const dialogRef = dialog.open(ImageCropperUtilComponent, dialogConfig);

  dialogRef.afterClosed().subscribe((result) => {
    console.log(`Dialog result: ${result}`);
  });
}
