import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { CurrentSprintComponent } from './current-sprint.component';
import { DragDropModule } from 'primeng/dragdrop';
import { CurrentSprintRoutingModule } from './current-sprint-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CURRENT_SPRINT_STATE_FEATURE_KEY } from './store/current-sprint-state.selector';
import { currentSprintReducer } from './store/current-sprint.reducer';
import { FetchCurrentSprintEffect } from './store/fetch-current-sprint/fetch-current-sprint.effect';
import { UpdateTaskEffect } from './store/update-task-status/update-task.effect';
import { FetchAllSprintsEffect } from '../all-sprints/store/fetch-all-sprints/fetch-all-sprints.effect';
import { FetchProjectUsersEffect } from './store/fetch-project-users/fetch-project-users.effect';
import { SprintDetailsComponent } from './sprint-details/sprint-details.component';
import { FetchAllHolidaysEffect } from './store/fetch-all-holidays/fetch-all-holidays.effect';

@NgModule({
    declarations: [CurrentSprintComponent, SprintDetailsComponent],
    imports: [
        CommonModule,
        SharedModule,
        CurrentSprintRoutingModule,
        DragDropModule,
        StoreModule.forFeature(CURRENT_SPRINT_STATE_FEATURE_KEY, currentSprintReducer),
        EffectsModule.forFeature([
            FetchProjectUsersEffect,
            FetchCurrentSprintEffect,
            UpdateTaskEffect,
            FetchAllSprintsEffect,
            FetchAllHolidaysEffect,
        ]),
    ],
})
export class CurrentSprintModule {}
