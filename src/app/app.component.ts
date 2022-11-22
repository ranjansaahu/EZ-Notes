import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotesServiceService } from './services/notes-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'GKeep';
  displayedColumns: string[] = ['taskName', 'taskBody', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: NotesServiceService) {}
  ngOnInit(): void {
    this.getAllNotes();
  }
  getAllNotes() {
    this.api.getNotes().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        alert('Error while fetching the records!!');
      },
    });
  }
  deleteNotes(id: any) {
    this.api.deleteNotes(id).subscribe({
      next: (data) => {
        alert('Notes Deleted successfully!!');
        this.getAllNotes();
      },
      error: () => {
        alert('Error while deleting!!!');
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
