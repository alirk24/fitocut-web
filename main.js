// Fitocut - Persian Fitness Platform JavaScript
// Main functionality for all interactive features

// Global variables
let currentTimer = null;
let timerSeconds = 0;
let isTimerRunning = false;
let currentDate = new Date();
let exerciseData = [];
let mealData = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize based on current page
    const currentPage = window.location.pathname.split('/').pop();
    
    // Common initialization
    initializeNavigation();
    initializeScrollAnimations();
    
    // Page-specific initialization
    switch(currentPage) {
        case 'index.html':
        case '':
            initializeHomePage();
            break;
        case 'workouts.html':
            initializeWorkoutsPage();
            break;
        case 'nutrition.html':
            initializeNutritionPage();
            break;
        case 'progress.html':
            initializeProgressPage();
            break;
    }
}

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Scroll animations
function initializeScrollAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.card-hover, .meal-card, .exercise-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Home page initialization
function initializeHomePage() {
    // Initialize typed text animation
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: ['Fitocut', 'تناسب اندام حرفه‌ای', 'سلامتی پایدار'],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
    
    // Initialize testimonial slider
    if (document.getElementById('testimonial-slider')) {
        new Splide('#testimonial-slider', {
            type: 'loop',
            perPage: 1,
            autoplay: true,
            interval: 5000,
            arrows: false,
            pagination: true,
            direction: 'rtl'
        }).mount();
    }
    
    // Animate statistics counters
    animateCounters();
}

// Animate statistics counters
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current).toLocaleString('fa-IR');
        }, 16);
    });
}

// Workouts page initialization
function initializeWorkoutsPage() {
    generateCalendar();
    generateExerciseLibrary();
    initializeWorkoutTimer();
}

// Generate workout calendar
function generateCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    if (!calendarGrid) return;
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Update month display
    const monthNames = [
        'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
        'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
    ];
    const currentMonthEl = document.getElementById('current-month');
    if (currentMonthEl) {
        currentMonthEl.textContent = `${monthNames[month]} ${year}`;
    }
    
    // Clear calendar
    calendarGrid.innerHTML = '';
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        dayElement.onclick = () => selectDate(day);
        
        // Mark today
        if (day === new Date().getDate() && month === new Date().getMonth()) {
            dayElement.classList.add('selected');
        }
        
        // Mark workout days (mock data)
        if ([3, 5, 7, 10, 12, 14, 17, 19, 21, 24, 26, 28].includes(day)) {
            dayElement.classList.add('has-workout');
        }
        
        calendarGrid.appendChild(dayElement);
    }
}

// Calendar navigation
function navigateMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    generateCalendar();
}

// Select date
function selectDate(day) {
    // Remove previous selection
    document.querySelectorAll('.calendar-day').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Add selection to clicked day
    event.target.classList.add('selected');
    
    // Update today's workout display
    updateTodayWorkout(day);
}

// Generate exercise library
function generateExerciseLibrary() {
    const exerciseGrid = document.getElementById('exercise-grid');
    if (!exerciseGrid) return;
    
    const exercises = [
        { name: 'پرس سینه', muscle: 'chest', difficulty: 'intermediate', image: 'resources/equipment-1.jpg' },
        { name: 'اسکات', muscle: 'legs', difficulty: 'beginner', image: 'resources/workout-1.jpg' },
        { name: 'ددلیفت', muscle: 'back', difficulty: 'advanced', image: 'resources/equipment-2.jpg' },
        { name: 'شنا سوئدی', muscle: 'chest', difficulty: 'beginner', image: 'resources/workout-2.jpg' },
        { name: 'پرس سرشانه', muscle: 'shoulders', difficulty: 'intermediate', image: 'resources/trainer-1.jpg' },
        { name: 'پشت بازو سیم‌کش', muscle: 'arms', difficulty: 'beginner', image: 'resources/transformation-1.jpg' },
        { name: 'پلانک', muscle: 'core', difficulty: 'beginner', image: 'resources/nutrition-1.jpg' },
        { name: 'لیفت پا', muscle: 'legs', difficulty: 'intermediate', image: 'resources/nutrition-2.jpg' }
    ];
    
    exerciseGrid.innerHTML = '';
    
    exercises.forEach((exercise, index) => {
        const exerciseCard = document.createElement('div');
        exerciseCard.className = 'exercise-card bg-white rounded-2xl shadow-lg overflow-hidden';
        exerciseCard.innerHTML = `
            <div class="relative">
                <img src="${exercise.image}" alt="${exercise.name}" class="w-full h-48 object-cover">
                <div class="difficulty-badge ${getDifficultyColor(exercise.difficulty)}">${getDifficultyText(exercise.difficulty)}</div>
            </div>
            <div class="p-4">
                <h3 class="text-lg font-bold text-gray-900 mb-2">${exercise.name}</h3>
                <p class="text-gray-600 text-sm mb-3">عضلات: ${getMuscleText(exercise.muscle)}</p>
                <button onclick="showExerciseDetails('${exercise.name}')" class="btn-primary text-white px-4 py-2 rounded-lg text-sm w-full">
                    مشاهده تمرین
                </button>
            </div>
        `;
        
        exerciseGrid.appendChild(exerciseCard);
    });
}

