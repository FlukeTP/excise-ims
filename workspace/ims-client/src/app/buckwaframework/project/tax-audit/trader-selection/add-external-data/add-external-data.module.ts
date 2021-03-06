import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../common/services';
import { FormsModule } from '@angular/forms';
import { AddExternalDataComponent } from './add-external-data.component';
import { AddDataComponent } from './add-data/add-data.component';
import { SendLineUserComponent } from './send-line-user/send-line-user.component';
import { ReceivePlanWsComponent } from './receive-plan-ws/receive-plan-ws.component';
import { ReceiveLineUserComponent } from './receive-line-user/receive-line-user.component';
import { ChkStatusComponent } from './chk-status/chk-status.component';
import { BreadcrumbModule } from '../../../../common/components';
import { ApproveLineUserComponent } from './approve-line-user/approve-line-user.component';
import { SummaryReportComponent } from './summary-report/summary-report.component';

const routes: Routes = [
    { path: '', component: AddExternalDataComponent, canActivate: [AuthGuard] },
    { path: 'add-data', component: AddDataComponent, canActivate: [AuthGuard] },
    { path: 'send-line-user', component: SendLineUserComponent, canActivate: [AuthGuard] },
    { path: 'receive-plan-ws', component: ReceivePlanWsComponent, canActivate: [AuthGuard] },
    { path: 'receive-line-user', component: ReceiveLineUserComponent, canActivate: [AuthGuard] },
    { path: 'approve-line-user', component: ApproveLineUserComponent, canActivate: [AuthGuard] },
    { path: 'summary-report', component: SummaryReportComponent, canActivate: [AuthGuard] },
    { path: 'chk-status', component: ChkStatusComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        BreadcrumbModule
    ],
    declarations: [
        AddExternalDataComponent,
        AddDataComponent,
        SendLineUserComponent,
        ReceivePlanWsComponent,
        ReceiveLineUserComponent,
        ChkStatusComponent,
        ApproveLineUserComponent,
        SummaryReportComponent
    ],
    exports: [RouterModule]
})
export class AddExternalDataModule { }