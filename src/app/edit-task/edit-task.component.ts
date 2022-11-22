import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NotesServiceService } from '../services/notes-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
  panelOpenState = false;
  displayedColumns: string[] = ['taskName', 'taskBody', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  noteId: any;
  editNote: FormGroup;
  constructor(
    private activeRoute: ActivatedRoute,
    private noteService: NotesServiceService,
    private fb: FormBuilder,
    private myRoute: Router
  ) {
    this.editNote = this.fb.group({
      taskName: [''],
      taskBody: [''],
    });
    this.activeRoute.paramMap.subscribe((nid: any) => {
      console.log(JSON.stringify(nid));
      this.noteId = nid.params.id;
      this.noteService.getNoteById(this.noteId).subscribe(
        (data: any) => {
          console.log(JSON.stringify(data));

          this.editNote = this.fb.group({
            taskName: [data.taskName],
            taskBody: [data.taskBody],
          });
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  ngOnInit(): void {}

  updateNote() {
    this.noteService.updateNote(this.noteId, this.editNote.value).subscribe(
      (data: any) => {
        console.log(data);
        this.myRoute.navigate(['/']);

        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
