export interface SprintsResponse {
    id: number;
    name: string;
    status: string;
    start_date: Date;
    end_date: Date;
    projectId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    project: {
        id: number;
        name: string;
        description: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
    };
    tasks: {
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
    }[];
}
