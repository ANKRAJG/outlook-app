export type Email = {
    id: number;
    type: string;
    subject: string;
    description: string;
    from: string;
    to: string[];
    senderName?: string;
    expanded?: boolean;
    color?: string;
    replys: Email[];
};

export type OutlookDataProps = {
    [key: string]: Email[];
};