import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { fetchAuthenticatedUserAction } from '../store/queries/fetch-authenticated-user/fetch-authenticated-user.action';
import { selectAuthenticatedUser } from '../store/selectors/authenticated-user.selector';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    public itemsOwner: MenuItem[] = [];
    public itemsWorker: MenuItem[] = [];
    public authenticatedUser$ = this.store.select(selectAuthenticatedUser);

    constructor(private router: Router, private store: Store) {
        this.store.dispatch(fetchAuthenticatedUserAction());
        this.authenticatedUser$.subscribe((user) => console.log(user));
    }

    ngOnInit(): void {
        this.itemsOwner = [
            { label: 'Obecny Spring', routerLink: 'dashboard' },
            { label: 'Użytkownicy', routerLink: 'users' },
            { label: 'Pozostałe sprinty', routerLink: 'all-sprints' },
            { label: 'Urlopy', routerLink: 'holidays' },
            { label: 'Projekty', routerLink: 'all-projects' },
        ];
        this.itemsWorker = [
            { label: 'Pracownicy', routerLink: 'workers' },
            { label: 'Brygady', routerLink: 'brigade-list' },
            { label: 'Zlecenia', routerLink: 'errand-list' },
            { label: 'Kalendarz', routerLink: 'calendar' },
        ];
    }

    public logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
    }
}
