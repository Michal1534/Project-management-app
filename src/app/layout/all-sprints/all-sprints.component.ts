import { Component } from '@angular/core';
import { fetchAllSprintsAction } from './store/fetch-all-sprints/fetch-all-sprints.action';
import { selectAllSprints } from './store/selectors/all-sprints.selector';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { addSprintSuccessAction } from './store/add-new-sprint/add-new-sprint.action';
import { tap } from 'rxjs';
import { startSprintSuccessAction } from './store/start-sprint/start-sprint.action';
import { SprintsResponse } from './store/fetch-all-sprints/fetch-all-sprints.response';
import { removeSprintAction } from './store/remove-sprint/remove-sprint.action';
import { endSprintAction } from './store/end-sprint/end-sprint.action';
import { selectAuthenticatedUser } from '../../store/selectors/authenticated-user.selector';
import { removeTaskAction } from './store/remove-task/remove-task.action';

@Component({
    selector: 'app-all-sprints',
    templateUrl: './all-sprints.component.html',
    styleUrl: './all-sprints.component.scss',
})
export class AllSprintsComponent {
    public sprints$ = this.store.select(selectAllSprints);
    public visible = false;
    public startSprintVisible = false;
    public taskVisible = false;
    public currentSprint?: SprintsResponse;
    public projectId: string;
    public sprintId: number;
    public authenticatedUser$ = this.store.select(selectAuthenticatedUser);

    constructor(private store: Store, private route: ActivatedRoute, private actions$: Actions) {
        this.route.params.subscribe((params) => {
            this.projectId = params['projectId'];
            this.store.dispatch(fetchAllSprintsAction({ projectId: params['projectId'] }));
        });

        this.actions$
            .pipe(
                ofType(addSprintSuccessAction),
                tap(() => (this.visible = false))
            )
            .subscribe();

        this.actions$
            .pipe(
                ofType(startSprintSuccessAction),
                tap(() => (this.startSprintVisible = false))
            )
            .subscribe();
    }

    public setAddDialogVisible(isVisible: boolean): void {
        this.visible = isVisible;
    }

    public setAddTaskDialogVisible(isVisible: boolean, sprintId: number): void {
        this.sprintId = sprintId;
        this.taskVisible = isVisible;
    }

    public setStartDialogVisible(isVisible: boolean, sprint?: SprintsResponse): void {
        this.currentSprint = sprint;
        this.startSprintVisible = isVisible;
    }

    public removeSprint(sprintId: number): void {
        this.store.dispatch(removeSprintAction({ sprintId, projectId: Number(this.projectId) }));
    }

    public endSprintClick(sprint: SprintsResponse): void {
        this.store.dispatch(
            endSprintAction({
                sprint: {
                    endDate: sprint.end_date,
                    id: sprint.id,
                    name: sprint.name,
                    projectId: Number(this.projectId),
                    startDate: sprint.start_date,
                    status: 'ENDED',
                },
            })
        );
    }

    public deleteTask(taskId: number): void {
        this.store.dispatch(removeTaskAction({ taskId: taskId, projectId: Number(this.projectId) }));
    }
}
