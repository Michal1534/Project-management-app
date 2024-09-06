import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchCurrentSprintAction } from './store/fetch-current-sprint/fetch-current-sprint.action';
import { selectCurrentSprintState } from './store/current-sprint-state.selector';
import { combineLatest, map, max, tap } from 'rxjs';
import { UpdateTaskAction } from './store/update-task-status/update-task.action';
import { ActivatedRoute } from '@angular/router';
import { fetchAllSprintsAction } from '../all-sprints/store/fetch-all-sprints/fetch-all-sprints.action';
import { selectCurrentAllSprints } from './store/selectors/all-sprints.selector';
import { fetchProjectUsersAction } from './store/fetch-project-users/fetch-project-users.action';
import { selectProjectUsers } from './store/selectors/project-users.selector';
import { Users } from './store/fetch-project-users/fetch-project-users.response';
import { fetchAllHolidaysAction } from './store/fetch-all-holidays/fetch-all-holidays.action';
import { selectAllHolidays } from './store/selectors/all-holidays.selector';
import { selectAuthenticatedUser } from '../../store/selectors/authenticated-user.selector';
import { differenceInDays } from 'date-fns';

@Component({
    selector: 'app-current-sprint',
    templateUrl: './current-sprint.component.html',
    styleUrls: ['./current-sprint.component.scss'],
})
export class CurrentSprintComponent {
    tasks: any[] = [];
    draggedTask: any | undefined | null;
    public editingTaskId: number | null = null;
    public visible = false;
    public sprintId: string | null = '';
    public sprintStartDate: Date | null = null;
    public sprintEndDate: Date | null = null;
    public authenticatedUser$ = this.store.select(selectAuthenticatedUser);

    public sprints$ = this.store.select(selectCurrentAllSprints).pipe(
        map((sprints) => sprints.filter((sprint) => sprint.status === 'STARTED')),
        tap((sprints) => {
            if (sprints.length > 0) {
                this.sprintStartDate = new Date(sprints[0].start_date);
                this.sprintEndDate = new Date(sprints[0].end_date);
            } else {
                this.sprintId = null;
            }
        })
    );

    public projectId: string = '';
    public currentSprint$ = this.store.select(selectCurrentSprintState).pipe(
        tap((currentSprint) => {
            if (currentSprint.sprint.id) {
                this.tasks = currentSprint.sprint.tasks;
            }
        })
    );
    public users$ = this.store.select(selectProjectUsers);
    public holidays$ = this.store.select(selectAllHolidays).pipe(map((holidays) => holidays));
    public usersInProject: Users[] = [];

    public availableUsers$ = combineLatest([this.users$, this.holidays$]).pipe(
        map(([users, holidays]) => {
            const filteredUsers = users.filter((user) => user.role === 'User');
            return filteredUsers.map((user) => {
                const userHolidays = holidays.filter((holiday) => holiday.user_id === user.id);
                const totalHolidayDays = userHolidays.reduce(
                    (acc, holiday) => acc + this.getHolidayDaysDuringSprint(holiday),
                    0
                );
                return { ...user, totalHolidayDays };
            });
        })
    );

    statuses = [
        { label: 'Do zrobienia', value: 'Do zrobienia' },
        { label: 'W trakcie', value: 'W trakcie' },
        { label: 'Do sprawdzenia', value: 'Do sprawdzenia' },
        { label: 'Skończone', value: 'Zrobione' },
    ];

    constructor(private route: ActivatedRoute, private store: Store) {
        this.route.params.subscribe((params) => {
            this.projectId = params['projectId'];
            this.store.dispatch(fetchAllSprintsAction({ projectId: params['projectId'] }));
        });
        this.store.dispatch(fetchProjectUsersAction({ projectId: this.projectId }));
        this.store.dispatch(
            fetchAllHolidaysAction({
                projectId: Number(this.projectId),
            })
        );

        this.users$.subscribe((users) => {
            this.usersInProject = users.map((user) => ({
                ...user,
                fullName: `${user.first_name} ${user.last_name}`,
            }));
        });
    }

    public setDetailsDialogVisible(isVisible: boolean): void {
        this.visible = isVisible;
    }

    getTasksByStatus(status: string): any[] {
        return this.tasks.filter((task) => task.status === status);
    }

    onSprintChange(sprintId: any): void {
        this.store.dispatch(fetchCurrentSprintAction({ projectId: this.projectId, sprintId: sprintId.value }));
    }

    dragStart(task: any) {
        this.draggedTask = task;
    }

