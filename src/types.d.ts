export type Events = Event[];
export type Sponsor = {
    link: string;
    logo: string;
};
export type Person = {
    firstname: string;
    lastname: string;
    image?: string;
}
export type TimeEntry = {
    time: string;
    text: string;
}
export type Timetable = {
    instructors?: Array<any>;
    groups?: Array<any>;
    basics?: any;
    infos?: Array<any>;
    dates?: Array<TimeEntry>;
}
export type Event = {
    id: string;
    title: string;
    location: string;
    city: string;
    state: string;
    date: string;
    year: string;
    timetable?: Timetable;
    applicationForm: string;
    applicationButton?: string;
    mentorsButton?: string;
    mentorsForm: string;
    announcement: string;
    sponsors: Sponsor[];
};