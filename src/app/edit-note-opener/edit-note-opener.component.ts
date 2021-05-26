import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent {
  constructor(private dialog:MatDialog, private route:ActivatedRoute){
    var noteId = +this.route.snapshot.paramMap.get('noteId')    // Typecasting noteId as Number
    var editDialog = this.dialog.open(EditNoteViewComponent,{
      data:{
        note: noteId,
      }
    })
  }
}
