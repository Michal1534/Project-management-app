import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
    { path: '', component: ProjectsComponent },
    { path: ':projectId', loadChildren: () => import('../layout/layout.module').then((m) => m.LayoutModule) },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProjectsRoutingModule {}
