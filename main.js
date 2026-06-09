// 모바일 메뉴 토글
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // 햄버거 메뉴 애니메이션 (선택적 구현)
    const bars = document.querySelectorAll('.bar');
    if (navLinks.classList.contains('active')) {
        bars[0].style.transform = 'translateY(8px) rotate(45deg)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// 메뉴 클릭 시 모바일 메뉴 닫기
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const bars = document.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    });
});

// 스크롤 시 헤더 스타일 변경 및 ScrollSpy (메뉴 활성화)
const header = document.getElementById('header');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    // 1. 헤더 글래스모피즘(블러) 배경 처리
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // 2. ScrollSpy 로직 (현재 보고 있는 섹션 찾기)
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // 화면의 1/3 지점(150px) 정도에 섹션이 걸칠 때부터 인식되게 보정
        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    // 3. 해당하는 메뉴 항목에 밑줄(active) 표시
    navItems.forEach(item => {
        item.classList.remove('active');
        if (current && item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// 스크롤 애니메이션 (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // 한번 나타나면 다시 관찰하지 않음
        }
    });
}, observerOptions);

const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(el => observer.observe(el));

// 글씨 크기 조절 플로팅 버튼 로직
const btnFontNormal = document.getElementById('btn-font-normal');
const btnFontLarge = document.getElementById('btn-font-large');
const htmlRoot = document.documentElement; // html 태그

btnFontNormal.addEventListener('click', () => {
    htmlRoot.classList.remove('font-large');
    btnFontNormal.classList.add('active');
    btnFontLarge.classList.remove('active');
});

btnFontLarge.addEventListener('click', () => {
    htmlRoot.classList.add('font-large');
    btnFontLarge.classList.add('active');
    btnFontNormal.classList.remove('active');
});

// 강의 아코디언 로직
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const body = header.nextElementSibling;
        const isActive = item.classList.contains('active');
        
        // 일단 모든 아코디언 닫기
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            otherItem.querySelector('.accordion-body').style.maxHeight = null;
        });

        // 클릭한 항목이 열려있지 않았다면 열기
        if (!isActive) {
            item.classList.add('active');
            header.setAttribute('aria-expanded', 'true');
            body.style.maxHeight = body.scrollHeight + "px";
        }
    });
});

// FAQ 아코디언 로직
const faqHeaders = document.querySelectorAll('.faq-header');

faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const body = header.nextElementSibling;
        const isActive = item.classList.contains('active');
        
        // 모든 FAQ 닫기
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-header').setAttribute('aria-expanded', 'false');
            otherItem.querySelector('.faq-body').style.maxHeight = null;
        });

        // 클릭한 항목 열기
        if (!isActive) {
            item.classList.add('active');
            header.setAttribute('aria-expanded', 'true');
            body.style.maxHeight = body.scrollHeight + "px";
        }
    });
});

// 이메일 웹사이트 직접 연결로 변경하여 복사 로직 제거함

// 히어로 섹션 타이핑 효과 로직
const typingTextElement = document.getElementById('typing-text');
const typingMessages = [
    "AI 도구로 내 강의를 브랜드로 만드는 실전 강사",
    "시니어도 소상공인도 누구든 시작할 수 있습니다",
    "함께라면 더 빠르게, AI와 함께 브랜드를 완성하세요"
];

let typingMessageIndex = 0;
let typingCharIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentMessage = typingMessages[typingMessageIndex];
    
    // 지우는 중인지, 쓰는 중인지에 따른 텍스트 설정
    if (isDeleting) {
        typingTextElement.textContent = currentMessage.substring(0, typingCharIndex - 1);
        typingCharIndex--;
    } else {
        typingTextElement.textContent = currentMessage.substring(0, typingCharIndex + 1);
        typingCharIndex++;
    }

    // 요청하신 부드러운 타이핑 속도: 쓰는 속도(150ms), 지우는 속도(90ms)
    let typeSpeed = isDeleting ? 90 : 150;

    // 다 썼을 때 대기
    if (!isDeleting && typingCharIndex === currentMessage.length) {
        typeSpeed = 2500; // 2.5초 대기
        isDeleting = true;
    } 
    // 다 지웠을 때 다음 문구로 넘어감
    else if (isDeleting && typingCharIndex === 0) {
        isDeleting = false;
        typingMessageIndex = (typingMessageIndex + 1) % typingMessages.length;
        typeSpeed = 500; // 다음 문구 시작 전 0.5초 잠깐 대기
    }

    setTimeout(typeEffect, typeSpeed);
}

// 타이핑 엘리먼트가 존재하면 애니메이션 시작
if (typingTextElement) {
    typeEffect();
}

// 카카오 상담 플로팅 버튼 말풍선 로직
const kakaoTooltip = document.getElementById('kakao-tooltip');

