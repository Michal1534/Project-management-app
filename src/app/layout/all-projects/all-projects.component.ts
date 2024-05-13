import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchAllProjectsAction } from './store/fetch-all-projects/fetch-all-projects.action';
import { selectAllProjects } from './store/selectors/all-projects.selector';

@Component({
    selector: 'app-all-projects',
    templateUrl: './all-projects.component.html',
    styleUrl: './all-projects.component.scss',
})
export class AllProjectsComponent {
    public projects$ = this.store.select(selectAllProjects);

    constructor(private store: Store) {
        this.store.dispatch(fetchAllProjectsAction());
    }
}
