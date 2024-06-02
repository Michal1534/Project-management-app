import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { addSprintAction } from '../store/add-new-sprint/add-new-sprint.action';
import { fetchProjectUsersAction } from '../store/fetch-project-users/fetch-project-users.action';
import { selectProjectUsers } from '../store/selectors/project-users.selector';
import { Users } from '../store/fetch-project-users/fetch-project-users.response';
import { selectAuthenticatedUser } from '../../../store/selectors/authenticated-user.selector';
import { addTaskAction } from '../store/add-task/add-new-sprint.action';

@Component({
    selector: 'app-add-task',
    templateUrl: './add-task.component.html',
})
export class AddTaskComponent {
    @Input() public visible: boolean;
    @Input() public sprintId: number;

    @Output() public closeEventChange = new EventEmitter<void>();

    public taskForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(50)]],
        description: ['', [Validators.required, Validators.maxLength(200)]],
        status: ['', [Validators.required]],
        priority: ['', [Validators.required]],
        type: ['', [Validators.required]],
        assignedTo: ['', [Validators.required]],
        storyPoints: [0, [Validators.required]],
        component: ['', [Validators.required]],
    });

    public projectId: string;
    public userId: number;
    public users$ = this.store.select(selectProjectUsers);
    public usersInProject: Users[] = [];
    public authenticatedUser$ = this.store.select(selectAuthenticatedUser);

    constructor(private store: Store, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe((params) => {
            this.projectId = params['projectId'];
        });
        this.store.dispatch(fetchProjectUsersAction({ projectId: this.projectId }));

        this.users$.subscribe((users) => {
            this.usersInProject = users.map((user) => ({
                ...user,
                fullName: `${user.first_name} ${user.last_name}`,
            }));
        });
        this.authenticatedUser$.subscribe((user) => {
            this.userId = user.id;
        });
    }

    public closeDialog(): void {
        this.taskForm.reset({
            name: '',
        });
        this.closeEventChange.emit();
    }

    public addNewTask() {
        this.store.dispatch(
            addTaskAction({
                projectId: Number(this.projectId),
                task: {
                    name: this.taskForm.value.name!,
                    description: this.taskForm.value.description!,
                    status: this.taskForm.value.status!,
                    priority: this.taskForm.value.priority!,
                    type: this.taskForm.value.type!,
                    assignedTo: Number(this.taskForm.value.assignedTo!),
                    storyPoints: this.taskForm.value.storyPoints!,
                    component: this.taskForm.value.component!,
                    sprintId: this.sprintId,
                    createdBy: this.userId,
                },
            })
        );
        this.closeEventChange.emit();
    }
}
