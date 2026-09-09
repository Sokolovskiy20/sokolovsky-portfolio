export const projectsData = [
  {
    id: "amazonia",
    key: "amazonia",
    title: "MAIRA",
    category: "expedition",
    badge: "Quiet Luxury • AI-Augmented Product Design",
    year: "2025",
    yearTag: "МАИРА · 2026",
    liveUrl: "https://maira-amazonia.vercel.app/",
    heroImage: "/assets/amazonia/user_hero_screen.png",
    videoUrl: "/assets/amazonia/hero.mp4",
    previewImages: [
      "/assets/amazonia/maira_cinematic_hero.png",
      "/assets/amazonia/jungle_lodge.jpg",
      "/assets/amazonia/haven_silence_hq.jpg",
      "/assets/amazonia/haven_water_fall.jpg"
    ],
    caseStudy: {
      hero: {
        badge: "Case Study · Design Engineering",
        title: "MAIRA",
        subtitle: "Проєктування та розробка вебпростору для приватної 10-денної експедиції в Амазонію: поєднання естетики Quiet Luxury, 10 інтерактивних днів та AI-оркестрованої інженерії.",
        heroImage: "/assets/amazonia/user_hero_screen.png",
        caption: "MAIRA Amazonia · 10 Days in the Amazon",
        pillTag: "МАИРА · 2026"
      },
      problemSolution: {
        sectionNum: "01 / Головна проблема та рішення",
        sectionTitle: "Виклик бізнесу та дизайн-інженерне рішення",
        problem: {
          tag: "01 · Головна проблема ринку",
          title: "Агресивний e-commerce не продає експедицію за $14,900",
          desc: "Типові туристичні сайти з банерами знижок, перевантаженими каталогами та кошиками бронювання створюють стрес і руйнують довіру VIP-аудиторії, посилюючи страх перед невідомими умовами в дикій сельві."
        },
        solution: {
          tag: "02 · Наше рішення",
          title: "Простір Quiet Luxury: 10 днів у чистому фокусі",
          desc: "Спроєктовано вебпростір у філософії «спокійного люксу»: замість кошика — прямий контакт із персональним консьєржем, а замість шаблонності — структурована 10-денна хроніка з бездоганною 60 FPS фізикою."
        }
      },
      conceptErgonomics: {
        sectionNum: "02 / Концепт та ергономіка",
        sectionTitle: "Quiet Luxury та когнітивний баланс",
        cards: [
          {
            tag: "01 · Фокус замість шуму",
            title: "10 днів експедиції",
            desc: "Відмова від агресивного e-commerce. Замість безкінечного каталогу — структурована подорож, де кожен день сприймається як окрема завершена історія."
          },
          {
            tag: "02 · Мобільна ергономіка",
            title: "Thumb Zone & Hick's Law",
            desc: "72% переглядів відбуваються зі смартфона. Всі ключові дії розміщені в зоні великого пальця з тач-зонами від 48px для комфортної навігації однією рукою."
          },
          {
            tag: "03 · Психологія довіри",
            title: "Прозорість та спокій",
            desc: "Зняття тривожності щодо умов у джунглях через відкритий опис безпеки, супутникового зв'язку та прямий діалог із персональним консьєржем."
          }
        ]
      },
      designSystem: {
        sectionNum: "03 / Дизайн-система",
        sectionTitle: "Колірна палітра та шрифтова ієрархія",
        palette: [
          { name: "Obsidian Forest", hex: "#051A10", tag: "Canvas", role: "Головний фон та атмосфера нічної сельви", token: "--color-canvas-forest", rgb: "5, 26, 16", textDark: false },
          { name: "Deep Canopy", hex: "#1B4D3E", tag: "Brand", role: "Інтерактивні елементи та мікро-рамки", token: "--color-accent-emerald", rgb: "27, 77, 62", textDark: false },
          { name: "Mist Foliage", hex: "#3E7B5C", tag: "Glass", role: "Матове скло, суб-заголовки та теги", token: "--color-sage-border", rgb: "62, 123, 92", textDark: false },
          { name: "Alabaster Silk", hex: "#F6F5F2", tag: "Surface", role: "Світлий контрастний фон карток", token: "--color-canvas-light", rgb: "246, 245, 242", textDark: true }
        ],
        typography: [
          {
            tag: "Display Serif",
            font: "Cormorant Garamond",
            desc: "Едіторіал-заголовки, маніфест тиші та глянець високої моди."
          },
          {
            tag: "Interface Sans",
            font: "Inter",
            desc: "Описи подорожі, кнопки та навігація з бездоганним контрастом."
          },
          {
            tag: "Tech Mono",
            font: "JetBrains Mono",
            desc: "Координати сельви (03°08'S 60°01'W), таймкоди та дати заїздів."
          }
        ]
      },
      gallerySectionNum: "04 / Галерея інтерфейсу",
      gallery: [
        {
          url: "/assets/amazonia/canopy_mist_clean.jpg",
          caption: "Misty Rainforest Canopy Sanctuary"
        },
        {
          url: "/assets/amazonia/jungle_lodge.jpg",
          caption: "The Tree Canopy Private Lodge Experience"
        },
        {
          url: "/assets/amazonia/haven_water_fall.jpg",
          caption: "Pristine Sacred Waterfalls & Natural Baths"
        },
        {
          url: "/assets/amazonia/haven_stone.jpg",
          caption: "Natural Stone & River Sanctuary Architecture"
        },
        {
          url: "/assets/amazonia/manifesto.jpg",
          caption: "Quiet Luxury Editorial Manifesto"
        },
        {
          url: "/assets/amazonia/food_dish_new.jpg",
          caption: "Haute Amazonian Gastronomy for 8 Guests"
        }
      ],
      resultsAndLive: {
        sectionNum: "05 / Результат & Live",
        sectionTitle: "Підсумки та живий продукт",
        summary: {
          title1: "Підсумок розробки",
          desc1: "Спроєктовано та запущено повноцінний вебпростір без шаблонних рішень. Дисципліна токенів у Figma забезпечила бездоганну якість верстки та швидкість сайту.",
          title2: "Філософія дизайну",
          desc2: "Високий рівень дизайнера визначається не складністю декорацій, а вмінням відсікти все зайве та створити відчуття спокою й довіри для користувача."
        },
        liveExperience: {
          status: "Перевірити роботу наживо",
          urlDisplay: "maira-amazonia.vercel.app · Production Live Experience",
          url: "https://maira-amazonia.vercel.app/",
          btnText: "Відкрити сайт"
        }
      }
    }
  },
  {
    id: "aura",
    key: "aura",
    title: "AURA",
    category: "tech",
    badge: "Smart Living • AI Automation",
    year: "2026",
    yearTag: "AURA · 2026",
    liveUrl: "https://aura-smart.vercel.app/",
    heroImage: "/assets/aura/user_hero_screen.png",
    videoUrl: "",
    previewImages: [
      "/assets/aura/user_hero_screen.png",
      "/assets/aura/forest_hero_apple_1782971244210.jpg",
      "/assets/aura/skyline_hero_hq_1782971963536.jpg",
      "/assets/aura/azure_sunset_hq.jpg"
    ],
    caseStudy: {
      hero: {
        badge: "Case Study · Smart Living AI",
        title: "AURA",
        subtitle: "Проєктування та розробка вебпростору для преміального інтегратора систем «Розумний дім»: концепція прихованої інженерії, 24-годинні біодинамічні сценарії та глибока інтеграція екосистеми Apple & Matter.",
        heroImage: "/assets/aura/user_hero_screen.png",
        caption: "AURA · Forest Estate Country Residence",
        pillTag: "AURA · 2026"
      },
      problemSolution: {
        sectionNum: "01 / Головна проблема та рішення",
        sectionTitle: "Виклик бізнесу та дизайн-інженерне рішення",
        problem: {
          tag: "01 · Головна проблема ринку",
          title: "Технічний хаос із десятка додатків руйнує естетику маєтку",
          desc: "Традиційні підрядники продають клієнтам складні схеми автоматизації, через що преміальні інтер'єри обростають пластиковими пультами на стінах, а мешканці плутаються у несумісних додатках із затримками зв'язку."
        },
        solution: {
          tag: "02 · Наше рішення",
          title: "Прихована інженерія та єдиний Apple/Matter простір",
          desc: "Спроєктовано вебдосвід, де вся апаратна частина прихована в архітектурі будинку. Інтерфейс AURA дозволяє керувати світлом, кліматом та безпекою через єдиний дотик із субсекундним відгуком <120мс."
        }
      },
      conceptErgonomics: {
        sectionNum: "02 / Концепт та ергономіка",
        sectionTitle: "Архітектура невидимої інженерії",
        cards: [
          {
            tag: "01 · Невидимі датчики",
            title: "Чистота архітектури",
            desc: "Жодних пластикових коробів на стінах. Усі сенсори та термостати вмонтовані в меблі та декоративні стінові панелі."
          },
          {
            tag: "02 · Екосистема Matter",
            title: "Єдиний Apple-протокол",
            desc: "Пряме локальне керування без зовнішніх хмарних шлюзів. Миттєва синхронізація через iPhone, Apple Watch та iPad настінні станції."
          },
          {
            tag: "03 · Циркадний біоритм",
            title: "24h сценарії освітлення",
            desc: "Автоматична зміна спектру та колірної температури протягом доби для покращення якості сну та підтримки енергії мешканців."
          }
        ]
      },
      designSystem: {
        sectionNum: "03 / Дизайн-система",
        sectionTitle: "Колірна палітра та шрифтова ієрархія",
        palette: [
          { name: "OLED Obsidian", hex: "#08080A", tag: "Canvas", role: "Глибокий OLED-фон інтерфейсу без витоків світла", token: "--color-canvas-oled", rgb: "8, 8, 10", textDark: false },
          { name: "Carbon Slate", hex: "#16161D", tag: "Surface", role: "Bento-картки контролю клімату та освітлення", token: "--color-surface-carbon", rgb: "22, 22, 29", textDark: false },
          { name: "Luminous Amber", hex: "#E5C387", tag: "Glow", role: "Вечірній біодинамічний спектр та активні зони", token: "--color-accent-amber", rgb: "229, 195, 135", textDark: true },
          { name: "Apple Titanium", hex: "#F5F5F7", tag: "Hardware", role: "Типографіка з високим контрастом та апаратні грані", token: "--color-titanium-rim", rgb: "245, 245, 247", textDark: true }
        ],
        typography: [
          {
            tag: "Display Serif",
            font: "Playfair Display",
            desc: "Іміджеві заголовки резиденцій, статусний характер та спокій."
          },
          {
            tag: "Interface Sans",
            font: "Inter / SF Pro",
            desc: "Контролери клімату, віджети освітлення та системні слайдери."
          },
          {
            tag: "Tech Mono",
            font: "JetBrains Mono",
            desc: "IoT-телеметрія, стан мережі Matter v1.3 та латентність <120ms."
          }
        ]
      },
      gallerySectionNum: "04 / Галерея інтерфейсу",
      gallery: [
        {
          url: "/assets/aura/forest_hero_apple_1782971244210.jpg",
          caption: "Загородна резиденція Forest Estate — смарт-екосистема в сосновому лісі"
        },
        {
          url: "/assets/aura/forest_interior_hq_1782971398014.jpg",
          caption: "Чистий інтер'єр — повна відсутність видимих датчиків та пультів"
        },
        {
          url: "/assets/aura/skyline_hero_hq_1782971963536.jpg",
          caption: "Пентхаус AURA Skyline — інтелектуальне панорамне остеклення"
        },
        {
          url: "/assets/aura/azure_sunset_hq.jpg",
          caption: "Резиденція Azure Coast — вечірній бурштиновий сценарій релаксу"
        },
        {
          url: "/assets/aura/apple_light.jpg",
          caption: "Безшовна синергія з екосистемою Apple HomeKit & Matter"
        },
        {
          url: "/assets/aura/forest_night_hq_1782971535534.jpg",
          caption: "Нічний режим безпеки — активний лазерний периметр та моніторинг"
        }
      ],
      resultsAndLive: {
        sectionNum: "05 / Результат & Live",
        sectionTitle: "Підсумки та живий продукт",
        summary: {
          title1: "Підсумок розробки",
          desc1: "Створено цифровий простір, який продає не апаратне залізо, а відчуття спокою та повного контролю над резиденцією. Продумана модульна архітектура забезпечує миттєвий відгук та 60 FPS на будь-яких пристроях.",
          title2: "Філософія дизайну",
          desc2: "Найвищий рівень розумного дому полягає в непомітності: ідеальна технологія відчувається як природна магія, де користувач взаємодіє з чистим простором, а не з кнопками."
        },
        liveExperience: {
          status: "Перевірити роботу наживо",
          urlDisplay: "aura-smart.vercel.app · Production Live Experience",
          url: "https://aura-smart.vercel.app/",
          btnText: "Відкрити сайт"
        }
      }
    }
  },
  {
    id: "symmetry",
    key: "symmetry",
    title: "SYMMETRY Dental",
    category: "medical",
    badge: "Haute Aesthetic Dentistry",
    year: "2026",
    yearTag: "SYMMETRY · 2026",
    liveUrl: "https://symmetry-clinic.vercel.app/",
    heroImage: "/assets/symmetry/user_symmetry_hero.png",
    videoUrl: "",
    previewImages: [
      "/assets/symmetry/user_symmetry_hero.png",
      "/assets/symmetry/clinic_lounge_hq.jpg",
      "/assets/symmetry/luxury_clinic_cta_new.jpg",
      "/assets/symmetry/founder_premium.jpg"
    ],
    caseStudy: {
      hero: {
        badge: "Case Study · Haute Medical Design",
        title: "SYMMETRY Dental",
        subtitle: "Проєктування та розробка вебпростору для клініки швейцарської естетичної стоматології: архітектурна точність, інтерактивні Before/After трансформації та атмосфера приватного клубу.",
        heroImage: "/assets/symmetry/user_symmetry_hero.png",
        caption: "SYMMETRY Dental — The Art of the Perfect Smile",
        pillTag: "SYMMETRY · 2026"
      },
      problemSolution: {
        sectionNum: "01 / Головна проблема та рішення",
        sectionTitle: "Виклик бізнесу та дизайн-інженерне рішення",
        problem: {
          tag: "01 · Головна проблема ринку",
          title: "Лікарняний страх та медичний жаргон блокують чеки $20,000+",
          desc: "Пацієнти преміального сегмента бояться болю та невідомості. Стандартні стоматологічні сайти лякають фотографіями інструментів, незрозумілими назвами процедур та складними формами реєстрації."
        },
        solution: {
          tag: "02 · Наше рішення",
          title: "Атмосфера приватного лаунжу та доказовий Before/After",
          desc: "Замість медичного стресу створено атмосферу приватного клубу зі швейцарськими протоколами. Впроваджено інтерактивний 4K спліттер результатів робіт та прямий контакт із персональним координатором лікування."
        }
      },
      conceptErgonomics: {
        sectionNum: "02 / Концепт та ергономіка",
        sectionTitle: "Швейцарська точність та психологія довіри",
        cards: [
          {
            tag: "01 · Наочна доказовість",
            title: "Інтерактивний Before / After",
            desc: "Високоточний тактильний спліттер для порівняння мікрокераміки до та після реставрації з роздільною здатністю 4K без зайвого медичного жаргону."
          },
          {
            tag: "02 · Медичний авторитет",
            title: "Досьє майстрів та протоколи",
            desc: "Відкрита демонстрація швейцарських протоколів точності, міжнародної практики та філософії кожного провідного хірурга-ортопеда."
          },
          {
            tag: "03 · White-Glove сервіс",
            title: "Приватний консьєрж-запис",
            desc: "Повна відмова від холодних довгих реєстраційних форм. Прямий діалог із персональним координатором лікування в 1 клік."
          }
        ]
      },
      designSystem: {
        sectionNum: "03 / Дизайн-система",
        sectionTitle: "Колірна палітра та шрифтова ієрархія",
        palette: [
          { name: "Monolith Espresso", hex: "#181412", tag: "Lounge", role: "Архітектурний темний фон приватного лаунжу клініки", token: "--color-canvas-monolith", rgb: "24, 20, 18", textDark: false },
          { name: "Raw Ceramic", hex: "#F3ECE1", tag: "Porcelain", role: "Текстура мікрокераміки E.max, природний тон", token: "--color-porcelain-light", rgb: "243, 236, 225", textDark: true },
          { name: "Swiss Slate", hex: "#2A2522", tag: "Surface", role: "Картки досьє лікарів та протоколів реставрації", token: "--color-surface-slate", rgb: "42, 37, 34", textDark: false },
          { name: "Champagne Brass", hex: "#D6C29A", tag: "Standard", role: "Сертифікація швейцарських стандартів та акценти", token: "--color-gold-swiss", rgb: "214, 194, 154", textDark: true },
          { name: "Enamel Purity", hex: "#FFFFFF", tag: "Enamel", role: "Дзеркальні відблиски, чистий контраст та світло", token: "--color-enamel-pure", rgb: "255, 255, 255", textDark: true }
        ],
        typography: [
          {
            tag: "Display Serif",
            font: "Cinzel / Monument",
            desc: "Монументальні заголовки, що транслюють точність та статус."
          },
          {
            tag: "Interface Sans",
            font: "Inter",
            desc: "Описи процедур, параметри лікування та навігація."
          },
          {
            tag: "Tech Mono",
            font: "JetBrains Mono",
            desc: "Медичні протоколи, номери кейсів (#1208) та сертифікація."
          }
        ]
      },
      gallerySectionNum: "04 / Галерея інтерфейсу",
      gallery: [
        {
          url: "/assets/symmetry/clinic_interior.jpg",
          caption: "Головний хол та приймальня клініки — атмосфера приватного клубу"
        },
        {
          url: "/assets/symmetry/gallery_reception.jpg",
          caption: "Монолітна мармурова стійка ресепшн та тепле архітектурне освітлення"
        },
        {
          url: "/assets/symmetry/gallery_lounge.jpg",
          caption: "Приватна лаунж-зона для очікування та декомпресії пацієнтів"
        },
        {
          url: "/assets/symmetry/gallery_room.jpg",
          caption: "Кабінет преміальної естетичної реставрації та ергономічне крісло"
        },
        {
          url: "/assets/symmetry/veneers_after_perfect_1783483102845.jpg",
          caption: "Керамічні вініри E.max — бездоганна текстура та природна прозорість"
        },
        {
          url: "/assets/symmetry/gallery_details.jpg",
          caption: "Швейцарські мікрохірургічні інструменти прецизійної точності"
        }
      ],
      resultsAndLive: {
        sectionNum: "05 / Результат & Live",
        sectionTitle: "Підсумки та живий продукт",
        summary: {
          title1: "Підсумок розробки",
          desc1: "Створено цифровий простір, який підкреслює найвищу експертизу клініки та допомагає формувати довіру до комплексних реставрацій посмішки вартістю $20,000+.",
          title2: "Філософія дизайну",
          desc2: "Високий рівень медичного дизайну полягає не в складних наукових графіках, а в делікатному знятті страху пацієнта та створенні відчуття абсолютної безпеки."
        },
        liveExperience: {
          status: "Перевірити роботу наживо",
          urlDisplay: "symmetry-clinic.vercel.app · Production Live Experience",
          url: "https://symmetry-clinic.vercel.app/",
          btnText: "Відкрити сайт"
        }
      }
    }
  }
];
