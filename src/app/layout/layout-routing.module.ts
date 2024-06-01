import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'all-projects',
                loadChildren: () => import('./all-projects/all-projects.module').then((m) => m.AllProjectsModule),
            },
            {
                path: 'users',
                loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
            },
            {
                path: 'all-sprints',
                loadChildren: () => import('./all-sprints/all-sprints.module').then((m) => m.AllSprintsModule),
            },
            {
                path: 'holidays',
                loadChildren: () => import('./holidays/holidays.module').then((m) => m.HolidaysModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
