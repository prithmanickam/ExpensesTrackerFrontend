export const formatDate = (date: Date): string => {
    const d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + (d.getDate()),
      year = d.getFullYear();

    return [
      year,
      month.length < 2 ? "0" + month : month,
      day.length < 2 ? "0" + day : day,
    ].join("-");
  };
  
// Check if a response number starts with a 2
export const responseIsOk = (status: number): boolean => (status >= 200 && status < 300) ? true : false;
