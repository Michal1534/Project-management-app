import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDetailsComponent } from './task-details.component';
import { SharedModule } from '../../../../shared/shared.module';
import { TaskDetailsRoutingModule } from './task-details-routing.module';
import { taskReducer } from './store/task.reducer';
import { FetchTaskEffect } from './store/fetch-task/fetch-task.effect';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TASK_STATE_FEATURE_KEY } from './store/task-state.selector';
import { FetchCommentsEffect } from './store/fetch-comments/fetch-comments.effect';
import { AddCommentEffect } from './store/add-comment/add-comment.effect';
import { RemoveCommentEffect } from './store/remove-comment/remove-comment.effect';
import { UpdateTaskEffect } from './store/update-task/update-task.effect';
import { FetchProjectUsersEffect } from './store/fetch-project-users/fetch-project-users.effect';

@NgModule({
    declarations: [TaskDetailsComponent],
    imports: [
        CommonModule,
        SharedModule,
        TaskDetailsRoutingModule,
        StoreModule.forFeature(TASK_STATE_FEATURE_KEY, taskReducer),
        EffectsModule.forFeature([
            UpdateTaskEffect,
            FetchTaskEffect,
            FetchCommentsEffect,
            AddCommentEffect,
            FetchProjectUsersEffect,
            RemoveCommentEffect,
        ]),
    ],
})
export class TaskDetailsModule {}
