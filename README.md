# 🏋️ FitoCut Landing Page - Coming Soon

> Iran's First All-in-One Digital Fitness Coaching Ecosystem - Pre-Launch Page

## 📋 Project Overview

This is a Django-based coming soon page for FitoCut platform with comprehensive sign-up functionality, analytics tracking, and integration with Google Sheets CRM.

### ✅ Features Implemented

- ✅ **Persian (Farsi) Support** - Complete RTL layout
- ✅ **Comprehensive Sign-Up Form** - All required fields per specifications
- ✅ **Form Validation** - Phone number, email validation
- ✅ **Analytics Tracking** - UTM parameters, page views, IP tracking
- ✅ **Google Sheets Integration** - Automatic CRM export
- ✅ **Responsive Design** - Optimized for mobile (< 3MB)
- ✅ **Performance Optimized** - Fast loading (< 2s target)
- ✅ **Admin Dashboard** - Django admin for managing sign-ups
- ✅ **Privacy Compliance** - Consent checkbox and privacy notice

## 🎯 Sign-Up Form Fields

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| نام کامل (Full Name) | Text | Yes | Personalized communication |
| شماره تماس (Phone) | Text (11 digits) | Yes | Primary contact (09XXXXXXXXX) |
| ایمیل (Email) | Email | No | Alternative contact |
| شهر (City) | Dropdown | Yes | Regional targeting (27 major cities) |
| هدف شما (Fitness Goal) | Dropdown | Yes | User segmentation |
| نقش شما (Role) | Dropdown | Yes | Audience type (User/Coach/Dietitian/Gym) |
| موافقت (Consent) | Checkbox | Yes | Privacy compliance |

## 🚀 Quick Start

### Prerequisites

```bash
Python 3.8+
Django 5.1+
```

### Installation

```bash
# Navigate to project directory
cd C:\Users\alireza\Desktop\FitCut_backend\fitocut_landing

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser for admin
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

### Access

- **Landing Page:** http://localhost:8000/
- **Admin Dashboard:** http://localhost:8000/admin/
- **Success Page:** http://localhost:8000/success/

## 📁 Project Structure

```
fitocut_landing/
├── fitocut_landing/        # Project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── landing/                # Main app
│   ├── models.py          # SignUp & PageView models
│   ├── forms.py           # SignUpForm with validation
│   ├── views.py           # Landing & success views
│   ├── admin.py           # Admin customization
│   ├── urls.py            # URL routing
│   └── templates/
│       └── landing/
│           ├── index.html     # Main coming soon page
│           └── success.html   # Thank you page
├── static/                # CSS, JS, images
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       └── logo.svg
└── requirements.txt       # Python dependencies
```

## 🗄️ Database Models

### SignUp Model

```python
class SignUp(models.Model):
    # Required Fields
    full_name = CharField(max_length=200)
    phone_number = CharField(max_length=11, unique=True)  # 09XXXXXXXXX
    city = CharField(choices=CITY_CHOICES)
    fitness_goal = CharField(choices=GOAL_CHOICES)
    role = CharField(choices=ROLE_CHOICES)
    
    # Optional
    email = EmailField(blank=True, null=True)
    
    # Consent
    consent = BooleanField(default=False)
    
    # Tracking
    created_at = DateTimeField(auto_now_add=True)
    ip_address = GenericIPAddressField()
    user_agent = TextField()
    utm_source, utm_medium, utm_campaign = CharField()
    
    # Management
    is_valid = BooleanField(default=True)
    is_contacted = BooleanField(default=False)
    notes = TextField(blank=True)
```

### PageView Model

```python
class PageView(models.Model):
    visited_at = DateTimeField(auto_now_add=True)
    ip_address = GenericIPAddressField()
    user_agent = TextField()
    referrer = URLField()
    utm_source, utm_medium, utm_campaign = CharField()
```

## 🎨 Design Features

### Color Palette

```css
Primary: #FF6B35 (Orange-Red)
Secondary: #4ECDC4 (Teal)
Accent: #FFD93D (Yellow)
Dark: #1A1A2E
Light: #F7F7F7
```

### Typography

- **Headings:** Vazir Bold / IRANSans Bold
- **Body:** Vazir / IRANSans
- **Numbers:** Roboto

### Responsive Breakpoints

```css
Mobile: < 576px
Tablet: 576px - 992px
Desktop: > 992px
```

## 📊 Analytics & Tracking

### UTM Parameters

The landing page automatically captures:

```
utm_source    - Traffic source (Instagram, Telegram, etc.)
utm_medium    - Medium (social, email, ads)
utm_campaign  - Campaign name
```

Example URL:
```
https://fitocut.com/?utm_source=instagram&utm_medium=social&utm_campaign=launch
```

### Metrics Tracked

- Total page views
- Unique visitors (by IP)
- Sign-up conversion rate
- Source attribution
- City distribution
- Role distribution (users vs coaches)

## 🔧 Configuration

### Settings (fitocut_landing/settings.py)

```python
# Language & Timezone
LANGUAGE_CODE = 'fa-ir'
TIME_ZONE = 'Asia/Tehran'

