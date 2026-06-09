import React, { useState, useEffect, useRef } from 'react';
import { 
  Settings, Megaphone, ChevronDown, Check, Zap, Globe, Cpu, 
  Menu, X, ArrowRight, Search, Sparkles, Send, ArrowLeft, 
  Briefcase, PenTool, Hammer, Target, Code, Table, Activity, BarChart, ExternalLink
} from 'lucide-react';

// --- HELPERS & COMPONENTS ---
const Star = ({ className, fill }) => (
  <svg viewBox="0 0 24 24" fill={fill || "none"} stroke="currentColor" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const StarIcon = () => <Star className="w-6 h-6 text-yellow-500 shrink-0" fill="currentColor" />;

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
const AiPartnersGrid = () => (
  <div className="grid grid-cols-2 gap-8 items-center justify-items-center max-w-lg mx-auto py-8">
    <img src="/logos/google-gemini.png" alt="Google Gemini AI 3 Ultra" className="h-10 object-contain hover:opacity-80 transition-opacity" />
    <img src="/logos/chatgpt.png" alt="ChatGPT" className="h-10 object-contain hover:opacity-80 transition-opacity" />
    <img src="/logos/apple.png" alt="Apple Intelligence" className="h-10 object-contain hover:opacity-80 transition-opacity" />
    <img src="/logos/microsoft-copilot.png" alt="Microsoft Copilot" className="h-10 object-contain hover:opacity-80 transition-opacity" />
  </div>
);
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
      {/* ОСНОВНОЙ КОНТЕНТ */}
  <main className="pt-20">
  {currentView.id === 'home' && (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-2 gap-8 items-center justify-items-center max-w-lg mx-auto py-8">
        <img src="/logos/google-gemini.png" alt="Google Gemini" className="h-10 object-contain" />
        <img src="/logos/chatgpt.png" alt="ChatGPT" className="h-10 object-contain" />
<main>
  {isConsultantOpen && (
    <div className="container">
      <div className="flex">
        <img src="/logos/apple.png" alt="Apple" className="h-10 object-contain" />
        <img src="/logos/microsoft-copilot.png" alt="Copilot" className="h-10 object-contain" />
      </div>
    </div>
  )}
</main>