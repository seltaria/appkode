import { months } from "../constants";

export const formatDate = (date: string): string => {
    const formattedDate = new Date(date).toLocaleDateString("ru-RU");
    const [day, month, year] = formattedDate.split(".")

    return `${Number(day)} ${months[Number(month) - 1]} ${year}`;
}