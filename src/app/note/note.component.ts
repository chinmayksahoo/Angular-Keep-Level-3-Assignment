import { Component, Input } from '@angular/core';
import { Note } from '../note';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Input() note:Note;

  constructor(private routerServ: RouterService){

  }

  openEditView() {
    this.routerServ.routeToEditNoteView(this.note.id);
  }
}
