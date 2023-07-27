export type Event = {
    id: string;
    eventName: string;
    address: string;
    time: string;
    end:string;
};

export type EventItem = {
    start?: Date | string;
    end?: Date | string;
    data?: { event?: Event };
    isDraggable?: boolean;
    isResizable?: boolean;
    resourceId?: number;
    isAllDay?: boolean;
};


