import { Parameter } from "./Parameter";
import { Release } from "./Release";
import { User } from "./User";

export class Product {
    [x: string]: any;
    // TODO add list of releases 
    public constructor(public id: number, public productName: string, public status: boolean, public releases: Release[], public users?:User[], public parameters?: Parameter[]) {

    }

    public equals(other : Product) : boolean
    {
        if(other == null || this == null) return false;
        return (this.id == other.id && this.productName == other.productName && this.status == other.status);
    }
}