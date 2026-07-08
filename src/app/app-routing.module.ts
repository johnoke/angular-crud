import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CreateComponent } from './products/create/create.component';
import { EditComponent } from './products/edit/edit.component';
const routes: Routes = [
  {path: '', redirectTo: "/products", pathMatch: "full" },
  {path: 'products', component: ProductsComponent },
  {path: 'products/create', component: CreateComponent },
  {path: 'products/:id', component: EditComponent },
  {path: '**', redirectTo: "/products", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
