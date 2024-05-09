export function getRemainingDays(startDate: string, stopDate: string): number {
  const start = new Date(startDate);
  const stop = new Date(stopDate);
  const remainingMillis = Math.abs(stop.getTime() - start.getTime());
  const remainingDays = Math.ceil(remainingMillis / (1000 * 60 * 60 * 24));
  return remainingDays;
}

// used on frontend to determine if day's isPerformed can be modified.
export function canUpdateDayStatus(currentDateString: string, dayDateString: string) {
  const currentDate = new Date(currentDateString);
  const dayDate = new Date(dayDateString);
  if (currentDate >= dayDate) {
    return true
  }
  return false
}


export function getDateStringFromDateTimeString(dateString: string): string {
  if (dateString.includes("T")) {
    let parts = dateString.split("T");
    return parts[0];
  }
  return dateString
}

