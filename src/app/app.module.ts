import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MusicalPieceListComponent } from './musical-piece-list/musical-piece-list.component';
import { MusicalPieceDetailComponent } from './musical-piece-detail/musical-piece-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MusicalPieceListComponent,
    MusicalPieceDetailComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
