import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { HolidaysRoutingModule } from './holidays-routing.module';
import { HolidaysComponent } from './holidays.component';
import { SharedModule } from '../../../shared/shared.module';
import { AddHolidayEffect } from './store/add-new-holiday/add-new-holiday.effect';
import { EffectsModule } from '@ngrx/effects';
import { ALL_HOLIDAYS_STATE_FEATURE_KEY } from './store/all-holidays-state.selector';
import { allHolidaysReducer } from './store/all-holidays.reducer';
import { FetchAllHolidaysEffect } from './store/fetch-all-holidays/fetch-all-holidays.effect';
import { RemoveHolidayEffect } from './store/remove-holiday/remove-holiday.effect';

@NgModule({
    declarations: [HolidaysComponent],
    imports: [
        CommonModule,
        SharedModule,
        HolidaysRoutingModule,
        StoreModule.forFeature(ALL_HOLIDAYS_STATE_FEATURE_KEY, allHolidaysReducer),
        EffectsModule.forFeature([FetchAllHolidaysEffect, AddHolidayEffect, RemoveHolidayEffect]),
    ],
})
export class HolidaysModule {}
