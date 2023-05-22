import os
from datetime import timedelta

from django.core.mail import EmailMessage
from django.utils import timezone

from celery import shared_task

from .models import Examination


# Run task: celery -A OUPharmacyManagementApp.celery worker --pool=solo --loglevel=info

@shared_task
def load_waiting_room():
    current_day = timezone.now().strftime('%Y-%m-%d')
    try:
        print(current_day)

    except Exception as ex:
        print(ex)
        return "Add failed!"
    return "Add OKE!"


@shared_task
def job_send_email_re_examination():
    # Get the current date
    current_date = timezone.now().date()

    # Calculate the date one month ago
    one_month_ago = current_date - timedelta(days=30)

    print(current_date, one_month_ago)

    # Retrieve examinations created one month ago
    examinations = Examination.objects.filter(created_date__gte=one_month_ago).all()

    for examination in examinations:
        # Get the related user and patient
        user = examination.user
        patient = examination.patient

        if not user or not patient:
            continue  # Skip to the next examination if user or patient is not found

        # Check if the examination is already reminded
        if examination.reminder_email:
            continue  # Skip to the next examination if already reminded

        # Compose the email subject
        subject = "Nhắc nhở: Tái khám"

        # Format the created_date to "ĐD-MM-YYYY" format
        created_date_formatted = examination.created_date.strftime("%d-%m-%Y")

        # Compose the email content
        content = f"Xin chào {user.first_name} {user.last_name},\n\n" \
                  f"Đây là một lời nhắc nhở rằng đã một tháng kể từ lần khám trước của bạn. " \
                  f"Chúng tôi cần thông báo đến bạn, đặt lịch tái khám sớm nhất có thể để kiểm tra lại tình trạng sức khỏe của mình.\n\n" \
                  f"Họ tên bệnh nhân: {patient.first_name} {patient.last_name}\n" \
                  f"Mô tả: {examination.description}\n" \
                  f"Ngày tạo: {created_date_formatted}\n\n" \
                  f"Vui lòng liên hệ chúng tôi, hoặc lên trang chủ OUPharmacy để đặt lịch tái khám.\n\n" \
                  f"Cảm ơn bạn, chúc bạn một ngày mới thật nhiều sức khỏe!\n"

        # Send the reminder email
        try:
            send_email = EmailMessage(subject, content, to=[user.email])
            send_email.send()
        except Exception as e:
            return print(f"Lỗi gửi email nhắc nhở đến {user.email}: {str(e)}")
        else:
            # Update the examination's reminder_email field
            examination.reminder_email = True
            examination.save()
            return print('OKE')

    return print('OKE but no exams')