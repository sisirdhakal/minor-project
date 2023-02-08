from django.apps import AppConfig


class WrcmsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'wrcms'

    def ready(self):
        import wrcms.signals
