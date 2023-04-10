import { CronJob } from "cron";
import { setListExamToday } from "../../lib/utils/helper";
import { BACKEND_BASEURL } from "../../lib/constants";
import { endpoints } from "../../config/APIs";


export const jobMidnight = () => {
    // [  0 * 0-5 * * * ] : every one hour in 0-5 AM
    const job = new CronJob('02 07 * * *', () => {
        fetch(BACKEND_BASEURL + endpoints['get-list-exam-today'])
          .then((response) => response.json())
          .then((data) => {
            setListExamToday(data);
            
          })
          .catch((error) => console.log(error));
    });

    job.start();
}