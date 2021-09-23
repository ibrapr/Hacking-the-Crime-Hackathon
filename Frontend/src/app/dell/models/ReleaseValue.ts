import { ValueProvider } from '@angular/core';
import { Product } from './Product';
import { Release } from './Release'
import { Value } from './Value'

export class ReleaseValue
{
    constructor(public valueID : number, public productID: number, 
        // public startReleaseId?: number, public endReleaseId?: number,
        public startOrder?: number, public endOrder?: number)
    {
        // this.setReleases(startReleaseId, endReleaseId);
        this.setOrders(startOrder, endOrder);
    }
    
    public setOrders(startOrder: number, endOrder: number)
    {
        if (this.startOrder == null || this.endOrder == null)
        {

            if (this.startOrder == null) this.startOrder = Release.naId;
            if (this.endOrder == null) this.endOrder = Release.naId;
        }
    }
    
    // public setReleases(startReleaseId: number, endReleaseId: number)
    // {
    //     if (this.startReleaseId == null || this.endReleaseId == null)
    //     {

    //         if (this.startReleaseId == null) this.startReleaseId = Release.naId;
    //         if (this.endReleaseId == null) this.endReleaseId = Release.naId;
    //     }
    //     if (this.startOrder == null || this.endOrder == null)
    //     {

    //         if (this.startOrder == null) this.startOrder = Release.naId;
    //         if (this.endOrder == null) this.endOrder = Release.naId;
    //     }
    // }
}