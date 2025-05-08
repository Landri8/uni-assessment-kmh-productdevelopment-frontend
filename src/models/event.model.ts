export interface EventModel {
    id: string;
    title: string;
    type: string;
    location: string;
    date: string;
};

interface EventInfoModel extends EventModel {
    presenter: string;
    timeRange: string;
    eventDesc: string;
}

export default EventInfoModel