from rest_framework import permissions, views


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request: views.Request, _):
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user.is_superuser
