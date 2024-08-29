export interface UserProjectsResponse {
    id: number;
    name: string;
    project: {
        id: number;
        name: string;
        description: string;
        status: string;
        startDate: string;
        endDate: string;
        createdAt: string;
        updatedAt: string;
    };
}
