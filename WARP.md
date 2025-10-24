# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**FitoCut Landing Page** - A Django-based pre-launch landing page for Iran's first all-in-one digital fitness coaching ecosystem. This is a Persian (Farsi) RTL web application designed to collect early sign-ups with comprehensive analytics tracking.

**Key characteristics:**
- Persian/Farsi RTL interface
- Pre-launch sign-up form with validation
- UTM parameter tracking for marketing analytics
- Privacy compliance with consent management
- Admin dashboard for CRM management

## Development Commands

### Setup & Installation
```powershell
# Install dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser for admin access
python manage.py createsuperuser
```

### Running the Application
```powershell
# Development server
python manage.py runserver

# Production deployment with Gunicorn
pip install gunicorn
python manage.py collectstatic --noinput
gunicorn fitocut_landing.wsgi:application --bind 0.0.0.0:8000
```

### Database Management
```powershell
# Backup database
python manage.py dumpdata landing.SignUp > backup.json

# Restore database
python manage.py loaddata backup.json

# Backup entire landing app
python manage.py dumpdata landing > landing_backup.json
```

### Admin Operations
```powershell
# Collect static files (required before production deployment)
python manage.py collectstatic

# Open Django shell for debugging
python manage.py shell

# Create database migrations after model changes
python manage.py makemigrations landing
```

## Architecture

### Project Structure
```
fitocut_landing/          # Django project settings
├── settings.py           # Configuration (LANGUAGE_CODE='fa-ir', TIME_ZONE='Asia/Tehran')
├── urls.py              # Root URL routing
└── wsgi.py              # WSGI application entry point

landing/                 # Main application
├── models.py           # SignUp and PageView models with Persian choices
├── forms.py            # SignUpForm with validation (phone: 09XXXXXXXXX)
├── views.py            # Landing page view with UTM tracking
├── admin.py            # Custom admin with CSV export and bulk actions
├── urls.py             # App-level routing
└── templates/landing/
    ├── index.html      # Main RTL landing page
    └── success.html    # Thank you page after sign-up
```

### Core Models

**SignUp Model** - Stores pre-launch user registrations
- Required: full_name, phone_number (11 digits starting with 09), city, fitness_goal, role, consent
- Optional: email
- Tracking: IP address, user agent, UTM parameters (source, medium, campaign)
- Management: is_valid, is_contacted flags, notes field
- 27 Iranian cities supported (Tehran, Mashhad, Isfahan, etc.)

**PageView Model** - Analytics tracking for all page visits
- Captures IP, user agent, referrer, and UTM parameters
- Used for conversion rate analysis

### Data Flow

1. **Page Visit**: PageView record created with UTM parameters from query string
2. **Form Submission**: POST request validates form data
3. **Validation**: Phone number format (09XXXXXXXXX), consent checkbox, duplicate phone check
4. **Save**: SignUp record created with IP tracking and UTM attribution
5. **Redirect**: User redirected to success page
6. **Admin Access**: View/export sign-ups via Django admin at `/admin/`

### Key Features

**Form Validation Logic (forms.py)**
- Phone number must be exactly 11 digits starting with "09"
- Duplicate phone numbers are rejected
- Consent checkbox is mandatory
- Email is optional but validated if provided

**Admin Customization (admin.py)**
- List view with city/role/goal filters
- CSV export with Persian column headers (includes BOM for Excel)
- Bulk action: "Mark as contacted"
- Collapsible tracking section for UTM data
- Search by name/phone/email

**Analytics Tracking (views.py)**
- `get_client_ip()` handles X-Forwarded-For header for proxies
- UTM parameters automatically captured from query string
- Page views tracked separately from sign-ups

### Persian/RTL Considerations

- All form labels, choices, and admin text are in Persian
- Language code: `fa-ir`
- Time zone: `Asia/Tehran`
- Bootstrap 5 RTL used for layout
- Vazirmatn font family for proper Persian typography

## Configuration Notes

### settings.py Important Settings
- `DEBUG = True` (change to False for production)
- `ALLOWED_HOSTS` includes IP address and domain variations
- `LANGUAGE_CODE = 'fa-ir'` for Persian
- `TIME_ZONE = 'Asia/Tehran'` for Iranian timezone
- Static files: `STATIC_ROOT = BASE_DIR / 'staticfiles'`
- Database: SQLite (consider PostgreSQL for production)

### URL Structure
- `/` - Landing page with sign-up form
- `/success/` - Thank you page after successful sign-up
- `/admin/` - Django admin dashboard
- Static files served at `/static/`
- Media files served at `/media/`

### UTM Tracking Usage
Test URLs with marketing parameters:
```
http://localhost:8000/?utm_source=instagram&utm_medium=social&utm_campaign=launch2025
http://localhost:8000/?utm_source=telegram&utm_medium=message&utm_campaign=prelaunch
```

## Working with This Codebase

### Making Model Changes
1. Edit `landing/models.py`
2. Run `python manage.py makemigrations landing`
3. Run `python manage.py migrate`
4. Update `landing/forms.py` if form fields changed
5. Update `landing/admin.py` if admin display needs changes

### Adding New Cities or Choices
- Edit the choice tuples in `landing/models.py` (CITY_CHOICES, GOAL_CHOICES, ROLE_CHOICES)
- Format: `('KEY', 'Persian Label')`
- Run migrations after changes

### Customizing Admin
- Admin configuration in `landing/admin.py`
- CSV export includes BOM (`\ufeff`) for proper Excel Persian display
- Custom actions use ModelAdmin.actions
- Fieldsets organize admin form into collapsible sections

### Testing Sign-ups
Use these test values:
- نام کامل: علی رضایی
- شماره تماس: 09123456789
- شهر: تهران
- هدف: کاهش وزن
- نقش: کاربر (دانشجو)
- Check the consent box

### Before Production Deployment
1. Set `DEBUG = False` in settings.py
2. Update `SECRET_KEY` to a secure random value
3. Configure proper `ALLOWED_HOSTS`
4. Run `python manage.py collectstatic`
5. Consider switching from SQLite to PostgreSQL
6. Set up HTTPS/SSL
7. Configure backup strategy for database
8. Test form submission thoroughly

## Dependencies

- Django >= 5.1.0
- Pillow >= 10.0.0 (for image handling)

No test framework is currently configured. Consider adding pytest-django for testing if needed.
