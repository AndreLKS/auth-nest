export class DateUtility{
    static parseDate(date: string): Date {
        const year = date.substring(0, 4);
        const month = date.substring(4, 6);
        const day = date.substring(6, 8);
        return new Date(`${year}-${month}-${day}`);
    }

    static addDayToStringDate(date: string, days: number): string {
        const newDate = this.parseDate(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate.getFullYear().toString() + (newDate.getMonth()+1).toString().padStart(2, '0') + newDate.getDate().toString().padStart(2, '0'); 
    }
     
}