import { Component, OnInit } from '@angular/core';
import { MusicalPiece } from '../model/musical-piece';
import { MusicalPieceService } from '../musical-piece-service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  musicalPieces: MusicalPiece[];

  constructor(private readonly musicalPieceService: MusicalPieceService) { }

  ngOnInit() {
    this.musicalPieces = this.musicalPieceService.getMusicalPieces();
  }
}
