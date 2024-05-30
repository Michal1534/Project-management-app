import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fetchProjectsAction } from './store/fetch-projects/fetch-projects.action';
import { Store } from '@ngrx/store';
import { selectUserProjects } from './store/selectors/user-projects.selector';
import { fetchAuthenticatedUserAction } from '../store/queries/fetch-authenticated-user/fetch-authenticated-user.action';
import { selectAuthenticatedUser } from '../store/selectors/authenticated-user.selector';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss',
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
    public projects$ = this.store.select(selectUserProjects);
    public authenticatedUser$ = this.store.select(selectAuthenticatedUser);

    constructor(private store: Store) {
        this.store.dispatch(fetchAuthenticatedUserAction());

        this.store.dispatch(fetchProjectsAction());
    }
}