// Helper functions for exercise library
function getDifficultyColor(difficulty) {
    switch(difficulty) {
        case 'beginner': return 'bg-green-100 text-green-800';
        case 'intermediate': return 'bg-yellow-100 text-yellow-800';
        case 'advanced': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

function getDifficultyText(difficulty) {
    switch(difficulty) {
        case 'beginner': return 'مبتدی';
        case 'intermediate': return 'متوسط';
        case 'advanced': return 'پیشرفته';
        default: return 'نامشخص';
    }
}

function getMuscleText(muscle) {
    const muscleNames = {
        'chest': 'سینه',
        'back': 'پشت',
        'shoulders': 'شانه',
        'arms': 'بازو',
        'legs': 'پا',
        'core': 'مرکزی'
    };
    return muscleNames[muscle] || muscle;
}

// Workout timer functionality
function initializeWorkoutTimer() {
    updateTimerDisplay();
}

function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        currentTimer = setInterval(() => {
            timerSeconds++;
            updateTimerDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    if (isTimerRunning) {
        isTimerRunning = false;
        clearInterval(currentTimer);
    }
}

function resetTimer() {
    isTimerRunning = false;
    clearInterval(currentTimer);
    timerSeconds = 0;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
        timerDisplay.textContent = display;
    }
}

// Nutrition page initialization
function initializeNutritionPage() {
    initializeWaterTracker();
    initializeNutritionCharts();
}

// Water tracker functionality
function initializeWaterTracker() {
    updateWaterDisplay();
}

function toggleWater(glassNumber) {
    const glass = document.querySelector(`#water-tracker .water-glass:nth-child(${glassNumber})`);
    if (glass) {
        glass.classList.toggle('filled');
        updateWaterDisplay();
    }
}

function addWater() {
    const emptyGlasses = document.querySelectorAll('#water-tracker .water-glass:not(.filled)');
    if (emptyGlasses.length > 0) {
        emptyGlasses[0].classList.add('filled');
        updateWaterDisplay();
    }
}

function updateWaterDisplay() {
    const filledGlasses = document.querySelectorAll('#water-tracker .water-glass.filled').length;
    const totalGlasses = 8;
    
    // Update water counter display if exists
    const waterCounter = document.querySelector('#water-tracker').previousElementSibling.querySelector('div div');
    if (waterCounter) {
        waterCounter.textContent = filledGlasses;
    }
}

// Nutrition charts initialization
function initializeNutritionCharts() {
    // Calorie chart
    const calorieChart = echarts.init(document.getElementById('calorie-chart'));
    if (calorieChart) {
        const calorieOption = {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [2100, 1950, 2200, 1800, 2050, 1900, 2150],
                type: 'line',
                smooth: true,
                itemStyle: {
                    color: '#1B365D'
                },
                areaStyle: {
                    color: 'rgba(27, 54, 93, 0.1)'
                }
            }]
        };
        calorieChart.setOption(calorieOption);
    }
    
    // Macro chart
    const macroChart = echarts.init(document.getElementById('macro-chart'));
    if (macroChart) {
        const macroOption = {
            tooltip: {
                trigger: 'item'
            },
            series: [{
                type: 'pie',
                radius: '70%',
                data: [
                    { value: 30, name: 'پروتئین', itemStyle: { color: '#3b82f6' } },
                    { value: 45, name: 'کربوهیدرات', itemStyle: { color: '#10b981' } },
                    { value: 25, name: 'چربی', itemStyle: { color: '#f59e0b' } }
                ]
            }]
        };
        macroChart.setOption(macroOption);
    }
}

