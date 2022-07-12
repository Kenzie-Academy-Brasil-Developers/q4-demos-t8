from rest_framework import permissions, views

from accounts.models import Account


class IsAdmin(permissions.BasePermission):
    def has_object_permission(self, request: views.Request, _, obj: Account):
        if request.user.is_staff: # usuário do token
            return True

        return obj == request.user
