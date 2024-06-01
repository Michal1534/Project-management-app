export interface HolidaysResponse {
    holiday: {
        user: {
            id: number;
            first_name: string;
            last_name: string;
        };
        start_date: Date;
        end_date: Date;
        reason: string;
    };
}
