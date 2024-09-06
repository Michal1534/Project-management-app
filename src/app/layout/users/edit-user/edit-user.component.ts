import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { editUserAction } from '../store/edit-user/edit-user.action';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
})
export class EditUserComponent {
    @Input() public editDialogVisble: boolean;
    @Input() public currentUser: any | null;

    @Output() public closeEventChange = new EventEmitter<void>();

    public projectId: string = '';

    public userForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.maxLength(50)]],
        firstName: ['', [Validators.required, Validators.maxLength(50)]],
        lastName: ['', [Validators.required, Validators.maxLength(50)]],
        role: ['', [Validators.required, Validators.maxLength(50)]],
        specialization: ['', [Validators.required, Validators.maxLength(50)]],
        expirience: ['', [Validators.required, Validators.maxLength(50)]],
    });

    constructor(private formBuilder: FormBuilder, private store: Store, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe((params) => {
            this.projectId = params['projectId'];
        });
    }

    public ngOnInit(): void {
        this.userForm.patchValue({
            username: this.currentUser?.username!,
            email: this.currentUser?.email!,
            firstName: this.currentUser?.first_name!,
            lastName: this.currentUser?.last_name!,
            role: this.currentUser?.role!,
            specialization: this.currentUser?.specialization!,
            expirience: this.currentUser?.expirience!,
        });
    }

    public closeDialog(): void {
        this.userForm.reset({
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            role: '',
            specialization: '',
            expirience: '',
        });
        this.closeEventChange.emit();
    }

    public editUserClick(): void {
        this.store.dispatch(
            editUserAction({
                userId: this.currentUser.id,
                user: {
                    username: this.userForm.value.username!,
                    email: this.userForm.value.email!,
                    firstName: this.userForm.value.firstName!,
                    lastName: this.userForm.value.lastName!,
                    role: this.userForm.value.role!,
                    specialization: this.userForm.value.specialization!,
                    expirience: this.userForm.value.expirience!,
                    workload: 0,
                },
                projectId: this.projectId,
            })
        );
    }
}
