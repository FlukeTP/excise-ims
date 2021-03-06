import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../../../common/services";
import { Cop021Component } from "./cop02-1/cop02-1.component";
import { Cop0211Component } from "./cop02-1/cop02-1-1/cop02-1-1.component";
import { Cop0212Component } from "./cop02-1/cop02-1-2/cop02-1-2.component";
import { TaxWsReviewComponent } from './cop02-1/cop02-1-1/tax-ws-review/tax-ws-review.component';
import { FormsModule } from "@angular/forms";
import { BreadcrumbModule } from "../../../common/components";

const routes: Routes = [
  { path: "1", component: Cop021Component, canActivate: [AuthGuard] },
  { path: "1/1", component: Cop0211Component, canActivate: [AuthGuard] },
  { path: "1/2", component: Cop0212Component, canActivate: [AuthGuard] },
  { path: "tax-ws-review", component: TaxWsReviewComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule,FormsModule,BreadcrumbModule],
  declarations: [Cop021Component, Cop0211Component, Cop0212Component, TaxWsReviewComponent],
  exports: [RouterModule]
})
export class Cop02Module {}
