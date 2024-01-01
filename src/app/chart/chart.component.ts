import { Component,ViewChild, ElementRef, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../services/api.service';

import html2canvas from 'html2canvas';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  displayedColumns: string[] = [
    'id',
    'name',
    'date',
    'amount',
    'selectedM',
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private api: ApiService,

  ) { }

  ngOnInit(): void {
    this.getAllData();    
  }


  getAllData() {
    this.api.getData().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log
        ('error while fetching the records');
      },
    });
  }


  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 210;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('expense-data.pdf');
    });
  }



}





