import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fetchTaskAction } from './store/fetch-task/fetch-task.action';
import { selectTask } from './store/selectors/task.selector';
import { selectComments } from './store/selectors/comments.selector';
import { fetchCommentsAction } from './store/fetch-comments/fetch-comments.action';
import { selectAuthenticatedUser } from '../../../store/selectors/authenticated-user.selector';
import { FormBuilder, Validators } from '@angular/forms';
import { addCommentAction } from './store/add-comment/add-comment.action';
import { removeCommentAction } from './store/remove-comment/remove-comment.action';
import { UpdateTaskAction } from './store/update-task/update-task.action';
import { selectProjectUsers } from './store/selectors/project-users.selector';
import { fetchProjectUsersAction } from './store/fetch-project-users/fetch-project-users.action';
import { Users } from './store/fetch-project-users/fetch-project-users.response';
import { removeTaskAction, removeTaskSuccessAction } from '../store/remove-task/remove-task.action';
import { tap } from 'rxjs';
import { Location } from '@angular/common';

@Component({
    selector: 'app-task-details',
    templateUrl: './task-details.component.html',
    styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent {
    public task$ = this.store.select(selectTask);
    public comments$ = this.store.select(selectComments);
    public users$ = this.store.select(selectProjectUsers);

    public projectId: string = '';
    public taskId: string = '';
    public userId: number = 0;
    public authenticatedUser$ = this.store.select(selectAuthenticatedUser);
    public isEditMode = false;
    commentForm = this.formBuilder.group({
        comment_content: ['', Validators.required],
    });

    public taskForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(50)]],
        type: ['', [Validators.required]],
        priority: ['', [Validators.required]],
        status: ['', [Validators.required]],
        assigned_user_id: [0, [Validators.required]],
        component: ['', [Validators.required]],
        storyPoints: [0, [Validators.required]],
        description: ['', [Validators.required, Validators.maxLength(200)]],
        created_at: ['', [Validators.required]],
        reported_by_user_id: [
            {
                id: 0,
                first_name: '',
                last_name: '',
            },
            [Validators.required],
        ],
        sprint_id: ['', [Validators.required]],
    });
    public usersInProject: Users[] = [];

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private location: Location,
        private actions$: Actions,
        private formBuilder: FormBuilder
    ) {
        this.route.params.subscribe((params) => {
            this.taskId = params['taskId'];
            this.projectId = params['projectId'];
            this.store.dispatch(fetchProjectUsersAction({ projectId: this.projectId }));

            this.store.dispatch(fetchCommentsAction({ taskId: this.taskId }));
            this.store.dispatch(fetchTaskAction({ taskId: this.taskId }));
        });
        this.authenticatedUser$.subscribe((user) => {
            this.userId = user.id;
        });
        this.users$.subscribe((users) => {
            this.usersInProject = users.map((user) => ({
                ...user,
                fullName: `${user.first_name} ${user.last_name}`,
            }));
        });

        this.actions$
            .pipe(
                ofType(removeTaskSuccessAction),
                tap(() => this.location.back())
            )
            .subscribe();
    }

    public toggleEditMode(task: any) {
        this.isEditMode = !this.isEditMode;
        this.taskForm.patchValue({
            name: task.name,
            type: task.task_type,
            priority: task.priority,
            status: task.status,
            assigned_user_id: task.assigned_user_id,
            component: task.component,
            storyPoints: task.story_points,
            description: task.description,
            created_at: task.created_at,
            reported_by_user_id: task.reported_by_user,
            sprint_id: task.sprint_id,
        });
    }

    public addComment() {
        this.store.dispatch(
            addCommentAction({
                comment: {
                    commentDate: new Date(),
                    taskId: Number(this.taskId),
                    userId: this.userId,
                    comment_content: this.commentForm.value.comment_content!,
                },
            })
        );
        this.commentForm.reset();
    }

    public removeComment(commentId: number) {
        this.store.dispatch(removeCommentAction({ commentId: commentId, taskId: this.taskId }));
    }

    public updateTask() {
        this.store.dispatch(
            UpdateTaskAction({
                taskId: this.taskId,
                task: {
                    ...this.taskForm.value,
                    status: this.taskForm.value.status,
                    type: this.taskForm.value.type,
                    storyPoints: this.taskForm.value.storyPoints,
                    createdBy: this.taskForm.value.reported_by_user_id?.id,
                    sprintId: this.taskForm.value.sprint_id,
                    assignedTo: this.taskForm.value.assigned_user_id,
                },
            })
        );
        this.isEditMode = false;
    }

    public deleteTask() {
        this.store.dispatch(removeTaskAction({ taskId: Number(this.taskId), projectId: Number(this.projectId) }));
    }
}
