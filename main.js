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

// 스크롤 시 헤더 스타일 변경
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
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

    // 기본 타이핑 속도(80ms), 지우는 속도(40ms)
    let typeSpeed = isDeleting ? 40 : 80;

    // 다 썼을 때 대기
    if (!isDeleting && typingCharIndex === currentMessage.length) {
        typeSpeed = 1500; // 1.5초 대기
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
