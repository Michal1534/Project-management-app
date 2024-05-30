import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fetchProjectUsersAction } from './store/fetch-project-users/fetch-project-users.action';
import { Store } from '@ngrx/store';
import {
    selectProjectName,
    selectProjectUsers,
    selectUsersNotInProject,
} from './store/selectors/project-users.selector';
import { FormBuilder, Validators } from '@angular/forms';
import { Users } from './store/fetch-no-project-users/fetch-project-users.response';
import { fetchNoProjectUsersAction } from './store/fetch-no-project-users/fetch-no-project-users.action';
import { assignUsersToProjectAction } from './store/assign-users-to-project/assign-users-to-project.action';
import { clearProjectUsersAction } from './store/clear-project-users/clear-project-users.action';
import { removeUserFromProjectAction } from './store/remove-user-from-project/remove-user-from-project.action';

@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
    styleUrl: './project-details.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailsComponent {
    public projectUsers$ = this.store.select(selectProjectUsers);
    public projectName$ = this.store.select(selectProjectName);
    public usersNotInProject$ = this.store.select(selectUsersNotInProject);

    public visible = false;
    public usersNotInProject: Users[] = [];

    public projectDetailsForm = this.formBuilder.group({
        users: [[], [Validators.required]],
    });

    public projectId: string = '';

    constructor(private formBuilder: FormBuilder, private store: Store, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe((params) => {
            this.projectId = params['projectDetailsId'];
            console.log(this.projectId);
            this.store.dispatch(fetchProjectUsersAction({ projectId: this.projectId }));
            this.store.dispatch(fetchNoProjectUsersAction({ projectId: this.projectId }));
        });

        console.log(this.projectUsers$);
    }

    ngOnInit() {
        this.usersNotInProject$.subscribe((users) => {
            console.log(users);
            this.usersNotInProject = users.map((user) => ({
                ...user,
                fullName: `${user.first_name} ${user.last_name}`,
            }));
        });
    }

    public showModalDialog(visible: boolean) {
        this.projectDetailsForm.reset();
        this.visible = visible;
    }

    public assignUserToProject() {
        this.store.dispatch(
            assignUsersToProjectAction({
                projectId: Number(this.projectId),
                userIds: (this.projectDetailsForm.value.users! as Users[]).map((user: Users) => user.id),
            })
        );
        this.showModalDialog(false);
    }

    public removeUserFromProject(userId: number) {
        console.log(userId);
        this.store.dispatch(removeUserFromProjectAction({ projectId: Number(this.projectId), userId }));
    }

    public ngOnDestroy() {
        this.store.dispatch(clearProjectUsersAction());
    }
}
