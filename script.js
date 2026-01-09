// DOM Elements
const incomeInput = document.getElementById('yearlyIncome');
const incomeRange = document.getElementById('incomeRange');
const savingsDisplay = document.getElementById('estimatedSavings');
const nav = document.querySelector('header');
const accordionHeaders = document.querySelectorAll('.accordion-header');

// Tax Calculation Logic (Simplified for Demo)
const calculateSavings = (income) => {
    // Base logic: bigger income = bigger potential missed deductions
    const deductionRate = 0.12; // 12% recoverable expenses average
    const taxRate = 0.25; // Average marginal tax rate
    return Math.floor(income * deductionRate * taxRate);
};

// Update Calculations
const updateValues = (value) => {
    const savings = calculateSavings(value);

    // Animate Number Counter
    animateValue(savingsDisplay, parseInt(savingsDisplay.innerText.replace(/[^0-9]/g, '')), savings, 500);

    // Sync inputs
    incomeInput.value = value;
    incomeRange.value = value;
};

// Number Animation Utility
const animateValue = (obj, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        obj.innerHTML = `$${current.toLocaleString()}`;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Event Listeners for Calculator
if (incomeInput && incomeRange) {
    incomeInput.addEventListener('input', (e) => {
        let val = parseInt(e.target.value) || 0;
        updateValues(val);
    });

    incomeRange.addEventListener('input', (e) => {
        updateValues(parseInt(e.target.value));
    });
}

// Scroll Effects
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Intersection Observer for Fade Up Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.add('show-animate'); // Trigger for specific animations

            // Handle staggered children if parent is observed
            if (entry.target.classList.contains('stagger-container')) {
                // Logic is handled via CSS descendant selectors .stagger-container.visible .stagger-item
                // But we ensure the parent gets the visible class here.
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-fade-up, .animate-slide-left, .animate-slide-right, .animate-zoom-in, .animate-pop-in, .stagger-container').forEach(el => {
    observer.observe(el);
});

// FAQ Accordion Logic
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isActive = header.classList.contains('active');

        // Close all other accordions
        document.querySelectorAll('.accordion-header').forEach(h => {
            h.classList.remove('active');
            h.nextElementSibling.style.maxHeight = null;
        });

        // Toggle clicked accordion
        if (!isActive) {
            header.classList.add('active');
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

// Initialize Calculator
if (incomeInput) {
    updateValues(85000);
}

/* --- Student Page Logic --- */
const tuitionInput = document.getElementById('tuitionFees');
const tuitionRange = document.getElementById('tuitionRange');
const creditDisplay = document.getElementById('estimatedCredit');

const calculateStudentCredit = (tuition) => {
    // Approx 15% Federal + ~5-10% Provincial (using 20% conservative estimate for simplicity)
    const creditRate = 0.15;
    return Math.floor(tuition * creditRate);
};

const updateStudentValues = (value) => {
    const credit = calculateStudentCredit(value);
    animateValue(creditDisplay, parseInt(creditDisplay.innerText.replace(/[^0-9]/g, '')), credit, 500);
    tuitionInput.value = value;
    tuitionRange.value = value;
};

if (tuitionInput && tuitionRange) {
    tuitionInput.addEventListener('input', (e) => {
        let val = parseInt(e.target.value) || 0;
        updateStudentValues(val);
    });

    tuitionRange.addEventListener('input', (e) => {
        updateStudentValues(parseInt(e.target.value));
    });

    // Initialize for Student Page
    updateStudentValues(8000);
}

// --- 3D Tilt Animation Logic ---
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate percentage position (0-1)
        const xPct = x / rect.width;
        const yPct = y / rect.height;

        // Calculate rotation (max +/- 10 degrees)
        const xRot = (yPct - 0.5) * 20; // Rotate X axis based on Y position (tilt up/down)
        const yRot = (xPct - 0.5) * -20; // Rotate Y axis based on X position (tilt left/right)

        card.style.transform = `perspective(1000px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// --- Parallax Background Logic ---
const parallaxBgs = document.querySelectorAll('.parallax-bg');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxBgs.forEach(bg => {
        const speed = 0.5;
        bg.style.transform = `translateY(${scrollY * speed}px)`;
    });
});
