import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FormBuilder, Validators } from '@angular/forms';
import { add, format } from 'date-fns';
import { selectAuthenticatedUser } from '../../store/selectors/authenticated-user.selector';
import { addHolidayAction, addHolidaySuccessAction } from './store/add-new-holiday/add-new-holiday.action';
import { fetchAllHolidaysAction } from './store/fetch-all-holidays/fetch-all-holidays.action';
import { Actions, ofType } from '@ngrx/effects';
import { filter, map, tap } from 'rxjs';
import { selectAllHolidays } from './store/selectors/all-holidays.selector';
import { pl } from 'date-fns/locale';
import { removeHolidayAction, removeHolidaySuccessAction } from './store/remove-holiday/remove-holiday.action';

@Component({
    selector: 'app-holidays',
    templateUrl: './holidays.component.html',
})
export class HolidaysComponent {
    public calendarOptions: CalendarOptions = {
        contentHeight: '80vh',
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin, interactionPlugin],
        locale: 'pl',
        titleFormat: { month: 'long', year: 'numeric' },
        headerToolbar: {
            left: '',
            center: 'title',
        },
        buttonText: {
            today: 'Obecny miesiąc',
        },
        selectable: true,
        selectMirror: true,
        allDaySlot: false,
        dayHeaderFormat: { weekday: 'long' },
        displayEventTime: true,
        displayEventEnd: true,
        slotDuration: '01:00:00',
        hiddenDays: [0, 6],
        eventClick: this.openDialog.bind(this),
        select: this.openAddDialog.bind(this),
    };

    public isDialogVisible: boolean;
    public isDetailsVisible: boolean;
    public currentEvent: any;
    public holidays: any = [];
    public projectId: number;

    public authenticatedUser$ = this.store.select(selectAuthenticatedUser);

    public allHoliday$ = this.store.select(selectAllHolidays).pipe(
        map((holidays: any[]) =>
            holidays.map((holiday: any) => ({
                title: `${holiday.user.first_name} ${holiday.user.last_name} - ${holiday.reason}`,
                start: holiday.start_date,
                end: holiday.end_date,
                allDay: true,
                extendedProps: {
                    id: holiday.id,
                    userId: holiday.user.id,
                    user: `${holiday.user.first_name} ${holiday.user.last_name}`,
                    reason: holiday.reason,
                },
            }))
        )
    );

    public userId: number;

    public holidayForm = this.formBuilder.group({
        startDate: ['', [Validators.required, Validators.maxLength(50)]],
        endDate: ['', [Validators.required, Validators.maxLength(50)]],
        reason: ['', [Validators.required, Validators.maxLength(50)]],
    });

    public openAddDialog(info: any): void {
        this.holidayForm.patchValue({
            startDate: format(new Date(info.startStr), 'dd/MM/yyyy'),
            endDate: format(new Date(info.endStr), 'dd/MM/yyyy'),
            reason: '',
        });
        this.isDialogVisible = true;
    }

    public openDialog(info: any): void {
        this.currentEvent = {
            id: info.event.extendedProps.id,
            userId: info.event.extendedProps.userId,
            user: info.event.extendedProps.user,
            reason: info.event.extendedProps.reason,
            start: format(info.event.start, 'dd MMMM yyyy', { locale: pl }),
            end: format(info.event.end, 'dd MMMM yyyy', { locale: pl }),
        };
        this.isDetailsVisible = true;
    }

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private actions$: Actions
    ) {
        this.route.params.subscribe((params) => {
            this.projectId = params['projectId'];
            this.store.dispatch(fetchAllHolidaysAction({ projectId: params['projectId'] }));
        });
        this.authenticatedUser$.subscribe((user) => {
            this.userId = user.id;
        });

        this.actions$
            .pipe(
                ofType(addHolidaySuccessAction),
                tap(() => (this.isDialogVisible = false))
            )
            .subscribe();

        this.actions$
            .pipe(
                ofType(removeHolidaySuccessAction),
                tap(() => (this.isDetailsVisible = false))
            )
            .subscribe();

    }

    public addHoliday(): void {
        const startDate = this.holidayForm.value.startDate!.split('/').reverse().join('/');
        const endDate = this.holidayForm.value.endDate!.split('/').reverse().join('/');
        this.store.dispatch(
            addHolidayAction({
                projectId: this.projectId,
                holiday: {
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    reason: this.holidayForm.value.reason!,
                    userId: this.userId,
                },
            })
        );
    }

    public removeHoliday(holidayId: number): void {
        this.store.dispatch(removeHolidayAction({ holidayId, projectId: this.projectId }));
    }
}
