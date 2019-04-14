import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NamespaceComponent } from './components/namespace/namespace.component';

const routes: Routes = [
  {
    path: 'ns/:id',
    component: NamespaceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
