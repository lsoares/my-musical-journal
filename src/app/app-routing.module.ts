import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicalPieceDetailComponent } from './musical-piece-detail/musical-piece-detail.component';

const routes: Routes = [
  { path: 'pieces/:id', component: MusicalPieceDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
