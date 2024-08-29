import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MockTaskService {
    private mockTasks: any[] = [
        {
            id: 1,
            name: 'Task 1',
            description: 'Description for Task 1',
            task_type: 'Bug',
            priority: 'High',
            status: 'TO_DO',
            component: 'Component 1',
            created_at: new Date(),
            story_points: 3,
            assigned_user_id: 1,
            reported_by_user_id: 2,
            sprint_id: 1,
        },
        {
            id: 2,
            name: 'Task 2',
            description: 'Description for Task 2',
            task_type: 'Feature',
            priority: 'Medium',
            status: 'IN_PROGRESS',
            component: 'Component 2',
            created_at: new Date(),
            story_points: 5,
            assigned_user_id: 2,
            reported_by_user_id: 1,
            sprint_id: 1,
        },
        {
            id: 3,
            name: 'Task 3',
            description: 'Description for Task 3',
            task_type: 'Bug',
            priority: 'Low',
            status: 'IN_REVIEW',
            component: 'Component 3',
            created_at: new Date(),
            story_points: 8,
            assigned_user_id: 3,
            reported_by_user_id: 3,
            sprint_id: 1,
        },
        {
            id: 4,
            name: 'Task 4',
            description: 'Description for Task 4',
            task_type: 'Feature',
            priority: 'High',
            status: 'DONE',
            component: 'Component 4',
            created_at: new Date(),
            story_points: 13,
            assigned_user_id: 4,
            reported_by_user_id: 4,
            sprint_id: 1,
        },
        {
            id: 5,
            name: 'Task 5',
            description: 'Description for Task 5',
            task_type: 'Bug',
            priority: 'Medium',
            status: 'TO_DO',
            component: 'Component 5',
            created_at: new Date(),
            story_points: 21,
            assigned_user_id: 5,
            reported_by_user_id: 5,
            sprint_id: 1,
        },
        // Add more mock tasks as needed
    ];

    constructor() {}

    getTasksBySprint(sprintId: number): Observable<any[]> {
        return of(this.mockTasks.filter((task) => task.sprint_id === sprintId));
    }

    updateTaskStatus(taskId: number, status: string): Observable<any> {
        const task = this.mockTasks.find((t) => t.id === taskId);
        if (task) {
            task.status = status;
        }
        return of(task);
    }
}