    dragEnd() {
        this.draggedTask = null;
    }

    onDrop(event: any, newStatus: string): void {
        this.store.dispatch(
            UpdateTaskAction({
                projectId: this.projectId,
                sprintId: this.sprintId!,
                taskId: this.draggedTask.id,
                task: { ...this.draggedTask, status: newStatus },
            })
        );
    }

    onAssignUser(task: any, userId: number): void {
        this.store.dispatch(
            UpdateTaskAction({
                projectId: this.projectId,
                sprintId: this.sprintId!,
                taskId: task.id,
                task: { ...task, assignedTo: userId },
            })
        );
    }

    startEditing(taskId: number): void {
        this.editingTaskId = taskId;
    }

    stopEditing(): void {
        this.editingTaskId = null;
    }

    public assignTasksAutomatically(): void {
        if (!this.tasks || !this.availableUsers$) {
            return;
        }

        this.availableUsers$.subscribe((users) => {
            const sortedUsers = users.sort((a, b) => this.compareExperience(a.expirience, b.expirience));

            const maxStoryPoints: { [key: string]: number } = {
                Senior: 13,
                Mid: 8,
                Junior: 5,
            };

            const userTaskAssignments: { [key: number]: number } = {};

            const filteredAndSortedTasks = this.tasks
                .filter((task) => !task.assigned_user_id)
                .sort((a, b) => this.comparePriority(a, b));

            filteredAndSortedTasks.forEach((task) => {
                let assigned = false;

                sortedUsers.some((user) => {
                    const currentSP = userTaskAssignments[user.id] || 0;
                    const userMaxSP = maxStoryPoints[user.specialization];
                    const adjustedMaxSP =
                        userMaxSP - user.totalHolidayDays * (userMaxSP / (Object.keys(maxStoryPoints).length * 7));

                    if (currentSP + task.story_points <= adjustedMaxSP || this.areTasksRemaining()) {
                        if (!task.assigned_user_id && task.component === user.specialization) {
                            this.store.dispatch(
                                UpdateTaskAction({
                                    projectId: this.projectId,
                                    sprintId: this.sprintId!,
                                    taskId: task.id,
                                    task: { ...task, assignedTo: user.id },
                                })
                            );

                            userTaskAssignments[user.id] = currentSP + task.story_points;
                            assigned = true;
                            return true;
                        }
                    }
                    return false;
                });

                if (!assigned) {
                    const leastLoadedUser = sortedUsers.reduce((prev, curr) => {
                        const prevSP = userTaskAssignments[prev.id] || 0;
                        const currSP = userTaskAssignments[curr.id] || 0;
                        return prevSP < currSP ? prev : curr;
                    });

                    this.store.dispatch(
                        UpdateTaskAction({
                            projectId: this.projectId,
                            sprintId: this.sprintId!,
                            taskId: task.id,
                            task: { ...task, assignedTo: leastLoadedUser.id },
                        })
                    );

                    userTaskAssignments[leastLoadedUser.id] =
                        (userTaskAssignments[leastLoadedUser.id] || 0) + task.story_points;
                }
            });
        });
    }

    private compareExperience(exp1: string, exp2: string): number {
        const experienceLevels: { [key: string]: number } = { Junior: 1, Mid: 2, Senior: 3 };
        return experienceLevels[exp2] - experienceLevels[exp1];
    }

    //@ts-ignore
    private comparePriority(a, b): number {
        const priorityLevels: { [key: string]: number } = { Wysoki: 1, Średni: 2, Niski: 3 };
        const priorityComparison = priorityLevels[a.priority] - priorityLevels[b.priority];

        if (priorityComparison !== 0) {
            return priorityComparison;
        }

        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }

    private areTasksRemaining(): boolean {
        return this.tasks.some((task) => !task.assigned_user_id);
    }

    private getHolidayDaysDuringSprint(holiday: any): number {
        if (!this.sprintStartDate || !this.sprintEndDate) return 0;

        const holidayStart = new Date(holiday.start_date);
        const holidayEnd = new Date(holiday.end_date);
        const sprintStart = new Date(this.sprintStartDate);
        const sprintEnd = new Date(this.sprintEndDate);

        const actualHolidayStart = holidayStart < sprintStart ? sprintStart : holidayStart;
        const actualHolidayEnd = holidayEnd > sprintEnd ? sprintEnd : holidayEnd;

        const diffDays = differenceInDays(actualHolidayEnd, actualHolidayStart) + 1;

        return diffDays;
    }
}
