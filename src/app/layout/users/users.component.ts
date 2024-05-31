import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectUsers } from './store/selectors/users.selector';
import { fetchUsersAction } from './store/fetch-users/fetch-users.action';
import { FormBuilder, Validators } from '@angular/forms';
import { first, tap } from 'rxjs';
import { addUserAction, addUserSuccessAction } from './store/add-new-user/add-new-user.action';
import { Actions, ofType } from '@ngrx/effects';
import { editUserSuccessAction } from './store/edit-user/edit-user.action';
import { Users } from '../all-projects/project-details/store/fetch-project-users/fetch-project-users.response';
import { removeUserAction } from './store/remove-user/remove-user.action';

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
    public currentUser: Users | null;

    constructor(private store: Store, private formBuilder: FormBuilder, private actions$: Actions) {
        this.store.dispatch(fetchUsersAction());

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
        this.store.dispatch(removeUserAction({ userId }));
    }
}
