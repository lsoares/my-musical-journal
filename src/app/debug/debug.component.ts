import { Component, OnInit } from '@angular/core';
import { MusicalPieceService } from '../musical-piece-service';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html'
})
export class DebugComponent implements OnInit {

  musicalPieces: string;

  constructor(private readonly musicalPieceService: MusicalPieceService) { }

  ngOnInit() {
    this.musicalPieces = JSON.stringify(this.musicalPieceService.getMusicalPieces());
  }
}
