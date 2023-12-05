export type Events = Event[];
export type Sponsor = {
    link: string;
    logo: string;
};
export type Event = {
    id: string;
    title: string;
    location: string;
    city: string;
    state: string;
    date: string;
    year: string;
    applicationForm: string;
    applicationButton?: string;
    mentorsButton?: string;
    mentorsForm: string;
    announcement: string;
    sponsors: Sponsor[];
};