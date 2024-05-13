import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(({ LoginModule }: any) => LoginModule),
    },
    {
        path: 'projects',
        loadChildren: () => import('./projects/projects.module').then(({ ProjectsModule }: any) => ProjectsModule),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            paramsInheritanceStrategy: 'always',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
