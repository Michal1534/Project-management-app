import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentSprintComponent } from './current-sprint.component';

const routes: Routes = [
    { path: '', component: CurrentSprintComponent, children: [] },
    {
        path: ':taskId',
        loadChildren: () => import('../all-sprints/task-details/task-details.module').then((m) => m.TaskDetailsModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CurrentSprintRoutingModule {}
