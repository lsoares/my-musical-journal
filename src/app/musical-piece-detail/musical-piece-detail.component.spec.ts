import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicalPieceDetailComponent } from './musical-piece-detail.component';

describe('MusicalPieceDetailComponent', () => {
  let component: MusicalPieceDetailComponent;
  let fixture: ComponentFixture<MusicalPieceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicalPieceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicalPieceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
