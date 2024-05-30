import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { editProjectAction } from '../store/edit-project/edit-project.action';

@Component({
    selector: 'app-edit-project',
    templateUrl: './edit-project.component.html',
})
export class EditProjectComponent {
    @Input() public editDialogVisble: boolean;
    @Input() public currentProject: any | null;

    @Output() public closeEventChange = new EventEmitter<void>();

    public editProject = this.formBuilder.group({
        name: ['', [Validators.required]],
    });

    constructor(private formBuilder: FormBuilder, private store: Store) {}

    public ngOnInit(): void {
        this.editProject.patchValue({
            name: this.currentProject?.name!,
        });
    }

    public closeDialog(): void {
        this.editProject.reset({
            name: '',
        });
        this.closeEventChange.emit();
    }

    public editProjectClick(): void {
        this.store.dispatch(
            editProjectAction({
                projectId: this.currentProject.id,
                project: {
                    name: this.editProject.value.name!,
                },
            })
        );
    }
}
