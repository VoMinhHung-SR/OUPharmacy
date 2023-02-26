
import moment from "moment";
import { CURRENT_DATE } from "../../../../lib/constants";
import useCountDownExam from "../hooks/useCountDownExam"

const CountDownExam = () => {
    
    const {total} = useCountDownExam();
    return(
        <>
            <h1>He thong hien tai co: {total} phieu kham trong ngay {moment(CURRENT_DATE).format('DD-MM-yyyy')}</h1>
        </>
    )
}
export default CountDownExam