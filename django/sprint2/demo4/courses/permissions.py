from rest_framework.permissions import BasePermission
from rest_framework.views import Request


class CoursePermission(BasePermission):
    def has_permission(self, request: Request, _):
        staff_methods = {
            "POST",
            "PATCH",
            "DELETE",
            "PUT",
        }

        if request.method in staff_methods:
            return request.user.is_staff

        return True
