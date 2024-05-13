import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { authenticatedUserReducer } from './store/authenticated-user.reducer';
import { FetchAuthenticatedUserEffect } from './store/queries/fetch-authenticated-user/fetch-authenticated-user.effect';
import { CoreModule } from './core/core.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        BrowserModule,
        SharedModule,
        HttpClientModule,
        CoreModule.forRoot(),
        StoreModule.forRoot({ authenticatedUser: authenticatedUserReducer }),
        EffectsModule.forRoot([FetchAuthenticatedUserEffect]),
        BrowserAnimationsModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
