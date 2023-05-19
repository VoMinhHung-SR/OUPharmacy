import os

from django.utils import timezone

from celery import shared_task

import firebase_admin
from firebase_admin import firestore, credentials
from OUPharmacyManagementApp.OUPharmacyManagementApp.settings import BASE_DIR

# Run task: celery -A OUPharmacyManagementApp.celery worker --pool=solo --loglevel=info

FIREBASE_CONFIG = os.path.join(BASE_DIR, 'config', 'firebase.json')
cred = credentials.Certificate(FIREBASE_CONFIG)
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://oupharmacy-5ddaa-default-rtdb.firebaseio.com'
})

database = firestore.client()

@shared_task
def load_waiting_room():
    current_day = timezone.now().strftime('%Y-%m-%d')
    try:
        print(current_day)
        doc_ref = database.collection('demo').document(str(current_day))
        doc_ref.set({'message': 'demo from BE'})
    except Exception as ex:
        print(ex)
        return "Add failed!"
    return "Add OKE!"


@shared_task
def send_remind_email():
    print("Lich nhac nho tai kham hom nay")
    return "Lich nhac nho tai kham"


