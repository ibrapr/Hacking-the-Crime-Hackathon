import { User } from "./User";
export class Role {
    public constructor(public name: string, public users: User[], public id: number) { }
}