import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicalPieceComponent } from './musical-piece.component';

describe('MusicalPieceComponent', () => {
  let component: MusicalPieceComponent;
  let fixture: ComponentFixture<MusicalPieceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicalPieceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicalPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });
});
