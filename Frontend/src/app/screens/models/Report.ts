
export class Report {
    public constructor(
            public id?: number,
            public subject?: string,
            public content?: string,
            public explanation?: string,
            public status?: boolean
    ) { }
}