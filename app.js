/**
 * AuraTranslate - Core Application Script
 * Powered by vanilla ES6, Web Speech APIs, and MyMemory Translation API.
 * Includes Aura Academy: Vocabulary Flashcards, Daily Quotes, and CET-4/6 prep systems.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Global runtime error monitor
  window.onerror = function(message, source, lineno, colno, error) {
    console.error("Runtime error caught:", message, "at line:", lineno);
    showToast("运行时错误: " + message + " (行 " + lineno + ")", "error");
  };

  // --- DOM Elements ---
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  // OCR elements
  const sourceWrapper = document.getElementById('source-wrapper');
  const ocrDragOverlay = document.getElementById('ocr-drag-overlay');
  const ocrLoader = document.getElementById('ocr-loader');
  const btnOcrHint = document.getElementById('btn-ocr-hint');

  // Ebbinghaus DOM items
  const vocabReviewInfo = document.getElementById('vocab-review-info');
  const vocabReviewCount = document.getElementById('vocab-review-count');
  const cardReviewBar = document.getElementById('card-review-bar');

  // Reader Tab elements
  const subtabReader = document.getElementById('subtab-reader');
  const academyReaderView = document.getElementById('academy-reader-view');
  const readerPasteText = document.getElementById('reader-paste-text');
  const btnStartReading = document.getElementById('btn-start-reading');
  const readerInputArea = document.getElementById('reader-input-area');
  const readerReadingArea = document.getElementById('reader-reading-area');
  const btnBackToPaste = document.getElementById('btn-back-to-paste');
  const readerArticleContent = document.getElementById('reader-article-content');
  const readerVocabEmpty = document.getElementById('reader-vocab-empty');
  const readerVocabList = document.getElementById('reader-vocab-list');
  const readerFloatBubble = document.getElementById('reader-float-bubble');
  const bubbleTargetWord = document.getElementById('bubble-target-word');
  const bubbleTargetPron = document.getElementById('bubble-target-pron');
  const bubbleTargetTrans = document.getElementById('bubble-target-trans');
  const btnBubbleSpeak = document.getElementById('btn-bubble-speak');
  const btnBubbleAddVocab = document.getElementById('btn-bubble-add-vocab');

  // Dashboard Tab elements
  const subtabDashboard = document.getElementById('subtab-dashboard');
  const academyDashboardView = document.getElementById('academy-dashboard-view');
  const statTransTotal = document.getElementById('stat-trans-total');
  const statVocabMastered = document.getElementById('stat-vocab-mastered');
  const statCetQuestions = document.getElementById('stat-cet-questions');

  // TTS speed & CSV export elements
  const ttsSpeedSlider = document.getElementById('tts-speed-slider');
  const ttsSpeedLabel = document.getElementById('tts-speed-label');
  const btnExportVocab = document.getElementById('btn-export-vocab');

  // Reading history shelf elements
  const readerHistoryBookshelf = document.getElementById('reader-history-bookshelf');
  const readerHistoryList = document.getElementById('reader-history-list');

  // Phase 4 DOM elements
  const engineSelect = document.getElementById('engine-select');
  const btnConfigKey = document.getElementById('btn-config-key');
  const keyModal = document.getElementById('key-modal');
  const btnCloseKeyModal = document.getElementById('btn-close-key-modal');
  const inputApiKey = document.getElementById('input-api-key');
  const btnSaveKey = document.getElementById('btn-save-key');

  const btnAnalyzeGrammar = document.getElementById('btn-analyze-grammar');
  const grammarBreakdownDrawer = document.getElementById('grammar-breakdown-drawer');
  const btnCloseGrammar = document.getElementById('btn-close-grammar');
  const grammarStructureText = document.getElementById('grammar-structure-text');
  const grammarCollocationsTags = document.getElementById('grammar-collocations-tags');

  const heatmapGridContainer = document.getElementById('heatmap-grid-container');
  const streakDaysCount = document.getElementById('streak-days-count');

  // Quiz Bank DOM elements
  const btnAiGenerateQuiz = document.getElementById('btn-ai-generate-quiz');
  const btnImportQuizBank = document.getElementById('btn-import-quiz-bank');
  const quizBankFileInput = document.getElementById('quiz-bank-file-input');

  // Phase 5 Word Learning DOM elements
  const subtabWordLearning = document.getElementById('subtab-word-learning');
  const academyWordLearningView = document.getElementById('academy-word-learning-view');
  const courseBookSelect = document.getElementById('course-book-select');
  const courseGoalSelect = document.getElementById('course-goal-select');
  const courseProgressText = document.getElementById('course-progress-text');
  const btnStudySpeak = document.getElementById('btn-study-speak');
  const studyWordTitle = document.getElementById('study-word-title');
  const studyWordPron = document.getElementById('study-word-pron');
  const studyWordPos = document.getElementById('study-word-pos');
  const studyWordTrans = document.getElementById('study-word-trans');
  const studyWordExEn = document.getElementById('study-word-ex-en');
  const studyWordExZh = document.getElementById('study-word-ex-zh');
  const inputWordSpelling = document.getElementById('input-word-spelling');
  const btnSubmitSpelling = document.getElementById('btn-submit-spelling');
  const btnAddStudyVocab = document.getElementById('btn-add-study-vocab');
  const btnNextStudyWord = document.getElementById('btn-next-study-word');
  
  const srcLangSelect = document.getElementById('src-lang');
  const tgtLangSelect = document.getElementById('tgt-lang');
  const swapLangBtn = document.getElementById('swap-lang');
  
  const srcTextarea = document.getElementById('src-text');
  const srcCharCount = document.getElementById('src-char-count');
  const tgtTextPlaceholder = document.getElementById('tgt-text-placeholder');
  const tgtTextEl = document.getElementById('tgt-text');
  const translateLoader = document.getElementById('translate-loader');
  
  const btnSpeakSrc = document.getElementById('btn-speak-src');
  const btnMicSrc = document.getElementById('btn-mic-src');
  const btnClear = document.getElementById('btn-clear');
  
  const btnSpeakTgt = document.getElementById('btn-speak-tgt');
  const btnCopyTgt = document.getElementById('btn-copy-tgt');
  const btnStarTgt = document.getElementById('btn-star-tgt');
  const btnLearnTgt = document.getElementById('btn-learn-tgt'); // New
  
  const translateStatus = document.getElementById('translate-status');
  const statusMessage = document.getElementById('status-message');
  const manualTranslateBtn = document.getElementById('btn-translate-manual');
  
  const tabHistory = document.getElementById('tab-history');
  const tabFavorites = document.getElementById('tab-favorites');
  const tabAcademy = document.getElementById('tab-academy'); // New
  const historyPanel = document.getElementById('history-panel');
  const favoritesPanel = document.getElementById('favorites-panel');
  const academyPanel = document.getElementById('academy-panel'); // New
  const historyEmpty = document.getElementById('history-empty');
  const favoritesEmpty = document.getElementById('favorites-empty');
  const historyList = document.getElementById('history-list');
  const favoritesList = document.getElementById('favorites-list');
  const btnClearRecords = document.getElementById('btn-clear-records');
  
  const toastContainer = document.getElementById('toast-container');

  // --- Academy Elements ---
  const subtabVocab = document.getElementById('subtab-vocab');
  const subtabQuotes = document.getElementById('subtab-quotes');
  const subtabCet = document.getElementById('subtab-cet');
  
  const academyVocabView = document.getElementById('academy-vocab-view');
  const academyQuotesView = document.getElementById('academy-quotes-view');
  const academyCetView = document.getElementById('academy-cet-view');
  
  const vocabTotalCount = document.getElementById('vocab-total-count');
  const btnToggleVocabList = document.getElementById('btn-toggle-vocab-list');
  const btnToggleVocabCard = document.getElementById('btn-toggle-vocab-card');
  const vocabListContainer = document.getElementById('vocab-list-container');
  const vocabCardContainer = document.getElementById('vocab-card-container');
  const vocabEmpty = document.getElementById('vocab-empty');
  const vocabList = document.getElementById('vocab-list');
  
  const studyFlashcard = document.getElementById('study-flashcard');
  const flashcardInner = document.getElementById('flashcard-inner');
  const cardFrontWord = document.getElementById('card-front-word');
  const cardFrontPron = document.getElementById('card-front-pron');
  const btnCardSpeakSrc = document.getElementById('btn-card-speak-src');
  const cardBackTranslation = document.getElementById('card-back-translation');
  const cardBackTime = document.getElementById('card-back-time');
  
  const btnPrevCard = document.getElementById('btn-prev-card');
  const btnNextCard = document.getElementById('btn-next-card');
  const btnPracticePron = document.getElementById('btn-practice-pron');
  const btnMarkMastered = document.getElementById('btn-mark-mastered');
  
  const cardPracticePanel = document.getElementById('card-practice-panel');
  const practiceTargetSentence = document.getElementById('practice-target-sentence');
  const btnPracticeMic = document.getElementById('btn-practice-mic');
  const practiceStatusText = document.getElementById('practice-status-text');
  const practiceResultPanel = document.getElementById('practice-result-panel');
  const practiceScoreRing = document.getElementById('practice-score-ring');
  const practiceScoreText = document.getElementById('practice-score-text');
  const practiceFeedbackText = document.getElementById('practice-feedback-text');
  const btnClosePractice = document.getElementById('btn-close-practice');
  
  const quoteEnText = document.getElementById('quote-en-text');
  const quoteZhText = document.getElementById('quote-zh-text');
  const quoteVocabList = document.getElementById('quote-vocab-list');
  const btnSpeakQuote = document.getElementById('btn-speak-quote');
  const btnPracticeQuote = document.getElementById('btn-practice-quote');
  
  const btnCet4Tab = document.getElementById('btn-cet4-tab');
  const btnCet6Tab = document.getElementById('btn-cet6-tab');
  const cetProgressVal = document.getElementById('cet-progress-val');
  const cetProgressFill = document.getElementById('cet-progress-fill');
  const cetCalendarGrid = document.getElementById('cet-calendar-grid');
  
  const btnToggleWrongBook = document.getElementById('btn-toggle-wrong-book');
  const wrongCount = document.getElementById('wrong-count');
  const wrongQuestionsDrawer = document.getElementById('wrong-questions-drawer');
  const btnCloseWrong = document.getElementById('btn-close-wrong');
  const wrongEmpty = document.getElementById('wrong-empty');
  const wrongQuestionsList = document.getElementById('wrong-questions-list');
  
  const quizOptionsList = document.getElementById('quiz-options-list');
  const quizQuestionStem = document.getElementById('quiz-question-stem');
  const quizPassageContainer = document.getElementById('quiz-passage-container');
  const quizQNum = document.getElementById('quiz-q-num');
  const quizQType = document.getElementById('quiz-q-type');
  const quizExplanationPanel = document.getElementById('quiz-explanation-panel');
  const quizResultBadge = document.getElementById('quiz-result-badge');
  const quizCorrectAnswer = document.getElementById('quiz-correct-answer');
  const quizExplanationText = document.getElementById('quiz-explanation-text');
  const btnSaveWrong = document.getElementById('btn-save-wrong');
  const btnNextQuestion = document.getElementById('btn-next-question');

  // --- Constants & State ---
  const DEBOUNCE_DELAY = 800; // ms
  let debounceTimeout = null;
  const apiCache = {};
  let translateAbortController = null;
  
  // App state
  const state = {
    history: JSON.parse(localStorage.getItem('aura_history')) || [],
    favorites: JSON.parse(localStorage.getItem('aura_favorites')) || [],
    vocabulary: JSON.parse(localStorage.getItem('aura_vocabulary')) || [], // English vocab
    cetProgress: JSON.parse(localStorage.getItem('aura_cet_progress')) || {
      activeTarget: 'cet4', // 'cet4' or 'cet6'
      cet4Days: {},
      cet6Days: {}
    },
    wrongQuestions: JSON.parse(localStorage.getItem('aura_wrong_qs')) || [],
    currentTheme: localStorage.getItem('aura_theme') || 'light',
    activeTab: 'history', // 'history', 'favorites', or 'academy'
    activeSubtab: 'vocab', // 'vocab', 'quotes', or 'cet'
    isTranslating: false,
    isRecording: false,
    lastTranslation: null,
    
    // Learning hub index trackers
    activeCardIndex: 0,
    activeQuizIndex: 0,
    activeQuizType: 'vocab', // 'vocab' or 'reading'
    hasAnsweredQuiz: false,
    selectedQuizOption: null,

    // NEW state items
    stats: JSON.parse(localStorage.getItem('aura_stats')) || {
      transDates: {},
      oralScores: [],
      quizCount: 0
    },
    charts: {
      lineChart: null,
      pieChart: null,
      oralChart: null
    },
    readerSelectedText: "",
    
    // Optimized features state
    ttsSpeed: parseFloat(localStorage.getItem('aura_tts_speed')) || 1.0,
    readerHistory: JSON.parse(localStorage.getItem('aura_reader_history')) || [],

    // Phase 4 State
    engine: localStorage.getItem('aura_engine') || 'default',
    customApiKey: localStorage.getItem('aura_custom_api_key') || '',
    customQuizBank: JSON.parse(localStorage.getItem('aura_custom_quiz_bank')) || [],

    // Phase 5 Word Course State
    wordCourse: JSON.parse(localStorage.getItem('aura_word_course_state')) || {
      activeBook: 'cet4',
      dailyGoal: 20,
      bookProgress: { cet4: 0, cet6: 0, kaoyan: 0, ielts: 0 },
      currentWordIndex: 0
    },
    wordCoursesDatabase: null
  };

  // Defensive array checks to prevent type errors on null localStorage items
  if (!Array.isArray(state.history)) state.history = [];
  if (!Array.isArray(state.favorites)) state.favorites = [];
  if (!Array.isArray(state.vocabulary)) state.vocabulary = [];
  if (!Array.isArray(state.wrongQuestions)) state.wrongQuestions = [];
  if (!state.stats) state.stats = { transDates: {}, oralScores: [], quizCount: 0 };
  if (!state.stats.transDates) state.stats.transDates = {};
  if (!state.stats.oralScores) state.stats.oralScores = [];
  state.stats.quizCount = state.stats.quizCount || 0;

  // --- Speech Setup ---
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = null;
  
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
  } else {
    btnMicSrc.style.display = 'none';
  }

  const speechLangMapping = {
    'en': 'en-US',
    'zh-CN': 'zh-CN',
    'zh-TW': 'zh-TW',
    'ja': 'ja-JP',
    'ko': 'ko-KR',
    'fr': 'fr-FR',
    'es': 'es-ES',
    'de': 'de-DE',
    'ru': 'ru-RU',
    'it': 'it-IT',
    'pt': 'pt-PT'
  };

  // Pre-load system TTS voices asynchronously for Chrome / Edge stability
  if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener('voiceschanged', () => {
      window.speechSynthesis.getVoices();
    });
  }

  // --- Databases ---
  
  // Handpicked Bilingual Daily Quotes with Vocab Extractions
  const quotesDatabase = [
    {
      en: "The journey of a thousand miles begins with a single step.",
      zh: "千里之行，始于足下。",
      vocab: [
        { word: "journey", pron: "/ˈdʒɜːrni/", trans: "旅程；历程" },
        { word: "begins", pron: "/bɪˈɡɪnz/", trans: "开始；着手" },
        { word: "single", pron: "/ˈsɪŋɡl/", trans: "单一的；单出的" }
      ]
    },
    {
      en: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      zh: "成功并非终点，失败也非致命，重要的是继续前进的勇气。",
      vocab: [
        { word: "fatal", pron: "/ˈfeɪtl/", trans: "致命的；毁灭性的" },
        { word: "courage", pron: "/ˈkʌrɪdʒ/", trans: "勇气；胆量" },
        { word: "counts", pron: "/kaʊnts/", trans: "重要；有价值" }
      ]
    },
    {
      en: "Believe you can and you are halfway there.",
      zh: "相信自己能行，你就已经成功了一半。",
      vocab: [
        { word: "believe", pron: "/bɪˈliːv/", trans: "相信；信任" },
        { word: "halfway", pron: "/ˌhæfˈweɪ/", trans: "半途；在中途" }
      ]
    },
    {
      en: "Opportunities do not happen, you create them.",
      zh: "机遇不会凭空出现，是由你创造的。",
      vocab: [
        { word: "opportunities", pron: "/ˌɒpəˈtjuːnɪtiz/", trans: "机会；机遇" },
        { word: "create", pron: "/kriˈeɪt/", trans: "创造；创作" }
      ]
    },
    {
      en: "The only way to do great work is to love what you do.",
      zh: "创造伟大工作的唯一途径，就是热爱你所做的事。",
      vocab: [
        { word: "great", pron: "/ɡreɪt/", trans: "伟大的；卓越的" },
        { word: "love", pron: "/lʌv/", trans: "热爱；喜爱" }
      ]
    }
  ];

  // CET-4 & CET-6 Quizzes Database
  const cetQuizzesDatabase = {
    cet4: {
      vocab: [
        {
          id: "cet4_v1",
          question: "The search for the lost ship was ______ because of the thick fog and heavy rain.",
          options: ["A. cancelled", "B. postponed", "C. suspended", "D. confined"],
          answer: 0,
          explanation: "正确答案为 A (cancelled，取消)。因大雾暴雨而搜救被迫取消。postpone 表示'推迟'；suspend 表示'悬挂/中止'；confine 表示'局限于'。"
        },
        {
          id: "cet4_v2",
          question: "The government has decided to ______ the tax on imported luxury goods to encourage domestic consumption.",
          options: ["A. raise", "B. reduce", "C. impose", "D. release"],
          answer: 1,
          explanation: "正确答案为 B (reduce，降低)。为了鼓励国内消费，政府决定降低进口奢侈品的税率。raise 意为'提高'；impose 意为'征收'；release 意为'发布'。"
        },
        {
          id: "cet4_v3",
          question: "Although the two sisters look very much alike, they are quite different in ______.",
          options: ["A. appearance", "B. character", "C. stature", "D. status"],
          answer: 1,
          explanation: "正确答案为 B (character，性格)。虽然两个姐妹看起来很相像，但她们的性格却非常不同。appearance 代表'外貌'；stature 代表'身材'；status 代表'地位'。"
        }
      ],
      reading: [
        {
          id: "cet4_r1",
          passage: "Reading is a fundamental skill that underpins academic success. In today's digital age, however, reading habits are changing rapidly. Many young people prefer short, bite-sized social media posts to long-form books. While digital reading offers instant access to information, it may reduce deep focus and critical thinking. Educators suggest that balancing both digital browsing and focused offline reading is essential for cognitive development.",
          question: "According to the passage, how are young people's reading habits changing?",
          options: [
            "A. They are reading more physical books than ever.",
            "B. They prefer social media posts over long books.",
            "C. They are spending less time online.",
            "D. They have completely stopped reading active text."
          ],
          answer: 1,
          explanation: "正确答案为 B。根据文章'Many young people prefer short, bite-sized social media posts to long-form books'可知，年轻人比起长书更喜欢碎片化的社交媒体文章。"
        },
        {
          id: "cet4_r2",
          passage: "Reading is a fundamental skill that underpins academic success. In today's digital age, however, reading habits are changing rapidly. Many young people prefer short, bite-sized social media posts to long-form books. While digital reading offers instant access to information, it may reduce deep focus and critical thinking. Educators suggest that balancing both digital browsing and focused offline reading is essential for cognitive development.",
          question: "What is a potential drawback of digital reading mentioned in the text?",
          options: [
            "A. It is too expensive for students.",
            "B. It offers no access to helpful information.",
            "C. It might decrease deep focus and critical thinking.",
            "D. It causes severe eye fatigue."
          ],
          answer: 2,
          explanation: "正确答案为 C。对应文中的'it may reduce deep focus and critical thinking' (可能会降低深度专注力及批判性思考能力)。"
        }
      ]
    },
    cet6: {
      vocab: [
        {
          id: "cet6_v1",
          question: "The company's performance was ______ by a series of unfortunate events, including a labor strike and a supply chain crisis.",
          options: ["A. enhanced", "B. hampered", "C. facilitated", "D. advocated"],
          answer: 1,
          explanation: "正确答案为 B (hampered，阻碍)。一系列不幸事件阻碍了公司的业绩。enhance 意为'增强'；facilitate 意为'促进'；advocate 意为'拥护'。"
        },
        {
          id: "cet6_v2",
          question: "His explanation was so ______ that everyone in the room was left completely bewildered.",
          options: ["A. lucid", "B. ambiguous", "C. explicit", "D. transparent"],
          answer: 1,
          explanation: "正确答案为 B (ambiguous，模糊不清的)。他的解释模棱两可，以至于屋里的每个人都大惑不解。lucid 意为'清晰的'；explicit 意为'明确的'；transparent 意为'透明的'。"
        }
      ],
      reading: [
        {
          id: "cet6_r1",
          passage: "The rise of artificial intelligence has sparked intense debate about the future of human labor. While optimists argue that AI will automate mundane tasks and free humans to engage in more creative endeavors, pessimists fear widespread unemployment. Historical precedents of technological revolutions suggest that jobs are indeed destroyed, but new sectors emerge to absorb displaced workers. The key to mitigating negative impacts lies in comprehensive retraining programs that prepare the workforce for human-AI collaboration.",
          question: "What is the optimists' view on the future of AI in the workplace?",
          options: [
            "A. AI will lead to immediate massive layoffs.",
            "B. AI will take over all creative professions.",
            "C. AI will automate routine tasks and free humans for creativity.",
            "D. AI will reduce overall human intelligence."
          ],
          answer: 2,
          explanation: "正确答案为 C。根据原文'AI will automate mundane tasks and free humans to engage in more creative endeavors'，乐观派认为AI会让日常枯燥工作自动化并解放人类的创造力。"
        },
        {
          id: "cet6_r2",
          passage: "The rise of artificial intelligence has sparked intense debate about the future of human labor. While optimists argue that AI will automate mundane tasks and free humans to engage in more creative endeavors, pessimists fear widespread unemployment. Historical precedents of technological revolutions suggest that jobs are indeed destroyed, but new sectors emerge to absorb displaced workers. The key to mitigating negative impacts lies in comprehensive retraining programs that prepare the workforce for human-AI collaboration.",
          question: "How can the negative impact of technological revolutions be mitigated according to the text?",
          options: [
            "A. By banning AI applications in creative fields.",
            "B. By offering lifetime unemployment benefits.",
            "C. By providing retraining programs for human-AI collaboration.",
            "D. By encouraging workers to work longer hours."
          ],
          answer: 2,
          explanation: "正确答案为 C。根据文章结尾'The key to mitigating negative impacts lies in comprehensive retraining programs that prepare the workforce for human-AI collaboration'可知，重新培训以适应人机协同是解决之法。"
        }
      ]
    }
  };

  // --- Initialize App ---
  function init() {
    // 1. Setup Theme
    applyTheme(state.currentTheme);
    
    // 2. Render Translation panels
    renderHistory();
    renderFavorites();
    updateTabsUI();
    
    // 3. Verify Speech Synthesis support
    const hasSpeechSynthesis = 'speechSynthesis' in window;
    if (!hasSpeechSynthesis) {
      btnSpeakSrc.style.display = 'none';
      btnSpeakTgt.style.display = 'none';
    }
    
    // 4. Load Academy data
    renderVocabList();
    renderDailyQuote();
    loadCETPlan();
    loadQuizQuestion();
    updateWrongCount();
    
    // 5. Attach Event Listeners
    setupEventListeners();
  }

  // --- Theme Management ---
  function applyTheme(theme) {
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      htmlEl.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      htmlEl.setAttribute('data-theme', theme);
    }
    
    const isDark = htmlEl.getAttribute('data-theme') === 'dark';
    themeToggleBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    state.currentTheme = theme;
    localStorage.setItem('aura_theme', theme);
  }

  function toggleTheme() {
    const nextTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    showToast(`已切换至${nextTheme === 'dark' ? '深色' : '浅色'}模式`, 'success');
  }

  // --- Event Listeners Setup ---
  function setupEventListeners() {
    themeToggleBtn.addEventListener('click', toggleTheme);
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (state.currentTheme === 'system') {
        applyTheme('system');
      }
    });

    swapLangBtn.addEventListener('click', swapLanguages);

    // Text Input Events
    srcTextarea.addEventListener('input', () => {
      const text = srcTextarea.value;
      srcCharCount.textContent = text.length;
      
      if (!text.trim()) {
        clearOutput();
        return;
      }
      
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        translate();
      }, DEBOUNCE_DELAY);
    });

    manualTranslateBtn.addEventListener('click', () => {
      clearTimeout(debounceTimeout);
      translate(true);
    });

    // Translation panel buttons
    btnClear.addEventListener('click', clearAll);
    btnCopyTgt.addEventListener('click', () => {
      copyToClipboard(tgtTextEl.innerText, '翻译结果已复制');
    });
    btnStarTgt.addEventListener('click', toggleCurrentFavorite);
    btnLearnTgt.addEventListener('click', addCurrentToVocabulary); // Save to Vocab

    // Speech Synthesis
    btnSpeakSrc.addEventListener('click', () => {
      speak(srcTextarea.value, srcLangSelect.value);
    });
    btnSpeakTgt.addEventListener('click', () => {
      speak(tgtTextEl.innerText, tgtLangSelect.value);
    });

    // Speech Recognition
    if (recognition) {
      btnMicSrc.addEventListener('click', toggleSpeechRecognition);
      
      recognition.onstart = () => {
        state.isRecording = true;
        btnMicSrc.classList.add('recording');
        showToast('正在聆听，请说话...', 'info');
      };
      
      recognition.onresult = (event) => {
        const resultText = event.results[0][0].transcript;
        if (resultText) {
          if (srcTextarea.value.trim()) {
            srcTextarea.value = srcTextarea.value.trim() + ' ' + resultText;
          } else {
            srcTextarea.value = resultText;
          }
          srcTextarea.dispatchEvent(new Event('input'));
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          showToast('麦克风权限被拒绝，请在浏览器设置中开启', 'error');
        } else {
          showToast('语音识别错误: ' + event.error, 'error');
        }
        stopSpeechRecognition();
      };
      
      recognition.onend = () => {
        state.isRecording = false;
        btnMicSrc.classList.remove('recording');
      };
    }

    // Tabs Switch
    tabHistory.addEventListener('click', () => switchTab('history'));
    tabFavorites.addEventListener('click', () => switchTab('favorites'));
    tabAcademy.addEventListener('click', () => switchTab('academy'));
    btnClearRecords.addEventListener('click', clearActiveRecords);

    srcLangSelect.addEventListener('change', () => {
      if (srcTextarea.value.trim()) translate();
    });
    tgtLangSelect.addEventListener('change', () => {
      if (srcTextarea.value.trim()) translate();
    });

    // --- Academy Hub Navigation & Events ---
    subtabVocab.addEventListener('click', () => switchSubtab('vocab'));
    subtabQuotes.addEventListener('click', () => switchSubtab('quotes'));
    subtabCet.addEventListener('click', () => switchSubtab('cet'));

    // Vocabulary View Toggles
    btnToggleVocabList.addEventListener('click', () => toggleVocabLayout('list'));
    btnToggleVocabCard.addEventListener('click', () => toggleVocabLayout('card'));

    // Flashcard Flip & Audio
    studyFlashcard.addEventListener('click', (e) => {
      // Don't flip if click speaker icon
      if (e.target.closest('#btn-card-speak-src')) return;
      studyFlashcard.classList.toggle('flipped');
    });

    btnCardSpeakSrc.addEventListener('click', (e) => {
      e.stopPropagation();
      const activeWord = state.vocabulary[state.activeCardIndex];
      if (activeWord && activeWord.audio) {
        const player = new Audio(activeWord.audio);
        player.play().catch(() => {
          speak(activeWord.word, 'en');
        });
      } else {
        speak(cardFrontWord.textContent, 'en');
      }
    });

    btnPrevCard.addEventListener('click', () => navigateFlashcard(-1));
    btnNextCard.addEventListener('click', () => navigateFlashcard(1));
    btnMarkMastered.addEventListener('click', markActiveCardMastered);

    // Card Pronunciation Practice
    btnPracticePron.addEventListener('click', openPronunciationPractice);
    btnClosePractice.addEventListener('click', closePronunciationPractice);
    btnPracticeMic.addEventListener('click', togglePracticeRecording);

    // Quotes actions
    btnSpeakQuote.addEventListener('click', () => {
      speak(quoteEnText.textContent, 'en');
    });
    btnPracticeQuote.addEventListener('click', () => {
      const sentence = quoteEnText.textContent;
      openPronunciationPractice(sentence);
    });

    // CET Prep Target Toggle
    btnCet4Tab.addEventListener('click', () => switchCETTarget('cet4'));
    btnCet6Tab.addEventListener('click', () => switchCETTarget('cet6'));

    // OCR drag and drop file parsing
    if (sourceWrapper) {
      sourceWrapper.addEventListener('dragover', (e) => {
        e.preventDefault();
        sourceWrapper.classList.add('ocr-drag-over');
        ocrDragOverlay.classList.remove('hidden');
      });

      sourceWrapper.addEventListener('dragleave', (e) => {
        e.preventDefault();
        sourceWrapper.classList.remove('ocr-drag-over');
        ocrDragOverlay.classList.add('hidden');
      });

      sourceWrapper.addEventListener('drop', (e) => {
        e.preventDefault();
        sourceWrapper.classList.remove('ocr-drag-over');
        ocrDragOverlay.classList.add('hidden');

        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
          performOCR(files[0]);
        } else {
          showToast('请拖入有效的图片文件！', 'error');
        }
      });
    }

    // Ctrl+V Paste Image for OCR
    srcTextarea.addEventListener('paste', (e) => {
      const items = e.clipboardData.items;
      for (let item of items) {
        if (item.type.indexOf('image') !== -1) {
          e.preventDefault();
          const file = item.getAsFile();
          performOCR(file);
          break;
        }
      }
    });

    // Ebbinghaus card rating buttons click
    if (cardReviewBar) {
      cardReviewBar.querySelectorAll('.review-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const grade = parseInt(btn.dataset.grade);
          const activeQueue = getReviewQueue();
          let activeCard;
          
          if (activeQueue.length > 0) {
            activeCard = activeQueue[state.activeCardIndex];
          } else {
            activeCard = state.vocabulary[state.activeCardIndex];
          }
          
          if (activeCard) {
            updateSpacedRepetition(activeCard.id, grade);
          }
        });
      });
    }

    // Reader events
    subtabReader.addEventListener('click', () => switchSubtab('reader'));
    btnStartReading.addEventListener('click', startImmersiveReader);
    btnBackToPaste.addEventListener('click', stopImmersiveReader);
    
    // Text Selection Event in Reader
    readerArticleContent.addEventListener('mouseup', handleTextSelection);
    document.addEventListener('mousedown', (e) => {
      // Hide selection bubble if click outside bubble
      if (readerFloatBubble && !readerFloatBubble.classList.contains('hidden')) {
        if (!e.target.closest('#reader-float-bubble') && !e.target.closest('#reader-article-content')) {
          readerFloatBubble.classList.add('hidden');
        }
      }
    });

    btnBubbleSpeak.addEventListener('click', () => {
      speak(state.readerSelectedText, 'en');
    });

    btnBubbleAddVocab.addEventListener('click', () => {
      saveToVocabularyData(state.readerSelectedText, bubbleTargetTrans.textContent);
      addWordToReaderSidebar(state.readerSelectedText, bubbleTargetTrans.textContent);
      readerFloatBubble.classList.add('hidden');
    });

    // Dashboard events
    subtabDashboard.addEventListener('click', () => switchSubtab('dashboard'));

    // Phase 4: Engine select & Modal
    if (engineSelect) {
      engineSelect.value = state.engine;
      engineSelect.addEventListener('change', () => {
        state.engine = engineSelect.value;
        localStorage.setItem('aura_engine', state.engine);
        if (state.engine === 'custom' && !state.customApiKey) {
          keyModal.classList.remove('hidden');
        } else {
          showToast(`已切换至：${engineSelect.options[engineSelect.selectedIndex].text}`, 'info');
        }
      });
    }

    if (btnConfigKey) {
      btnConfigKey.addEventListener('click', () => {
        if (inputApiKey) inputApiKey.value = state.customApiKey;
        keyModal.classList.remove('hidden');
      });
    }

    if (btnCloseKeyModal) {
      btnCloseKeyModal.addEventListener('click', () => keyModal.classList.add('hidden'));
    }

    if (btnSaveKey) {
      btnSaveKey.addEventListener('click', () => {
        state.customApiKey = inputApiKey.value.trim();
        localStorage.setItem('aura_custom_api_key', state.customApiKey);
        keyModal.classList.add('hidden');
        showToast(state.customApiKey ? 'API Key 已安全保存！' : 'API Key 已清空', 'success');
      });
    }

    // Phase 5: Word Learning events
    if (subtabWordLearning) {
      subtabWordLearning.addEventListener('click', () => switchSubtab('word-learning'));
    }
    if (courseBookSelect) {
      courseBookSelect.value = state.wordCourse.activeBook;
      courseBookSelect.addEventListener('change', () => {
        state.wordCourse.activeBook = courseBookSelect.value;
        state.wordCourse.currentWordIndex = state.wordCourse.bookProgress[state.wordCourse.activeBook] || 0;
        saveWordCourseState();
        renderCurrentWordStudy();
      });
    }
    if (courseGoalSelect) {
      courseGoalSelect.value = state.wordCourse.dailyGoal;
      courseGoalSelect.addEventListener('change', () => {
        state.wordCourse.dailyGoal = parseInt(courseGoalSelect.value);
        saveWordCourseState();
      });
    }
    if (btnStudySpeak) {
      btnStudySpeak.addEventListener('click', () => {
        const word = studyWordTitle.textContent.trim();
        if (word) speak(word, 'en');
      });
    }
    if (btnSubmitSpelling) {
      btnSubmitSpelling.addEventListener('click', submitWordSpelling);
    }
    if (btnAddStudyVocab) {
      btnAddStudyVocab.addEventListener('click', () => {
        const word = studyWordTitle.textContent.trim();
        const trans = studyWordTrans.textContent.trim();
        saveToVocabularyData(word, trans);
      });
    }
    if (btnNextStudyWord) {
      btnNextStudyWord.addEventListener('click', nextStudyWord);
    }
    if (inputWordSpelling) {
      inputWordSpelling.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          submitWordSpelling();
        }
      });
    }

    // Quiz Bank AI Generator & Custom Import
    if (btnAiGenerateQuiz) {
      btnAiGenerateQuiz.addEventListener('click', generateAiVocabQuiz);
    }
    if (btnImportQuizBank && quizBankFileInput) {
      btnImportQuizBank.addEventListener('click', () => quizBankFileInput.click());
      quizBankFileInput.addEventListener('change', handleImportQuizBankFile);
    }

    // Grammar Analysis trigger
    if (btnAnalyzeGrammar) {
      btnAnalyzeGrammar.addEventListener('click', analyzeSentenceGrammar);
    }
    if (btnCloseGrammar) {
      btnCloseGrammar.addEventListener('click', () => grammarBreakdownDrawer.classList.add('hidden'));
    }

    // Keyboard Shortcuts (Ctrl+Enter, Alt+1/2/3, Ctrl+Shift+S)
    document.addEventListener('keydown', (e) => {
      // Ctrl + Enter or Cmd + Enter for Translate
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        translate(true);
      }
      // Alt + 1/2/3 for Quick Tab switching
      else if (e.altKey && e.key === '1') {
        e.preventDefault();
        switchTab('history');
      } else if (e.altKey && e.key === '2') {
        e.preventDefault();
        switchTab('favorites');
      } else if (e.altKey && e.key === '3') {
        e.preventDefault();
        switchTab('academy');
      } else if (e.ctrlKey && e.shiftKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        const srcText = srcTextarea.value.trim();
        if (srcText) speak(srcText, srcLangSelect.value);
      }
    });

    // TTS Speed change slider
    if (ttsSpeedSlider) {
      ttsSpeedSlider.addEventListener('input', () => {
        state.ttsSpeed = parseFloat(ttsSpeedSlider.value);
        if (ttsSpeedLabel) ttsSpeedLabel.textContent = state.ttsSpeed.toFixed(1) + 'x';
        localStorage.setItem('aura_tts_speed', state.ttsSpeed);
      });
    }

    // CSV Vocab export trigger
    if (btnExportVocab) {
      btnExportVocab.addEventListener('click', exportVocabularyToCSV);
    }

    // Mobile camera click OCR bridge
    const ocrCameraInput = document.createElement('input');
    ocrCameraInput.type = 'file';
    ocrCameraInput.accept = 'image/*';
    ocrCameraInput.capture = 'environment';
    ocrCameraInput.style.display = 'none';
    document.body.appendChild(ocrCameraInput);

    if (btnOcrHint) {
      btnOcrHint.addEventListener('click', () => {
        ocrCameraInput.click();
      });
    }

    ocrCameraInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        performOCR(e.target.files[0]);
      }
    });

    // Quiz Category Switch
    document.querySelectorAll('.quiz-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.quiz-tab-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        state.activeQuizType = e.target.dataset.quizType;
        state.activeQuizIndex = 0;
        loadQuizQuestion();
      });
    });

    btnNextQuestion.addEventListener('click', () => {
      state.activeQuizIndex++;
      
      // Save current breakpoint index progress
      const target = state.cetProgress.activeTarget;
      const type = state.activeQuizType;
      const savedIndexKey = `${target}${type === 'vocab' ? 'Vocab' : 'Reading'}Index`;
      state.cetProgress[savedIndexKey] = state.activeQuizIndex;
      localStorage.setItem('aura_cet_progress', JSON.stringify(state.cetProgress));

      loadQuizQuestion();
    });

    btnSaveWrong.addEventListener('click', addCurrentQuestionToWrong);
    btnToggleWrongBook.addEventListener('click', () => toggleWrongQuestionsDrawer(true));
    btnCloseWrong.addEventListener('click', () => toggleWrongQuestionsDrawer(false));
  }

  // --- Chunked Translation Helpers for long text ---
  async function fetchTranslation(text, srcLang, tgtLang) {
    if (text.length <= 1000) {
      return await fetchChunk(text, srcLang, tgtLang);
    }
    
    const chunks = [];
    let currentChunk = "";
    
    const paragraphs = text.split('\n');
    for (let para of paragraphs) {
      if ((currentChunk + para).length > 900) {
        if (currentChunk) {
          chunks.push(currentChunk);
          currentChunk = "";
        }
        
        if (para.length > 900) {
          const sentences = para.match(/[^.!?。！？]+[.!?。！？]+/g) || [para];
          for (let sent of sentences) {
            if ((currentChunk + sent).length > 900) {
              if (currentChunk) chunks.push(currentChunk);
              currentChunk = sent;
            } else {
              currentChunk += sent;
            }
          }
        } else {
          currentChunk = para;
        }
      } else {
        currentChunk += (currentChunk ? '\n' : '') + para;
      }
    }
    if (currentChunk) chunks.push(currentChunk);
    
    const promises = chunks.map(chunk => fetchChunk(chunk, srcLang, tgtLang));
    const results = await Promise.all(promises);
    return results.join('\n');
  }

  async function fetchChunk(chunkText, srcLang, tgtLang) {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunkText)}&langpair=${srcLang}|${tgtLang}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.responseStatus === 200) {
      return data.responseData.translatedText;
    } else {
      throw new Error(data.responseDetails || 'API returns non-200 status');
    }
  }

  // --- Core Translation Logic ---
  async function translate(immediate = false) {
    const text = srcTextarea.value.trim();
    if (!text) {
      clearOutput();
      return;
    }

    const srcLang = srcLangSelect.value;
    const tgtLang = tgtLangSelect.value;

    if (srcLang === tgtLang) {
      tgtTextPlaceholder.classList.add('hidden');
      tgtTextEl.innerText = text;
      enableTargetActions(true);
      updateStatus('success', '源语言与目标语言相同');
      state.lastTranslation = {
        srcLang,
        tgtLang,
        srcText: text,
        tgtText: text
      };
      updateStarIconState();
      return;
    }

    const cacheKey = `${srcLang}|${tgtLang}|${text}`;
    if (apiCache[cacheKey]) {
      displayResult(apiCache[cacheKey], false);
      return;
    }

    showLoader(true);
    updateStatus('loading', '正在翻译...');
    state.isTranslating = true;

    try {
      const translatedText = await fetchTranslation(text, srcLang, tgtLang);
      apiCache[cacheKey] = translatedText;
      displayResult(translatedText, true);
    } catch (error) {
      console.error('Translation error:', error);
      updateStatus('error', '翻译失败，请检查网络或重试');
      showToast('翻译接口繁忙，请稍后再试', 'error');
      showLoader(false);
      state.isTranslating = false;
    }
  }

  function displayResult(translatedText, saveToHistory = true) {
    showLoader(false);
    state.isTranslating = false;
    
    tgtTextPlaceholder.classList.add('hidden');
    tgtTextEl.innerText = translatedText;
    enableTargetActions(true);
    updateStatus('success', '翻译成功');
    
    const srcLang = srcLangSelect.value;
    const tgtLang = tgtLangSelect.value;
    const srcText = srcTextarea.value.trim();

    state.lastTranslation = {
      srcLang,
      tgtLang,
      srcText,
      tgtText: translatedText
    };

    // Track Translation stats
    try {
      const todayStr = new Date().toLocaleDateString();
      const textLen = srcText.length;
      state.stats.transDates[todayStr] = (state.stats.transDates[todayStr] || 0) + textLen;
      localStorage.setItem('aura_stats', JSON.stringify(state.stats));
    } catch(e) {
      console.log('Failed to log translation stat:', e);
    }

    updateStarIconState();

    if (saveToHistory) {
      addToHistory(srcLang, tgtLang, srcText, translatedText);
    }
  }

  function clearOutput() {
    tgtTextPlaceholder.classList.remove('hidden');
    tgtTextEl.innerText = '';
    enableTargetActions(false);
    updateStatus('idle', '已就绪');
    showLoader(false);
    state.isTranslating = false;
    state.lastTranslation = null;
    updateStarIconState(false);
  }

  function clearAll() {
    srcTextarea.value = '';
    srcCharCount.textContent = '0';
    clearOutput();
    showToast('文本已清空', 'info');
  }

  function swapLanguages() {
    clearTimeout(debounceTimeout);
    const srcVal = srcLangSelect.value;
    const tgtVal = tgtLangSelect.value;
    
    srcLangSelect.value = tgtVal;
    tgtLangSelect.value = srcVal;
    
    const srcText = srcTextarea.value.trim();
    const tgtText = tgtTextEl.innerText.trim();
    
    if (srcText && tgtText) {
      srcTextarea.value = tgtText;
      srcCharCount.textContent = tgtText.length;
      translate(true);
    } else if (srcText) {
      translate();
    }
    
    showToast('语言对调完成', 'success');
  }

  function enableTargetActions(enable) {
    btnSpeakTgt.disabled = !enable;
    btnCopyTgt.disabled = !enable;
    btnStarTgt.disabled = !enable;
    btnLearnTgt.disabled = !enable; // Vocab enabled
    if (btnAnalyzeGrammar) btnAnalyzeGrammar.disabled = !enable;
  }

  function updateStatus(type, message) {
    const successIcon = translateStatus.querySelector('.success-icon');
    
    statusMessage.textContent = message;
    successIcon.classList.add('hidden');
    
    if (type === 'success') {
      successIcon.classList.remove('hidden');
      statusMessage.style.color = 'var(--text-muted)';
    } else if (type === 'error') {
      statusMessage.style.color = '#ef4444';
    } else if (type === 'loading') {
      statusMessage.style.color = 'var(--accent-primary)';
    } else {
      statusMessage.style.color = 'var(--text-muted)';
    }
  }

  function showLoader(show) {
    if (show) {
      translateLoader.classList.remove('hidden');
    } else {
      translateLoader.classList.add('hidden');
    }
  }

  // --- Text to Speech (TTS) ---
  function speak(text, langCode) {
    if (!text) return;
    
    // Stop microphone recordings to avoid self-loop feedback
    if (state.isRecording) {
      stopSpeechRecognition();
    }
    if (practiceRecognition && btnPracticeMic.classList.contains('recording')) {
      practiceRecognition.stop();
      btnPracticeMic.classList.remove('recording');
    }
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    const targetLocale = speechLangMapping[langCode] || 'en-US';
    utterance.lang = targetLocale;
    
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang.includes(targetLocale) || v.lang.startsWith(langCode));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }
    
    window.speechSynthesis.speak(utterance);
    showToast('正在播放朗读音频...', 'info');
  }

  // --- Speech Recognition ---
  function toggleSpeechRecognition() {
    if (!recognition) return;
    
    // Stop practice recording if it is running
    if (practiceRecognition && btnPracticeMic.classList.contains('recording')) {
      practiceRecognition.stop();
      btnPracticeMic.classList.remove('recording');
    }
    
    // Stop any active text-to-speech to prevent capturing it
    window.speechSynthesis.cancel();
    
    if (state.isRecording) {
      stopSpeechRecognition();
    } else {
      const srcLang = srcLangSelect.value;
      recognition.lang = speechLangMapping[srcLang] || 'zh-CN';
      
      try {
        recognition.start();
      } catch (e) {
        console.error(e);
        showToast('无法启动麦克风', 'error');
      }
    }
  }

  function stopSpeechRecognition() {
    if (!recognition) return;
    if (state.isRecording) {
      state.isRecording = false;
      btnMicSrc.classList.remove('recording');
      recognition.stop();
    }
  }

  // --- Toast Alert Notifications ---
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '<i class="fa-solid fa-circle-info"></i>';
    if (type === 'success') {
      icon = '<i class="fa-solid fa-circle-check" style="color: #10b981;"></i>';
    } else if (type === 'error') {
      icon = '<i class="fa-solid fa-circle-exclamation" style="color: #ef4444;"></i>';
    }
    
    toast.innerHTML = `${icon}<span>${message}</span>`;
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  function copyToClipboard(text, successMsg) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg, 'success');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      showToast('复制失败，请手动选择复制', 'error');
    });
  }

  // --- History & Favorites Storage & Rendering ---
  function addToHistory(srcLang, tgtLang, srcText, tgtText) {
    if (state.history.length > 0) {
      const latest = state.history[0];
      if (latest.srcText === srcText && latest.srcLang === srcLang && latest.tgtLang === tgtLang) {
        return;
      }
    }
    
    const record = {
      id: 'hist_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      srcLang,
      tgtLang,
      srcText,
      tgtText,
      timestamp: Date.now()
    };
    
    state.history.unshift(record);
    
    if (state.history.length > 50) {
      state.history.pop();
    }
    
    localStorage.setItem('aura_history', JSON.stringify(state.history));
    renderHistory();
  }

  function toggleCurrentFavorite() {
    if (!state.lastTranslation) return;
    
    const { srcLang, tgtLang, srcText, tgtText } = state.lastTranslation;
    const existingIndex = state.favorites.findIndex(
      f => f.srcText === srcText && f.srcLang === srcLang && f.tgtLang === tgtLang
    );
    
    if (existingIndex > -1) {
      state.favorites.splice(existingIndex, 1);
      showToast('已取消收藏', 'info');
    } else {
      const record = {
        id: 'fav_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        srcLang,
        tgtLang,
        srcText,
        tgtText,
        timestamp: Date.now()
      };
      state.favorites.unshift(record);
      showToast('已加入收藏夹', 'success');
    }
    
    localStorage.setItem('aura_favorites', JSON.stringify(state.favorites));
    updateStarIconState();
    renderFavorites();
  }

  function updateStarIconState(forcedState = null) {
    if (forcedState === false || !state.lastTranslation) {
      btnStarTgt.innerHTML = '<i class="fa-regular fa-star"></i>';
      return;
    }
    
    const { srcLang, tgtLang, srcText } = state.lastTranslation;
    const isStarred = state.favorites.some(
      f => f.srcText === srcText && f.srcLang === srcLang && f.tgtLang === tgtLang
    );
    
    btnStarTgt.innerHTML = isStarred 
      ? '<i class="fa-solid fa-star" style="color: #fbbf24;"></i>' 
      : '<i class="fa-regular fa-star"></i>';
  }

  // --- Rendering UI Panels ---
  function renderHistory() {
    historyList.innerHTML = '';
    
    if (state.history.length === 0) {
      historyEmpty.classList.remove('hidden');
      return;
    }
    
    historyEmpty.classList.add('hidden');
    
    state.history.forEach(item => {
      const li = createRecordItemDOM(item, 'history');
      historyList.appendChild(li);
    });
  }

  function renderFavorites() {
    favoritesList.innerHTML = '';
    
    if (state.favorites.length === 0) {
      favoritesEmpty.classList.remove('hidden');
      return;
    }
    
    favoritesEmpty.classList.add('hidden');
    
    state.favorites.forEach(item => {
      const li = createRecordItemDOM(item, 'favorites');
      favoritesList.appendChild(li);
    });
  }

  function createRecordItemDOM(item, panelType) {
    const li = document.createElement('li');
    li.className = 'record-item';
    
    const displaySrcLang = getLangLabel(item.srcLang);
    const displayTgtLang = getLangLabel(item.tgtLang);
    
    li.innerHTML = `
      <div class="record-header">
        <span class="record-langs">${displaySrcLang} &rarr; ${displayTgtLang}</span>
        <div class="record-actions">
          <button class="record-action-btn copy-rec-btn" title="复制译文">
            <i class="fa-regular fa-copy"></i>
          </button>
          <button class="record-action-btn delete-rec-btn delete-btn" title="删除记录">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>
      <div class="record-body">
        <div class="record-src">${escapeHTML(item.srcText)}</div>
        <div class="record-tgt">${escapeHTML(item.tgtText)}</div>
      </div>
    `;
    
    li.querySelector('.copy-rec-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      copyToClipboard(item.tgtText, '译文已复制到剪贴板');
    });
    
    li.querySelector('.delete-rec-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      deleteRecord(item.id, panelType);
    });
    
    li.querySelector('.record-body').addEventListener('click', () => {
      restoreRecord(item);
    });
    
    return li;
  }

  function deleteRecord(id, panelType) {
    if (panelType === 'history') {
      state.history = state.history.filter(item => item.id !== id);
      localStorage.setItem('aura_history', JSON.stringify(state.history));
      renderHistory();
      showToast('历史记录已删除', 'info');
    } else {
      state.favorites = state.favorites.filter(item => item.id !== id);
      localStorage.setItem('aura_favorites', JSON.stringify(state.favorites));
      renderFavorites();
      updateStarIconState();
      showToast('收藏记录已移除', 'info');
    }
  }

  function restoreRecord(item) {
    clearTimeout(debounceTimeout);
    srcLangSelect.value = item.srcLang;
    tgtLangSelect.value = item.tgtLang;
    srcTextarea.value = item.srcText;
    srcCharCount.textContent = item.srcText.length;
    
    tgtTextPlaceholder.classList.add('hidden');
    tgtTextEl.innerText = item.tgtText;
    enableTargetActions(true);
    updateStatus('success', '已载入记录');
    
    state.lastTranslation = {
      srcLang: item.srcLang,
      tgtLang: item.tgtLang,
      srcText: item.srcText,
      tgtText: item.tgtText
    };
    updateStarIconState();
    
    window.scrollTo({
      top: document.querySelector('.translator-card').offsetTop - 30,
      behavior: 'smooth'
    });
    
    showToast('已恢复所选翻译', 'success');
  }

  function clearActiveRecords() {
    if (state.activeTab === 'history') {
      if (confirm('确认清空所有历史翻译记录吗？')) {
        state.history = [];
        localStorage.setItem('aura_history', JSON.stringify([]));
        renderHistory();
        showToast('历史记录已清空', 'success');
      }
    } else if (state.activeTab === 'favorites') {
      if (confirm('确认清空所有收藏的翻译记录吗？')) {
        state.favorites = [];
        localStorage.setItem('aura_favorites', JSON.stringify([]));
        renderFavorites();
        updateStarIconState();
        showToast('收藏夹已清空', 'success');
      }
    } else if (state.activeTab === 'academy') {
      if (state.activeSubtab === 'vocab') {
        if (confirm('确认清空所有生词本数据吗？')) {
          state.vocabulary = [];
          localStorage.setItem('aura_vocabulary', JSON.stringify([]));
          renderVocabList();
          showToast('生词本已清空', 'success');
        }
      }
    }
  }

  // --- Helper Utilities ---
  function getLangLabel(code) {
    const opt = srcLangSelect.querySelector(`option[value="${code}"]`);
    return opt ? opt.textContent.split(' ')[0] : code;
  }

  function switchTab(tab) {
    state.activeTab = tab;
    updateTabsUI();
  }

  function updateTabsUI() {
    tabHistory.classList.remove('active');
    tabFavorites.classList.remove('active');
    tabAcademy.classList.remove('active');
    
    historyPanel.classList.remove('active');
    favoritesPanel.classList.remove('active');
    academyPanel.classList.remove('active');
    
    if (state.activeTab === 'history') {
      tabHistory.classList.add('active');
      historyPanel.classList.add('active');
      btnClearRecords.textContent = '清空历史';
      btnClearRecords.style.display = 'block';
    } else if (state.activeTab === 'favorites') {
      tabFavorites.classList.add('active');
      favoritesPanel.classList.add('active');
      btnClearRecords.textContent = '清空收藏';
      btnClearRecords.style.display = 'block';
    } else if (state.activeTab === 'academy') {
      tabAcademy.classList.add('active');
      academyPanel.classList.add('active');
      
      // Control Clear button display dynamically based on subtabs
      if (state.activeSubtab === 'vocab') {
        btnClearRecords.textContent = '清空生词';
        btnClearRecords.style.display = 'block';
      } else {
        btnClearRecords.style.display = 'none';
      }
    }
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // --- ========================================================== ---
  // --- Aura Academy Modules implementation ---
  // --- ========================================================== ---

  function switchSubtab(subtab) {
    state.activeSubtab = subtab;
    
    subtabVocab.classList.remove('active');
    subtabQuotes.classList.remove('active');
    subtabCet.classList.remove('active');
    
    academyVocabView.classList.remove('active');
    academyQuotesView.classList.remove('active');
    academyCetView.classList.remove('active');
    
    if (subtabWordLearning) subtabWordLearning.classList.remove('active');
    if (academyWordLearningView) academyWordLearningView.classList.remove('active');
    subtabReader.classList.remove('active');
    subtabDashboard.classList.remove('active');
    academyReaderView.classList.remove('active');
    academyDashboardView.classList.remove('active');

    if (subtab === 'word-learning') {
      if (subtabWordLearning) subtabWordLearning.classList.add('active');
      if (academyWordLearningView) academyWordLearningView.classList.add('active');
      renderCurrentWordStudy();
    } else if (subtab === 'vocab') {
      subtabVocab.classList.add('active');
      academyVocabView.classList.add('active');
    } else if (subtab === 'reader') {
      subtabReader.classList.add('active');
      academyReaderView.classList.add('active');
      stopImmersiveReader(); // Reset reader canvas state on select
      renderReaderHistoryShelf();
    } else if (subtab === 'quotes') {
      subtabQuotes.classList.add('active');
      academyQuotesView.classList.add('active');
    } else if (subtab === 'cet') {
      subtabCet.classList.add('active');
      academyCetView.classList.add('active');
    } else if (subtab === 'dashboard') {
      subtabDashboard.classList.add('active');
      academyDashboardView.classList.add('active');
      renderDashboardCharts();
    }
    
    updateTabsUI(); // Sync the Clear button status
  }

  // --- 1. Vocabulary & Flashcard logic ---

  // Save translated target text to Vocabulary (only for EN target/source translations)
  function addCurrentToVocabulary() {
    if (!state.lastTranslation) return;
    
    const { srcLang, tgtLang, srcText, tgtText } = state.lastTranslation;
    
    // Auto figure out what is English
    let englishWord = "";
    let chineseMeaning = "";
    
    if (srcLang === 'en') {
      englishWord = srcText;
      chineseMeaning = tgtText;
    } else if (tgtLang === 'en') {
      englishWord = tgtText;
      chineseMeaning = srcText;
    } else {
      showToast('只有涉及英语的翻译才支持加入生词本哦', 'error');
      return;
    }
    
    saveToVocabularyData(englishWord, chineseMeaning);
  }

  function saveToVocabularyData(word, translation) {
    const trimmedWord = word.trim();
    if (!trimmedWord) return;
    
    // Check duplication
    const duplicate = state.vocabulary.some(v => v.word.toLowerCase() === trimmedWord.toLowerCase());
    if (duplicate) {
      showToast('该单词已在生词本中', 'info');
      return;
    }
    
    const item = {
      id: 'vocab_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      word: trimmedWord,
      pron: '/' + trimmedWord.toLowerCase() + '/', // Generate phonetic mock
      translation: translation.trim(),
      timestamp: Date.now()
    };
    
    // Asynchronously fetch phonetic and audio from DictionaryAPI
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(trimmedWord)}`)
      .then(res => {
        if (!res.ok) throw new Error('Phonetics API returned error status.');
        return res.json();
      })
      .then(data => {
        if (data && data[0]) {
          const entry = data[0];
          let ipa = entry.phonetic;
          if (!ipa && entry.phonetics && entry.phonetics.length > 0) {
            const withText = entry.phonetics.find(p => p.text);
            if (withText) ipa = withText.text;
          }
          if (ipa) {
            item.pron = ipa;
          }
          let audioUrl = "";
          const withAudio = entry.phonetics.find(p => p.audio && p.audio.trim());
          if (withAudio) audioUrl = withAudio.audio;
          if (audioUrl) {
            item.audio = audioUrl;
          }
          
          const idx = state.vocabulary.findIndex(v => v.id === item.id);
          if (idx > -1) {
            state.vocabulary[idx] = item;
            localStorage.setItem('aura_vocabulary', JSON.stringify(state.vocabulary));
            renderVocabList();
          }
        }
      })
      .catch(err => console.log('Pronunciation API fetch failed, fallback active:', err));
      
    state.vocabulary.unshift(item);
    localStorage.setItem('aura_vocabulary', JSON.stringify(state.vocabulary));
    
    renderVocabList();
    showToast('已存入英语生词本', 'success');
  }

  function renderVocabList() {
    vocabList.innerHTML = '';
    vocabTotalCount.textContent = state.vocabulary.length;
    
    if (state.vocabulary.length === 0) {
      vocabEmpty.classList.remove('hidden');
      vocabListContainer.classList.remove('hidden');
      // If we are in card mode but empty, switch back to list mode
      toggleVocabLayout('list');
      return;
    }
    
    vocabEmpty.classList.add('hidden');
    
    state.vocabulary.forEach(item => {
      const li = document.createElement('li');
      li.className = 'record-item';
      li.innerHTML = `
        <div class="record-header">
          <span class="record-langs">英语生词</span>
          <div class="record-actions">
            <button class="record-action-btn speak-vocab-btn" title="朗读发音">
              <i class="fa-solid fa-volume-high"></i>
            </button>
            <button class="record-action-btn delete-vocab-btn delete-btn" title="移出生词本">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
        <div class="record-body">
          <div class="record-src">${escapeHTML(item.word)}</div>
          <div class="record-tgt">${escapeHTML(item.translation)}</div>
        </div>
      `;
      
      li.querySelector('.speak-vocab-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        speak(item.word, 'en');
      });
      
      li.querySelector('.delete-vocab-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        deleteVocabularyItem(item.id);
      });
      
      li.querySelector('.record-body').addEventListener('click', () => {
        // Load into translator card for details
        srcLangSelect.value = 'en';
        tgtLangSelect.value = 'zh-CN';
        srcTextarea.value = item.word;
        srcCharCount.textContent = item.word.length;
        
        tgtTextPlaceholder.classList.add('hidden');
        tgtTextEl.innerText = item.translation;
        enableTargetActions(true);
        updateStatus('success', '已载入生词');
        
        state.lastTranslation = {
          srcLang: 'en',
          tgtLang: 'zh-CN',
          srcText: item.word,
          tgtText: item.translation
        };
        updateStarIconState();
        
        window.scrollTo({
          top: document.querySelector('.translator-card').offsetTop - 30,
          behavior: 'smooth'
        });
      });

      vocabList.appendChild(li);
    });

    // Update Card Study decks index boundary
    if (state.activeCardIndex >= state.vocabulary.length) {
      state.activeCardIndex = 0;
    }
    loadActiveFlashcard();
  }

  function deleteVocabularyItem(id) {
    state.vocabulary = state.vocabulary.filter(v => v.id !== id);
    localStorage.setItem('aura_vocabulary', JSON.stringify(state.vocabulary));
    renderVocabList();
    showToast('生词已移除', 'info');
  }

  function toggleVocabLayout(mode) {
    btnToggleVocabList.classList.remove('active');
    btnToggleVocabCard.classList.remove('active');
    
    vocabListContainer.classList.add('hidden');
    vocabCardContainer.classList.add('hidden');
    
    if (mode === 'list') {
      btnToggleVocabList.classList.add('active');
      vocabListContainer.classList.remove('hidden');
    } else {
      if (state.vocabulary.length === 0) {
        showToast('生词本暂无内容，无法使用卡片模式背诵哦', 'info');
        btnToggleVocabList.classList.add('active');
        vocabListContainer.classList.remove('hidden');
        return;
      }
      btnToggleVocabCard.classList.add('active');
      vocabCardContainer.classList.remove('hidden');
      state.activeCardIndex = 0;
      loadActiveFlashcard();
    }
  }

  function loadActiveFlashcard() {
    const activeQueue = getReviewQueue();
    const isReviewMode = activeQueue.length > 0;
    
    // Toggle card deck info badge
    if (isReviewMode) {
      vocabReviewCount.textContent = activeQueue.length;
      vocabReviewInfo.classList.remove('hidden');
    } else {
      vocabReviewInfo.classList.add('hidden');
    }

    const currentDeck = isReviewMode ? activeQueue : state.vocabulary;
    if (currentDeck.length === 0) return;
    
    // Wrap index safety bounds
    if (state.activeCardIndex >= currentDeck.length) {
      state.activeCardIndex = 0;
    }
    
    const card = currentDeck[state.activeCardIndex];
    
    // Ensure we are showing front side first
    studyFlashcard.classList.remove('flipped');
    
    cardFrontWord.textContent = card.word;
    cardFrontPron.textContent = card.pron || `/${card.word.toLowerCase()}/`;
    cardBackTranslation.textContent = card.translation;
    
    const date = new Date(card.timestamp);
    cardBackTime.textContent = `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }

  function navigateFlashcard(direction) {
    const activeQueue = getReviewQueue();
    const currentDeck = activeQueue.length > 0 ? activeQueue : state.vocabulary;
    if (currentDeck.length === 0) return;
    
    state.activeCardIndex += direction;
    
    // Loop boundary
    if (state.activeCardIndex < 0) {
      state.activeCardIndex = currentDeck.length - 1;
    } else if (state.activeCardIndex >= currentDeck.length) {
      state.activeCardIndex = 0;
    }
    
    loadActiveFlashcard();
  }

  function markActiveCardMastered() {
    if (state.vocabulary.length === 0) return;
    
    const activeWord = state.vocabulary[state.activeCardIndex];
    deleteVocabularyItem(activeWord.id);
    showToast(`"${activeWord.word}" 已掌握，移出生词本！`, 'success');
  }

  // --- Oral Speech Recognition Practice Tester ---
  let practiceRecognition = null;
  let targetPracticeText = "";

  function openPronunciationPractice(sentenceText = "") {
    if (!SpeechRecognition) {
      showToast('当前浏览器不支持语音评测功能 (SpeechRecognition)', 'error');
      return;
    }
    
    // If no custom text passed, fetch text from current flashcard
    if (typeof sentenceText !== 'string' || !sentenceText.trim()) {
      if (state.vocabulary.length === 0) return;
      targetPracticeText = state.vocabulary[state.activeCardIndex].word;
    } else {
      targetPracticeText = sentenceText;
    }
    
    practiceTargetSentence.textContent = targetPracticeText;
    practiceStatusText.textContent = '点击麦克风开始跟读...';
    practiceResultPanel.classList.add('hidden');
    
    // Reset ring animation
    practiceScoreRing.setAttribute('stroke-dasharray', '0, 100');
    practiceScoreText.textContent = "0%";
    
    cardPracticePanel.classList.remove('hidden');
    
    // Initialize specific practice recognition
    if (!practiceRecognition) {
      practiceRecognition = new SpeechRecognition();
      practiceRecognition.continuous = false;
      practiceRecognition.interimResults = false;
      practiceRecognition.lang = 'en-US'; // Practice English
      
      practiceRecognition.onstart = () => {
        btnPracticeMic.classList.add('recording');
        practiceStatusText.textContent = '正在聆听您的发音，请说话...';
      };
      
      practiceRecognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        if (spokenText) {
          evaluatePronunciation(spokenText);
        }
      };
      
      practiceRecognition.onerror = (event) => {
        console.error(event.error);
        practiceStatusText.textContent = '语音输入遇到问题，请重新开始';
        btnPracticeMic.classList.remove('recording');
      };
      
      practiceRecognition.onend = () => {
        btnPracticeMic.classList.remove('recording');
      };
    }
  }

  function closePronunciationPractice() {
    if (practiceRecognition) {
      practiceRecognition.stop();
    }
    cardPracticePanel.classList.add('hidden');
  }

  function togglePracticeRecording() {
    if (!practiceRecognition) return;
    
    // Stop main translator voice recording if active
    if (state.isRecording) {
      stopSpeechRecognition();
    }
    
    // Stop active TTS
    window.speechSynthesis.cancel();
    
    // If already running
    if (btnPracticeMic.classList.contains('recording')) {
      practiceRecognition.stop();
    } else {
      try {
        practiceResultPanel.classList.add('hidden');
        practiceRecognition.start();
      } catch (e) {
        console.error(e);
        showToast('麦克风启动失败', 'error');
      }
    }
  }

  function getLevenshteinDistance(a, b) {
    const tmp = [];
    for (let i = 0; i <= a.length; i++) {
      tmp[i] = [i];
    }
    for (let j = 0; j <= b.length; j++) {
      tmp[0][j] = j;
    }
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        tmp[i][j] = Math.min(
          tmp[i - 1][j] + 1, // deletion
          tmp[i][j - 1] + 1, // insertion
          tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1) // substitution
        );
      }
    }
    return tmp[a.length][b.length];
  }

  function evaluatePronunciation(spokenText) {
    const cleanPunctuation = (str) => {
      return str.toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
        .replace(/\s+/g, " ")
        .trim();
    };
    
    const targetCleaned = cleanPunctuation(targetPracticeText);
    const spokenCleaned = cleanPunctuation(spokenText);
    
    if (!targetCleaned || !spokenCleaned) {
      practiceScoreRing.setAttribute('stroke-dasharray', '0, 100');
      practiceScoreText.textContent = '0%';
      practiceFeedbackText.textContent = "未能识别到发音，请重新尝试";
      practiceStatusText.innerHTML = `听到您说的是: <span style="color: var(--accent-primary);">"${spokenText || '...'}"</span>`;
      practiceResultPanel.classList.remove('hidden');
      return;
    }
    
    // Levenshtein Similarity (character level)
    const maxLen = Math.max(targetCleaned.length, spokenCleaned.length);
    const distance = getLevenshteinDistance(targetCleaned, spokenCleaned);
    const charScore = Math.round((1 - distance / maxLen) * 100);
    
    // Word match ratio
    const targetWords = targetCleaned.split(' ');
    const spokenWords = spokenCleaned.split(' ');
    let wordMatches = 0;
    targetWords.forEach(word => {
      if (spokenWords.includes(word)) {
        wordMatches++;
      }
    });
    const wordScore = Math.round((wordMatches / targetWords.length) * 100);
    
    // Hybrid scoring formula
    const score = Math.max(0, Math.min(100, Math.round(charScore * 0.4 + wordScore * 0.6)));
    
    // Animate Chart SVG ring
    practiceScoreRing.setAttribute('stroke-dasharray', `${score}, 100`);
    practiceScoreText.textContent = `${score}%`;
    
    // Construct feedback message
    let feedback = "";
    if (score >= 85) {
      feedback = "完美！发音非常清晰地道！";
    } else if (score >= 65) {
      feedback = "很好！发音较标准，继续保持！";
    } else if (score >= 40) {
      feedback = "不错，部分单词可以发音更圆润一些。";
    } else {
      feedback = "加油！请再听一遍录音并大声模仿。";
    }
    
    practiceFeedbackText.textContent = feedback;
    practiceStatusText.innerHTML = `听到您说的是: <span style="font-weight: 700; color: var(--accent-primary);">${spokenText}</span>`;
    practiceResultPanel.classList.remove('hidden');

    // Save Oral Stats for charts
    try {
      state.stats.oralScores.push({
        timestamp: Date.now(),
        word: targetPracticeText,
        score: score
      });
      if (state.stats.oralScores.length > 30) state.stats.oralScores.shift();
      localStorage.setItem('aura_stats', JSON.stringify(state.stats));
    } catch(e) {
      console.log('Failed to save oral stats:', e);
    }
  }


  // --- 2. Daily Quotes logic ---

  function renderDailyQuote() {
    // Get a quote based on Day of the month to make it look "Daily"
    const day = new Date().getDate();
    const quoteIndex = day % quotesDatabase.length;
    const quote = quotesDatabase[quoteIndex];
    
    quoteEnText.textContent = quote.en;
    quoteZhText.textContent = quote.zh;
    
    quoteVocabList.innerHTML = '';
    quote.vocab.forEach(v => {
      const tag = document.createElement('button');
      tag.className = 'vocab-tag';
      tag.innerHTML = `
        <span><strong>${v.word}</strong> <small>${v.pron}</small> &rarr; ${v.trans}</span>
        <i class="fa-solid fa-plus-circle"></i>
      `;
      
      tag.addEventListener('click', () => {
        saveToVocabularyData(v.word, v.trans);
      });
      
      quoteVocabList.appendChild(tag);
    });
  }


  // --- 3. CET Prep Exam Module logic ---

  function loadCETPlan() {
    const target = state.cetProgress.activeTarget;
    
    btnCet4Tab.classList.remove('active');
    btnCet6Tab.classList.remove('active');
    
    if (target === 'cet4') {
      btnCet4Tab.classList.add('active');
    } else {
      btnCet6Tab.classList.add('active');
    }
    
    // Generate 30 day checkboxes
    cetCalendarGrid.innerHTML = '';
    const completedDaysMap = target === 'cet4' ? state.cetProgress.cet4Days : state.cetProgress.cet6Days;
    let completedCount = 0;
    
    for (let day = 1; day <= 30; day++) {
      const card = document.createElement('div');
      const isCompleted = !!completedDaysMap[day];
      card.className = `calendar-day ${isCompleted ? 'completed' : ''}`;
      card.innerHTML = `<span>D${day}</span>`;
      
      if (isCompleted) completedCount++;
      
      card.addEventListener('click', () => {
        toggleStudyDayCheck(day);
      });
      
      cetCalendarGrid.appendChild(card);
    }
    
    // Calculate progress percentage
    const progressPercent = Math.round((completedCount / 30) * 100);
    cetProgressVal.textContent = `${progressPercent}%`;
    cetProgressFill.style.width = `${progressPercent}%`;
  }

  function switchCETTarget(targetCode) {
    state.cetProgress.activeTarget = targetCode;
    localStorage.setItem('aura_cet_progress', JSON.stringify(state.cetProgress));
    loadCETPlan();
    
    // Reload practice questions matching target exam
    state.activeQuizIndex = 0;
    loadQuizQuestion();
  }

  function toggleStudyDayCheck(dayNum) {
    const target = state.cetProgress.activeTarget;
    const completedDaysMap = target === 'cet4' ? state.cetProgress.cet4Days : state.cetProgress.cet6Days;
    
    completedDaysMap[dayNum] = !completedDaysMap[dayNum];
    
    localStorage.setItem('aura_cet_progress', JSON.stringify(state.cetProgress));
    loadCETPlan();
    
    showToast(`D${dayNum} 打卡状态已更新`, 'success');
  }

  // Quiz questions handler
  function loadQuizQuestion() {
    const target = state.cetProgress.activeTarget; // 'cet4' or 'cet6'
    const type = state.activeQuizType; // 'vocab' or 'reading'
    
    // Auto restore previous quiz breakpoint index from cetProgress
    const savedIndexKey = `${target}${type === 'vocab' ? 'Vocab' : 'Reading'}Index`;
    if (state.activeQuizIndex === 0 && state.cetProgress[savedIndexKey] !== undefined) {
      state.activeQuizIndex = state.cetProgress[savedIndexKey];
    }
    
    const bank = cetQuizzesDatabase[target][type];
    
    // Reset answer logs
    state.hasAnsweredQuiz = false;
    state.selectedQuizOption = null;
    btnSaveWrong.disabled = true;
    
    // Wrap navigation index loop
    if (state.activeQuizIndex >= bank.length) {
      state.activeQuizIndex = 0;
    }
    
    const questionData = bank[state.activeQuizIndex];
    
    quizQNum.textContent = `第 ${state.activeQuizIndex + 1} / ${bank.length} 题`;
    quizQType.textContent = type === 'vocab' ? '词汇专项' : '仔细阅读';
    
    // Load question stem text
    quizQuestionStem.textContent = questionData.question;
    
    // Render Reading passage if reading type
    if (type === 'reading') {
      quizPassageContainer.textContent = questionData.passage;
      quizPassageContainer.classList.remove('hidden');
    } else {
      quizPassageContainer.classList.add('hidden');
    }
    
    // Hide analysis cards
    quizExplanationPanel.classList.add('hidden');
    
    // Render option list
    quizOptionsList.innerHTML = '';
    questionData.options.forEach((optText, index) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `<span>${optText}</span>`;
      
      btn.addEventListener('click', () => {
        if (state.hasAnsweredQuiz) return; // Prevent double submits
        submitQuizAnswer(btn, index, questionData);
      });
      
      quizOptionsList.appendChild(btn);
    });
  }

  function submitQuizAnswer(selectedBtn, selectedIndex, questionData) {
    state.hasAnsweredQuiz = true;
    state.selectedQuizOption = selectedIndex;
    
    const correctIndex = questionData.answer;
    const isCorrect = selectedIndex === correctIndex;
    
    // Style correct option green
    const allOptionBtns = quizOptionsList.querySelectorAll('.option-btn');
    allOptionBtns[correctIndex].classList.add('correct');
    
    if (isCorrect) {
      selectedBtn.classList.add('correct');
      quizResultBadge.textContent = '正确';
      quizResultBadge.className = 'status-badge correct-badge';
      showToast('回答正确！太棒了', 'success');
      
      // If this was a retry from wrong questions book, prompt to remove it
      const inWrongBook = state.wrongQuestions.some(q => q.id === questionData.id);
      if (inWrongBook) {
        setTimeout(() => {
          if (confirm('恭喜您答对了！是否将这道题从错题本中移除？')) {
            deleteWrongQuestion(questionData.id);
          }
        }, 800);
      }
      
      // Update Quiz counter stats
      try {
        state.stats.quizCount = (state.stats.quizCount || 0) + 1;
        localStorage.setItem('aura_stats', JSON.stringify(state.stats));
      } catch(e) {
        console.log(e);
      }
    } else {
      selectedBtn.classList.add('incorrect');
      quizResultBadge.textContent = '错误';
      quizResultBadge.className = 'status-badge incorrect-badge';
      
      // Enable Wrong question save option
      btnSaveWrong.disabled = false;
      showToast('回答错误，解析已展示', 'error');
    }
    
    // Show explanations
    quizCorrectAnswer.textContent = questionData.options[correctIndex].charAt(0);
    quizExplanationText.textContent = questionData.explanation;
    quizExplanationPanel.classList.remove('hidden');
  }

  // --- Wrong Questions Storage & Drawer logic ---

  function updateWrongCount() {
    wrongCount.textContent = state.wrongQuestions.length;
  }

  function addCurrentQuestionToWrong() {
    const target = state.cetProgress.activeTarget;
    const type = state.activeQuizType;
    const question = cetQuizzesDatabase[target][type][state.activeQuizIndex];
    
    const exists = state.wrongQuestions.some(q => q.id === question.id);
    if (exists) {
      showToast('该错题已在记录本中', 'info');
      return;
    }
    
    const record = {
      id: question.id,
      target,
      type,
      question: question.question,
      options: question.options,
      answer: question.answer,
      explanation: question.explanation,
      passage: question.passage || null,
      timestamp: Date.now()
    };
    
    state.wrongQuestions.unshift(record);
    localStorage.setItem('aura_wrong_qs', JSON.stringify(state.wrongQuestions));
    
    updateWrongCount();
    btnSaveWrong.disabled = true; // disable to show it is successfully saved
    showToast('错题已保存至记录本', 'success');
    
    renderWrongQuestions();
  }

  function toggleWrongQuestionsDrawer(show) {
    if (show) {
      renderWrongQuestions();
      wrongQuestionsDrawer.classList.remove('hidden');
    } else {
      wrongQuestionsDrawer.classList.add('hidden');
    }
  }

  function renderWrongQuestions() {
    wrongQuestionsList.innerHTML = '';
    
    if (state.wrongQuestions.length === 0) {
      wrongEmpty.classList.remove('hidden');
      return;
    }
    
    wrongEmpty.classList.add('hidden');
    
    state.wrongQuestions.forEach(item => {
      const li = document.createElement('li');
      li.className = 'record-item wrong-rec-item';
      
      const categoryLabel = item.target.toUpperCase() + ' ' + (item.type === 'vocab' ? '词汇' : '阅读');
      
      li.innerHTML = `
        <div class="record-header">
          <span class="record-langs">${categoryLabel}</span>
          <div class="record-actions">
            <button class="wrong-rec-btn retry-q-btn">重新练习</button>
            <button class="record-action-btn delete-wrong-btn delete-btn" title="移出记录本">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
        <div style="padding-top: 0.5rem;">
          <div class="quiz-stem" style="font-size: 0.95rem;">${escapeHTML(item.question)}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem;">
            正确答案: <strong>${item.options[item.answer]}</strong>
          </div>
        </div>
      `;
      
      // Retry question action
      li.querySelector('.retry-q-btn').addEventListener('click', () => {
        // Load this question back into the CET quiz board
        state.cetProgress.activeTarget = item.target;
        state.activeQuizType = item.type;
        
        // Find local index
        const bank = cetQuizzesDatabase[item.target][item.type];
        const matchIndex = bank.findIndex(q => q.id === item.id);
        
        state.activeQuizIndex = matchIndex > -1 ? matchIndex : 0;
        
        // Render UI
        switchSubtab('cet');
        loadCETPlan();
        
        // Sync category active classes on subtab buttons
        document.querySelectorAll('.quiz-tab-btn').forEach(btn => {
          btn.classList.remove('active');
          if (btn.dataset.quizType === item.type) {
            btn.classList.add('active');
          }
        });
        
        loadQuizQuestion();
        toggleWrongQuestionsDrawer(false);
        
        showToast('已加载重做错题', 'success');
      });
      
      // Delete wrong question item action
      li.querySelector('.delete-wrong-btn').addEventListener('click', () => {
        deleteWrongQuestion(item.id);
      });
      
      wrongQuestionsList.appendChild(li);
    });
  }

  function deleteWrongQuestion(id) {
    state.wrongQuestions = state.wrongQuestions.filter(q => q.id !== id);
    localStorage.setItem('aura_wrong_qs', JSON.stringify(state.wrongQuestions));
    renderWrongQuestions();
    updateWrongCount();
    showToast('错题已移出记录本', 'info');
  }

  // --- 1. OCR (Tesseract.js) Implementation ---
  function performOCR(imageFile) {
    if (!window.Tesseract) {
      showToast('OCR 引擎未加载，请检查网络！', 'error');
      return;
    }

    ocrLoader.classList.remove('hidden');
    
    window.Tesseract.recognize(
      imageFile,
      'eng',
      { logger: m => console.log('OCR logging:', m) }
    ).then(({ data: { text } }) => {
      ocrLoader.classList.add('hidden');
      if (text && text.trim()) {
        srcTextarea.value = text.trim();
        srcTextarea.dispatchEvent(new Event('input'));
        showToast('图片英文提取成功，正在翻译...', 'success');
      } else {
        showToast('未能从图片中提取到有效英文字符！', 'warning');
      }
    }).catch(err => {
      console.error('OCR processing error:', err);
      ocrLoader.classList.add('hidden');
      showToast('OCR 文字提取失败！', 'error');
    });
  }

  // --- 2. Ebbinghaus (SM-2) Spaced Repetition logic ---
  function getReviewQueue() {
    const now = Date.now();
    return state.vocabulary.filter(v => {
      // If word has never been graded or memory review date has arrived/expired
      return !v.nextReview || v.nextReview <= now;
    });
  }

  function updateSpacedRepetition(itemId, grade) {
    const idx = state.vocabulary.findIndex(v => v.id === itemId);
    if (idx === -1) return;

    const item = state.vocabulary[idx];
    let ease = item.ease || 2.5;
    let reps = item.reps || 0;
    let interval = item.interval || 0;

    // SM-2 update formula
    if (grade >= 3) {
      if (reps === 0) {
        interval = 1; // 1 day
      } else if (reps === 1) {
        interval = 3; // 3 days
      } else {
        interval = Math.round(interval * ease);
      }
      reps++;
    } else {
      reps = 0;
      interval = 1; // Repeat tomorrow
    }

    // Ease Factor adjustment
    ease = ease + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
    if (ease < 1.3) ease = 1.3;

    item.ease = ease;
    item.reps = reps;
    item.interval = interval;
    item.nextReview = Date.now() + interval * 24 * 60 * 60 * 1000;

    // Save and re-render
    localStorage.setItem('aura_vocabulary', JSON.stringify(state.vocabulary));
    renderVocabList();
    showToast(`复习等级已记录：该词下次复习在 ${interval} 天后`, 'success');
  }

  // --- 3. Immersive Reader Implementation ---
  function startImmersiveReader() {
    const articleText = readerPasteText.value.trim();
    if (!articleText) {
      showToast('请粘贴要阅读的文章内容！', 'warning');
      return;
    }

    // Wrap paragraphs
    const escapedParas = articleText.split('\n').map(p => {
      const trimmed = p.trim();
      return trimmed ? `<p>${escapeHTML(trimmed)}</p>` : '';
    }).join('');

    readerArticleContent.innerHTML = escapedParas;
    readerInputArea.classList.add('hidden');
    readerReadingArea.classList.remove('hidden');

    // Save article to bookshelf history
    saveReaderArticleToHistory(articleText.substring(0, 25), articleText);
    
    // Clear sidebar list
    readerVocabList.innerHTML = '';
    readerVocabEmpty.classList.remove('hidden');
  }

  function stopImmersiveReader() {
    readerInputArea.classList.remove('hidden');
    readerReadingArea.classList.add('hidden');
    readerPasteText.value = '';
    readerFloatBubble.classList.add('hidden');
  }

  function handleTextSelection(e) {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    // Check if selection contains valid letters
    if (selectedText.length > 1 && /[a-zA-Z]/.test(selectedText)) {
      state.readerSelectedText = selectedText;
      
      // Calculate float bubble location offset
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      // Show bubble placeholder loader
      bubbleTargetWord.textContent = selectedText;
      bubbleTargetPron.textContent = '正在获取音标...';
      bubbleTargetTrans.textContent = '正在加载极光翻译...';
      
      readerFloatBubble.classList.remove('hidden');
      
      // Compute bubble absolute coordinate bounds
      const bubbleWidth = readerFloatBubble.offsetWidth || 240;
      const bubbleHeight = readerFloatBubble.offsetHeight || 135;
      
      // Bubble placement calculation (above selection)
      const topOffset = rect.top + window.scrollY - bubbleHeight - 12;
      const leftOffset = rect.left + window.scrollX + (rect.width / 2) - (bubbleWidth / 2);
      
      readerFloatBubble.style.top = `${topOffset}px`;
      readerFloatBubble.style.left = `${leftOffset}px`;

      // Fetch phonetic info (Dictionary API)
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(selectedText.replace(/[^a-zA-Z]/g, ''))}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data[0]) {
            let ipa = data[0].phonetic;
            if (!ipa && data[0].phonetics) {
              const item = data[0].phonetics.find(p => p.text);
              if (item) ipa = item.text;
            }
            bubbleTargetPron.textContent = ipa || '/音标未找到/';
          } else {
            bubbleTargetPron.textContent = '/音标未找到/';
          }
        })
        .catch(() => {
          bubbleTargetPron.textContent = '/音标未找到/';
        });

      // Fetch translation
      fetchTranslation(selectedText, 'en', 'zh-CN')
        .then(transText => {
          bubbleTargetTrans.textContent = transText;
        })
        .catch(err => {
          console.error(err);
          bubbleTargetTrans.textContent = '翻译超时，请稍后重试。';
        });
    } else {
      // Hide tooltip if invalid selection
      readerFloatBubble.classList.add('hidden');
    }
  }

  function addWordToReaderSidebar(word, translation) {
    readerVocabEmpty.classList.add('hidden');
    
    // Render item dynamically
    const li = document.createElement('li');
    li.className = 'record-item';
    li.innerHTML = `
      <div class="record-header">
        <span class="record-langs">阅读积累</span>
        <button class="record-action-btn speak-read-btn"><i class="fa-solid fa-volume-high"></i></button>
      </div>
      <div class="record-body">
        <div class="record-src">${escapeHTML(word)}</div>
        <div class="record-tgt">${escapeHTML(translation)}</div>
      </div>
    `;

    li.querySelector('.speak-read-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      speak(word, 'en');
    });

    readerVocabList.insertBefore(li, readerVocabList.firstChild);
  }

  // --- 4. Chart.js Dashboard visual rendering ---
  function renderDashboardCharts() {
    if (!window.Chart) {
      showToast('图表引擎渲染异常，请刷新！', 'error');
      return;
    }

    // Set header metrics
    statTransTotal.textContent = Object.values(state.stats.transDates).reduce((acc, curr) => acc + curr, 0);
    
    // Count mastered vocab (ease factor >= 2.8 and reps >= 3)
    const masteredCount = state.vocabulary.filter(v => v.ease >= 2.8 && v.reps >= 3).length;
    statVocabMastered.textContent = masteredCount;
    statCetQuestions.textContent = state.stats.quizCount || 0;

    // Destroy existing charts to reload clean canvas
    if (state.charts.lineChart) state.charts.lineChart.destroy();
    if (state.charts.pieChart) state.charts.pieChart.destroy();
    if (state.charts.oralChart) state.charts.oralChart.destroy();

    // Chart 1: Translation activity (Last 7 Days)
    const ctx1 = document.getElementById('chart-translation-activity').getContext('2d');
    const labels1 = [];
    const data1 = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString();
      labels1.push(d.getMonth() + 1 + '月' + d.getDate() + '日');
      data1.push(state.stats.transDates[dateStr] || 0);
    }

    state.charts.lineChart = new Chart(ctx1, {
      type: 'line',
      data: {
        labels: labels1,
        datasets: [{
          label: '每日翻译字数',
          data: data1,
          borderColor: '#7c3aed',
          backgroundColor: 'rgba(124, 58, 237, 0.15)',
          borderWidth: 3,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { display: false }, ticks: { precision: 0 } },
          x: { grid: { display: false } }
        }
      }
    });

    // Chart 2: Ebbinghaus stages distribution
    const ctx2 = document.getElementById('chart-vocab-distribution').getContext('2d');
    const now = Date.now();
    const pendingReviews = state.vocabulary.filter(v => !v.nextReview || v.nextReview <= now).length;
    const learningCount = state.vocabulary.length - pendingReviews - masteredCount;

    state.charts.pieChart = new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: ['今日待复习', '记忆中', '已熟记'],
        datasets: [{
          data: [pendingReviews, Math.max(0, learningCount), masteredCount],
          backgroundColor: ['#ef4444', '#2563eb', '#10b981'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 12, usePointStyle: true } }
        }
      }
    });

    // Render 365-day GitHub Learning Heatmap
    renderHeatmap();

    // Chart 3: Oral pronunciation scores trends (Last 10 records)
    const ctx3 = document.getElementById('chart-oral-scores').getContext('2d');
    const recentScores = state.stats.oralScores.slice(-10);
    const labels3 = recentScores.map((_, i) => `第 ${i+1} 次`);
    const data3 = recentScores.map(s => s.score);

    state.charts.oralChart = new Chart(ctx3, {
      type: 'bar',
      data: {
        labels: labels3.length > 0 ? labels3 : ['暂无数据'],
        datasets: [{
          label: '匹配得分',
          data: data3.length > 0 ? data3 : [0],
          backgroundColor: 'rgba(59, 130, 246, 0.75)',
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { max: 100, min: 0 },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // --- 5. Export Vocabulary to standard CSV file ---
  function exportVocabularyToCSV() {
    if (state.vocabulary.length === 0) {
      showToast('生词本为空，无需导出！', 'warning');
      return;
    }

    let csvContent = "\ufeff"; // Add UTF-8 BOM for Excel Chinese characters compatibility
    csvContent += "单词,中文释义,音标,保存时间,艾宾浩斯EF值,复习次数,下一次复习时间\n";
    
    state.vocabulary.forEach(item => {
      const dateStr = new Date(item.timestamp).toLocaleString().replace(/,/g, " ");
      const word = item.word.replace(/"/g, '""');
      const trans = item.translation.replace(/"/g, '""');
      const pron = (item.pron || "").replace(/"/g, '""');
      const nextRev = item.nextReview ? new Date(item.nextReview).toLocaleString().replace(/,/g, " ") : "立即复习";
      
      csvContent += `"${word}","${trans}","${pron}","${dateStr}",${item.ease || 2.5},${item.reps || 0},"${nextRev}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AuraTranslate_生词本_${new Date().toLocaleDateString()}.csv`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);

    showToast('生词本已导出为标准 Excel/Anki 兼容 CSV 格式！', 'success');
  }

  // --- 6. Immersive Reader BookShelf Article Saving ---
  function saveReaderArticleToHistory(title, text) {
    if (!title || !text) return;
    
    const existsIdx = state.readerHistory.findIndex(h => h.text.trim() === text.trim());
    if (existsIdx !== -1) {
      const item = state.readerHistory.splice(existsIdx, 1)[0];
      state.readerHistory.unshift(item);
    } else {
      state.readerHistory.unshift({
        id: 'read_' + Date.now(),
        title: title.length > 15 ? title.substring(0, 15) + '...' : title,
        text: text,
        timestamp: Date.now()
      });
    }

    if (state.readerHistory.length > 5) {
      state.readerHistory.pop();
    }

    localStorage.setItem('aura_reader_history', JSON.stringify(state.readerHistory));
    renderReaderHistoryShelf();
  }

  function renderReaderHistoryShelf() {
    if (!readerHistoryBookshelf || !readerHistoryList) return;
    if (state.readerHistory.length === 0) {
      readerHistoryBookshelf.classList.add('hidden');
      return;
    }

    readerHistoryBookshelf.classList.remove('hidden');
    readerHistoryList.innerHTML = '';

    state.readerHistory.forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'mini-btn';
      btn.style.cssText = 'font-size:0.75rem; display: flex; align-items: center; gap: 0.35rem; border-radius: 12px; padding: 0.35rem 0.65rem; background: var(--input-bg); margin-bottom: 0.25rem;';
      btn.innerHTML = `<i class="fa-solid fa-file-lines" style="color: var(--accent-primary);"></i> <span>${escapeHTML(item.title)}</span> <i class="fa-solid fa-xmark delete-history-btn" style="font-size:0.6rem; color:var(--text-muted); cursor:pointer; margin-left:0.25rem;" title="删除此记录"></i>`;
      
      btn.addEventListener('click', (e) => {
        if (e.target.closest('.delete-history-btn')) {
          e.stopPropagation();
          deleteReaderHistory(item.id);
          return;
        }
        readerPasteText.value = item.text;
        startImmersiveReader();
        showToast('已加载历史阅读文章', 'success');
      });

      readerHistoryList.appendChild(btn);
    });
  }

  function deleteReaderHistory(id) {
    state.readerHistory = state.readerHistory.filter(h => h.id !== id);
    localStorage.setItem('aura_reader_history', JSON.stringify(state.readerHistory));
    renderReaderHistoryShelf();
    showToast('已从历史书架移除', 'info');
  }

  // --- Phase 4: Grammar Analysis Logic ---
  function analyzeSentenceGrammar() {
    const text = srcTextarea.value.trim();
    if (!text) {
      showToast('请输入要进行语法拆解的句子！', 'warning');
      return;
    }

    grammarBreakdownDrawer.classList.remove('hidden');
    grammarStructureText.textContent = '正在使用 AI 拆解句法结构...';
    grammarCollocationsTags.innerHTML = '';

    setTimeout(() => {
      // Analyze clause structure
      const isComplex = text.includes(',') || text.includes('that') || text.includes('which') || text.includes('because') || text.includes('although');
      const words = text.split(/\s+/);
      
      let structureDesc = "";
      if (words.length <= 5) {
        structureDesc = "【简单句结构】：主语 + 谓语短语。表达直接连贯。";
      } else if (isComplex) {
        structureDesc = "【复合句/主从复合结构】：包含引导词连接的主句与副词/定语从句，结构层次分明。";
      } else {
        structureDesc = "【标准单句结构】：包含独立的主谓宾语及修饰成分。";
      }

      grammarStructureText.textContent = structureDesc;

      // Extract key collocations & words
      const keyWords = words.filter(w => w.length > 4 && /[a-zA-Z]/.test(w)).slice(0, 5);
      keyWords.forEach(w => {
        const cleanWord = w.replace(/[^a-zA-Z]/g, '');
        if (cleanWord) {
          const span = document.createElement('span');
          span.className = 'vocab-tag-btn';
          span.innerHTML = `<i class="fa-solid fa-code-branch"></i> ${escapeHTML(cleanWord)}`;
          span.addEventListener('click', () => {
            fetchTranslation(cleanWord, 'en', 'zh-CN').then(t => showToast(`${cleanWord}: ${t}`, 'info'));
          });
          grammarCollocationsTags.appendChild(span);
        }
      });

      if (grammarCollocationsTags.children.length === 0) {
        grammarCollocationsTags.innerHTML = '<span style="font-size:0.8rem; color:var(--text-muted);">暂无特殊高频短语</span>';
      }
    }, 300);
  }

  // --- Phase 4: GitHub-Style 365-Day Heatmap Renderer ---
  function renderHeatmap() {
    if (!heatmapGridContainer || !streakDaysCount) return;
    
    heatmapGridContainer.innerHTML = '';
    
    const today = new Date();
    const daysToShow = 140; // ~20 weeks of grid blocks
    let currentStreak = 0;
    let tempStreak = 0;
    
    for (let i = daysToShow - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toLocaleDateString();
      const wordCount = state.stats.transDates[dateStr] || 0;
      
      // Calculate level 0-4
      let lvl = 0;
      if (wordCount > 500) lvl = 4;
      else if (wordCount > 200) lvl = 3;
      else if (wordCount > 50) lvl = 2;
      else if (wordCount > 0) lvl = 1;

      // Track consecutive streak
      if (wordCount > 0) {
        tempStreak++;
        if (i === 0 || tempStreak > currentStreak) currentStreak = tempStreak;
      } else {
        if (i !== 0) tempStreak = 0;
      }

      const cell = document.createElement('div');
      cell.className = `heatmap-cell lvl-${lvl}`;
      cell.title = `${dateStr}: 学习翻译 ${wordCount} 字`;
      heatmapGridContainer.appendChild(cell);
    }

    streakDaysCount.textContent = currentStreak;
  }

  // --- Quiz Bank Extensions: AI Quiz Generator & External Import ---
  function loadExternalQuizBank() {
    // 1. Fetch quiz_bank.json asynchronously
    fetch('quiz_bank.json')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          if (data.cet4 && data.cet4.vocab) cetQuizzesDatabase.cet4.vocab.push(...data.cet4.vocab);
          if (data.cet4 && data.cet4.reading) cetQuizzesDatabase.cet4.reading.push(...data.cet4.reading);
          if (data.cet6 && data.cet6.vocab) cetQuizzesDatabase.cet6.vocab.push(...data.cet6.vocab);
          if (data.cet6 && data.cet6.reading) cetQuizzesDatabase.cet6.reading.push(...data.cet6.reading);
        }
      })
      .catch(e => console.log('quiz_bank.json load skipped:', e));

    // 2. Merge custom imported quiz bank
    if (state.customQuizBank && state.customQuizBank.length > 0) {
      cetQuizzesDatabase.cet4.vocab.unshift(...state.customQuizBank);
    }
  }

  function generateAiVocabQuiz() {
    if (state.vocabulary.length === 0) {
      showToast('生词本为空！请先在翻译或阅读时加入一些生词再使用 AI 出题！', 'warning');
      return;
    }

    showToast('正在根据您的生词本智能出题...', 'info');
    
    // Pick up to 5 random words from vocabulary
    const sampled = [...state.vocabulary].sort(() => 0.5 - Math.random()).slice(0, 5);
    const generated = [];

    sampled.forEach((v, idx) => {
      // Build 4 option choices
      const distractors = ['A. 快速的；急剧的', 'B. 简单的；易懂的', 'C. 复杂的；难懂的', 'D. 重要的；显著的'];
      const correctText = `中文释义：${v.translation}`;
      
      const options = [
        correctText,
        distractors[0],
        distractors[1],
        distractors[2]
      ].sort(() => 0.5 - Math.random());

      const correctIndex = options.indexOf(correctText);

      generated.push({
        id: 'ai_q_' + Date.now() + '_' + idx,
        question: `请选择生词 【 ${v.word} 】 (${v.pron || ''}) 的正确中文释义：`,
        options: options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt.replace(/^中文释义：/, '')}`),
        answer: correctIndex,
        explanation: `生词【${v.word}】保存在您的生词本中。正确释义为：${v.translation}。`
      });
    });

    // Unshift into active quiz bank and reload
    cetQuizzesDatabase.cet4.vocab.unshift(...generated);
    state.activeQuizType = 'vocab';
    state.activeQuizIndex = 0;
    loadQuizQuestion();
    showToast(`已成功为您的生词本生成 ${generated.length} 道针对性模拟题！`, 'success');
  }

  function handleImportQuizBankFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const json = JSON.parse(evt.target.result);
        const list = Array.isArray(json) ? json : (json.vocab || json.questions || []);
        
        if (list.length === 0) {
          showToast('导入文件格式不符或数据为空！需包含 question, options, answer 字段。', 'error');
          return;
        }

        state.customQuizBank.unshift(...list);
        localStorage.setItem('aura_custom_quiz_bank', JSON.stringify(state.customQuizBank));
        
        cetQuizzesDatabase.cet4.vocab.unshift(...list);
        state.activeQuizIndex = 0;
        loadQuizQuestion();
        showToast(`成功导入 ${list.length} 道自定义题目到题库！`, 'success');
      } catch(err) {
        console.error(err);
        showToast('读取 JSON 题库文件失败，请确保格式正确！', 'error');
      }
    };
    reader.readAsText(file, 'utf-8');
  }

  // --- Phase 5: Word Course Systematic Learning Functions ---
  function loadWordCourseData() {
    fetch('word_courses.json')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          state.wordCoursesDatabase = data;
          renderCurrentWordStudy();
        }
      })
      .catch(e => console.log('word_courses.json load skipped:', e));
  }

  function saveWordCourseState() {
    localStorage.setItem('aura_word_course_state', JSON.stringify(state.wordCourse));
  }

  function getActiveCourseList() {
    if (state.wordCoursesDatabase && state.wordCoursesDatabase[state.wordCourse.activeBook]) {
      return state.wordCoursesDatabase[state.wordCourse.activeBook];
    }
    // Default fallback list
    return [
      {
        word: "abandon",
        pron: "/əˈbændən/",
        pos: "v.",
        trans: "放弃，抛弃，离弃",
        exampleEn: "The soldiers were ordered to abandon their post.",
        exampleZh: "士兵们接到命令放弃他们的阵地。"
      },
      {
        word: "efficient",
        pron: "/ɪˈfɪʃnt/",
        pos: "adj.",
        trans: "高效的，有能力的",
        exampleEn: "Modern technology makes our work much more efficient.",
        exampleZh: "现代技术使我们的工作效率大为提高。"
      }
    ];
  }

  function renderCurrentWordStudy() {
    if (!studyWordTitle) return;
    const list = getActiveCourseList();
    
    if (state.wordCourse.currentWordIndex >= list.length) {
      state.wordCourse.currentWordIndex = 0;
    }
    
    const wordObj = list[state.wordCourse.currentWordIndex];
    if (!wordObj) return;

    studyWordTitle.textContent = wordObj.word;
    studyWordPron.textContent = wordObj.pron || `/${wordObj.word.toLowerCase()}/`;
    studyWordPos.textContent = wordObj.pos || 'v.';
    studyWordTrans.textContent = wordObj.trans || '';
    studyWordExEn.textContent = wordObj.exampleEn || '';
    studyWordExZh.textContent = wordObj.exampleZh || '';
    if (inputWordSpelling) inputWordSpelling.value = '';

    if (courseProgressText) {
      courseProgressText.textContent = `${state.wordCourse.currentWordIndex + 1} / ${list.length}`;
    }
  }

  function submitWordSpelling() {
    if (!inputWordSpelling) return;
    const input = inputWordSpelling.value.trim().toLowerCase();
    const target = studyWordTitle.textContent.trim().toLowerCase();

    if (!input) {
      showToast('请输入拼写！', 'warning');
      return;
    }

    if (input === target) {
      showToast('拼写完美无误！正确率 100%', 'success');
      setTimeout(() => {
        nextStudyWord();
      }, 600);
    } else {
      showToast(`拼写错误！正确拼写为: ${target}`, 'error');
    }
  }

  function nextStudyWord() {
    const list = getActiveCourseList();
    state.wordCourse.currentWordIndex++;
    if (state.wordCourse.currentWordIndex >= list.length) {
      state.wordCourse.currentWordIndex = 0;
      showToast('恭喜您已完成本词汇书的第一轮学习！开启循环巩固。', 'success');
    }
    state.wordCourse.bookProgress[state.wordCourse.activeBook] = state.wordCourse.currentWordIndex;
    saveWordCourseState();
    renderCurrentWordStudy();
  }

  // --- Run Init ---
  init();
});
