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
import { CreateMusicalPieceComponent } from './create-musical-piece/create-musical-piece.component';
import { FormsModule } from '@angular/forms';
import { PracticesListComponent } from './practices-list/practices-list.component';
import { ReportComponent } from './report/report.component';
import { DebugComponent } from './debug/debug.component';

@NgModule({
  declarations: [
    AppComponent,
    MusicalPieceListComponent,
    MusicalPieceDetailComponent,
    PracticeTimePipe,
    PracticesChartComponent,
    CreateMusicalPieceComponent,
    PracticesListComponent,
    ReportComponent,
    DebugComponent
  ],
  imports: [
    ChartsModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
