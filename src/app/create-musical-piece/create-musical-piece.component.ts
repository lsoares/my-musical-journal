import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MusicalPieceService } from '../musical-piece-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-musical-piece',
  styleUrls: ['./create-musical-piece.component.scss'],
  templateUrl: './create-musical-piece.component.html'
})
export class CreateMusicalPieceComponent implements OnInit {
  @Output() private cancel = new EventEmitter<void>();

  musicalPiece = { title: '', composer: '' };

  constructor(
    private readonly musicalPieceService: MusicalPieceService,
    private readonly router: Router) { }

  ngOnInit() { }

  onCancel() { this.cancel.emit(); }

  onSubmitCreateMusicalPiece() {
    const id = this.musicalPieceService.createMusicalPiece(this.musicalPiece);
    this.router.navigate(['pieces', id]);
  }
}
