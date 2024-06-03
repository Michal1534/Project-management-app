import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fetchTaskAction } from './store/fetch-task/fetch-task.action';
import { selectTask } from './store/selectors/task.selector';
import { selectComments } from './store/selectors/comments.selector';
import { fetchCommentsAction } from './store/fetch-comments/fetch-comments.action';
import { selectProjectUsers } from '../store/selectors/project-users.selector';
import { selectAuthenticatedUser } from '../../../store/selectors/authenticated-user.selector';
import { FormBuilder, Validators } from '@angular/forms';
import { addCommentAction } from './store/add-comment/add-comment.action';
import { removeCommentAction } from './store/remove-comment/remove-comment.action';

@Component({
    selector: 'app-task-details',
    templateUrl: './task-details.component.html',
    styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent {
    public task$ = this.store.select(selectTask);
    public comments$ = this.store.select(selectComments);
    public test$ = this.store.select(selectProjectUsers);

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
        assigned_user_id: ['', [Validators.required]],
        component: ['', [Validators.required]],
        storyPoints: [0, [Validators.required]],
        description: ['', [Validators.required, Validators.maxLength(200)]],
        created_at: ['', [Validators.required]],
        reported_by_user_id: ['', [Validators.required]],
        sprint_id: ['', [Validators.required]],
    });

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private actions$: Actions,
        private formBuilder: FormBuilder
    ) {
        this.route.params.subscribe((params) => {
            this.taskId = params['taskId'];
            this.store.dispatch(fetchCommentsAction({ taskId: this.taskId }));
            this.store.dispatch(fetchTaskAction({ taskId: this.taskId }));
        });
        this.authenticatedUser$.subscribe((user) => {
            this.userId = user.id;
        });
    }

    public editTask(task: any) {
        this.isEditMode = true;
        this.taskForm.patchValue({
            name: task.name,
            type: task.type,
            priority: task.priority,
            status: task.status,
            assigned_user_id: task.assignedTo,
            component: task.component,
            storyPoints: task.storyPoints,
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
}
