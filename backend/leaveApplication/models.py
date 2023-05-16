from django.db import models

# Create your models here.
class LeaveRequest(models.Model):
    student = models.ForeignKey('wrcms.Student', on_delete=models.CASCADE)
    approvedBy = models.ForeignKey('wrcms.Teacher', null=True, blank=True, on_delete=models.SET_NULL)
    lecture = models.ForeignKey('wrcms.Lecture', on_delete=models.CASCADE)
    is_approved = models.BooleanField(default=False)
    requested_at = models.DateTimeField(auto_now_add=True)
    approved_at = models.DateTimeField(null=True, blank=True)
    is_archived = models.BooleanField(default=False)
    leaveStartDate = models.CharField(max_length=255)
    leaveEndDate = models.CharField(max_length=255)
    reason = models.TextField()

    def __str__(self):
        return self.student.rollNumber+'-'+self.leaveStartDate+'-'+self.leaveEndDate