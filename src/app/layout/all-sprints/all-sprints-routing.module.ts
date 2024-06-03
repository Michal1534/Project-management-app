import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllSprintsComponent } from './all-sprints.component';

const routes: Routes = [
    { path: '', component: AllSprintsComponent, children: [] },
    {
        path: ':taskId',
        loadChildren: () => import('./task-details/task-details.module').then((m) => m.TaskDetailsModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AllSprintsRoutingModule {}
