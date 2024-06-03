export interface CommentsResponse {
    comments: {
        id: number;
        comment_content: string;
        userId: number;
        timestamp: string;
    };
}
