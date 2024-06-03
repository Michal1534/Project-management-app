export interface TaskResponse {
    id: number;
    sprint_id: number;
    name: string;
    description: string;
    task_type: string;
    priority: string;
    status: string;
    assigned_user: {
        first_name: string;
        last_name: string;
    };
    created_at: string;
    component: string;
    story_points: number;
    assigned_user_id: number;
    reported_by_user_id: number;
}
