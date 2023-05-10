from rest_framework import serializers
from wrcms.models import Class, Department, Batch, Program

def build_fields(mdl,extra=[],exclude=[]):
    fields = [field.name for field in mdl._meta.fields if field.name not in exclude]
    fields += extra
    return fields

class ClassSerializer(serializers.ModelSerializer):
    department_name = serializers.SerializerMethodField(read_only=True)
    batch_name = serializers.SerializerMethodField(read_only=True)
    program_name = serializers.SerializerMethodField(read_only=True)
    cr_name = serializers.SerializerMethodField(read_only=True)
    vcr_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Class
        fields = build_fields(model, ['department_name', 'batch_name', 'program_name', 'cr_name', 'vcr_name'])

    def get_department_name(self, obj):
        return obj.department.name
    
    def get_batch_name(self, obj):
        return obj.batch.year
    
    def get_program_name(self, obj):
        if obj.program:
            return obj.program.name
    
    def get_cr_name(self, obj):
        if obj.classRepresentative:
            return obj.classRepresentative.userProfile.getFullName()
    
    def get_vcr_name(self, obj):
        if obj.viceClassRepresentative:
            return obj.viceClassRepresentative.userProfile.getFullName()
    
class DepartmentSerializer(serializers.ModelSerializer):
    hod_name = serializers.SerializerMethodField(read_only=True)
    dhod_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Department
        fields = build_fields(model, ['hod_name', 'dhod_name'])

    def get_hod_name(self, obj):
        if obj.headOfDepartment:
            return obj.headOfDepartment.userProfile.getFullName()
    
    def get_dhod_name(self, obj):
        if obj.deputyHeadOfDepartment:
            return obj.deputyHeadOfDepartment.userProfile.getFullName()

class BatchSerializer(serializers.ModelSerializer):

    class Meta:
        model = Batch
        fields = '__all__'


class ProgamSerializer(serializers.ModelSerializer):

    class Meta:
        model = Program
        fields = '__all__'