import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MusicalPieceListComponent } from './musical-piece-list/musical-piece-list.component';
import { MusicalPieceDetailComponent } from './musical-piece-detail/musical-piece-detail.component';
import { PracticeTimePipe } from './practice-time.pipe';
import { PracticesChartComponent } from './practices-chart/practices-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    MusicalPieceListComponent,
    MusicalPieceDetailComponent,
    PracticeTimePipe,
    PracticesChartComponent
  ],
  imports: [
    ChartsModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