# Static Files
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Media Files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Security (Production)
DEBUG = False
ALLOWED_HOSTS = ['fitocut.com', 'www.fitocut.com']
SECURE_SSL_REDIRECT = True
```

### Google Sheets Integration

To export sign-ups to Google Sheets:

1. Create Google Cloud Project
2. Enable Google Sheets API
3. Download credentials.json
4. Install gspread: `pip install gspread oauth2client`
5. Run export script:

```python
python manage.py export_to_sheets
```

## 🔒 Security & Privacy

### Privacy Notice

Located in `templates/landing/index.html`:

```html
<div class="privacy-notice">
    <p>
        اطلاعات شما با رعایت کامل حریم خصوصی و طبق قوانین 
        حفاظت از داده‌های شخصی جمهوری اسلامی ایران نگهداری می‌شود.
    </p>
</div>
```

### Data Protection

- ✅ Phone numbers are unique and validated
- ✅ No sensitive data stored without consent
- ✅ IP addresses for fraud prevention only
- ✅ HTTPS enforced in production
- ✅ Admin access restricted

## 📈 Performance Optimization

### Page Load Time: < 2 seconds

```
- Minified CSS/JS
- Compressed images (WebP format)
- CDN for static files
- Database query optimization
- Browser caching enabled
```

### Page Weight: < 3 MB

```
- Optimized images: 500KB
- CSS: 50KB
- JavaScript: 100KB
- Fonts: 200KB (subset)
Total: ~850KB
```

## 🎯 Pre-Launch KPIs

| Metric | Target | Tracking |
|--------|--------|----------|
| Total Sign-Ups | ≥ 500 | Admin dashboard |
| Conversion Rate | ≥ 20% | Analytics |
| Data Quality | ≤ 5% invalid | Admin validation |
| Response Rate | ≥ 60% | SMS tracking |

## 🚀 Deployment

### Development

```bash
python manage.py runserver
```

### Production (Example with Gunicorn)

```bash
# Install gunicorn
pip install gunicorn

# Collect static files
python manage.py collectstatic --noinput

# Run with gunicorn
gunicorn fitocut_landing.wsgi:application --bind 0.0.0.0:8000
```

### Using Docker

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
RUN python manage.py collectstatic --noinput
CMD ["gunicorn", "fitocut_landing.wsgi:application", "--bind", "0.0.0.0:8000"]
```

## 📱 SMS Integration (Future)

For sending SMS notifications to sign-ups:

```python
# Using Kavenegar API
from kavenegar import *

api = KavenegarAPI('YOUR-API-KEY')
params = {
    'receptor': '09123456789',
    'message': 'سلام! اپلیکیشن فیتاکات راه‌اندازی شد. دانلود کنید: fitocut.com/download'
}
api.sms_send(params)
```

## 🔗 Integration Points

### Google Tag Manager

Add to `templates/landing/index.html`:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

### Facebook Pixel

```html
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

## 📞 Support & Maintenance

### Admin Commands

```bash
# Export sign-ups to CSV
python manage.py export_signups

# Clean invalid sign-ups
python manage.py clean_signups

# Send test SMS
python manage.py test_sms 09123456789
```

### Database Backup

```bash
# Backup database
python manage.py dumpdata landing.SignUp > backup.json

# Restore database
python manage.py loaddata backup.json
```

## 🎉 Launch Checklist

- [ ] Update ALLOWED_HOSTS in settings.py
- [ ] Set DEBUG = False
- [ ] Configure HTTPS/SSL certificate
- [ ] Set up domain (fitocut.com)
- [ ] Configure email backend
- [ ] Add Google Analytics/Tag Manager
- [ ] Test form submission
- [ ] Test mobile responsiveness
- [ ] Load test (target: 1000 concurrent users)
- [ ] Set up monitoring (Sentry, etc.)
- [ ] Configure backups
- [ ] Prepare SMS campaign for follow-up

## 📝 Environment Variables

Create `.env` file:

```env
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=fitocut.com,www.fitocut.com
DATABASE_URL=postgres://user:pass@localhost/fitocut_landing

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=info@fitocut.com
EMAIL_HOST_PASSWORD=your-password

# SMS Configuration (Kavenegar)
KAVENEGAR_API_KEY=your-api-key
```

## 🤝 Contributing

This is an internal project. For questions or issues, contact the development team.

## 📄 License

© 2025 FitoCut. All Rights Reserved.

---

**Built with ❤️ for the Iranian Fitness Community**

*Transforming fitness coaching, one connection at a time.*
