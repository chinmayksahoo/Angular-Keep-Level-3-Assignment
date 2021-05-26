import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from '../note';
import { RouterService } from '../services/router.service';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit, OnDestroy{
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;

  constructor(private matDlgRef:MatDialogRef<EditNoteViewComponent>, 
    private routeSer:RouterService, 
    private noteSer:NotesService, 
    @Inject(MAT_DIALOG_DATA) private data:any){

  }

  ngOnInit(){
    this.note = this.noteSer.getNoteById(this.data.note);
  }

  ngOnDestroy(){
    this.routeSer.routeBack();
  }

  onSave() {
    this.noteSer.editNote(this.note).subscribe((editedNote) => {
      this.matDlgRef.close();
    },(error:any) => {
      this.errMessage = error.message;
    });
  }
}
