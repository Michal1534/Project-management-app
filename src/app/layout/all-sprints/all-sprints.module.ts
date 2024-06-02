import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllSprintsComponent } from './all-sprints.component';
import { SharedModule } from '../../../shared/shared.module';
import { AllSprintsRoutingModule } from './all-sprints-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ALL_SPRINTS_STATE_FEATURE_KEY } from './store/all-sprints-state.selector';
import { allSprintsReducer } from './store/all-sprints.reducer';
import { FetchAllSprintsEffect } from './store/fetch-all-sprints/fetch-all-sprints.effect';
import { AddSprintComponent } from './add-sprint/add-sprint.component';
import { AddSprintEffect } from './store/add-new-sprint/add-new-sprint.effect';
import { StartSprintComponent } from './start-sprint/start-sprint.component';
import { StartSprintEffect } from './store/start-sprint/start-sprint.effect';
import { RemoveSprintEffect } from './store/remove-sprint/remove-sprint.effect';
import { EndSprintEffect } from './store/end-sprint/end-sprint.effect';
import { AddTaskComponent } from './add-task/add-task.component';
import { FetchProjectUsersEffect } from './store/fetch-project-users/fetch-project-users.effect';
import { AddTaskEffect } from './store/add-task/add-new-sprint.effect';

@NgModule({
    declarations: [AllSprintsComponent, AddSprintComponent, StartSprintComponent, AddTaskComponent],
    imports: [
        CommonModule,
        SharedModule,
        AllSprintsRoutingModule,
        StoreModule.forFeature(ALL_SPRINTS_STATE_FEATURE_KEY, allSprintsReducer),
        EffectsModule.forFeature([
            FetchAllSprintsEffect,
            AddSprintEffect,
            StartSprintEffect,
            RemoveSprintEffect,
            EndSprintEffect,
            FetchProjectUsersEffect,
            AddTaskEffect,
        ]),
    ],
})
export class AllSprintsModule {}
