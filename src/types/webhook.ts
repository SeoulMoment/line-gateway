export interface WebhookBody {
    destination: string;
    events: WebhookEvent[];
}

export interface WebhookEvent {
    type: string;
    replyToken: string;
    source: {
        userId: string;
    };
    message?: Message;
}