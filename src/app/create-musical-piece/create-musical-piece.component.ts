import { Component, OnInit, ViewChild } from '@angular/core';
import { MusicalPieceService } from '../musical-piece-service';
import { MusicalPiece } from '../model/musical-piece';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-musical-piece',
  templateUrl: './create-musical-piece.component.html',
  styleUrls: ['./create-musical-piece.component.scss']
})
export class CreateMusicalPieceComponent implements OnInit {
  musicalPiece: MusicalPiece = new MusicalPiece(0, '', '');

  constructor(
    private readonly musicalPieceService: MusicalPieceService,
    private readonly router: Router) { }

  ngOnInit() {
  }

  onSubmit(createForm: HTMLFormElement) {
    if (!createForm.checkValidity()) { return; }
    const id = this.musicalPieceService.createMusicalPiece(this.musicalPiece);
    this.router.navigate(['pieces', id]);
  }
}
