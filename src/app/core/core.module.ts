import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { MessageService } from "primeng/api";
import { AuthInterceptor } from "./interceptors/auth/auth.interceptor";
import { ErrorInterceptor } from "./interceptors/error/error.interceptor";

@NgModule({
  providers: [
    MessageService
  ]
})

export class CoreModule {
  public static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    };
  }
}
