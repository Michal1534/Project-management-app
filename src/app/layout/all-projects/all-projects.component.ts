import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchAllProjectsAction } from './store/fetch-all-projects/fetch-all-projects.action';
import { selectAllProjects } from './store/selectors/all-projects.selector';
import { addProjectSuccessAction } from './store/add-new-project/add-new-project.action';
import { Actions, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { removeProjectAction } from './store/remove-project/remove-project.action';
import { ProjectsResponse } from './store/fetch-all-projects/fetch-all-projects.response';
import { editProjectSuccessAction } from './store/edit-project/edit-project.action';

@Component({
    selector: 'app-all-projects',
    templateUrl: './all-projects.component.html',
    styleUrl: './all-projects.component.scss',
})
export class AllProjectsComponent {
    public projects$ = this.store.select(selectAllProjects);

    public visible = false;
    public editVisible = false;
    public currentProject: ProjectsResponse | null;

    constructor(private store: Store, private actions$: Actions) {
        this.store.dispatch(fetchAllProjectsAction());

        this.actions$
            .pipe(
                ofType(addProjectSuccessAction),
                tap(() => (this.visible = false))
            )
            .subscribe();

        this.actions$
            .pipe(
                ofType(editProjectSuccessAction),
                tap(() => (this.editVisible = false))
            )
            .subscribe();
    }

    public setAddDialogVisible(isVisible: boolean): void {
        this.visible = isVisible;
    }

    public setEditSidebarVisibility(isVisible: boolean): void {
        if (!isVisible) {
            this.currentProject = null;
        }
        this.editVisible = isVisible;
    }

    public editProject(project: ProjectsResponse) {
        this.currentProject = project;
        this.setEditSidebarVisibility(true);
    }

    public removeProject(projectId: number) {
        this.store.dispatch(removeProjectAction({ projectId: projectId }));
    }
}
