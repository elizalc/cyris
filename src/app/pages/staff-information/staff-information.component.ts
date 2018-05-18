import { Component, OnInit, ViewChild, ElementRef, TemplateRef, ChangeDetectorRef, Inject, OnChanges, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { PersonalService } from "../../services/personal.service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
// import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DataSource } from '@angular/cdk/collections';
import { Personal } from "../../models/personal.model";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialModule } from "../../material/material.module";

@Component({
  selector: 'app-staff-information',
  templateUrl: './staff-information.component.html',
  styleUrls: ['./staff-information.component.css']
})
export class StaffInformationComponent implements OnInit, OnChanges, AfterViewInit {

  public allPersonal= []
  public userFilterAll = {
    name: ''
  }
  public modalRef: BsModalRef;
  displayedColumns = ['nombre', 'paterno', 'materno', 'nroDNI', 'estadoCivil', 'fechaNacimiento', 'Acciones'];
  dataSource = new MatTableDataSource<Personal>();
  //dataSource = new PersonalDataSource(this.pes);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(
    public dialog: MatDialog,
    private pes : PersonalService,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.refresh()
    this.pes.getPersonal()
      .subscribe(data => {
        this.dataSource.data = data;
      })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  
    //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }
  ngOnChanges(){
    this.refresh()
  }
  openModal(id):void{
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  showPersonal() {
    console.log('algo')
    this.pes.getPersonal()
      .subscribe(
        data => console.log(data)
      )
  }

  deletePersonal(id): void {
    this.pes.deletePersonal(id)
      .subscribe(
        data=> console.log(data)
      )
    this.refresh()
  }
  
  refresh() {
    this.pes.getPersonal()
      .subscribe(data => {
        this.dataSource.data = data;
      })
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

export class PersonalDataSource extends DataSource<any> {


  constructor(private pes: PersonalService) {
    super();
  }
  connect(): Observable<Personal[]> {
    return this.pes.getPersonal();
  }
  disconnect() { }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  dataSource = new MatTableDataSource<Personal>();

  constructor(
    private pes: PersonalService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
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
 
}