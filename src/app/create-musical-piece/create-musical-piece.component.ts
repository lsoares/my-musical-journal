import { Component, OnInit, ViewChild } from '@angular/core';
import { MusicalPieceService } from '../musical-piece-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-musical-piece',
  templateUrl: './create-musical-piece.component.html'
})
export class CreateMusicalPieceComponent implements OnInit {
  musicalPiece = { title: '', composer: '' };

  constructor(
    private readonly musicalPieceService: MusicalPieceService,
    private readonly router: Router) { }

  ngOnInit() {
  }

  onSubmitCreateMusicalPiece() {
    const id = this.musicalPieceService.createMusicalPiece(this.musicalPiece);
    this.router.navigate(['pieces', id]);
  }
}
