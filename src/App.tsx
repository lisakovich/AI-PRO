import React, { useState, useEffect, useRef } from 'react';
import { 
  Settings, Megaphone, ChevronDown, Check, Zap, Globe, Cpu, 
  Menu, X, ArrowRight, Search, Sparkles, Send, ArrowLeft, 
  Briefcase, PenTool, Hammer, Target, Code, Table, Activity, BarChart, ExternalLink
} from 'lucide-react';

// --- MICRODATA (SCHEMA.ORG) GENERATOR ---
const generateMicrodata = (page, data, faqData) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AI PRO",
    "url": "https://ai-pro-agency.com",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://t.me/belarus_google_gemini_3"
    }
  };

  if (page === 'faq' && faqData) {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.flatMap(cat => cat.questions.map(q => ({
        "@type": "Question",
        "name": q.q,
        "acceptedAnswer": { "@type": "Answer", "text": q.a }
      })))
    });
  }
  
  if (page === 'article-detail' && data) {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": data.title,
      "description": data.desc,
      "author": { "@type": "Organization", "name": "AI PRO" }
    });
  }

  if ((page === 'service-detail' || page === 'subscription-detail') && data) {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": data.title,
      "description": data.desc || "Премиальная AI-услуга"
    });
  }
  return JSON.stringify(baseSchema);
};

