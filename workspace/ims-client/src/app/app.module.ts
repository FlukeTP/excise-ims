import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

// pipes
import { TranslatePipe } from "./buckwaframework/common/pipes/translate.pipe";

// routing
import { AppRoutingModule } from "./buckwaframework/common/configs/app-routing.module";

// services
import {
  AuthGuard,
  AuthService,
  MessageBarService,
  MessageService,
  TranslateService,
  ParameterGroupService,
  ParameterInfoService,
  AjaxService,
  ExciseService,
  TravelService,
  CanDeactivateGuard,
  DialogService,
  IaService
} from "./buckwaframework/common/services";

// components
import { AppComponent } from "./app.component";
import { LoginPage } from "./buckwaframework/project/pages/login/login";
import { ModalModule } from "components/index";

@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,

    // Components
    ModalModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    MessageBarService,
    MessageService,
    TranslateService,
    ParameterGroupService,
    ParameterInfoService,
    AjaxService,
    ExciseService,
    TravelService,
    CanDeactivateGuard,
    DialogService,
    IaService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
