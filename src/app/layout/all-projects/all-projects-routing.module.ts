import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProjectsComponent } from './all-projects.component';

const routes: Routes = [
    { path: '', component: AllProjectsComponent },
    {
        path: ':projectDetailsId',
        loadChildren: () => import('./project-details/project-details.module').then((m) => m.ProjectDetailsModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AllProjectsRoutingModule {}