// --- CUSTOM CSS FOR 3D GOLD & ANIMATIONS ---
const customStyles = `
  @keyframes gold-shine-smooth {
    0% { background-position: 200% center; }
    100% { background-position: -200% center; }
  }
  @keyframes strict-float {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-12px) scale(1.01); }
  }
  @keyframes pulse-glow {
    0% { box-shadow: 0 0 15px rgba(234, 179, 8, 0.3), inset 0 0 10px rgba(234, 179, 8, 0.1); }
    50% { box-shadow: 0 0 35px rgba(234, 179, 8, 0.7), inset 0 0 20px rgba(234, 179, 8, 0.3); }
    100% { box-shadow: 0 0 15px rgba(234, 179, 8, 0.3), inset 0 0 10px rgba(234, 179, 8, 0.1); }
  }
  .gold-text-smooth {
    background: linear-gradient(110deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    color: transparent;
    animation: gold-shine-smooth 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  .pro-text-special {
    color: #000;
    -webkit-text-stroke: 1.5px #d4af37;
    position: relative;
    display: inline-block;
  }
  .pro-text-special::before {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(110deg, transparent 0%, rgba(252, 246, 186, 0.6) 50%, transparent 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    color: transparent;
    animation: gold-shine-smooth 4s linear infinite;
    -webkit-text-stroke: 0;
    pointer-events: none;
  }
  .gold-border-3d {
    background: #000;
    border: 2px solid #d4af37;
    border-radius: 16px;
    box-shadow: 0 0 15px rgba(212, 175, 55, 0.3), inset 0 0 10px rgba(212, 175, 55, 0.2), 0 4px 6px rgba(0,0,0,0.5);
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
  }
  .gold-border-3d::before {
    content: '';
    position: absolute;
    top: -50%; left: -50%; width: 200%; height: 200%;
    background: linear-gradient(45deg, transparent, rgba(252, 246, 186, 0.1), transparent);
    transform: rotate(45deg);
    transition: all 0.5s ease;
    pointer-events: none;
  }
  .gold-border-3d:hover {
    transform: scale(1.02) translateY(-4px);
    box-shadow: 0 0 25px rgba(212, 175, 55, 0.5), inset 0 0 15px rgba(212, 175, 55, 0.3), 0 10px 20px rgba(0,0,0,0.8);
    border-color: #fcf6ba;
  }
  .gold-border-3d:hover::before {
    left: 100%;
  }
  .promo-block {
    animation: pulse-glow 4s infinite;
  }
  .ai-pro-anim {
    animation: strict-float 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  .bg-premium-dark {
    background-color: #030303;
    background-image: radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.12) 0%, rgba(0, 0, 0, 1) 70%);
  }
  .reveal-wrapper {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal-wrapper.is-visible {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const TG_LINK = "https://t.me/belarus_google_gemini_3";

// --- ORIGINAL AI ICONS (SVG) - NON CLICKABLE ---
const OriginalIcons = {
  // Обновленный логотип ChatGPT (цветок) - Абсолютно белый
  ChatGPT: () => (
    <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8 transition-transform duration-300 hover:scale-110">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A6.0651 6.0651 0 0 0 19.02 19.8182a5.9847 5.9847 0 0 0 3.9977-2.9 6.0462 6.0462 0 0 0-.7358-7.0971ZM13.0645 20.4727a4.484 4.484 0 0 1-2.876-1.0408l4.7797-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.3544 4.414ZM4.54 14.283a4.484 4.484 0 0 1-.5274-3.006l4.7797 2.7582a.7948.7948 0 0 0 .7854 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L5.6425 18.683a4.504 4.504 0 0 1-1.1025-4.4ZM2.8556 8.3582a4.484 4.484 0 0 1 2.3486-1.9649v6.7369a.7948.7948 0 0 0 .3927.6813l5.8143 3.352-2.02 1.1686a.071.071 0 0 1-.0712.001L3.5752 14.88a4.504 4.504 0 0 1-.7196-6.5218ZM10.9355 3.5273a4.484 4.484 0 0 1 2.876 1.0408L9.0318 7.3263a.7948.7948 0 0 0-.3927.6813v6.7369L6.619 13.576a.071.071 0 0 1-.038-.052V7.9414a4.504 4.504 0 0 1 4.3545-4.4141Zm8.5245 5.244-4.7797-2.7582a.7948.7948 0 0 0-.7854 0L8.052 9.3816V7.0492a.0804.0804 0 0 1 .0332-.0615l5.7448-3.3152a4.504 4.504 0 0 1 5.6294 6.1Zm-1.1942 6.5516a4.484 4.484 0 0 1-2.3486 1.9649V10.551a.7948.7948 0 0 0-.3927-.6813l-5.8143-3.352 2.02-1.1686a.071.071 0 0 1 .0712-.001l5.7448 3.3153a4.504 4.504 0 0 1 .7196 6.5218ZM12 14.281a2.6322 2.6322 0 1 1 0-5.2644 2.6322 2.6322 0 0 1 0 5.2644Z"/>
    </svg>
  ),
  Apple: () => (
    <svg viewBox="0 0 384 512" fill="white" className="w-8 h-8 transition-transform duration-300 hover:scale-110">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
    </svg>
  ),
  Gemini: () => (
    <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8 transition-transform duration-300 hover:scale-110">
      <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0ZM5 16C5 18.209 6.791 20 9 20C6.791 20 5 21.791 5 24C5 21.791 3.209 20 1 20C3.209 20 5 18.209 5 16Z"/>
    </svg>
  ),
  // Обновленный логотип Microsoft Copilot (лента) - Абсолютно белый
  Copilot: () => (
    <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8 transition-transform duration-300 hover:scale-110">
      <path d="M11.513 1.942a10.15 10.15 0 0 0-4.321 1.34c-2.31 1.32-3.79 3.518-4.88 5.76-1.077 2.217-1.748 4.606-1.037 7.027.674 2.298 2.28 4.316 4.417 5.372 2.128 1.052 4.698 1.09 6.945.318 2.378-.818 4.41-2.483 5.753-4.57 1.354-2.105 2.148-4.664 1.745-7.14-.388-2.383-1.802-4.498-3.796-5.87-1.425-.98-3.08-1.558-4.826-1.706V4.31c1.393.11 2.72.636 3.84 1.48 1.455 1.09 2.505 2.693 2.804 4.5.308 1.867-.272 3.84-1.282 5.412a9.664 9.664 0 0 1-4.225 3.393c-1.688.666-3.66.702-5.32-.065-1.603-.736-2.825-2.16-3.35-3.837-.546-1.74-.01-3.645.744-5.203.774-1.597 1.92-2.983 3.44-3.85 1.018-.58 2.203-.896 3.407-.896V1.942z"/>
      <path d="M12.487 22.058a10.15 10.15 0 0 0 4.321-1.34c2.31-1.32 3.79-3.518 4.88-5.76 1.077-2.217 1.748-4.606 1.037-7.027-.674-2.298-2.28-4.316-4.417-5.372-2.128-1.052-4.698-1.09-6.945-.318-2.378.818-4.41 2.483-5.753 4.57-1.354 2.105-2.148 4.664-1.745 7.14.388 2.383 1.802 4.498 3.796 5.87 1.425.98 3.08 1.558 4.826 1.706v-1.837c-1.393-.11-2.72-.636-3.84-1.48-1.455-1.09-2.505-2.693-2.804-4.5-.308-1.867.272-3.84 1.282-5.412a9.664 9.664 0 0 1 4.225-3.393c1.688-.666 3.66-.702 5.32.065 1.603.736 2.825 2.16 3.35 3.837.546 1.74.01 3.645-.744 5.203-.774 1.597-1.92 2.983-3.44 3.85-1.018.58-2.203.896-3.407.896v2.402z"/>
    </svg>
  )
};

const ScrollReveal = ({ children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal-wrapper ${isVisible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  );
};

// --- DATA ---
const USE_CASES = [
  { icon: Briefcase, title: 'Бизнесмены и Управленцы', desc: 'Автоматизация рутины, создание автономных ИИ-отделов продаж, предиктивная аналитика рынка и снижение издержек на персонал.' },
  { icon: PenTool, title: 'Дизайнеры и Креативщики', desc: 'Генерация потрясающих концептов за секунды, создание бесконечного числа рекламных креативов и 3D-моделей под ЦА.' },
  { icon: Hammer, title: 'Строители и Архитекторы', desc: 'Интеллектуальная оптимизация смет, анализ чертежей с помощью машинного зрения и генерация планировок с идеальным расчетом инсоляции.' },
  { icon: Target, title: 'Маркетологи', desc: 'Сверхточный ИИ-таргетинг, предсказание поведения пользователей и генерация тысяч уникальных объявлений под каждый микросегмент.' },
  { icon: Code, title: 'IT и Разработчики', desc: 'Написание и рефакторинг кода в реальном времени, автоматический поиск уязвимостей и ускорение релизов продуктов.' }
];

const SERVICES_DATA = [
  { id: 'seo', title: 'SEO & GEO (Engine)', icon: Search, desc: 'Глобальное доминирование в поисковой выдаче. Вывод в ТОП по целевым гео-локациям с использованием Google Gemini AI 3 Ultra.' },
  { id: 'sge', title: 'SGE (Search Generative Experience)', icon: Zap, desc: 'Оптимизация под генеративную выдачу. Ваш бренд в прямых ответах максимальных версий ИИ-поисковиков.' },
  { id: 'llm', title: 'LLM Интеграции', icon: Cpu, desc: 'Внедрение максимальных языковых моделей в бизнес-процессы для абсолютной автоматизации продаж и коммуникаций.' },
];

const SUBSCRIPTIONS_DATA = [
  { id: 'gemini', title: 'Google Gemini AI 3 Ultra', icon: OriginalIcons.Gemini, desc: 'Максимальная версия нейросети от Google. Глубокий анализ данных, генерация сложного кода, написание креативных текстов и работа с визуалом на беспрецедентном уровне. Идеально для масштабирования бизнеса.' },
  { id: 'chatgpt', title: 'ChatGPT Plus / Pro', icon: OriginalIcons.ChatGPT, desc: 'Передовая языковая модель от OpenAI с доступом к плагинам и анализу данных. Идеально для автоматизации рутины, создания рекламных креативов и глубокого аналитического ресерча.' },
  { id: 'apple', title: 'Apple Intelligence', icon: OriginalIcons.Apple, desc: 'Глубокая системная интеграция ИИ в экосистему Apple. Бесшовное взаимодействие между устройствами, улучшенная работа с почтой и документами, максимальная приватность корпоративных данных.' },
  { id: 'copilot', title: 'Microsoft Copilot Pro', icon: OriginalIcons.Copilot, desc: 'Ваш ИИ-ассистент, встроенный напрямую в экосистему Microsoft 365. Автоматизация Excel-таблиц, генерация драфтов в Word и создание профессиональных презентаций в PowerPoint за считанные секунды.' }
];

const FAQ_DATA = [
  {
    category: "Стратегия, Внедрение и Лидогенерация",
    questions: [
      { q: "Как Google Gemini AI 3 Ultra гарантированно масштабирует мой проект?", a: "Мы используем максимальные версии моделей. ИИ-агенты глубоко анализируют паттерны поведения вашей аудитории в реальном времени. Нейросеть генерирует гипер-персонализированные предложения, которые бьют точно в боль клиента. Это обеспечивает непрерывный поток качественных лидов и многократный рост конверсии по сравнению с классическим маркетингом." },
      { q: "Насколько сложно интегрировать ИИ в уже существующий бизнес?", a: "Мы берем весь процесс под ключ. Как опытные профессионалы, мы настраиваем связки между вашей CRM, рекламными кабинетами и мощностями Google Gemini AI 3 Ultra. Внедрение проходит бесшовно для ваших текущих процессов. ИИ сразу начинает квалифицировать лиды, вести социальные сети и управлять рекламными бюджетами." },
      { q: "Сможет ли ИИ полностью вести мои социальные сети (SMM)?", a: "Абсолютно. Максимальные модели анализируют тренды, генерируют контент-планы, пишут вовлекающие посты, создают визуальные креативы и даже общаются с аудиторией в комментариях, сохраняя ваш уникальный Tone of Voice (голос бренда)." }
    ]
  },
  {
    category: "Трафик, Реклама и GEO",
    questions: [
      { q: "В чем отличие вашей настройки рекламы от обычных агентств?", a: "Мы используем предиктивный анализ на базе Google Gemini AI 3 Ultra. Алгоритмы тестируют тысячи связок (креатив + текст + аудитория) одновременно. Нейросеть сама отключает неэффективные объявления и перераспределяет бюджет на те микросегменты, которые приносят самых дешевых лидов. Мы настраиваем рекламу в Telegram, Google, Yandex, Instagram, Tik Tok и Threads с математической точностью." },
      { q: "Зачем мне мобильное приложение или Landing Page с ИИ?", a: "Пользователь стал требовательным. Обычный сайт больше не продает. Мы создаем умные Landing Page с динамическими формами, ИИ-калькуляторами и смарт-базами, которые адаптируются под каждого конкретного посетителя в ту же секунду, когда он открывает страницу. Это максимизирует ROI." },
      { q: "Что такое GEO и почему классическое SEO проигрывает?", a: "Пользователи перешли на умный поиск. GEO (Generative Engine Optimization) делает так, чтобы максимальные языковые модели сами рекомендовали ваш продукт в своих ответах. Мы выстраиваем архитектуру ваших ресурсов так, чтобы алгоритмы считали вас абсолютным авторитетом в нише." }
    ]
  },
  {
    category: "Модели, Подписки и Портфолио",
    questions: [
      { q: "Какие модели ИИ вы используете и можно ли купить подписку?", a: "Мы работаем исключительно с максимальными версиями: Google Gemini AI 3 Ultra, расширенными версиями ChatGPT и Apple Intelligence. Да, у нас в продаже есть официальные подписки на 1 год, обеспечивающие бесперебойный доступ к этим мощностям для вашей команды." },
      { q: "Есть ли у вас реальные кейсы и портфолио?", a: "Да, у нас мощный бэкграунд. IT и маркетинг — проекты любой сложности под ключ. Мы реализуем проекты от идеи до генерации лидов. Вы можете ознакомиться с нашими работами в блоке 'Наши Проекты' на главной странице. Не верите? Проверьте!" },
      { q: "Насколько безопасны данные моего бизнеса при работе с ИИ?", a: "Максимальные корпоративные версии моделей изолируют контур данных. Вся информация, клиентские базы и финансовые метрики используются исключительно для обучения вашей локальной модели и не передаются в глобальные системы." }
    ]
  }
];

const BLOG_POSTS = [
  { id: 1, tag: 'Таргет & ИИ', title: 'Настройка рекламы: Telegram, Google, Yandex, Instagram, Tik Tok, Threads на базе AI', desc: 'Ультимативный гайд о том, как Google Gemini AI 3 Ultra снижает стоимость лида. Забудьте про ручные A/B тесты — алгоритм делает это за секунды.', date: '15.01.2026' },
  { id: 2, tag: 'Разработка', title: 'Сайты, мобильные приложения, landing page (с формами, калькуляторами, базами)', desc: 'Интеграция предиктивных алгоритмов в веб-разработку. Как умные калькуляторы и динамические формы увеличивают конверсию в 3 раза.', date: '02.02.2026' },
  { id: 3, tag: 'SMM', title: 'SMM и ведение любых социальных сетей с помощью максимальных нейросетей', desc: 'Как мы создаем бесконечный поток контента, который реально продает, используя связки визуальных и текстовых ИИ-моделей.', date: '20.02.2026' },
  { id: 4, tag: 'Кейсы', title: 'Наши проекты от идеи до лидов: разбор архитектуры', desc: 'Как мы запускаем IT и маркетинг проекты любой сложности под ключ. Глубокий разбор механик генерации лидов.', date: '05.03.2026' },
  { id: 5, tag: 'GEO', title: 'Глобальное доминирование: как ИИ изменил правила поисковой выдачи', desc: 'Практическое руководство по адаптации брендов к ответам генеративных сетей.', date: '18.03.2026' },
  { id: 6, tag: 'Модели', title: 'Почему бизнесу нужен именно Google Gemini AI 3 Ultra?', desc: 'Сравнительный анализ максимальных версий моделей. Выбираем лучший интеллект для корпоративных задач.', date: '01.04.2026' }
];

export default function App() {
  const [currentView, setCurrentView] = useState({ id: 'home', data: null });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView.id]);

  const navLinks = [
    { id: 'home', label: 'Главная' },
    { id: 'services', label: 'Услуги & Технологии' },
    { id: 'subscriptions', label: 'AI Подписки' },
    { id: 'faq', label: 'База Знаний' },
    { id: 'blog', label: 'Блог' },
  ];

  const navigateTo = (id, data = null) => {
    setCurrentView({ id, data });
    setIsMobileMenuOpen(false);
  };

  const TopLogo = () => (
    <div className="flex items-center cursor-pointer flex-shrink-0" onClick={() => navigateTo('home')}>
      <div className="text-3xl md:text-4xl font-black tracking-tighter flex items-center">
        <span className="gold-text-smooth">AI</span>
        <span className="ml-1 pro-text-special" data-text="PRO">PRO</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-premium-dark text-gray-200 font-sans selection:bg-yellow-500 selection:text-black overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: generateMicrodata(currentView.id, currentView.data, FAQ_DATA) }} />
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-yellow-600/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 w-full">
            <TopLogo />
            <div className="hidden md:flex flex-1 justify-center gap-10 items-center px-8">
              {navLinks.map((link) => (
                <button key={link.id} onClick={() => navigateTo(link.id)} className={`text-sm uppercase tracking-wider font-semibold transition-all duration-300 hover:text-yellow-400 whitespace-nowrap ${currentView.id === link.id ? 'gold-text-smooth scale-110' : 'text-gray-300'}`}>
                  {link.label}
                </button>
              ))}
            </div>
            <div className="hidden md:block flex-shrink-0">
              <a href={TG_LINK} target="_blank" rel="noreferrer" className="gold-border-3d px-6 py-2 text-yellow-400 font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:text-white">
                <Send className="w-4 h-4" /> Написать нам
              </a>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-yellow-500">
                {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
              </button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black border-b border-yellow-600/50 page-transition absolute w-full z-40">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <button key={link.id} onClick={() => navigateTo(link.id)} className="block w-full text-left px-3 py-4 text-base font-medium text-gray-300 hover:text-yellow-400 hover:bg-gray-900 uppercase border-b border-gray-800">
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[85vh]">
        
        {/* --- PAGE: HOME --- */}
        {currentView.id === 'home' && (
          <div className="space-y-32 mt-10">
            
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <ScrollReveal className="lg:w-1/2 space-y-6 relative z-10">
                <h1 className="text-5xl md:text-7xl font-black leading-tight">
                  <span className="gold-text-smooth">ВЕБ-САЙТЫ</span> И<br />
                  <span className="gold-text-smooth">ПРИЛОЖЕНИЯ</span>
                </h1>
                <p className="text-3xl md:text-4xl text-white font-bold">
                  для роста ваших продаж
                </p>
                <p className="text-xl md:text-2xl text-gray-300 font-light">
                  Используем мощь максимальных версий нейросетей для доминирования на рынке.
                </p>
                
                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <div className="flex items-center gap-2 p-2 rounded-lg">
                    <OriginalIcons.Gemini />
                    <span className="font-bold text-lg text-white">Google Gemini AI 3 Ultra</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg">
                    <OriginalIcons.ChatGPT />
                    <span className="font-bold text-lg text-white">ChatGPT</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg">
                    <OriginalIcons.Apple />
                    <span className="font-bold text-lg text-white">Apple Intelligence</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg">
                    <OriginalIcons.Copilot />
                    <span className="font-bold text-lg text-white">Microsoft Copilot</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-8">
                  <button onClick={() => navigateTo('services')} className="gold-border-3d px-8 py-4 text-lg font-bold uppercase tracking-wider text-white hover:text-yellow-200">
                    Наши Решения
                  </button>
                  <a href={TG_LINK} target="_blank" rel="noreferrer" className="px-8 py-4 text-lg font-bold uppercase tracking-wider text-black bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 rounded-xl hover:scale-105 transition-transform flex justify-center items-center gap-2 text-center shadow-[0_0_20px_rgba(234,179,8,0.5)]">
                    <Send className="w-5 h-5"/> Написать в Telegram
                  </a>
                </div>
              </ScrollReveal>

              {/* Animated AI PRO Logo */}
              <ScrollReveal className="lg:w-1/2 relative flex justify-start items-center">
                <div className="absolute w-[400px] h-[400px] bg-yellow-600/10 blur-[150px] rounded-full pointer-events-none"></div>
                <div className="text-[7rem] md:text-[10rem] lg:text-[11rem] xl:text-[12rem] font-black leading-none relative z-10 select-none flex ai-pro-anim">
                  <span className="gold-text-smooth drop-shadow-[0_0_30px_rgba(234,179,8,0.2)]">AI</span>
                  <span className="ml-2 pro-text-special drop-shadow-[0_0_30px_rgba(234,179,8,0.2)]" data-text="PRO">PRO</span>
                </div>
              </ScrollReveal>
            </div>

            {/* NEW PORTFOLIO / ABOUT US SECTION */}
            <ScrollReveal>
              <div className="gold-border-3d p-10 md:p-16 bg-black/90 my-16 relative z-20">
                <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-8">
                  <span className="gold-text-smooth">Портфолио:</span> Наши Проекты
                </h2>
                <div className="text-lg md:text-xl text-gray-300 space-y-6 leading-relaxed">
                   <p>IT и маркетинг — проекты любой сложности под ключ. Мы создаем рекламные проекты от идеи до лидов на базе <strong>Google Gemini AI 3 Ultra</strong> (также в продаже есть подписки на 1 год).</p>
                   
                   <ul className="list-none space-y-4 text-white font-bold my-8 bg-yellow-900/10 p-8 rounded-2xl border border-yellow-600/30">
                     <li className="flex items-start gap-3"><StarIcon /> Сайты, мобильные приложения, landing page (с формами, калькуляторами, базами)</li>
                     <li className="flex items-start gap-3"><StarIcon /> SMM и ведение любых социальных сетей</li>
                     <li className="flex items-start gap-3"><StarIcon /> Настройка рекламы: Telegram, Google, Yandex, Instagram, Tik Tok, Threads</li>
                   </ul>

                   <p className="font-bold text-2xl text-white mt-12 mb-6">Ознакомьтесь с нашими кейсами:</p>
                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                     <PortfolioLink href="https://www.dveripro.by" name="Двери ПРО (Сайт)" />
                     <PortfolioLink href="https://www.instagram.com/dveri_yurkas_minsk" name="Yurkas (Instagram)" />
                     <PortfolioLink href="https://www.instagram.com/google_gemini_ai_3_official" name="AI PRO (Instagram)" />
                     <PortfolioLink href="https://www.tiktok.com/@alina_google_gemini_ai" name="AI PRO (TikTok)" />
                     <PortfolioLink href="https://t.me/belarus_google_gemini_3" name="AI PRO (Telegram)" />
                     <PortfolioLink href="https://www.vpl.by" name="VPL (Сайт)" />
                     <PortfolioLink href="https://www.instagram.com/vitrinaplus/" name="Витрина Плюс (Instagram)" />
                     <PortfolioLink href="https://www.tiktok.com/@vpl.by" name="VPL (TikTok)" />
                   </div>

                   <div className="mt-16 text-center border-t border-yellow-600/30 pt-10">
                     <p className="text-3xl font-black gold-text-smooth mb-4">Мы готовы сделать лучшее ценовое предложение во всех сегментах.</p>
                     <p className="text-2xl text-white mb-8">Не верите? — Проверьте!</p>
                     <a href={TG_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 px-8 py-5 text-xl font-bold uppercase tracking-wider text-black bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-xl hover:scale-105 transition-transform shadow-[0_0_25px_rgba(234,179,8,0.5)]">
                       <Send className="w-6 h-6" /> Написать менеджеру в Telegram
                     </a>
                   </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Promo Banner (Strictly customized) */}
            <ScrollReveal>
              <div className="promo-block gold-border-3d p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/50 backdrop-blur-sm relative z-20">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold uppercase">Премиум доступ на <br/><span className="gold-text-smooth">максимальные модели</span></h2>
                  <p className="text-xl text-gray-300">Google Gemini AI 3 Ultra, ChatGPT, Apple Intelligence и Copilot к вашим услугам.</p>
                  <div className="flex items-center gap-4 mt-6">
                    <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 px-4 py-2 rounded-lg font-mono text-xl border border-yellow-500 text-black font-bold">ПРОМОКОД:</div>
                    <div className="text-4xl font-black gold-text-smooth tracking-widest">M5 PRO</div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-full md:w-auto">
                  <button onClick={() => navigateTo('service-detail', { 
                      title: 'ПРОФЕССИОНАЛЬНАЯ НАСТРОЙКА РЕКЛАМЫ', 
                      desc: 'Ультимативное руководство по запуску умной рекламы. Мы не просто настраиваем таргет — мы внедряем Google Gemini AI 3 Ultra для глубокого предиктивного анализа аудитории. Нейросети тестируют сотни креативов одновременно, выявляют самые конверсионные связки и направляют бюджет только туда, где есть максимальная вероятность лида. Это полностью исключает слив бюджета на нецелевые клики. Мы работаем с Telegram, Google, Yandex, Instagram, Tik Tok, Threads — настраивая омниканальные воронки, которые догоняют клиента везде, снижая итоговую стоимость заявки в несколько раз.',
                      icon: Settings 
                    })} className="gold-border-3d p-4 flex items-center gap-5 bg-black hover:bg-gray-900 w-full text-left transition-colors cursor-pointer group">
                    <Settings className="w-8 h-8 text-yellow-500 group-hover:rotate-90 transition-transform" />
                    <span className="font-bold text-xl uppercase text-white group-hover:text-yellow-400">Настройка рекламы</span>
                  </button>
                  <button onClick={() => navigateTo('service-detail', { 
                      title: 'РЕКЛАМА ВО ВСЕХ ADS СЕРВИСАХ', 
                      desc: 'Масштабирование бизнеса требует присутствия на всех площадках. Мы берем под контроль рекламные кабинеты Google, Yandex, Instagram, TikTok, Threads и Telegram. Единый интеллектуальный центр управления на базе максимальных моделей ИИ распределяет бюджеты между платформами в режиме реального времени. Если сегодня лиды дешевле в TikTok, бюджет мгновенно перетекает туда. Завтра тренд меняется на Google — ИИ реагирует за миллисекунды. Вы получаете не просто клики, а готовую прогнозируемую систему генерации лидов (LeadGen) под ключ.',
                      icon: Megaphone 
                    })} className="gold-border-3d p-4 flex items-center gap-5 bg-black hover:bg-gray-900 w-full text-left transition-colors cursor-pointer group">
                    <Megaphone className="w-8 h-8 text-yellow-500 group-hover:scale-110 transition-transform" />
                    <span className="font-bold text-xl uppercase text-white group-hover:text-yellow-400">Реклама во всех ADS</span>
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Animated Block: Ads Workflow */}
            <ScrollReveal>
              <div className="bg-gradient-to-b from-yellow-900/10 to-black p-10 rounded-3xl border border-yellow-600/20 text-center">
                <h2 className="text-4xl font-black uppercase tracking-wide mb-12">
                  Интеллектуальная настройка <span className="gold-text-smooth">Рекламы</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                   <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-1 bg-yellow-600/30 -translate-y-1/2 z-0"></div>
                   <div className="bg-black gold-border-3d p-8 relative z-10 hover:scale-110 transition-transform">
                     <Activity className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                     <h3 className="text-xl font-bold text-white mb-2 uppercase">1. Предиктивный Анализ</h3>
                     <p className="text-gray-400">ИИ анализирует вашу нишу и находит скрытые микросегменты аудитории.</p>
                   </div>
                   <div className="bg-black gold-border-3d p-8 relative z-10 hover:scale-110 transition-transform">
                     <Cpu className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                     <h3 className="text-xl font-bold text-white mb-2 uppercase">2. AI-Генерация</h3>
                     <p className="text-gray-400">Создание сотен креативов и продающих текстов под каждый сегмент автоматически.</p>
                   </div>
                   <div className="bg-black gold-border-3d p-8 relative z-10 hover:scale-110 transition-transform">
                     <BarChart className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                     <h3 className="text-xl font-bold text-white mb-2 uppercase">3. Авто-Оптимизация</h3>
                     <p className="text-gray-400">Снижение стоимости лида в реальном времени за счет машинного обучения.</p>
                   </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Section: Use Cases (Professions) */}
            <ScrollReveal>
              <div className="text-center max-w-4xl mx-auto space-y-6 mb-12">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wide">
                  Для кого работает <span className="gold-text-smooth">AI PRO?</span>
                </h2>
                <p className="text-xl text-gray-400">Нейросети — это не игрушка, это ваш новый самый эффективный инструмент.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {USE_CASES.map((useCase, idx) => (
                  <div key={idx} className="gold-border-3d p-8 bg-black/60 group hover:bg-black transition-all">
                    <useCase.icon className="w-12 h-12 text-yellow-500 mb-6 group-hover:scale-125 transition-transform" />
                    <h3 className="text-2xl font-bold mb-3 text-white uppercase">{useCase.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{useCase.desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        )}

        {/* --- PAGE: SERVICES --- */}
        {currentView.id === 'services' && (
          <div className="space-y-12 mt-10">
            <ScrollReveal className="text-center max-w-3xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-wide flex justify-center items-center gap-4">
                <span className="gold-text-smooth">AI</span> <span className="pro-text-special" data-text="PRO">PRO</span> Технологии
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
              {SERVICES_DATA.map((service, idx) => (
                <ScrollReveal key={idx}>
                  <div className="gold-border-3d p-8 bg-black/80 flex flex-col h-full group">
                    <div className="mb-6 p-4 bg-yellow-900/20 inline-block rounded-2xl border border-yellow-600/30 group-hover:bg-yellow-600/20 transition-colors">
                      <service.icon className="w-12 h-12 text-yellow-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 uppercase text-white group-hover:text-yellow-400 transition-colors">{service.title}</h3>
                    <p className="text-gray-400 leading-relaxed flex-grow">{service.desc}</p>
                    <button onClick={() => navigateTo('service-detail', service)} className="mt-8 flex items-center text-yellow-500 font-semibold hover:text-yellow-300 group/btn">
                      Подробнее <ArrowRight className="ml-2 w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* --- PAGE: SUBSCRIPTIONS (AI Подписки) --- */}
        {currentView.id === 'subscriptions' && (
          <div className="space-y-12 mt-10">
            <ScrollReveal className="text-center max-w-4xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-wide flex justify-center items-center gap-4">
                <span className="gold-text-smooth">AI</span> <span className="pro-text-special" data-text="PRO">PRO</span> Подписки
              </h2>
              <p className="text-xl text-gray-400">Официальный доступ к максимальным версиям нейросетей на 1 год.</p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 max-w-5xl mx-auto">
              {SUBSCRIPTIONS_DATA.map((sub) => (
                <ScrollReveal key={sub.id}>
                  <div className="gold-border-3d p-8 bg-black/80 flex flex-col h-full group">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="p-4 bg-gray-900 rounded-xl border border-yellow-600/30">
                        <sub.icon />
                      </div>
                      <h3 className="text-2xl font-black text-white uppercase leading-tight group-hover:text-yellow-400 transition-colors">
                        {sub.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed flex-grow mb-8 text-lg font-light">
                      {sub.desc}
                    </p>
                    <a href={TG_LINK} target="_blank" rel="noreferrer" className="mt-auto w-full flex items-center justify-center gap-3 px-6 py-4 text-base font-bold uppercase tracking-wider text-black bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-xl hover:scale-105 transition-transform shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                      <Send className="w-5 h-5" /> Узнать тариф в Telegram
                    </a>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* --- PAGE: FAQ --- */}
        {currentView.id === 'faq' && (
          <div className="space-y-12 mt-10">
            <ScrollReveal className="text-center max-w-4xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-wide flex justify-center items-center gap-4">
                <span className="gold-text-smooth">AI</span> <span className="pro-text-special" data-text="PRO">PRO</span> База Знаний
              </h2>
              <p className="text-xl text-gray-400">Глубокие и исчерпывающие ответы о внедрении технологий.</p>
            </ScrollReveal>

            <div className="max-w-4xl mx-auto space-y-12 pt-8">
              {FAQ_DATA.map((category, catIdx) => (
                <ScrollReveal key={catIdx} className="space-y-4">
                  <h3 className="text-2xl font-bold gold-text-smooth uppercase mb-6 flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-yellow-500" /> {category.category}
                  </h3>
                  {category.questions.map((item, qIdx) => (
                    <FaqAccordion key={qIdx} question={item.q} answer={item.a} />
                  ))}
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* --- PAGE: BLOG --- */}
        {currentView.id === 'blog' && (
          <div className="space-y-12 mt-10">
            <ScrollReveal className="text-center max-w-4xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-wide flex justify-center items-center gap-4">
                <span className="gold-text-smooth">AI</span> <span className="pro-text-special" data-text="PRO">PRO</span> Блог
              </h2>
              <p className="text-xl text-gray-400">Эксклюзивные разборы механик, настройки рекламы и кейсы.</p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
              {BLOG_POSTS.map((post) => (
                <ScrollReveal key={post.id}>
                  <article onClick={() => navigateTo('article-detail', post)} className="gold-border-3d h-full bg-black p-8 group cursor-pointer flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <button 
                        type="button" 
                        onClick={(e) => e.stopPropagation()} 
                        className="bg-[#1a1400] text-yellow-500 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-yellow-600 shadow-[0_0_10px_rgba(234,179,8,0.15)] hover:bg-yellow-900/40 transition-colors"
                      >
                        {post.tag}
                      </button>
                      <span className="text-gray-500 text-sm">{post.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 mb-6 flex-grow">
                      {post.desc}
                    </p>
                    <div className="flex items-center text-yellow-500 font-semibold group-hover:translate-x-2 transition-transform mt-auto">
                      Читать статью <ArrowRight className="ml-2 w-5 h-5" />
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* --- DETAILED PAGES --- */}
        {/* Service Detail (Special Logic for SEO & GEO) */}
        {currentView.id === 'service-detail' && currentView.data && (
          <ScrollReveal className="space-y-12 mt-10 max-w-5xl mx-auto">
            <button onClick={() => navigateTo(currentView.data.id ? 'services' : 'home')} className="flex items-center text-yellow-500 hover:text-yellow-400 font-bold uppercase tracking-wider mb-8">
              <ArrowLeft className="w-5 h-5 mr-2" /> Вернуться назад
            </button>
            <div className="gold-border-3d p-6 md:p-12 bg-black/80">
              
              <div className="flex items-center gap-6 mb-8 border-b border-yellow-600/20 pb-8">
                 {currentView.data.icon ? <currentView.data.icon className="w-12 h-12 text-yellow-500 hidden md:block" /> : <Table className="w-12 h-12 text-yellow-500 hidden md:block" />}
                 <h2 className="text-3xl md:text-5xl font-black uppercase gold-text-smooth leading-tight">{currentView.data.title}</h2>
              </div>
              
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-10 font-light">
                {currentView.data.desc}
              </p>

              {currentView.data.id === 'seo' && (
                <div className="space-y-10">
                  <div className="bg-yellow-900/20 p-6 md:p-8 rounded-xl border-l-4 border-yellow-500">
                    <h3 className="text-2xl font-bold text-white mb-4">Что такое GEO?</h3>
                    <p className="text-lg text-gray-300">
                      GEO (Generative Engine Optimization) — это следующий шаг после SEO. Это оптимизация контента таким образом, чтобы искусственный интеллект замечал его, доверял ему и использовал ваш бренд в своих прямых ответах пользователям.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="mt-12 p-8 border-t border-yellow-600/30 text-center">
                <p className="text-2xl font-bold text-white mb-6">Готовы масштабировать результат? Свяжитесь с нами прямо сейчас.</p>
                <a href={TG_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold uppercase tracking-wider text-black bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(234,179,8,0.5)]">
                  <Send className="w-5 h-5"/> Связаться в Telegram
                </a>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Article Detail */}
        {currentView.id === 'article-detail' && currentView.data && (
          <ScrollReveal className="space-y-12 mt-10 max-w-4xl mx-auto">
            <button onClick={() => navigateTo('blog')} className="flex items-center text-yellow-500 hover:text-yellow-400 font-bold uppercase tracking-wider mb-8">
              <ArrowLeft className="w-5 h-5 mr-2" /> Все статьи
            </button>
            <article className="gold-border-3d p-8 md:p-12 bg-black/80">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-yellow-600/20">
                <button 
                  type="button" 
                  className="bg-[#1a1400] text-yellow-500 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider border border-yellow-600 shadow-[0_0_15px_rgba(234,179,8,0.15)] cursor-default"
                >
                  {currentView.data.tag}
                </button>
                <span className="text-gray-500 text-sm font-mono">{currentView.data.date}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">{currentView.data.title}</h1>
              <p className="text-2xl text-yellow-500 font-bold mb-10 border-l-4 border-yellow-500 pl-6">{currentView.data.desc}</p>
              
              <div className="text-gray-300 space-y-6 text-lg font-light leading-relaxed">
                <p>Мы опытные профессионалы. IT и маркетинг — проекты любой сложности под ключ. Интеграция максимальных версий LLM в веб-разработку и рекламу позволяет бизнесу сократить издержки и увеличить конверсию. Создавая рекламные проекты от идеи до лидов на базе Google Gemini AI 3 Ultra, мы исключаем фактор человеческой ошибки.</p>
                <div className="bg-black border border-yellow-600/30 p-6 rounded-lg my-8">
                  <h4 className="font-bold text-white mb-2">Главный инсайт:</h4>
                  <p className="text-gray-400">Сайты, мобильные приложения, landing page (с формами, калькуляторами, базами), SMM и ведение любых социальных сетей — все это сегодня должно работать под управлением умных алгоритмов. Настройка рекламы: Telegram, Google, Yandex, Instagram, Tik Tok, Threads должна быть омниканальной.</p>
                </div>
                <p>Мы готовы сделать лучшее ценовое предложение во всех сегментах. Не верите? Проверьте! Свяжитесь с нами.</p>
                <div className="pt-8">
                  <a href={TG_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 px-6 py-3 text-base font-bold uppercase tracking-wider text-black bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-xl hover:scale-105 transition-transform">
                    <Send className="w-5 h-5"/> Связаться в Telegram
                  </a>
                </div>
              </div>
            </article>
          </ScrollReveal>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-yellow-600/30 bg-black pt-16 pb-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="space-y-4">
              <TopLogo />
              <p className="text-gray-400 mt-4">Премиальная разработка и умная реклама от идеи до генерации лидов.</p>
              <a href={TG_LINK} target="_blank" rel="noreferrer" className="text-yellow-500 hover:text-yellow-400 font-bold mt-4 flex items-center justify-center md:justify-start gap-2">
                <Send className="w-4 h-4"/> Написать в Telegram
              </a>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            © 2026 AI PRO. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helpers
const StarIcon = () => <Star className="w-6 h-6 text-yellow-500 shrink-0" fill="currentColor" />;
const Star = ({ className, fill }) => (
  <svg viewBox="0 0 24 24" fill={fill || "none"} stroke="currentColor" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
// Обновленный компонент портфолио
const PortfolioLink = ({ href, name }) => (
  <a href={href} target="_blank" rel="noreferrer" className="flex items-center justify-center p-4 bg-gradient-to-r from-yellow-700/20 to-yellow-900/20 border border-yellow-600/50 rounded-xl hover:scale-105 hover:bg-yellow-600/30 hover:border-yellow-400 transition-all shadow-[0_0_15px_rgba(234,179,8,0.1)] group text-center min-h-[80px]">
    <span className="text-white font-bold tracking-wide group-hover:text-yellow-400 transition-colors flex items-center gap-2">
      {name} <ExternalLink className="w-4 h-4 text-yellow-600 group-hover:text-yellow-400 opacity-50 group-hover:opacity-100" />
    </span>
  </a>
);

function FaqAccordion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="gold-border-3d bg-black overflow-hidden transition-all duration-300 mb-4">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left p-6 flex justify-between items-center bg-black hover:bg-gray-900 focus:outline-none group">
        <span className="text-lg md:text-xl font-bold text-white pr-4 group-hover:text-yellow-400 transition-colors">{question}</span>
        <ChevronDown className={`w-6 h-6 text-yellow-500 shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-6 pt-0 text-gray-300 border-t border-yellow-600/20 mt-2 bg-gradient-to-b from-gray-900 to-black text-lg leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}