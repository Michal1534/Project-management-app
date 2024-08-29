import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SharedModule } from '../../shared/shared.module';
import { LAYOUT_PROJECTS_STATE_FEATURE_KEY } from './store/layout-projects-state.selector';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FetchUserProjectsEffect } from './store/fetch-projects/fetch-projects.effect';
import { layoutProjectsReducer } from './store/layout-projects.reducer';

@NgModule({
    declarations: [LayoutComponent],
    imports: [
        CommonModule,
        SharedModule,
        LayoutRoutingModule,
        StoreModule.forFeature(LAYOUT_PROJECTS_STATE_FEATURE_KEY, layoutProjectsReducer),
        EffectsModule.forFeature([FetchUserProjectsEffect]),
    ],
})
export class LayoutModule {}
