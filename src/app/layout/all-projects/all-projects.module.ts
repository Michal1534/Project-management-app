import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProjectsRoutingModule } from './all-projects-routing.module';
import { AllProjectsComponent } from './all-projects.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ALL_PROJECTS_STATE_FEATURE_KEY } from './store/all-projects-state.selector';
import { allProjectsReducer } from './store/all-projects.reducer';
import { FetchAllProjectsEffect } from './store/fetch-all-projects/fetch-all-projects.effect';
import { SharedModule } from '../../../shared/shared.module';
import { AddProjectEffect } from './store/add-new-project/add-new-project.effect';
import { AddProjectComponent } from './add-project/add-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { RemoveProjectEffect } from './store/remove-project/remove-project.effect';
import { EditProjectEffect } from './store/edit-project/edit-project.effect';

@NgModule({
    declarations: [AllProjectsComponent, AddProjectComponent, EditProjectComponent],
    imports: [
        CommonModule,
        AllProjectsRoutingModule,
        SharedModule,
        StoreModule.forFeature(ALL_PROJECTS_STATE_FEATURE_KEY, allProjectsReducer),
        EffectsModule.forFeature([FetchAllProjectsEffect, AddProjectEffect, RemoveProjectEffect, EditProjectEffect]),
    ],
})
export class AllProjectsModule {}
