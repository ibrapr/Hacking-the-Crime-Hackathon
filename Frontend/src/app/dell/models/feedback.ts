import { User } from "./User";

export class Feedback {
    constructor(
        public id : number,
        public user : User,
        public topic : string,
        public subject : string,
        public date : Date,
        public status : boolean){}
}
