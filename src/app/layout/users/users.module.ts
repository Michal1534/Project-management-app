import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FetchUsersEffect } from './store/fetch-users/fetch-users.effect';
import { USERS_STATE_FEATURE_KEY } from './store/users-state.selector';
import { usersReducer } from './store/users.reducer';
import { UsersComponent } from './users.component';
import { AddUserEffect } from './store/add-new-user/add-new-user.effect';

@NgModule({
    declarations: [UsersComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        SharedModule,
        StoreModule.forFeature(USERS_STATE_FEATURE_KEY, usersReducer),
        EffectsModule.forFeature([FetchUsersEffect, AddUserEffect]),
    ],
})
export class UsersModule {}
