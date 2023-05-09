
from celery import shared_task

# Run task: celery -A OUPharmacyManagementApp.celery worker --pool=solo --loglevel=info
@shared_task
def send_remind_email():
    print("Lich nhac nho tai kham hom nay")
    return "Lich nhac nho tai kham"
