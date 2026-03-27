//gallery.js

const projects = [
    {
        coverHeight: 460,
        images: [
            { src: "stonesss/job1.jpg"},
            { src: "stonesss/job1dif.jpg"},
        ]
    },
    {
        coverHeight: 400,
        images: [
            { src: "stonesss/job2.jpg"},
        ]
    },
    {
        coverHeight: 300,
        coverWidth:500,
        images: [
            { src: "stonesss/patiofinal.jpg"},
            { src: "stonesss/patio1.jpg"},
            { src: "stonesss/patio2.jpg"},
            { src: "stonesss/patio3.jpg"},
            { src: "stonesss/patio4.jpg"},
            
           
        ]
    },
    {
        coverHeight: 400,
        images: [
            { src: "stonesss/job3final.jpg"},
            { src: "stonesss/job3part1.jpg"},
            { src: "stonesss/job3part2.jpg"},
            { src: "stonesss/job3part3.jpg"},
            { src: "stonesss/job3part4.jpg"},
            { src: "stonesss/job3part5.jpg"},
        ]
    },
    {
        coverHeight: 300,
        coverWidth:500,
        images: [
            { src: "stonesss/stepfinal.jpg"},
            { src: "stonesss/step1.jpg"},
            { src: "stonesss/step2.jpg"},
            { src: "stonesss/step3.jpg"},
            { src: "stonesss/step4.jpg"},
           
        ]
    },
    
    
    // ── Add more projects below following the same pattern ──
    // {
    //     title: "Project Name",
    //     type: "Category",
    //     coverHeight: 350,   // pick any height — varied numbers = masonry effect
    //     images: [
    //         { src: "images/final.jpg",  caption: "Final result description" },
    //         { src: "images/step1.jpg",  caption: "Step 1 description" },
    //     ]
    // },
];

// ── Build the Gallery Grid ──
const grid = document.getElementById('galleryGrid');

projects.forEach((proj, idx) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.onclick = () => openLightbox(idx);
    card.innerHTML = `
        <img src="${proj.images[0].src}" style="height:${proj.coverHeight}px; object-fit:cover;">
    `;
    grid.appendChild(card);
});

// ── Lightbox State ──
let currentSlide   = 0;
let currentProject = null;

// ── Open Lightbox ──
function openLightbox(idx) {
    currentProject = projects[idx];
    currentSlide   = 0;

    //slides
    const track = document.getElementById('carouselTrack');
    track.innerHTML = '';
    currentProject.images.forEach((img, i) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `
            <img src="${img.src}" alt="">
        `;
        track.appendChild(slide);
    });

    buildDots();
    updateCarousel();
    const btns = document.querySelectorAll('.carousel-btn');
    btns.forEach(btn => btn.style.display = currentProject.images.length === 1 ? 'none' : 'flex');
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ── Close Lightbox ──
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

// ── Move Carousel ──
function moveCarousel(dir) {
    currentSlide = (currentSlide + dir + currentProject.images.length) % currentProject.images.length;
    updateCarousel();
}

// ── Sync track + dots + counter ──
function updateCarousel() {
    document.getElementById('carouselTrack').style.transform = `translateX(-${currentSlide * 100}%)`;
    document.getElementById('slideCounter').textContent      = `${currentSlide + 1} / ${currentProject.images.length}`;
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}



// ── Build dot indicators ──
function buildDots() {
    const dots = document.getElementById('carouselDots');
    dots.innerHTML = '';
    currentProject.images.forEach((_, i) => {
        const dot    = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.onclick   = () => { currentSlide = i; updateCarousel(); };
        dots.appendChild(dot);
    });
}

// ── Close on backdrop click ──
document.getElementById('lightbox').addEventListener('click', function (e) {
    if (e.target === this) closeLightbox();
});

// ── Keyboard navigation ──
document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox').classList.contains('active')) return;
    if (e.key === 'ArrowRight') moveCarousel(1);
    if (e.key === 'ArrowLeft')  moveCarousel(-1);
    if (e.key === 'Escape')     closeLightbox();
});