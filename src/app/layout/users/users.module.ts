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
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserEffect } from './store/edit-user/edit-user.effect';
import { RemoveUserEffect } from './store/remove-user/remove-user.effect';
import { AssignUsersToProjectEffect } from './store/assign-users-to-project/assign-users-to-project.effect';
import { FetchNoProjectUsersEffect } from './store/fetch-no-project-users/fetch-no-project-users.effect';

@NgModule({
    declarations: [UsersComponent, AddUserComponent, EditUserComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        SharedModule,
        StoreModule.forFeature(USERS_STATE_FEATURE_KEY, usersReducer),
        EffectsModule.forFeature([
            AssignUsersToProjectEffect,
            FetchNoProjectUsersEffect,
            FetchUsersEffect,
            AddUserEffect,
            EditUserEffect,
            RemoveUserEffect,
        ]),
    ],
})
export class UsersModule {}
