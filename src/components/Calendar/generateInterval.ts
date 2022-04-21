import moment from "moment";
import { DateData } from "react-native-calendars";
import { MarkedDateProps } from "../../screens/Scheduling";
import theme from "../../styles/theme";

export function generateInterval(start: DateData, end: DateData) {
    let interval: MarkedDateProps;

    let daysMoment = [];

    let startDay = moment(start.timestamp).utc();
    let endDay = moment(end.timestamp).utc();
    let currentDay = moment(start.timestamp).utc();

    daysMoment.push(startDay);
    currentDay.add(1, 'days');

    while (currentDay.isSameOrBefore(endDay)) { 
        currentDay = currentDay.clone();  
        daysMoment.push(currentDay);
        currentDay = currentDay.clone();
        currentDay.add(1, 'days');
    }
 

    daysMoment.forEach(day => {
        const date = day.format('YYYY-MM-DD');
        interval = {
            ...interval,
            [date]: {
                color: day.isSame(startDay) || day.isSame(endDay) ? theme.colors.main : theme.colors.main_light,
                textColor: day.isSame(startDay) || day.isSame(endDay) ? theme.colors.main_light : theme.colors.main
            }
        }
    });

    return interval;

}