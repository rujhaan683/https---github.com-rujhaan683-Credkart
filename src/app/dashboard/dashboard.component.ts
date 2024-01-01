import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ChartComponent } from '../chart/chart.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;

  displayedColumns: string[] = [
    'id',
    'name',
    'date',
    'amount',
    'selectedC',
    'selectedM',
    'delete',
    'edit',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllData();    
  }
  
  getAllData() {
    this.api.getData().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        this.toastr.warning('error while fetching the records');
      },
    });
  }

  dataAdd() {
    this.dialog.open(DialogComponent, {
      width: '80%',
      panelClass: 'app-full-bleed-dialog',
      height: '75%',
    });
  }

  dataPrint() {
    this.dialog.open(ChartComponent, {
      width: '80%',
      height: '75%',
    });
  }

  editData(row: any) {
    this.dialog.open(DialogComponent, {
      width: '80%',
      panelClass: 'app-full-bleed-dialog',
      height: '75%',
      data: row,
    });
  }
  deleteData(id: number) {
    this.api.deleteData(id).subscribe({
      next: (res) => {
        this.getAllData();
        this.toastr.warning('Expense Deleted');
      },
      error: () => {
        alert('Error while deleting the Data');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
