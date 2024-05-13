import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllSprintsComponent } from './all-sprints.component';
import { SharedModule } from '../../../shared/shared.module';
import { AllSprintsRoutingModule } from './all-sprints-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ALL_SPRINTS_STATE_FEATURE_KEY } from './store/all-sprints-state.selector';
import { allSprintsReducer } from './store/all-sprints.reducer';
import { FetchAllSprintsEffect } from './store/fetch-all-sprints/fetch-all-sprints.effect';

@NgModule({
    declarations: [AllSprintsComponent],
    imports: [
        CommonModule,
        SharedModule,
        AllSprintsRoutingModule,
        StoreModule.forFeature(ALL_SPRINTS_STATE_FEATURE_KEY, allSprintsReducer),
        EffectsModule.forFeature([FetchAllSprintsEffect]),
    ],
})
export class AllSprintsModule {}