// Progress page initialization
function initializeProgressPage() {
    initializeProgressCharts();
    initializeMeasurementForm();
}

// Progress charts initialization
function initializeProgressCharts() {
    // Weight chart
    const weightChart = echarts.init(document.getElementById('weight-chart'));
    if (weightChart) {
        const weightOption = {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: ['مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
            },
            yAxis: {
                type: 'value',
                min: 70,
                max: 85
            },
            series: [{
                data: [82, 80.5, 79, 77.5, 76, 75.5],
                type: 'line',
                smooth: true,
                itemStyle: {
                    color: '#1B365D'
                },
                areaStyle: {
                    color: 'rgba(27, 54, 93, 0.1)'
                }
            }]
        };
        weightChart.setOption(weightOption);
    }
    
    // Strength chart
    const strengthChart = echarts.init(document.getElementById('strength-chart'));
    if (strengthChart) {
        const strengthOption = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['پرس سینه', 'اسکات', 'ددلیفت']
            },
            xAxis: {
                type: 'category',
                data: ['هفته 1', 'هفته 2', 'هفته 3', 'هفته 4', 'هفته 5', 'هفته 6']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'پرس سینه',
                    type: 'line',
                    data: [60, 65, 70, 75, 80, 85],
                    itemStyle: { color: '#1B365D' }
                },
                {
                    name: 'اسکات',
                    type: 'line',
                    data: [80, 85, 90, 95, 100, 105],
                    itemStyle: { color: '#7A8471' }
                },
                {
                    name: 'ددلیفت',
                    type: 'line',
                    data: [100, 105, 110, 115, 120, 125],
                    itemStyle: { color: '#f59e0b' }
                }
            ]
        };
        strengthChart.setOption(strengthOption);
    }
    
    // Activity heatmap
    const heatmapChart = echarts.init(document.getElementById('activity-heatmap'));
    if (heatmapChart) {
        const heatmapData = [];
        const weeks = ['هفته 1', 'هفته 2', 'هفته 3', 'هفته 4'];
        const days = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
        
        for (let i = 0; i < weeks.length; i++) {
            for (let j = 0; j < days.length; j++) {
                heatmapData.push([i, j, Math.floor(Math.random() * 100)]);
            }
        }
        
        const heatmapOption = {
            tooltip: {
                position: 'top'
            },
            grid: {
                height: '50%',
                top: '10%'
            },
            xAxis: {
                type: 'category',
                data: weeks,
                splitArea: {
                    show: true
                }
            },
            yAxis: {
                type: 'category',
                data: days,
                splitArea: {
                    show: true
                }
            },
            visualMap: {
                min: 0,
                max: 100,
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                bottom: '15%',
                inRange: {
                    color: ['#e3f2fd', '#1B365D']
                }
            },
            series: [{
                name: 'فعالیت',
                type: 'heatmap',
                data: heatmapData,
                label: {
                    show: true
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        heatmapChart.setOption(heatmapOption);
    }
}

// Measurement form initialization
function initializeMeasurementForm() {
    const form = document.getElementById('measurement-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            submitMeasurements();
        });
    }
}

// Utility functions
function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

function openVideoModal() {
    const modal = document.getElementById('video-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function startFreeTrial() {
    alert('شروع دوره رایگان ۷ روزه! به زودی به داشبورد منتقل خواهید شد.');
}

function learnMore() {
    scrollToFeatures();
}

function startWorkout() {
    const modal = document.getElementById('workout-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        // Populate workout content
        const content = document.getElementById('workout-content');
        if (content) {
            content.innerHTML = `
                <div class="space-y-6">
                    <div class="bg-blue-50 rounded-lg p-4">
                        <h4 class="font-bold text-blue-900 mb-2">۱. پرس سینه هالتر</h4>
                        <p class="text-blue-700 mb-3">۴ ست • ۱۰-۱۲ تکرار • ۶۰ ثانیه استراحت</p>
                        <button onclick="completeSet(1)" class="bg-green-600 text-white px-4 py-2 rounded text-sm">تکمیل ست</button>
                    </div>
                    <div class="bg-green-50 rounded-lg p-4">
                        <h4 class="font-bold text-green-900 mb-2">۲. پرس سرشانه دمبل</h4>
                        <p class="text-green-700 mb-3">۳ ست • ۱۰-۱۲ تکرار • ۴۵ ثانیه استراحت</p>
                        <button onclick="completeSet(2)" class="bg-green-600 text-white px-4 py-2 rounded text-sm">تکمیل ست</button>
                    </div>
                    <div class="bg-yellow-50 rounded-lg p-4">
                        <h4 class="font-bold text-yellow-900 mb-2">۳. پشت بازو سیم‌کش</h4>
                        <p class="text-yellow-700 mb-3">۳ ست • ۱۲-۱۵ تکرار • ۳۰ ثانیه استراحت</p>
                        <button onclick="completeSet(3)" class="bg-green-600 text-white px-4 py-2 rounded text-sm">تکمیل ست</button>
                    </div>
                    <div class="bg-red-50 rounded-lg p-4">
                        <h4 class="font-bold text-red-900 mb-2">۴. پلانک</h4>
                        <p class="text-red-700 mb-3">۳ ست • ۳۰-۶۰ ثانیه • ۳۰ ثانیه استراحت</p>
                        <button onclick="completeSet(4)" class="bg-green-600 text-white px-4 py-2 rounded text-sm">تکمیل ست</button>
                    </div>
                </div>
            `;
        }
    }
}

function closeWorkoutModal() {
    const modal = document.getElementById('workout-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function completeSet(exerciseNumber) {
    alert(`ست تمرین ${exerciseNumber} تکمیل شد! استراحت کنید.`);
}

function selectProgram(programType) {
    const programs = {
        'weight-loss': 'برنامه کاهش وزن',
        'muscle-gain': 'برنامه عضله‌سازی',
        'endurance': 'برنامه استقامت'
    };
    
    alert(`برنامه ${programs[programType]} انتخاب شد. به زودی برنامه‌ریزی خواهد شد.`);
}

function showExerciseDetails(exerciseName) {
    alert(`نمایش جزئیات تمرین: ${exerciseName}`);
}

function addMeal() {
    alert('افزودن وعده غذایی جدید - به زودی اضافه خواهد شد');
}

function addQuickFood() {
    alert('غذای جدید به برنامه غذایی اضافه شد');
}

function addToMealPlan(foodId) {
    const foods = {
        'chicken-kebab': 'کباب مرغ',
        'mediterranean-salad': 'سالاد مدیترانه‌ای',
        'lentil-stew': 'عدسی'
    };
    
    alert(`${foods[foodId]} به برنامه غذایی اضافه شد`);
}

function uploadPhoto() {
    alert('آپلود عکس پیشرفت - به زودی اضافه خواهد شد');
}

function submitMeasurements() {
    alert('اندازه‌ها با موفقیت ثبت شدند');
}

// Calendar navigation event listeners
document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');
    
    if (prevBtn) prevBtn.addEventListener('click', () => navigateMonth(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateMonth(1));
});

// Make functions globally available
window.scrollToFeatures = scrollToFeatures;
window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;
window.startFreeTrial = startFreeTrial;
window.learnMore = learnMore;
window.startWorkout = startWorkout;
window.closeWorkoutModal = closeWorkoutModal;
window.completeSet = completeSet;
window.selectProgram = selectProgram;
window.showExerciseDetails = showExerciseDetails;
window.addMeal = addMeal;
window.addQuickFood = addQuickFood;
window.addToMealPlan = addToMealPlan;
window.toggleWater = toggleWater;
window.addWater = addWater;
window.uploadPhoto = uploadPhoto;
window.submitMeasurements = submitMeasurements;
window.startTimer = startTimer;
window.pauseTimer = pauseTimer;
window.resetTimer = resetTimer;