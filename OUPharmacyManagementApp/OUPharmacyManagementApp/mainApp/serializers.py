from rest_framework.serializers import ModelSerializer
from . import cloud_context
from .models import *
from rest_framework import serializers


class UserRoleSerializer(ModelSerializer):
    class Meta:
        model = UserRole
        exclude = ['active']


class UserSerializer(ModelSerializer):
    # role = UserRoleSerializer()
    # role { id:int ; name:string }
    def create(self, validated_data):
        user = User(**validated_data)
        print(validated_data.get('role'))
        user.set_password(user.password)
        user.save()

        return user

    def to_representation(self, instance):
        data = super().to_representation(instance)
        try:
            data['role'] = UserRole.objects.get(id=data['role']).name
        except:
            data['role'] = None
        return data

    avatar_path = serializers.SerializerMethodField(source='avatar')

    def get_avatar_path(self, obj):
        # request = self.context['request']
        # if obj.avatar and not obj.avatar.name.startswith("/static"):
        #     path = '/static/%s' % obj.avatar.name
        #
        #     return request.build_absolute_uri(pathF)
        if obj.avatar:
            path = "{cloud_context}{image_name}".format(cloud_context=cloud_context,
                                                        image_name=obj.avatar)
            return path

    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "password",
                  "email", "phone_number", "address", "date_of_birth",
                  "date_joined", "gender", "avatar_path", "avatar", "is_admin", "role"]
        extra_kwargs = {
            'password': {'write_only': 'true'},
            'avatar_path': {'read_only': 'true'},
            'avatar': {'write_only': 'true'}
        }


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class MedicineSerializer(ModelSerializer):
    class Meta:
        model = Medicine
        fields = ["id", "name", "effect", "contraindications"]


class MedicineUnitSerializer(ModelSerializer):
    image_path = serializers.SerializerMethodField(source='image')
    medicine = MedicineSerializer()

    class Meta:
        model = MedicineUnit
        fields = ["id", "price", "in_stock", "image", "medicine", "category", "image_path"]
        extra_kwargs = {
            'image_path': {'read_only': 'true'},
        }

    def get_image_path(self, obj):
        if obj.image:
            path = '{cloud_context}{image_name}'.format(cloud_context=cloud_context, image_name=obj.image)
            return path


class PatientSerializer(ModelSerializer):
    class Meta:
        model = Patient
        exclude = ["created_date", "updated_date"]


class ExaminationSerializer(ModelSerializer):
    patient = PatientSerializer()
    user = UserSerializer()

    class Meta:
        model = Examination
        exclude = []


class DiagnosisSerializer(ModelSerializer):
    examination = ExaminationSerializer()

    class Meta:
        model = Diagnosis
        exclude = []


class DiagnosisCRUDSerializer(ModelSerializer):

    class Meta:
        model = Diagnosis
        exclude = []


class PrescriptionDetailCRUDSerializer(ModelSerializer):
    class Meta:
        model = PrescriptionDetail
        exclude = []


class PrescribingSerializer(ModelSerializer):
    class Meta:
        model = Prescribing
        exclude = []


class PrescriptionDetailSerializer(ModelSerializer):
    prescribing = PrescribingSerializer()
    medicine_unit = MedicineUnitSerializer()

    class Meta:
        model = PrescriptionDetail
        exclude = []


class BillSerializer(ModelSerializer):
    class Meta:
        model = Bill
        fields = ["id", "amount", "prescribing"]




