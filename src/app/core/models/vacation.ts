export interface Vacation {
    id: number;
    status: number;
    statusname: string;
    reasonname: string;
    startdate: string;
    enddate: string;
    startafternoon: number;
    endbeforenoon: number;
    creation: string;
    lastupdate?: string;
}