export type LogEntryInput = {
    temperature: number;
    date: Date;
}

export type LogEntry = LogEntryInput & {
    id: string;
}




