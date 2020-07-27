import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from './shop/shop.component';
import { ProductsComponent } from './products/products.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: "shop/:category",
    component: ShopComponent,
    children: [
      { path: "product", component: ProductsComponent }
    ]
  },
  { path: "", redirectTo: "shop/products", pathMatch: "full" },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routedComponents: any[] = [ShopComponent, ProductsComponent, NotFoundComponent];
