from django.db import models
from django.core.validators import RegexValidator
from django.utils import timezone

class SignUp(models.Model):
    """Model to store coming soon page sign-ups"""
    
    ROLE_CHOICES = [
        ('USER', 'کاربر (دانشجو)'),
        ('COACH', 'مربی'),
        ('DIETITIAN', 'متخصص تغذیه'),
        ('GYM', 'باشگاه'),
    ]
    
    GOAL_CHOICES = [
        ('WEIGHT_LOSS', 'کاهش وزن'),
        ('MUSCLE_GAIN', 'افزایش عضله'),
        ('GENERAL_FITNESS', 'تناسب عمومی'),
        ('ENDURANCE', 'استقامت'),
        ('FLEXIBILITY', 'انعطاف‌پذیری'),
    ]
    
    CITY_CHOICES = [
        ('TEHRAN', 'تهران'),
        ('MASHHAD', 'مشهد'),
        ('ISFAHAN', 'اصفهان'),
        ('SHIRAZ', 'شیراز'),
        ('TABRIZ', 'تبریز'),
        ('KARAJ', 'کرج'),
        ('AHVAZ', 'اهواز'),
        ('QOM', 'قم'),
        ('KERMANSHAH', 'کرمانشاه'),
        ('URMIA', 'ارومیه'),
        ('RASHT', 'رشت'),
        ('ZAHEDAN', 'زاهدان'),
        ('KERMAN', 'کرمان'),
        ('YAZD', 'یزد'),
        ('ARAK', 'اراک'),
        ('ARDABIL', 'اردبیل'),
        ('BANDAR_ABBAS', 'بندر عباس'),
        ('ESLAMSHAHR', 'اسلامشهر'),
        ('ZANJAN', 'زنجان'),
        ('SANANDAJ', 'سنندج'),
        ('KHORRAMABAD', 'خرم‌آباد'),
        ('GORGAN', 'گرگان'),
        ('SARI', 'ساری'),
        ('DEZFUL', 'دزفول'),
        ('SAVEH', 'ساوه'),
        ('BOJNURD', 'بجنورد'),
        ('OTHER', 'سایر شهرها'),
    ]
    
    # Required fields
    full_name = models.CharField(max_length=200, verbose_name='نام کامل')
    
    phone_regex = RegexValidator(
        regex=r'^09\d{9}$',
        message="شماره تلفن باید با 09 شروع شود و 11 رقم باشد"
    )
    phone_number = models.CharField(
        validators=[phone_regex],
        max_length=11,
        unique=True,
        verbose_name='شماره تماس'
    )
    
    city = models.CharField(
        max_length=50,
        choices=CITY_CHOICES,
        verbose_name='شهر'
    )
    
    fitness_goal = models.CharField(
        max_length=50,
        choices=GOAL_CHOICES,
        verbose_name='هدف شما'
    )
    
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        verbose_name='نقش شما'
    )
    
    # Optional field
    email = models.EmailField(
        blank=True,
        null=True,
        verbose_name='ایمیل (اختیاری)'
    )
    
    # Consent
    consent = models.BooleanField(
        default=False,
        verbose_name='موافقت با دریافت اطلاعات'
    )
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ثبت‌نام')
    ip_address = models.GenericIPAddressField(null=True, blank=True, verbose_name='آدرس IP')
    user_agent = models.TextField(blank=True, verbose_name='User Agent')
    utm_source = models.CharField(max_length=100, blank=True, verbose_name='منبع')
    utm_medium = models.CharField(max_length=100, blank=True, verbose_name='رسانه')
    utm_campaign = models.CharField(max_length=100, blank=True, verbose_name='کمپین')
    
    # Status
    is_valid = models.BooleanField(default=True, verbose_name='معتبر است')
    is_contacted = models.BooleanField(default=False, verbose_name='تماس گرفته شده')
    notes = models.TextField(blank=True, verbose_name='یادداشت‌ها')
    
    class Meta:
        verbose_name = 'ثبت‌نام'
        verbose_name_plural = 'ثبت‌نام‌ها'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['phone_number']),
            models.Index(fields=['city']),
            models.Index(fields=['role']),
            models.Index(fields=['created_at']),
        ]
    
    def __str__(self):
        return f"{self.full_name} - {self.phone_number}"
    
    def get_role_display_fa(self):
        """Get Persian role display"""
        return dict(self.ROLE_CHOICES).get(self.role, '')
    
    def get_goal_display_fa(self):
        """Get Persian goal display"""
        return dict(self.GOAL_CHOICES).get(self.fitness_goal, '')
    
    def get_city_display_fa(self):
        """Get Persian city display"""
        return dict(self.CITY_CHOICES).get(self.city, '')


class PageView(models.Model):
    """Track page views and analytics"""
    
    visited_at = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    referrer = models.URLField(blank=True, null=True)
    utm_source = models.CharField(max_length=100, blank=True)
    utm_medium = models.CharField(max_length=100, blank=True)
    utm_campaign = models.CharField(max_length=100, blank=True)
    
    class Meta:
        verbose_name = 'بازدید صفحه'
        verbose_name_plural = 'بازدیدهای صفحه'
        ordering = ['-visited_at']
    
    def __str__(self):
        return f"Visit at {self.visited_at}"
