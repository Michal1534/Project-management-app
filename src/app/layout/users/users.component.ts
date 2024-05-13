import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectUsers } from './store/selectors/users.selector';
import { fetchUsersAction } from './store/fetch-users/fetch-users.action';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { addUserAction } from './store/add-new-user/add-new-user.action';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
})
export class UsersComponent {
    public users$ = this.store.select(selectUsers);

    public visible = false;

    public userForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.maxLength(50)]],
        password: ['', [Validators.required, Validators.maxLength(50)]],
        firstName: ['', [Validators.required, Validators.maxLength(50)]],
        lastName: ['', [Validators.required, Validators.maxLength(50)]],
        role: ['', [Validators.required, Validators.maxLength(50)]],
        position: ['', [Validators.required, Validators.maxLength(50)]],
    });

    constructor(private store: Store, private formBuilder: FormBuilder) {
        this.store.dispatch(fetchUsersAction());
    }

    public showModalDialog(visible: boolean) {
        this.visible = visible;
    }

    public addNewUser() {
        this.showModalDialog(false);
        this.store.dispatch(
            addUserAction({
                user: {
                    username: this.userForm.value.username!,
                    email: this.userForm.value.email!,
                    password: this.userForm.value.password!,
                    firstName: this.userForm.value.firstName!,
                    lastName: this.userForm.value.lastName!,
                    role: this.userForm.value.role!,
                    position: this.userForm.value.position!,
                    availability: true,
                    workload: 0,
                },
            })
        );
    }
}
