# 🚀 FitoCut Landing Page - Quick Start

## ✅ Setup Complete!

All files have been created and migrations have been applied successfully.

## 🎯 Next Steps:

### 1. Create Admin User

```powershell
python manage.py createsuperuser
```

Enter your details when prompted:
- Username: admin
- Email: admin@fitocut.com
- Password: (choose a strong password)

### 2. Run the Development Server

```powershell
python manage.py runserver
```

### 3. Access the Application

- **Landing Page:** http://localhost:8000/
- **Admin Dashboard:** http://localhost:8000/admin/
- **Success Page:** http://localhost:8000/success/

## 📊 What You Can Do:

### As a Visitor:
1. Fill out the sign-up form with:
   - نام کامل (Full Name)
   - شماره تماس (Phone: 09XXXXXXXXX)
   - ایمیل (Email - optional)
   - شهر (City - 27 major Iranian cities)
   - هدف شما (Fitness Goal)
   - نقش شما (Role: User/Coach/Dietitian/Gym)
   - ✓ Consent checkbox

2. Submit and see success page
3. Return to landing page

### As Admin:
1. Login to http://localhost:8000/admin/
2. View all sign-ups in "ثبت‌نام‌ها" (SignUps)
3. Filter by city, role, goal
4. Search by name, phone, email
5. Export to CSV
6. Mark as contacted
7. View analytics in "بازدیدهای صفحه" (Page Views)

## 📱 Features Implemented:

✅ **Persian (Farsi) Interface** - Complete RTL layout
✅ **Form Validation** - Phone format (09XXXXXXXXX), required fields
✅ **27 Iranian Cities** - Major cities dropdown
✅ **UTM Tracking** - ?utm_source=instagram&utm_medium=social&utm_campaign=launch
✅ **Page Analytics** - IP, user agent, referrer tracking
✅ **Responsive Design** - Works on mobile, tablet, desktop
✅ **Admin Dashboard** - Comprehensive management interface
✅ **CSV Export** - Export sign-ups for external use
✅ **Privacy Compliance** - Consent checkbox and notice

## 🎨 Design Features:

- **Colors:** Purple gradient (#667eea to #764ba2)
- **Font:** Vazirmatn (Persian font from CDN)
- **Framework:** Bootstrap 5 RTL
- **Animations:** Smooth hover effects
- **Mobile-First:** Fully responsive

## 📊 Test the Form:

Try filling out the form with:

```
نام کامل: علی رضایی
شماره تماس: 09123456789
ایمیل: ali@example.com
شهر: تهران
هدف: کاهش وزن
نقش: کاربر (دانشجو)
☑ موافقت با دریافت اطلاعات
```

## 🔧 Customize:

### Add Your Logo:
1. Place logo in `static/images/logo.png`
2. Update template to use: `<img src="{% static 'images/logo.png' %}">`

### Change Colors:
Edit `landing/templates/landing/index.html`:
```css
background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
```

### Add Google Analytics:
Add before `</head>` in index.html:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 📈 Track Conversions:

### Test with UTM Parameters:

```
http://localhost:8000/?utm_source=instagram&utm_medium=social&utm_campaign=launch2025
```

View tracked data in admin under "بازدیدهای صفحه"

## 🚀 Production Deployment:

### 1. Update Settings:

Edit `fitocut_landing/settings.py`:

```python
DEBUG = False
ALLOWED_HOSTS = ['fitocut.com', 'www.fitocut.com']
SECRET_KEY = 'generate-a-new-secret-key'
```

### 2. Collect Static Files:

```powershell
python manage.py collectstatic
```

### 3. Use Production Server:

```powershell
pip install gunicorn
gunicorn fitocut_landing.wsgi:application
```

## 📞 Need Help?

Check these files:
- `README.md` - Complete documentation
- `SETUP_GUIDE.md` - Detailed setup instructions
- Django Admin - View all data and analytics

## 🎉 You're Ready!

Your FitoCut coming soon page is fully functional and ready to collect sign-ups!

**Happy launching! 🚀**
