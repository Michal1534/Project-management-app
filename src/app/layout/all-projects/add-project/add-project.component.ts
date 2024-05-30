import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addProjectAction } from '../store/add-new-project/add-new-project.action';

@Component({
    selector: 'app-add-project',
    templateUrl: './add-project.component.html',
})
export class AddProjectComponent {
    @Input() public visible: boolean;

    @Output() public closeEventChange = new EventEmitter<void>();

    public projectForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(50)]],
    });

    constructor(private store: Store, private formBuilder: FormBuilder) {}

    public closeDialog(): void {
        console.log('test123');
        this.projectForm.reset({
            name: '',
        });
        this.closeEventChange.emit();
    }

    public addNewProject() {
        this.store.dispatch(addProjectAction({ project: { name: this.projectForm.value.name!, status: 'W trakcie' } }));
        this.closeEventChange.emit();
    }
}
