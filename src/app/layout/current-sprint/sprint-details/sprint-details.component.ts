import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-sprint-details',
    templateUrl: './sprint-details.component.html',
    styleUrl: './sprint-details.component.scss',
})
export class SprintDetailsComponent {
    @Input() visible: boolean = false;
    @Input() sprint: any;

    @Output() public closeEventChange = new EventEmitter<void>();

    public usersWithStoryPoints: any[] = [];

    get totalStoryPoints(): number {
        return this.sprint.tasks.reduce((sum: number, task: any) => sum + task.story_points, 0);
    }

    public ngOnInit(): void {
        this.calculateUserStoryPoints();
    }

    calculateUserStoryPoints(): void {
        const userMap = new Map<number, { fullName: string; storyPoints: number }>();

        this.sprint.tasks.forEach((task: any) => {
            const user = task.assigned_user;
            if (user) {
                if (!userMap.has(user.id)) {
                    userMap.set(user.id, {
                        fullName: `${user.first_name} ${user.last_name}`,
                        storyPoints: 0,
                    });
                }
                userMap.get(user.id)!.storyPoints += task.story_points;
            }
        });

        this.usersWithStoryPoints = Array.from(userMap.values());
    }

    closeDialog(): void {
        this.closeEventChange.emit();
    }
}
