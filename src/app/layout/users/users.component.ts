import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectUsers, selectUsersNotInProject } from './store/selectors/users.selector';
import { fetchUsersAction } from './store/fetch-users/fetch-users.action';
import { FormBuilder, Validators } from '@angular/forms';
import { first, tap } from 'rxjs';
import { addUserAction, addUserSuccessAction } from './store/add-new-user/add-new-user.action';
import { Actions, ofType } from '@ngrx/effects';
import { editUserSuccessAction } from './store/edit-user/edit-user.action';
import { Users } from '../all-projects/project-details/store/fetch-project-users/fetch-project-users.response';
import { removeUserAction } from './store/remove-user/remove-user.action';
import { ActivatedRoute } from '@angular/router';
import { selectAuthenticatedUser } from '../../store/selectors/authenticated-user.selector';
import { fetchNoProjectUsersAction } from './store/fetch-no-project-users/fetch-no-project-users.action';
import { assignUsersToProjectAction } from './store/assign-users-to-project/assign-users-to-project.action';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
    public users$ = this.store.select(selectUsers);

    public visible = false;
    public editDialogVisible = false;
    public assignVisible = false;
    public currentUser: Users | null;
    public projectId: string;
    public authenticatedUser$ = this.store.select(selectAuthenticatedUser);
    public usersNotInProject$ = this.store.select(selectUsersNotInProject);

    public assignUserForm = this.formBuilder.group({
        users: [[], [Validators.required]],
    });

    public usersNotInProject: Users[] = [];

    constructor(
        private store: Store,
        private formBuilder: FormBuilder,
        private actions$: Actions,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.projectId = params['projectId'];

            this.store.dispatch(fetchUsersAction({ projectId: this.projectId }));
            this.store.dispatch(fetchNoProjectUsersAction({ projectId: this.projectId }));
        });
        // this.store.dispatch(fetchUsersAction());

        this.actions$
            .pipe(
                ofType(addUserSuccessAction),
                tap(() => (this.visible = false))
            )
            .subscribe();

        this.actions$
            .pipe(
                ofType(editUserSuccessAction),
                tap(() => (this.editDialogVisible = false))
            )
            .subscribe();
    }

    ngOnInit() {
        this.usersNotInProject$.subscribe((users) => {
            this.usersNotInProject = users.map((user) => ({
                ...user,
                fullName: `${user.first_name} ${user.last_name}`,
                password: '',
            }));
        });
    }

    public setAddDialogVisible(isVisible: boolean): void {
        this.visible = isVisible;
    }

    public setEditDialogVisibility(isVisible: boolean): void {
        if (!isVisible) {
            this.currentUser = null;
        }
        this.editDialogVisible = isVisible;
    }

    public editUser(user: Users) {
        this.currentUser = user;
        this.setEditDialogVisibility(true);
    }

    public removeUser(userId: number) {
        this.store.dispatch(removeUserAction({ userId, projectId: this.projectId }));
    }

    public assignUserToProject() {
        this.store.dispatch(
            assignUsersToProjectAction({
                projectId: Number(this.projectId),
                userIds: (this.assignUserForm.value.users! as Users[]).map((user: Users) => user.id),
            })
        );
        this.assignVisible = false;
    }
}
