import { Product } from "./Product";
export class Release
{
    public static readonly naId = 0;
    public static readonly foreverId = -1;
    public static readonly naOrder = 0;
    public static readonly foreverOrder = -1; 

    public constructor(
        public id?: number,
        public releaseName?: string,
        public status?: boolean,
        public version?: string,
        public releaseDate?: Date,
        public order_?: number,
        public proudect?:Product)
    {

    }

    public compareTo(other: Release): number
    {
        var vnum1 = 0, vnum2 = 0;
        let v1 = this.version;
        let v2 = other.version;
        // loop until both string are
        // processed
        for (var i = 0, j = 0; (i < v1.length
            || j < v2.length);)
        {
            // storing numeric part of
            // version 1 in vnum1
            while (i < v1.length && v1[i] != '.')
            {
                vnum1 = vnum1 * 10 + (+v1[i]);
                i++;
            }

            // storing numeric part of
            // version 2 in vnum2
            while (j < v2.length && v2[j] != '.')
            {
                vnum2 = vnum2 * 10 + (+v2[j]);
                j++;
            }

            if (vnum1 > vnum2)
                return 1;
            if (vnum2 > vnum1)
                return -1;

            // if equal, reset variables and
            // go for next numeric part
            vnum1 = vnum2 = 0;
            i++;
            j++;
        }
        return 0;
    }

}