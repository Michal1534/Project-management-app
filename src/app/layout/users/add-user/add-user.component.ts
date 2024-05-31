import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addUserAction } from '../store/add-new-user/add-new-user.action';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
})
export class AddUserComponent {
    @Input() public visible: boolean;

    @Output() public closeEventChange = new EventEmitter<void>();

    public userForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.maxLength(50)]],
        password: ['', [Validators.required, Validators.maxLength(50)]],
        firstName: ['', [Validators.required, Validators.maxLength(50)]],
        lastName: ['', [Validators.required, Validators.maxLength(50)]],
        role: ['', [Validators.required, Validators.maxLength(50)]],
        position: ['', [Validators.required, Validators.maxLength(50)]],
        expirience: ['', [Validators.required, Validators.maxLength(50)]],
    });

    constructor(private store: Store, private formBuilder: FormBuilder) {}

    public closeDialog(): void {
        this.userForm.reset({
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            position: '',
            role: '',
            expirience: '',
            username: '',
        });
        this.closeEventChange.emit();
    }

    public addNewUser() {
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
                    expirience: this.userForm.value.expirience!,
                    workload: 0,
                },
            })
        );
    }
}
