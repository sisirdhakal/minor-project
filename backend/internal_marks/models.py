from django.db import models

# Create your models here.
class InternalMark(models.Model):
    student = models.ForeignKey('wrcms.Student', on_delete=models.CASCADE)
    subject = models.ForeignKey('wrcms.Subject', on_delete=models.CASCADE)
    semester = models.IntegerField()
    theoryAssessment = models.IntegerField(null=True, blank=True)
    practicalAssessment = models.IntegerField(null=True, blank=True)
    is_approved = models.BooleanField(default=False)
    approved_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.student.rollNumber+'-'+self.leaveStartDate+'-'+self.leaveEndDate