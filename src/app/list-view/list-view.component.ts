import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit{

  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;

  constructor(private noteSer: NotesService){
    this.notStartedNotes = [];
    this.startedNotes = [];
    this.completedNotes = [];
  }

  filterNotes(notes: Array<Note>){
    this.notStartedNotes = notes.filter((note)=>{
      return note.state === 'not-started'
    })

    this.startedNotes = notes.filter((note)=>{
      return note.state === 'started'
    })

    this.completedNotes = notes.filter((note)=>{
      return note.state === 'completed'
    })

  }

  ngOnInit(){
    this.noteSer.getNotes().subscribe(resp => {
      this.filterNotes(resp)
    },error => {}
    )
  }
}
