import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { PersonalService } from "../../services/personal.service";
import { Personal } from "../../models/personal.model";
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  // dataSource = new MatTableDataSource<Personal>();
  dataSource = new MatTableDataSource<Personal>();

  constructor(
    private pes: PersonalService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
    this.pes.getPersonal()
      .subscribe(data => {
        this.dataSource.data = data;
      })
  }
  deletePersonal(id): void {
    this.pes.deletePersonal(id)
      .subscribe(
        data => console.log(data)
      )
    this.onNoClick()
  }
  ngOnInit() {
  }

}
