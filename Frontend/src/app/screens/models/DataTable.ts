import { PipeTransform } from "@angular/core";

export class DataTable {
    public titles: string[]
    public rows: any[][]
    
}
export class LineChartsData {
    constructor(
        public data : number[]=[],
        public name: string='',
        public titleText: string = null,
        public xaxisCatagories: string[] = []) {
    }
}

export class series {
    constructor(
        public seriesData: number[] = [],
        public seriesName: string = null){}   
}

export class BarChartsData{
    constructor(
        public data : number[]=[],
        public name: string='',
        public titleText: string = null,
        public xaxisCatagories: string[] = []) {
    }
}
export class PieChartsData{
    constructor(
        public data : number[]=[],
        public label : string[]=[]) {
    }
}