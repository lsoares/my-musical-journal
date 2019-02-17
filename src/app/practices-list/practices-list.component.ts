import { Component, OnInit, Input } from '@angular/core';
import { MusicalPiece } from '../model/musical-piece';
import { MusicalPieceService } from '../musical-piece-service';
import { Practice } from '../model/practice';

@Component({
  selector: 'app-practices-list',
  templateUrl: './practices-list.component.html',
  styleUrls: ['./practices-list.component.scss']
})
export class PracticesListComponent implements OnInit {

  @Input() musicalPiece: MusicalPiece;
  @Input() practices: Practice[];

  constructor(private readonly musicalPieceService: MusicalPieceService) { }

  ngOnInit() {
  }

  onDeletingPractice(id: number) {
    if (confirm(`Delete practice session?`)) {
      this.musicalPieceService.deletePractice(this.musicalPiece.id, id);
    }
  }
}
