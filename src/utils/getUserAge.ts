import { getNounByNum } from "./getNounByNum";

export const getUserAge = (birthday: string): string => {
    const ms = new Date().getTime() - new Date(birthday).getTime();
    const age = Math.floor(ms/1000/60/60/24/365.25);

    return `${age} ${getNounByNum(age, ["год", "года", "лет"])}`;
}
