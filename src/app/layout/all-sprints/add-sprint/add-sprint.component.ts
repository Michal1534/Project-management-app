import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { addSprintAction } from '../store/add-new-sprint/add-new-sprint.action';

@Component({
    selector: 'app-add-sprint',
    templateUrl: './add-sprint.component.html',
})
export class AddSprintComponent {
    @Input() public visible: boolean;

    @Output() public closeEventChange = new EventEmitter<void>();

    public sprintForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(50)]],
    });

    public projectId: string;

    constructor(private store: Store, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe((params) => {
            this.projectId = params['projectId'];
        });
    }

    public closeDialog(): void {
        this.sprintForm.reset({
            name: '',
        });
        this.closeEventChange.emit();
    }

    public addNewSprint() {
        this.store.dispatch(
            addSprintAction({
                sprint: { name: this.sprintForm.value.name!, projectId: Number(this.projectId), status: 'NOT_STARTED' },
            })
        );
        this.closeEventChange.emit();
    }
}
