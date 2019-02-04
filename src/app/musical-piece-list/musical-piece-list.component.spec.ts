import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicalPieceListComponent } from './musical-piece-list.component';

describe('MusicalPieceComponent', () => {
  let component: MusicalPieceListComponent;
  let fixture: ComponentFixture<MusicalPieceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MusicalPieceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicalPieceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });
});
