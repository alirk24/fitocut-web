from django import forms
from .models import SignUp

class SignUpForm(forms.ModelForm):
    """Form for early sign-ups"""
    
    class Meta:
        model = SignUp
        fields = ['full_name', 'phone_number', 'email', 'city', 'fitness_goal', 'role', 'consent']
        
        widgets = {
            'full_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'نام و نام خانوادگی',
                'required': True
            }),
            'phone_number': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': '09123456789',
                'required': True,
                'pattern': '09[0-9]{9}',
                'maxlength': '11'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'example@email.com (اختیاری)'
            }),
            'city': forms.Select(attrs={
                'class': 'form-select',
                'required': True
            }),
            'fitness_goal': forms.Select(attrs={
                'class': 'form-select',
                'required': True
            }),
            'role': forms.Select(attrs={
                'class': 'form-select',
                'required': True
            }),
            'consent': forms.CheckboxInput(attrs={
                'class': 'form-check-input',
                'required': True
            }),
        }
        
        labels = {
            'full_name': 'نام کامل',
            'phone_number': 'شماره تماس',
            'email': 'ایمیل (اختیاری)',
            'city': 'شهر',
            'fitness_goal': 'هدف شما از استفاده',
            'role': 'نقش شما',
            'consent': 'با دریافت اطلاعات مربوط به راه‌اندازی اپ موافقم',
        }
    
    def clean_phone_number(self):
        phone = self.cleaned_data.get('phone_number')
        if phone:
            # Remove any spaces or dashes
            phone = phone.replace(' ', '').replace('-', '')
            
            # Check if it starts with 09 and has 11 digits
            if not phone.startswith('09') or len(phone) != 11:
                raise forms.ValidationError(
                    'شماره تلفن باید با 09 شروع شود و 11 رقم باشد'
                )
            
            # Check if phone already exists
            if SignUp.objects.filter(phone_number=phone).exists():
                if not self.instance.pk or self.instance.phone_number != phone:
                    raise forms.ValidationError(
                        'این شماره تلفن قبلاً ثبت شده است'
                    )
        
        return phone
    
    def clean_consent(self):
        consent = self.cleaned_data.get('consent')
        if not consent:
            raise forms.ValidationError(
                'برای ثبت‌نام، باید با دریافت اطلاعات موافقت کنید'
            )
        return consent
