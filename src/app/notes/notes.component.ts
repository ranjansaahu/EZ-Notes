import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotesServiceService } from '../services/notes-service.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  panelOpenState = false;
  notesForm!: FormGroup;

  constructor(private fb: FormBuilder, private api: NotesServiceService) {}

  ngOnInit(): void {
    this.notesForm = this.fb.group({
      taskName: ['', Validators.required],
      taskBody: ['', Validators.required],
    });
  }
  addNotes() {
    if (this.notesForm.valid) {
      this.api.postNotes(this.notesForm.value).subscribe({
        next: (res) => {
          alert('Note added successfully!!');
          this.notesForm.reset();
        },
        error: () => {
          alert('Error while adding the note!!');
        },
      });
    }
  }
}
