from rest_framework.pagination import PageNumberPagination


class BasePagination(PageNumberPagination):
    page_size = 6


class ExaminationPaginator(PageNumberPagination):
    page_size = 10
