import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { PersonalService } from "../../services/personal.service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import { DataSource } from '@angular/cdk/collections';
import { Personal } from "../../models/personal.model";

@Component({
  selector: 'app-staff-information',
  templateUrl: './staff-information.component.html',
  styleUrls: ['./staff-information.component.css']
})
export class StaffInformationComponent implements OnInit {

  public allPersonal= []
  public userFilterAll = {
    name: ''
  }
  displayedColumns = ['nombre', 'paterno', 'materno', 'nroDNI', 'estadoCivil', 'fechaNacimiento', 'Acciones'];
  dataSource = new PersonalDataSource(this.pes);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(
    private pes : PersonalService
  ) { }

  ngOnInit() {
    this.pes.getPersonal()
  }

  ngAfterViewInit() {
    //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
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
    this.pes.getPersonal()
  }

  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  //   this.dataSource.filter = filterValue;
  // }

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
