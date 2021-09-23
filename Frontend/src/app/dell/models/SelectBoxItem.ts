export class SelectBoxItem
{
    id: number;
    text: String;
    disabled = false;

    public setSelectBoxItemData(id:number, text:string, disabled = false)
    {
        this.id = id;
        this.text = text;
        this.disabled = disabled;
    }

    /**
     * Generates a SelectBoxItem array from a string array
     * @param names 
     * @returns 
     */
    static getSelectBoxArray(names: string[]): SelectBoxItem[]
    {
        let items: SelectBoxItem[] = [];
        for (let i = 0; i < names.length; i++)
        {
            const element = names[i];
            const selectItem = new SelectBoxItem();
            selectItem.id = i;
            selectItem.text = element;
            items.push(selectItem);
        }
        return items;
    }
}