export interface ProjectUsers {
    id: number;
    users: Users[];
    project: {
        id: number;
        name: string;
    };
}

export interface Users {
    id: number;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    email: string;
    position: string;
    role: string;
    availability: boolean;
    workload: number;
}
