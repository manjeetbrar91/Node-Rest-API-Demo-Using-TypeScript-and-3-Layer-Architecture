
export class DateUtils {

  public static getMinDate(): Date {
    return new Date(1355271132000);
  }

  public static getBackDate(dateOfEvaluation: Date, daysBack: number): Date {
    let updatedDate = (new Date(dateOfEvaluation).getTime()) - (daysBack * 24 * 60 * 60 * 1000);
    return new Date(updatedDate);
  }

  public static getValidStartUTCDate(dateForEvaluation: Date): Date {
    const startDate: Date = new Date(dateForEvaluation);
    startDate.setHours(0, 0, 0, 0);
    return startDate;
  }

  public static getValidEndUTCDate(dateForEvaluation: Date): Date {
    const endDate: Date = new Date(dateForEvaluation);
    endDate.setHours(23, 59, 59, 999);
    return endDate;
  }

  public static addDaysToDate(days: number, date: Date): Date {
    let newDate: Date = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  public static addMilliSecsToDate(milliSeconds: number, date: Date): Date {
    let newDate: Date = new Date(date);
    newDate = new Date(newDate.getTime() + milliSeconds);
    return newDate;
  }

  public static getGMTStartTime(date): Date{
    date = new Date(date.setHours(0, 0, 0, 0));
    let dateUTC: any = new Date(date);
    dateUTC = dateUTC.getTime();
    let dateIST = new Date(dateUTC);
    //date shifting for IST timezone (+5 hours and 30 minutes)
    dateIST.setHours(dateIST.getHours() - 5); 
    dateIST.setMinutes(dateIST.getMinutes() - 30);
    return dateIST;
  }

  public static getGMTStartDateTime(date): Date{
    date = new Date(date.setHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    let dateUTC: any = new Date(date);
    dateUTC = dateUTC.getTime();
    let dateIST = new Date(dateUTC);
    //date shifting for IST timezone (+5 hours and 30 minutes)
    dateIST.setHours(dateIST.getHours() - 5); 
    dateIST.setMinutes(dateIST.getMinutes() - 30);
    return dateIST;
  }

  public static getGMTEndTime(date): Date{
    date = new Date(date.setHours(23, 59, 59, 999));
    let dateUTC: any = new Date(date);
    dateUTC = dateUTC.getTime();
    let dateIST = new Date(dateUTC);
    //date shifting for IST timezone (+5 hours and 30 minutes)
    dateIST.setHours(dateIST.getHours() - 5); 
    dateIST.setMinutes(dateIST.getMinutes() - 30);
    return dateIST;
  }

  public static getGMTEndDateTime(date): Date{
    date = new Date(date.setHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    let dateUTC: any = new Date(date);
    dateUTC = dateUTC.getTime();
    let dateIST = new Date(dateUTC);
    //date shifting for IST timezone (+5 hours and 30 minutes)
    dateIST.setHours(dateIST.getHours() - 5); 
    dateIST.setMinutes(dateIST.getMinutes() - 30);
    return dateIST;
  }

  public static setTimeInDate(date, hours, minutes, seconds) {
    return date.set("hour", hours).set("minute", minutes).set("second", seconds);
  }

  public static getStartAndEndDates(start: string, end: string): any {
    let startDate: Date;
    let endDate: Date
    if (start && end) {
      startDate = new Date(start);
      endDate = new Date(end)
    } else if (start) {
      startDate = new Date(start);
      endDate = this.addDaysToDate(30, startDate);
    } else if (end) {
      endDate = new Date(endDate);
      startDate = this.addDaysToDate(-30, endDate);
    } else {
      endDate = this.addDaysToDate(-1, new Date());
      startDate = this.addDaysToDate(-30, endDate);
    }

    startDate = this.getGMTStartTime(startDate);
    endDate = this.getGMTEndTime(endDate);

    return { startDate, endDate }
  }

  public static getStartAndEndDatesWithRespectiveTime(start: string, end: string): any {
    let startDate: Date;
    let endDate: Date
    if (start && end) {
      startDate = new Date(start);
      endDate = new Date(end)
    } else if (start) {
      startDate = new Date(start);
      endDate = this.addDaysToDate(30, startDate);
    } else if (end) {
      endDate = new Date(endDate);
      startDate = this.addDaysToDate(-30, endDate);
    } else {
      endDate = this.addDaysToDate(-1, new Date());
      startDate = this.addDaysToDate(-30, endDate);
    }

    startDate = this.getGMTStartDateTime(startDate);
    endDate = this.getGMTEndDateTime(endDate);

    return { startDate, endDate }
  }

  public static getPreviousStartAndEndDates(currentStartDate: Date, currentEndDate: Date): any {
    let previousStartDate: Date;
    let previousEndDate: Date;

    previousStartDate = this.addDaysToDate((DateUtils.getNumberOfDaysInBetween(currentStartDate, currentEndDate)) * -1, currentStartDate);
    previousEndDate = DateUtils.addDaysToDate((DateUtils.getNumberOfDaysInBetween(currentStartDate, currentEndDate)) * -1, currentEndDate);

    return { previousStartDate, previousEndDate }
  }

  public static getNumberOfDaysInBetween(startDate: Date, endDate: Date): number {
    let millisecondsPerDay: number = 24 * 60 * 60 * 1000;
    let numberOfDays = (endDate.getTime() - startDate.getTime()) / millisecondsPerDay;
    return numberOfDays;
  }
}
