export type Email = {
    id: number;
    type: string;
    subject: string;
    description: string;
    from: string;
    senderName?: string;
    to: string[];
    receiverNames: string[];
    expanded?: boolean;
    color?: string;
    replys: Email[];
};

export type OutlookDataProps = {
    [key: string]: Email[];
};

export type EmailDetailsProps = {
    email: string;
    name: string;
}