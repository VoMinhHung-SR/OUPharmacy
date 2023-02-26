import APIs, { endpoints } from "../../../../config/APIs"

export const fetchTotalExamination = async () => {
    const res = await APIs.get(endpoints['get-total-exam-today'])
    return res;
} 