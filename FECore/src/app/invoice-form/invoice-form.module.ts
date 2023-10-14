import { NgModule } from "@angular/core";
import { InvoiceFormComponent } from "./invoice-form.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild([
      { path: "posting", component: InvoiceFormComponent },
      //{ path: "posting/:documentId", component: InvoiceFormComponent}
      // {
      //   path: "products/:id",
      //   canActivate: [ProductDetailGuard],
      //   component: ProductDetailComponent,
      // },
    ]),
  ],
})
export class InvoiceFormModule {

}
