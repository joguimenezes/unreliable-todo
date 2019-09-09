const getDiffBetweenDatesInMinutes = (startDate: Date, endDate: Date): number => {
    const diffBetweenSessionDateAndCurrentDateInSeconds = (startDate.getTime() - endDate.getTime()) / 1000;
    return diffBetweenSessionDateAndCurrentDateInSeconds / 60;
};

export default getDiffBetweenDatesInMinutes;