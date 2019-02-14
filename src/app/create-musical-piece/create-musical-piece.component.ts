import { Component, OnInit } from '@angular/core';
import { MusicalPieceService } from '../musical-piece-service';
import { MusicalPiece } from '../model/musical-piece';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-musical-piece',
  templateUrl: './create-musical-piece.component.html',
  styleUrls: ['./create-musical-piece.component.scss']
})
export class CreateMusicalPieceComponent implements OnInit {
  title: string;
  composer: string;

  constructor(
    private readonly musicalPieceService: MusicalPieceService,
    private readonly router: Router) { }

  ngOnInit() {
  }

  onCreate() {
    const id = this.musicalPieceService.createMusicalPiece(new MusicalPiece(null, this.title, this.composer));
    this.router.navigate(['pieces', id]);
  }
}
