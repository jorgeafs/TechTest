import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Company } from 'src/app/Models/company';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Company) {}

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnDestroy() {
    console.log(this.data.name);
  }
}
