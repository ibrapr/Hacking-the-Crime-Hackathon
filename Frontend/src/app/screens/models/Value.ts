export class Value
{
    public constructor(public value?: string, public id?: number,public paramId?:number) {}   

    public toString(): string {
        return this.value ;
    }
}