
from celery import shared_task

# Run task: celery -A OUPharmacyManagementApp.celery worker --pool=solo --loglevel=info
@shared_task
def send_remind_email():
    return "Lich nhac nho tai kham"
