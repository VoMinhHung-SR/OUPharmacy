import django_filters

from .models import *


class ExaminationFilter(django_filters.FilterSet):
    kw = django_filters.CharFilter(field_name="user__email")
    status = django_filters.BooleanFilter(field_name="mail_status")

    class Meta:
        model = Examination
        fields = ('kw', 'status')