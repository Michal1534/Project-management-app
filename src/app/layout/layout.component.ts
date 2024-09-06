import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { fetchAuthenticatedUserAction } from '../store/queries/fetch-authenticated-user/fetch-authenticated-user.action';
import { selectAuthenticatedUser } from '../store/selectors/authenticated-user.selector';
import { selectUserProjects } from './store/selectors/user-projects.selector';
import { fetchProjectsAction } from './store/fetch-projects/fetch-projects.action';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    public itemsOwner: MenuItem[] = [];
    public itemsWorker: MenuItem[] = [];
    public authenticatedUser$ = this.store.select(selectAuthenticatedUser);
    public selectedProjectId = '';
    public projects$: Observable<{ id: string; name: string }[]>;

    constructor(private router: Router, private store: Store, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe((params) => {
            this.selectedProjectId = params['projectId'];
        });
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
        this.itemsOwner = [
            { label: 'Obecny Sprint', routerLink: 'current-sprint' },
            { label: 'Użytkownicy', routerLink: 'users' },
            { label: 'Pozostałe Sprinty', routerLink: 'all-sprints' },
            { label: 'Urlopy', routerLink: 'holidays' },
            { label: 'Projekty', routerLink: 'all-projects' },
        ];
        this.itemsWorker = [
            { label: 'Obecny Sprint', routerLink: 'current-sprint' },
            { label: 'Użytkownicy', routerLink: 'users' },
            { label: 'Pozostałe Sprinty', routerLink: 'all-sprints' },
            { label: 'Urlopy', routerLink: 'holidays' },
        ];
    }

    public logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
    }

    public onProjectChange(projectId: string): void {
        const currentPath = this.router.url;

        const pathSegments = currentPath.split('/');

        pathSegments[2] = projectId;

        const newPath = pathSegments.join('/');

        this.router.navigate([newPath], { queryParamsHandling: 'preserve', onSameUrlNavigation: 'reload' });
    }
}
