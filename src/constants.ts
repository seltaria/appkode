import { DepartmentsLabel, DepartmentsValue, TabLabel } from "./enums";

export const departments: Record<DepartmentsValue, DepartmentsLabel> = {
    [DepartmentsValue.ANDROID]: DepartmentsLabel.ANDROID,
    [DepartmentsValue.IOS]: DepartmentsLabel.IOS,
    [DepartmentsValue.DESIGN]: DepartmentsLabel.DESIGN,
    [DepartmentsValue.MANAGEMENT]: DepartmentsLabel.MANAGEMENT,
    [DepartmentsValue.QA]: DepartmentsLabel.QA,
    [DepartmentsValue.BACK_OFFICE]: DepartmentsLabel.BACK_OFFICE,
    [DepartmentsValue.FRONTEND]: DepartmentsLabel.FRONTEND,
    [DepartmentsValue.HR]: DepartmentsLabel.HR,
    [DepartmentsValue.PR]: DepartmentsLabel.PR,
    [DepartmentsValue.BACKEND]: DepartmentsLabel.BACKEND,
    [DepartmentsValue.SUPPORT]: DepartmentsLabel.SUPPORT,
    [DepartmentsValue.ANALYTICS]: DepartmentsLabel.ANALYTICS,
}

export const TabFilters = { // TODO: rename
    all: TabLabel.ALL,
    [DepartmentsValue.DESIGN]: TabLabel.DESIGN,
    [DepartmentsValue.ANALYTICS]: TabLabel.ANALYTICS,
    [DepartmentsValue.MANAGEMENT]: TabLabel.MANAGEMENT,
    [DepartmentsValue.IOS]: TabLabel.IOS,
    [DepartmentsValue.ANDROID]: TabLabel.ANDROID,
}

export const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

export const TRANSITION_DURATION = "0.2s";