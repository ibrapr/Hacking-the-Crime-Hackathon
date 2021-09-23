

export class ReportResult {
    public a:any;
    public b:any;
    public constructor(public xValues: string[], public yValues: number[]) {

    }


    public equals(other: ReportResult): boolean {
        if (other == null || this == null) return false;
        this.a = Array.isArray(other.xValues) && Array.isArray(this.xValues) && 
        other.xValues.length === this.xValues.length &&
        other.xValues.every((val, index) => val === this.xValues[index] );
        this.b = Array.isArray(other.yValues) && Array.isArray(this.yValues) && 
        other.yValues.length === this.yValues.length &&
        other.yValues.every((val, index) => val === this.yValues[index] );
        if(this.b==this.a){
            return true;
        }
        return false;
    }
}