export function convertToAgo(dateTimeStr) {
    // Get the current date and time
    var currentDatetime = new Date();
  
    // Convert the input datetime string to a Date object
    var inputDatetime = new Date(dateTimeStr);
  
    // Calculate the difference in milliseconds between the current datetime and input datetime
    var diffInMs = currentDatetime - inputDatetime;
  
    // Convert the difference to the corresponding "ago" format
    var diffInSeconds = Math.floor(diffInMs / 1000);
    var diffInMinutes = Math.floor(diffInSeconds / 60);
    var diffInHours = Math.floor(diffInMinutes / 60);
    var diffInDays = Math.floor(diffInHours / 24);
    var diffInMonths = Math.floor(diffInDays / 30);
    var diffInYears = Math.floor(diffInDays / 365);
  
    if (diffInYears > 0) {
      return diffInYears + ' year(s) ago';
    } else if (diffInMonths > 0) {
      return diffInMonths + ' month(s) ago';
    } else if (diffInDays > 0) {
      return diffInDays + ' day(s) ago';
    } else if (diffInHours > 0) {
      return diffInHours + ' hour(s) ago';
    } else if (diffInMinutes > 0) {
      return diffInMinutes + ' minute(s) ago';
    } else {
      return diffInSeconds + ' second(s) ago';
    }
  }
  

  
  export const formatter = (string) => {
    return Intl.NumberFormat('en-US', {notation: "compact",maximumFractionDigits: 1 }).format(string)
  }
