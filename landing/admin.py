from django.contrib import admin
from django.utils.html import format_html
from .models import SignUp, PageView

@admin.register(SignUp)
class SignUpAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'phone_number', 'city', 'role', 'created_at', 'is_valid', 'is_contacted']
    list_filter = ['city', 'role', 'fitness_goal', 'is_valid', 'is_contacted', 'created_at']
    search_fields = ['full_name', 'phone_number', 'email']
    readonly_fields = ['created_at', 'ip_address', 'user_agent', 'utm_source', 'utm_medium', 'utm_campaign']
    list_editable = ['is_valid', 'is_contacted']
    
    fieldsets = (
        ('اطلاعات کاربر', {
            'fields': ('full_name', 'phone_number', 'email')
        }),
        ('جزئیات', {
            'fields': ('city', 'fitness_goal', 'role', 'consent')
        }),
        ('ردیابی', {
            'fields': ('created_at', 'ip_address', 'user_agent', 'utm_source', 'utm_medium', 'utm_campaign'),
            'classes': ('collapse',)
        }),
        ('مدیریت', {
            'fields': ('is_valid', 'is_contacted', 'notes')
        }),
    )
    
    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser
    
    actions = ['mark_as_contacted', 'export_to_csv']
    
    def mark_as_contacted(self, request, queryset):
        queryset.update(is_contacted=True)
        self.message_user(request, f'{queryset.count()} مورد به عنوان تماس گرفته شده علامت‌گذاری شد.')
    mark_as_contacted.short_description = 'علامت‌گذاری به عنوان تماس گرفته شده'
    
    def export_to_csv(self, request, queryset):
        import csv
        from django.http import HttpResponse
        
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="signups.csv"'
        response.write('\ufeff'.encode('utf8'))  # BOM for Excel
        
        writer = csv.writer(response)
        writer.writerow(['نام کامل', 'شماره تماس', 'ایمیل', 'شهر', 'هدف', 'نقش', 'تاریخ ثبت‌نام'])
        
        for signup in queryset:
            writer.writerow([
                signup.full_name,
                signup.phone_number,
                signup.email or '',
                signup.get_city_display(),
                signup.get_fitness_goal_display(),
                signup.get_role_display(),
                signup.created_at.strftime('%Y-%m-%d %H:%M')
            ])
        
        return response
    export_to_csv.short_description = 'خروجی به CSV'

@admin.register(PageView)
class PageViewAdmin(admin.ModelAdmin):
    list_display = ['visited_at', 'ip_address', 'utm_source', 'utm_medium', 'utm_campaign']
    list_filter = ['visited_at', 'utm_source', 'utm_medium']
    readonly_fields = ['visited_at', 'ip_address', 'user_agent', 'referrer', 'utm_source', 'utm_medium', 'utm_campaign']
    
    def has_add_permission(self, request):
        return False
