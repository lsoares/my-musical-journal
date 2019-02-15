import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicalPieceDetailComponent } from './musical-piece-detail/musical-piece-detail.component';
import { MusicalPieceListComponent } from './musical-piece-list/musical-piece-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/pieces', pathMatch: 'full' },
  { path: 'pieces', component: MusicalPieceListComponent },
  { path: 'pieces/:id', component: MusicalPieceDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }