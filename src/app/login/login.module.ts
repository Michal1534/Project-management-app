import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FetchAuthenticatedUserTokenEffect } from '../store/queries/fetch-user-token/fetch-user-token.effect';
import { SharedModule } from '../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        LoginRoutingModule,
        SharedModule,
        EffectsModule.forFeature([FetchAuthenticatedUserTokenEffect]),
    ],
})
export class LoginModule {}
