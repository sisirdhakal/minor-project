from django.core.mail import EmailMessage
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.template.loader import get_template
from wrcms.models import Student, Teacher
from django.conf import settings


@receiver(post_save, sender=Student)
def send_portal_invitation(sender, instance, created, **kwargs):
    """
    Send email to customer with order details.
    """
    if created:
        student = instance
        userprofile = student.userProfile
        message = get_template("invitation.html").render({
            'userProfile': userprofile
        })
        mail = EmailMessage(
            subject="Invitation: Signup For WRCMS",
            body=message,
            from_email=settings.EMAIL_HOST_USER,
            to=[userprofile.email],
            reply_to=[settings.EMAIL_HOST_USER],
        )
        mail.content_subtype = "html"
        return mail.send()



@receiver(post_save, sender=Teacher)
def send_portal_invitation(sender, instance, created, **kwargs):
    """
    Send email to customer with order details.
    """
    if created:
        teacher = instance
        userprofile = teacher.userProfile
        message = get_template("invitation.html").render({
            'userProfile': userprofile
        })
        mail = EmailMessage(
            subject="Invitation: Signup For WRCMS",
            body=message,
            from_email=settings.EMAIL_HOST_USER,
            to=[userprofile.email],
            reply_to=[settings.EMAIL_HOST_USER],
        )
        mail.content_subtype = "html"
        return mail.send()