import { months } from "../constants";

export const formatDate = (date: string, short?: boolean): string => {
    const formattedDate = new Date(date).toLocaleDateString("ru-RU");
    const [day, month, year] = formattedDate.split(".")

    return short ? 
        `${Number(day)} ${months[Number(month) - 1].substring(0, 3)}` :
        `${Number(day)} ${months[Number(month) - 1]} ${year}`;
}