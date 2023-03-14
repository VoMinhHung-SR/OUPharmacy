import APIs, { endpoints } from "../../../../config/APIs"

export const fetchListExaminationToday = async () => {
    const res = await APIs.get(endpoints['get-list-exam-today'])
    return res;
}