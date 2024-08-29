import { Component } from '@angular/core';
import { fetchProjectsAction } from './store/fetch-projects/fetch-projects.action';
import { Store } from '@ngrx/store';
import { selectUserProjects } from './store/selectors/user-projects.selector';
import { fetchAuthenticatedUserAction } from '../store/queries/fetch-authenticated-user/fetch-authenticated-user.action';
import { selectAuthenticatedUser } from '../store/selectors/authenticated-user.selector';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss',
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
    public projects$: Observable<{ id: string; name: string }[]>;
    public authenticatedUser$ = this.store.select(selectAuthenticatedUser);

    constructor(private store: Store) {
        this.store.dispatch(fetchAuthenticatedUserAction());

        this.store.dispatch(fetchProjectsAction());
    }

    ngOnInit(): void {
        this.projects$ = this.store.select(selectUserProjects).pipe(
            map((projects) =>
                projects.map((project) => {
                    return {
                        id: project?.project?.id ? project.project.id.toString() : project.id.toString(),
                        name: project?.project?.name ? project.project.name : project.name,
                    };
                })
            )
        );
    }
}