if (kakaoTooltip) {
    // 1. 페이지 로드 후 3초 뒤에 말풍선 표시
    setTimeout(() => {
        kakaoTooltip.classList.add('show');
    }, 3000);

    // 2. 말풍선을 클릭하면 다시 숨김
    kakaoTooltip.addEventListener('click', () => {
        kakaoTooltip.classList.remove('show');
    });
}

// 실적 숫자 카운터 애니메이션 로직
const statsSection = document.getElementById('stats');
const counters = document.querySelectorAll('.counter');

if (statsSection && counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 섹션이 보이면 애니메이션 시작
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // 2초 (2000ms)
                    const frameDuration = 1000 / 60; // 60fps 기준
                    const totalFrames = Math.round(duration / frameDuration);
                    const increment = target / totalFrames;
                    
                    let currentCount = 0;
                    let currentFrame = 0;

                    const updateCounter = setInterval(() => {
                        currentFrame++;
                        currentCount += increment;

                        if (currentFrame >= totalFrames) {
                            counter.innerText = target;
                            clearInterval(updateCounter);
                            // 애니메이션이 끝나면 뒤의 기호(+ 또는 %)를 보여줌
                            const suffix = counter.nextElementSibling;
                            if (suffix && suffix.classList.contains('stat-suffix')) {
                                suffix.classList.remove('hidden');
                            }
                        } else {
                            counter.innerText = Math.round(currentCount);
                        }
                    }, frameDuration);
                });
                // 한 번 실행 후 관찰 중단 (다시 스크롤해도 또 실행되지 않도록)
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // 화면에 50% 정도 보일 때 실행

    counterObserver.observe(statsSection);
}

// 수강 후기 슬라이더 로직
const reviewTrack = document.getElementById('review-track');
if (reviewTrack) {
    const cards = document.querySelectorAll('.review-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.getElementById('slider-dots');
    
    let currentSlide = 0;
    const totalSlides = cards.length;
    let slideInterval;

    // 슬라이드 개수에 맞춰 하단 점(dot) 자동 생성
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            goToSlide(i);
        });
        
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');

    function updateDots() {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }

    function goToSlide(index) {
        currentSlide = index;
        // 100% 이동
        document.getElementById('review-track').style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
        resetInterval();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 3000);
    }

    // 다음/이전 버튼 이벤트
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // 마우스를 올리고 있을 때는 멈추고, 떼면 다시 시작 (사용자 배려)
    const sliderWrap = document.querySelector('.review-slider-wrap');
    if (sliderWrap) {
        sliderWrap.addEventListener('mouseenter', () => clearInterval(slideInterval));
        sliderWrap.addEventListener('mouseleave', startAutoSlide);
    }

    startAutoSlide();
}

/* ========================================================
   상담 모달창 (선택창 및 외부 링크 안내 모달) 로직
======================================================== */
const consultModal = document.getElementById('consultModal');
const linkNoticeModal = document.getElementById('linkNoticeModal');
const confirmLinkBtn = document.getElementById('confirmLinkBtn');
let pendingUrl = '';

function openConsultModal() {
    if (consultModal) {
        consultModal.classList.add('show');
    }
}

function closeConsultModal() {
    if (consultModal) {
        consultModal.classList.remove('show');
    }
}

// 모달 외부 영역 클릭 시 닫기
window.addEventListener('click', (e) => {
    if (e.target === consultModal) {
        closeConsultModal();
    }
    if (e.target === linkNoticeModal) {
        linkNoticeModal.classList.remove('show');
    }
});

// 외부 링크 안전하게 열기 (기기별 분기 처리)
function openLinkSafely(url) {
    // 이전 모달이 열려있다면 닫기
    closeConsultModal();

    pendingUrl = url;
    
    // 모바일 기기 감지 (화면 너비 768px 이하 기준)
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // 모바일: 안내 모달 띄우기
        if (linkNoticeModal) {
            linkNoticeModal.classList.add('show');
        } else {
            window.location.href = url;
        }
    } else {
        // PC: 바로 새 탭
        window.open(url, '_blank', 'noopener,noreferrer');
    }
}

// 안내 모달에서 '이동하기' 버튼 클릭 시
if (confirmLinkBtn) {
    confirmLinkBtn.addEventListener('click', () => {
        linkNoticeModal.classList.remove('show');
        if (pendingUrl) {
            // 강사님 요청대로 같은 창(self)으로 이동
            window.location.href = pendingUrl;
        }
    });
}

/* ========================================================
   비디오 자동 재생 최적화 (Intersection Observer)
======================================================== */
const videos = document.querySelectorAll('.observe-video');

if (videos.length > 0) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // 화면에 30% 이상 들어오면 재생
                video.play().catch(error => {
                    console.log("자동재생이 브라우저 정책에 의해 차단되었습니다.", error);
                });
            } else {
                // 밖으로 나가면 멈춤
                video.pause();
            }
        });
    }, {
        threshold: 0.3
    });

    videos.forEach(video => {
        videoObserver.observe(video);
    });
}
