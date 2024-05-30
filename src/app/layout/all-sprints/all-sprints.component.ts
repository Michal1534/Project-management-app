import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fetchAllSprintsAction } from './store/fetch-all-sprints/fetch-all-sprints.action';
import { selectAllSprints } from './store/selectors/all-sprints.selector';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-all-sprints',
    templateUrl: './all-sprints.component.html',
    styleUrl: './all-sprints.component.scss',
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllSprintsComponent {
    public sprints$ = this.store.select(selectAllSprints);

    constructor(private store: Store, private route: ActivatedRoute) {
        this.route.params.subscribe((params) => {
            console.log(params['projectId']);
            this.store.dispatch(fetchAllSprintsAction({ projectId: params['projectId'] }));
        });
        // this.store.dispatch(fetchAllSprintsAction({ projectId: '1' }));
    }
}
