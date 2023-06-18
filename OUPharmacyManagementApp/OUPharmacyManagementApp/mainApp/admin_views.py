from random import random

from rest_framework.decorators import api_view

from rest_framework import status
from django.http import JsonResponse
from django.http import HttpResponseNotFound, HttpResponseForbidden, \
    HttpResponseBadRequest, HttpResponseServerError
from django.db.models import Count, Sum
from .models import *
from django.db.models.functions import TruncMonth
from datetime import date


def get_admin_revenue(request):

    if request.user.is_anonymous or not request.user.is_staff:
        return HttpResponseForbidden()
    try:
        quarter = request.GET.get('quarter', '0')
        year = request.GET.get('year', '0')

        bills = Bill.objects
        quarter_number = int(quarter)
        year_number = int(year)
        if year_number == 0:
            year_number = date.today().year

        if quarter_number > 0:
            bills = bills.filter(created_date__quarter=quarter_number)

        bills = bills.filter(created_date__year=year_number) \
            .annotate(month=TruncMonth('created_date')) \
            .values('month').annotate(total=Sum("amount"), count=Count("id")).values('month', 'total', 'count')
        data_revenue = [0] * 12
        for rs in bills:
            month = rs['month'].month - 1
            data_revenue[month] = rs['total']

    except Exception as ex:
        return HttpResponseServerError({"errMgs": "value Error"})
    else:
        return JsonResponse({"data_revenue": data_revenue,
                             "title": f'Thống kê doanh thu theo các tháng trong năm {year_number}'})


def get_examinations_stats(request):
    if request.user.is_anonymous or not request.user.is_staff:
        return HttpResponseForbidden()
    try:
        quarter = request.GET.get('quarter', '0')
        year = request.GET.get('year', '0')

        examinations = Examination.objects
        quarter_number = int(quarter)
        year_number = int(year)
        if year_number == 0:
            year_number = date.today().year

        if quarter_number > 0:
            examinations = examinations.filter(created_date__quarter=quarter_number)

        # Get examination data
        examinations = examinations.filter(created_date__year=year_number) \
            .annotate(month=TruncMonth('created_date')) \
            .values('month').annotate(count=Count('pk')).values('month', 'count')

        # Prepare examination data for chart
        data_examination = [0] * 12
        for rs in examinations:
            month = rs['month'].month - 1
            data_examination[month] = rs['count']


    except Exception as ex:
        return HttpResponseServerError({"errMgs": "value Error"})
    else:
        return JsonResponse({"data_examination": data_examination,
                             "title": f'Thống kê tần suất đặt lịch khám theo các tháng trong năm {year_number}'})


def get_medicines_stats(request):
    if request.user.is_anonymous or not request.user.is_staff:
        return HttpResponseForbidden()
    try:
        medicine_units = MedicineUnit.objects.filter(active=True).count()
        # Get medicine data
        medicines = PrescriptionDetail.objects.filter(active=True) \
            .values('medicine_unit__medicine__name') \
            .annotate(count=Count('medicine_unit')) \
            .values('medicine_unit__medicine__name', 'count')

        # Prepare medicine data for chart
        data_medicine_labels = []
        data_medicine_quantity = []
        for m in medicines:
            data_medicine_labels.append(m['medicine_unit__medicine__name'])
            data_medicine_quantity.append(m['count'])


    except Exception as ex:
        return HttpResponseServerError({"errMgs": "value Error"})
    else:
        return JsonResponse({"data_medicine_quantity": data_medicine_quantity,
                             "data_medicine_labels": data_medicine_labels})


def get_doctor_stats(request):
    if request.user.is_anonymous or not request.user.is_staff:
        return HttpResponseForbidden()
    try:
        quarter = request.GET.get('quarter', '0')
        year = request.GET.get('year', '0')

        doctor_availability = DoctorAvailability.objects
        quarter_number = int(quarter)
        year_number = int(year)
        if year_number == 0:
            year_number = date.today().year

        if quarter_number > 0:
            doctor_availability = doctor_availability.filter(day__quarter=quarter_number)

        doctor_frequency = DoctorAvailability.objects.annotate(month=TruncMonth('day')) \
            .values('doctor__id', 'doctor__first_name', 'doctor__last_name', 'doctor__email') \
            .annotate(count=Count('id')) \
            .values('doctor__id', 'doctor__first_name', 'doctor__last_name', 'doctor__email', 'count')

        data_doctor_labels = []
        data_doctor_quantity = []

        for doctor in doctor_frequency:
            data_doctor_labels.append(doctor.get('doctor__first_name') + " " + doctor.get('doctor__last_name'))
            data_doctor_quantity.append(doctor.get('count'))

    except Exception as ex:
        return HttpResponseServerError({"errMgs": "value Error"})
    else:
        return JsonResponse({"data_doctor_labels": data_doctor_labels,
                             "data_doctor_quantity": data_doctor_quantity,
                             "title": f'Thống kê tần suất khám của từng bác sĩ trong năm {year_number}'})
# def get_doctor_stats(request):
#     try:
#         if request.user.is_anonymous or not request.user.is_staff:
#             return HttpResponseForbidden()
#
#         quarter = request.GET.get('quarter', '0')
#         year = request.GET.get('year', '0')
#
#         doctor_availability = DoctorAvailability.objects
#         quarter_number = int(quarter)
#         year_number = int(year)
#         if year_number == 0:
#             year_number = date.today().year
#
#         if quarter_number > 0:
#             doctor_availability = doctor_availability.filter(day__quarter=quarter_number)
#
#         doctor_frequency = doctor_availability.annotate(month=TruncMonth('day')) \
#             .values('doctor__id', 'doctor__first_name', 'doctor__last_name', 'doctor__email', 'month') \
#             .annotate(count=Count('id')) \
#             .values('doctor__id', 'doctor__first_name', 'doctor__last_name', 'doctor__email', 'month', 'count')
#
#         data_doctor_labels = []
#         data_doctor_datasets = []
#
#         for doctor in doctor_frequency:
#             doctor_name = doctor.get('doctor__first_name') + " " + doctor.get('doctor__last_name')
#             month = doctor.get('month').strftime("%B")
#             count = doctor.get('count')
#
#             # Check if the doctor exists in the data labels
#             if doctor_name not in data_doctor_labels:
#                 data_doctor_labels.append(doctor_name)
#
#                 # Create a new dataset for the doctor
#                 dataset = {
#                     'label': doctor_name,
#                     'data': [],
#                     'backgroundColor': 'rgba(0, 0, 0, 0)',  # Set the background color to transparent
#                     'borderColor': getRandomColor(),  # Generate a random color for the line
#                     'fill': False
#                 }
#                 data_doctor_datasets.append(dataset)
#
#             # Find the index of the doctor in the data labels
#             doctor_index = data_doctor_labels.index(doctor_name)
#
#             # Add the data point to the corresponding dataset
#             data_doctor_datasets[doctor_index]['data'].append(count)
#         print(data_doctor_datasets)
#     except Exception as ex:
#         return HttpResponseServerError({"errMsg": "Value Error"})
#     else:
#         return JsonResponse({
#             "data_doctor_labels": data_doctor_labels,
#             "data_doctor_datasets": data_doctor_datasets,
#             "title": f'Thống kê tần suất khám của từng bác sĩ trong năm {year_number}'
#         })


def getRandomColor():
    # Generate a random color in hexadecimal format
    r = lambda: random.randint(0, 255)
    return '#%02X%02X%02X' % (r(), r(), r())
