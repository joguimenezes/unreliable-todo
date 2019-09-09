const getFormattedDate = (date: Date | string): any => date && date.toString().slice(0, 10)

export default getFormattedDate;