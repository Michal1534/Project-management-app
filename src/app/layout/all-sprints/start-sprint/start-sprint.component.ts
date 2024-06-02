import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { startSprintAction } from '../store/start-sprint/start-sprint.action';
import { SprintsResponse } from '../store/fetch-all-sprints/fetch-all-sprints.response';

@Component({
    selector: 'app-start-sprint',
    templateUrl: './start-sprint.component.html',
})
export class StartSprintComponent {
    @Input() public visible: boolean;
    @Input() public sprint?: SprintsResponse;

    @Output() public closeEventChange = new EventEmitter<void>();

    public sprintForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(50)]],
        startDate: ['', [Validators.required, Validators.maxLength(50)]],
        endDate: ['', [Validators.required, Validators.maxLength(50)]],
    });

    public projectId: string;

    constructor(private store: Store, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe((params) => {
            this.projectId = params['projectId'];
        });
    }

    public ngOnInit(): void {
        this.sprintForm.patchValue({
            name: this.sprint?.name!,
        });
    }

    public closeDialog(): void {
        this.sprintForm.reset({
            name: '',
            startDate: '',
            endDate: '',
        });
        this.closeEventChange.emit();
    }

    public startSprint() {
        const startDate = this.sprintForm.value.startDate!.split('/').reverse().join('/');
        const endDate = this.sprintForm.value.endDate!.split('/').reverse().join('/');

        this.store.dispatch(
            startSprintAction({
                sprint: {
                    id: this.sprint!.id,
                    name: this.sprint!.name,
                    status: 'STARTED',
                    projectId: Number(this.projectId),
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                },
            })
        );
        this.closeEventChange.emit();
    }
}
