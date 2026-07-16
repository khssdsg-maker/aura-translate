/**
 * AuraTranslate - Core Application Script
 * Powered by vanilla ES6, Web Speech APIs, and MyMemory Translation API.
 * Includes Aura Academy: Vocabulary Flashcards, Daily Quotes, and CET-4/6 prep systems.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle');
  
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
    selectedQuizOption: null
  };

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
      speak(cardFrontWord.textContent, 'en');
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
    
    if (subtab === 'vocab') {
      subtabVocab.classList.add('active');
      academyVocabView.classList.add('active');
    } else if (subtab === 'quotes') {
      subtabQuotes.classList.add('active');
      academyQuotesView.classList.add('active');
    } else if (subtab === 'cet') {
      subtabCet.classList.add('active');
      academyCetView.classList.add('active');
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
    if (state.vocabulary.length === 0) return;
    
    const card = state.vocabulary[state.activeCardIndex];
    
    // Ensure we are showing front side first
    studyFlashcard.classList.remove('flipped');
    
    cardFrontWord.textContent = card.word;
    cardFrontPron.textContent = card.pron || `/${card.word.toLowerCase()}/`;
    cardBackTranslation.textContent = card.translation;
    
    const date = new Date(card.timestamp);
    cardBackTime.textContent = `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }

  function navigateFlashcard(direction) {
    if (state.vocabulary.length === 0) return;
    
    state.activeCardIndex += direction;
    
    // Loop boundary
    if (state.activeCardIndex < 0) {
      state.activeCardIndex = state.vocabulary.length - 1;
    } else if (state.activeCardIndex >= state.vocabulary.length) {
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

  function evaluatePronunciation(spokenText) {
    // Word/phrase match assessment (fuzzy string intersection match scoring)
    const cleanTarget = targetPracticeText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").split(/\s+/).filter(Boolean);
    const cleanSpoken = spokenText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").split(/\s+/).filter(Boolean);
    
    let matches = 0;
    cleanTarget.forEach(word => {
      if (cleanSpoken.includes(word)) {
        matches++;
      }
    });
    
    const accuracy = Math.round((matches / Math.max(cleanTarget.length, 1)) * 100);
    const score = Math.min(accuracy, 100);
    
    // Animate Chart SVG ring
    practiceScoreRing.setAttribute('stroke-dasharray', `${score}, 100`);
    practiceScoreText.textContent = `${score}%`;
    
    // Construct feedback message
    let feedback = "";
    if (score >= 90) {
      feedback = "完美！发音非常地道！";
    } else if (score >= 70) {
      feedback = "很好！发音清晰，继续练习！";
    } else if (score >= 40) {
      feedback = "加油！个别单词发音可以更饱满一些。";
    } else {
      feedback = "没关系，再听一遍录音，大声读出来吧！";
    }
    
    practiceFeedbackText.textContent = feedback;
    practiceStatusText.innerHTML = `听到您说的是: <span style="font-weight: 700; color: var(--accent-primary);">"${spokenText}"</span>`;
    practiceResultPanel.classList.remove('hidden');
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

  // --- Run Init ---
  init();
});
