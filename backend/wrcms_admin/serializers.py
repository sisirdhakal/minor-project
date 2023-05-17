from rest_framework import serializers
from wrcms.models import Class, Department, Batch, Program, Lecture, Student, UserProfile, Teacher, Parent, Routine

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
    department_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Program
        fields = build_fields(model, ['department_name'])

    def get_department_name(self, obj):
        if obj.department:
            return obj.department.name
        

class LectureSerializer(serializers.ModelSerializer):
    class_name = serializers.SerializerMethodField(read_only=True)
    subject_name = serializers.SerializerMethodField(read_only=True)
    teacher_name = serializers.SerializerMethodField(read_only=True)
    teacher2_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Lecture
        fields = build_fields(model, ['class_name', 'subject_name', 'teacher_name', 'teacher2_name'])

    def get_class_name(self, obj):
        return obj.cLass.name
    
    def get_subject_name(self, obj):
        return obj.subject.name
    
    def get_teacher_name(self, obj):
        return obj.teacher.userProfile.getFullName()
    
    def get_teacher2_name(self, obj):
        if obj.teacher2:
            return obj.teacher2.userProfile.getFullName()

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = build_fields(model, [], ['portalId'])
        
class StudentSerializer(serializers.ModelSerializer):
    program = serializers.SerializerMethodField(read_only=True)
    user_profile = serializers.SerializerMethodField(read_only=True)
    class_name = serializers.SerializerMethodField(read_only=True)
    department_name = serializers.SerializerMethodField(read_only=True)
    batch_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Student
        fields = build_fields(model, ['program', 'class_name', 'department_name', 'batch_name', 'user_profile'], [])

    def get_class_name(self, obj):
        return obj.cLass.name
    
    def get_department_name(self, obj):
        return obj.department.name
    
    def get_batch_name(self, obj):
        return obj.batch.year

    def get_program(self, obj):
        return obj.cLass.program.name

    def get_user_profile(self, obj):
        serializer = UserProfileSerializer(obj.userProfile, many=False)
        return serializer.data

class TeacherSerializer(serializers.ModelSerializer):
    user_profile = serializers.SerializerMethodField(read_only=True)
    department_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Teacher
        fields = build_fields(model, ['department_name', 'user_profile'], [])

    def get_department_name(self, obj):
        return obj.department.name

    def get_user_profile(self, obj):
        serializer = UserProfileSerializer(obj.userProfile, many=False)
        return serializer.data
    
class ParentSerializer(serializers.ModelSerializer):
    user_profile = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Parent
        fields = build_fields(model, ['user_profile'], [])

    def get_user_profile(self, obj):
        serializer = UserProfileSerializer(obj.userProfile, many=False)
        return serializer.data
    
class RoutineSerializer(serializers.ModelSerializer):

    class Meta:
        model = Routine
        fields = '__all__'