from django.core.mail import EmailMessage
from django.template.loader import get_template
from django.conf import settings

def send_student_absent_notification(parent, student, lecture, date):
    message = get_template("absence_notification.html").render({
        'student': student, 'parent': parent, 'lecture':lecture, 'date':date
    })
    mail = EmailMessage(
        subject="Notification: Absence of your child from college",
        body=message,
        from_email=settings.EMAIL_HOST_USER,
        to=[parent.userProfile.email],
        reply_to=[settings.EMAIL_HOST_USER],
    )
    mail.content_subtype = "html"
    return mail.send(fail_silently=True)

def send_welcome_message(user):
    message = get_template("welcome_message.html").render({
        'userProfile': user
    })
    mail = EmailMessage(
        subject="Welcome to WRCMS",
        body=message,
        from_email=settings.EMAIL_HOST_USER,
        to=[user.email],
        reply_to=[settings.EMAIL_HOST_USER],
    )
    mail.content_subtype = "html"
    return mail.send(fail_silently=True)