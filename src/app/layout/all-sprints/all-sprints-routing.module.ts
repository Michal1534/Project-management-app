import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllSprintsComponent } from './all-sprints.component';

const routes: Routes = [{ path: '', component: AllSprintsComponent, children: [] }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AllSprintsRoutingModule {}
