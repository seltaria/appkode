import { TFunction } from "i18next";
import { getNounByNum } from "./getNounByNum";

export const getUserAge = (birthday: string, t: TFunction): string => {
    const ms = new Date().getTime() - new Date(birthday).getTime();
    const age = Math.floor(ms/1000/60/60/24/365.25);

    return `${age} ${getNounByNum(age, [t("год"), t("года"), t("лет")])}`;
}
