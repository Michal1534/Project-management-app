import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsComponent } from './project-details.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ProjectDetailsRoutingModule } from './project-details-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FetchProjectUsersEffect } from './store/fetch-project-users/fetch-project-users.effect';
import { PROJECT_USERS_STATE_FEATURE_KEY } from './store/project-users-state.selector';
import { projectUsersReducer } from './store/project-users.reducer';
import { FetchNoProjectUsersEffect } from './store/fetch-no-project-users/fetch-no-project-users.effect';
import { AssignUsersToProjectEffect } from './store/assign-users-to-project/assign-users-to-project.effect';
import { RemoveUserFromProjectEffect } from './store/remove-user-from-project/remove-user-from-project.effect';

@NgModule({
    declarations: [ProjectDetailsComponent],
    imports: [
        SharedModule,
        ProjectDetailsRoutingModule,
        StoreModule.forFeature(PROJECT_USERS_STATE_FEATURE_KEY, projectUsersReducer),
        EffectsModule.forFeature([
            FetchProjectUsersEffect,
            FetchNoProjectUsersEffect,
            AssignUsersToProjectEffect,
            RemoveUserFromProjectEffect,
        ]),
    ],
})
export class ProjectDetailsModule {}
