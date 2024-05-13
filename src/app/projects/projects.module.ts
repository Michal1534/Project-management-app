import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { SharedModule } from '../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FetchUserProjectsEffect } from './store/fetch-projects/fetch-projects.effect';
import { USER_PROJECTS_STATE_FEATURE_KEY } from './store/user-projects-state.selector';
import { userProjectsReducer } from './store/user-projects.reducer';
import { ProjectsRoutingModule } from './projects-routing.module';

@NgModule({
    declarations: [ProjectsComponent],
    imports: [
        CommonModule,
        SharedModule,
        ProjectsRoutingModule,
        StoreModule.forFeature(USER_PROJECTS_STATE_FEATURE_KEY, userProjectsReducer),
        EffectsModule.forFeature([FetchUserProjectsEffect]),
    ],
})
export class ProjectsModule {}
