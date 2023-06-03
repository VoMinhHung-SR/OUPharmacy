from django.contrib import admin
from django.utils.html import format_html
from django.shortcuts import render
from . import cloud_context
from django.urls import path
from django.utils.safestring import mark_safe
from .models import *
from django.template.response import TemplateResponse
from django.db.models import Count, Sum
from django.db.models.functions import TruncMonth
from datetime import date
from django.urls import reverse


class MainAppAdminSite(admin.AdminSite):

    def get_urls(self):
        return [
                   path('', self.stats_view)
               ] + super().get_urls()

    def stats_view(self, request):
        patients = Patient.objects.filter(active=True).count()
        medicine_units = MedicineUnit.objects.filter(active=True).count()
        users = User.objects.filter(is_active=True).count()
        data_examination = []
        data_revenue = []
        data_medicine_quantity = []
        data_medicine_labels = []
        medicine_in_use = 0
        examinations = Examination.objects.filter(created_date__year=date.today().year) \
            .annotate(month=TruncMonth('created_date')).values('month') \
            .annotate(c=Count('pk')).values('month', 'c')
        bills = Bill.objects.filter(created_date__year=date.today().year) \
            .annotate(month=TruncMonth('created_date')).values('month') \
            .annotate(total=Sum("amount"), count=Count("id")).values('month', 'total', 'count')

        medicines = PrescriptionDetail.objects.filter(active=True).values('medicine_unit__medicine__name').annotate(count=Count('medicine_unit')).values('medicine_unit__medicine__name', 'count')

        for i in range(12):
            flag = False
            for rs in examinations:
                if i + 1 == rs['month'].month:
                    data_examination.append(rs['c'])
                    flag = True
                    break
            if not flag:
                data_examination.append(0)
        for i in range(12):
            flag = False
            for rs in bills:
                if i + 1 == rs['month'].month:
                    data_revenue.append(rs['total'])
                    flag = True
                    break
            if not flag:
                data_revenue.append(0)
        for m in medicines:
            for key, value in m.items():
                if key == 'medicine_unit__medicine__name':
                    data_medicine_labels.append(value)
                if key == 'count':
                    data_medicine_quantity.append(value)

        print(data_medicine_labels)
        print(data_medicine_quantity)
        return TemplateResponse(request,
                                'admin/stats.html', {
                                    "patients": patients,
                                    "users": users,
                                    "data_examination": data_examination,
                                    "data_revenue": data_revenue,
                                    "medicineUnits": medicine_units,
                                    "current_year": date.today().year,
                                    'data_medicine_labels': data_medicine_labels,
                                    'data_medicine_quantity': data_medicine_quantity
                                })


admin_site = MainAppAdminSite(name='OUPharmacy')


class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'first_name', 'last_name', 'email', 'role']
    list_filter = ['email']
    search_fields = ['email']
    readonly_fields = ['avatar_view']

    def avatar_view(self, user):
        if user.avatar:
            return mark_safe(
                "<img src='{cloud_context}{url}' alt='avatar' width='200' />".format(cloud_context=cloud_context,
                                                                                     url=user.avatar)
            )


class PatientAdmin(admin.ModelAdmin):
    list_display = ['id', 'first_name', 'last_name', 'phone_number', 'email', 'gender']
    list_filter = ['last_name']


class DoctorAvailabilityAdmin(admin.ModelAdmin):
    list_display = ['id', 'day', 'start_time', 'end_time', 'doctor']
    list_filter = ['doctor', 'day']

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "doctor":
            kwargs["queryset"] = User.objects.filter(role__name="ROLE_DOCTOR")
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


class UserRoleAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'active']


class ExaminationAdmin(admin.ModelAdmin):
    list_display = ['description', 'created_date', 'patient']
    list_filter = ['patient']


class MedicineAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'effect', 'contraindications', 'created_date']
    list_filter = ['name']


class MedicineUnitAdmin(admin.ModelAdmin):
    list_display = ['id', 'price', 'in_stock', 'created_date', 'medicine', 'category']
    list_filter = ['medicine', 'category']


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    list_filter = ['name']


class DiagnosisAdmin(admin.ModelAdmin):
    list_display = ['id', 'sign', 'diagnosed', 'examination', 'user', 'patient']


class BillAdmin(admin.ModelAdmin):
    list_display = ['id', 'amount', 'prescribing']


class PrescriptionDetailAdmin(admin.ModelAdmin):
    list_display = ['id', 'quantity', 'uses', 'prescribing', 'medicine_unit']


class MyModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'custom_field')

    def custom_field(self, obj):
        return format_html('<span>{}</span>', obj.field_name)

    custom_field.short_description = 'Custom Field'
    custom_field.allow_tags = True


def stats_view(request):
    return render(request, 'admin/stats.html', {})


class MyModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'stats_link']

    def stats_link(self, obj):
        url = reverse('admin:stats_view')
        return format_html('<a href="{}">Stats</a>', url)
    stats_link.short_description = 'Stats'


admin.site.register(Bill, BillAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Medicine, MedicineAdmin)
admin.site.register(MedicineUnit, MedicineUnitAdmin)
admin.site.register(Examination, ExaminationAdmin)
admin.site.register(Diagnosis, DiagnosisAdmin)
admin.site.register(PrescriptionDetail, PrescriptionDetailAdmin)
admin.site.register(Patient, PatientAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(UserRole, UserRoleAdmin)
admin.site.register(DoctorAvailability, DoctorAvailabilityAdmin)