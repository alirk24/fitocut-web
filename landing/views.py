from django.shortcuts import render, redirect
from django.contrib import messages
from .models import SignUp, PageView
from .forms import SignUpForm

def get_client_ip(request):
    """Get client IP address"""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def landing_page(request):
    """Main landing page with sign-up form"""
    
    # Track page view
    PageView.objects.create(
        ip_address=get_client_ip(request),
        user_agent=request.META.get('HTTP_USER_AGENT', ''),
        referrer=request.META.get('HTTP_REFERER', ''),
        utm_source=request.GET.get('utm_source', ''),
        utm_medium=request.GET.get('utm_medium', ''),
        utm_campaign=request.GET.get('utm_campaign', '')
    )
    
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            signup = form.save(commit=False)
            signup.ip_address = get_client_ip(request)
            signup.user_agent = request.META.get('HTTP_USER_AGENT', '')
            signup.utm_source = request.GET.get('utm_source', '')
            signup.utm_medium = request.GET.get('utm_medium', '')
            signup.utm_campaign = request.GET.get('utm_campaign', '')
            signup.save()
            
            messages.success(request, 'ثبت‌نام شما با موفقیت انجام شد!')
            return redirect('success')
    else:
        form = SignUpForm()
    
    context = {
        'form': form,
        'total_signups': SignUp.objects.count(),
    }
    return render(request, 'landing/index.html', context)

def success_page(request):
    """Thank you page after successful sign-up"""
    return render(request, 'landing/success.html')
