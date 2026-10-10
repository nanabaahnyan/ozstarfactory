from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.http import require_GET


@require_GET
def status(request):
    return JsonResponse(
        {
            "maintenance": settings.MAINTENANCE_MODE,
            "title": "System is under maintenance",
            "message": settings.MAINTENANCE_MESSAGE,
            "eta": settings.MAINTENANCE_ETA or None,
            "company": "OZSTAR Factory Company Limited",
            "contact": {
                "email": "info@ozstarfactory.com",
                "phone": "+233 (0) 302 550 612",
            },
        }
    )


@require_GET
def health(request):
    return JsonResponse({"status": "ok"})
