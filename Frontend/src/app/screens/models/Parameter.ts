import { Value} from './Value';
import { Product} from './Product';

export class Parameter
{
    public constructor(public id: number, public parameterName: string,public description: string, public values: Value[],public products : Product[])
    {}
    public toString(): string {
        return this.parameterName + ' ' + this.values;
    }
    
}