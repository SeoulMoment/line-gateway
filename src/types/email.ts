export interface EmailSendResult {
  messageId?: string;
}

export interface EmailBinding {
  send(message: {
    to: string;
    from: {
      email: string;
      name?: string;
    };
    subject: string;
    text?: string;
    html?: string;
  }): Promise<EmailSendResult>;
}
