import { CronJob } from "cron";
import { handleSendRemindEmail } from "../../lib/services";

export const jobEveryMinutes = () => {
  // [  */2 * * * * ] : every 2 mins
  const job = new CronJob('*/2 * * * *', () => {
    handleSendRemindEmail();
    console.log("it'll run every 2 mins");
  });

  job.start();
}