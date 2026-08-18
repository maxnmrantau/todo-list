import { 
  createIcons, 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun, 
  Sparkles, 
  Database, 
  Plus, 
  Folder, 
  Flag, 
  Calendar, 
  AlignLeft, 
  CheckSquare, 
  PlusCircle, 
  SlidersHorizontal, 
  ArrowRight, 
  Search, 
  X, 
  MoreHorizontal, 
  CheckCheck, 
  Trash, 
  AlertTriangle, 
  Edit3, 
  Edit2, 
  Save, 
  FolderPlus, 
  Check, 
  Download, 
  FileSpreadsheet, 
  Upload, 
  RefreshCw, 
  Pin, 
  Copy, 
  Trash2, 
  Briefcase, 
  User, 
  BookOpen, 
  DollarSign, 
  Heart, 
  Tag,
  Repeat,
  Bell,
  BellRing,
  Clock,
  UploadCloud,
  Play,
  Square,
  Music
} from 'lucide';
import confetti from 'canvas-confetti';

const appIcons = {
  Volume2, 
  VolumeX, 
  Moon, 
  Sun, 
  Sparkles, 
  Database, 
  Plus, 
  Folder, 
  Flag, 
  Calendar, 
  AlignLeft, 
  CheckSquare, 
  PlusCircle, 
  SlidersHorizontal, 
  ArrowRight, 
  Search, 
  X, 
  MoreHorizontal, 
  CheckCheck, 
  Trash, 
  AlertTriangle, 
  Edit3, 
  Edit2, 
  Save, 
  FolderPlus, 
  Check, 
  Download, 
  FileSpreadsheet, 
  Upload, 
  RefreshCw, 
  Pin, 
  Copy, 
  Trash2, 
  Briefcase, 
  User, 
  BookOpen, 
  DollarSign, 
  Heart, 
  Tag,
  Repeat,
  Bell,
  BellRing,
  Clock,
  UploadCloud,
  Play,
  Square,
  Music
};

// ==========================================================================
// DEFAULT DATA & CONSTANTS
// ==========================================================================

const STORAGE_KEYS = {
  TASKS: 'auratasks_data_tasks',
  CATEGORIES: 'auratasks_data_categories',
  THEME: 'auratasks_setting_theme',
  SOUND: 'auratasks_setting_sound',
  SOUND_CONFIG: 'auratasks_setting_sound_config',
  CUSTOM_AUDIO: 'auratasks_data_custom_audio',
  CUSTOM_AUDIO_NAME: 'auratasks_data_custom_audio_name',
  BRIEFING_LAST_DATE: 'auratasks_data_briefing_last_date',
  STREAK: 'auratasks_data_streak',
  LAST_DATE: 'auratasks_data_last_date'
};

const DEFAULT_CATEGORIES = [
  { id: 'work', name: 'Pekerjaan', color: '#6366f1', icon: 'briefcase' },
  { id: 'personal', name: 'Pribadi', color: '#ec4899', icon: 'user' },
  { id: 'study', name: 'Belajar', color: '#3b82f6', icon: 'book-open' },
  { id: 'finance', name: 'Keuangan', color: '#10b981', icon: 'dollar-sign' },
  { id: 'health', name: 'Kesehatan', color: '#06b6d4', icon: 'heart' }
];

const SAMPLE_TASKS = [
  {
    id: 'sample-1',
    title: '🚀 Siapkan Deployment Aplikasi ke Vercel',
    description: 'Pastikan file vercel.json terkonfigurasi dan commit repo ke GitHub untuk CI/CD otomatis.',
    category: 'work',
    priority: 'urgent',
    dueDate: new Date().toISOString().split('T')[0],
    dueTime: '09:00',
    completed: false,
    pinned: true,
    subtasks: [
      { id: 'sub-1', text: 'Cek dependensi package.json', completed: true },
      { id: 'sub-2', text: 'Uji build produksi `npm run build`', completed: true },
      { id: 'sub-3', text: 'Deploy ke Vercel via CLI atau GitHub', completed: false }
    ],
    createdAt: Date.now() - 1000 * 60 * 60 * 2
  },
  {
    id: 'sample-2',
    title: '🎨 Review UI & Responsivitas Mobile AuraTasks',
    description: 'Coba ganti tema Dark Slate, Aurora Cyber, dan Clean Light.',
    category: 'work',
    priority: 'high',
    dueDate: new Date().toISOString().split('T')[0],
    dueTime: '13:30',
    completed: true,
    pinned: false,
    subtasks: [
      { id: 'sub-4', text: 'Tes di resolusi mobile', completed: true },
      { id: 'sub-5', text: 'Periksa efek suara Web Audio', completed: true }
    ],
    createdAt: Date.now() - 1000 * 60 * 60 * 5
  },
  {
    id: 'sample-3',
    title: '📚 Baca 1 Bab Buku Produktivitas',
    description: 'Fokus pada time-blocking dan teknik Pomodoro.',
    category: 'study',
    priority: 'medium',
    dueDate: getRelativeDateString(1),
    dueTime: '20:00',
    completed: false,
    pinned: false,
    subtasks: [],
    createdAt: Date.now() - 1000 * 60 * 60 * 12
  },
  {
    id: 'sample-4',
    title: '💧 Minum 2 Liter Air & Olahraga Ringan 20 Menit',
    description: 'Jaga kebugaran fisik untuk menunjang performa coding harian.',
    category: 'health',
    priority: 'low',
    dueDate: new Date().toISOString().split('T')[0],
    dueTime: '07:30',
    completed: false,
    pinned: false,
    recurring: { type: 'daily', days: [] },
    subtasks: [],
    createdAt: Date.now() - 1000 * 60 * 60 * 20
  },
  {
    id: 'sample-5',
    title: '📑 Evaluasi Rutin & Perencanaan Sprint',
    description: 'Review to-do mingguan dan periksa checklist prioritas.',
    category: 'work',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
    dueTime: '16:00',
    completed: false,
    pinned: false,
    recurring: { type: 'custom', days: [1, 4] },
    subtasks: [
      { id: 'sub-6', text: 'Rekap to-do terselesaikan', completed: true },
      { id: 'sub-7', text: 'Identifikasi blocker & improvement', completed: false }
    ],
    createdAt: Date.now() - 1000 * 60 * 60 * 24
  }
];

const MOTIVATIONAL_QUOTES = [
  '"Langkah kecil setiap hari menghasilkan pencapaian besar."',
  '"Fokuslah pada kemajuan, bukan pada kesempurnaan."',
  '"Produktivitas bukan tentang sibuk, tapi tentang hasil."',
  '"Selesaikan apa yang kamu mulai hari ini."',
  '"Waktu yang terorganisir adalah pikiran yang tenang."'
];

// ==========================================================================
// STATE MANAGEMENT
// ==========================================================================

class AppState {
  constructor() {
    this.tasks = this.loadFromStorage(STORAGE_KEYS.TASKS, SAMPLE_TASKS);
    this.categories = this.loadFromStorage(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES);
    this.theme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
    this.soundEnabled = localStorage.getItem(STORAGE_KEYS.SOUND) !== 'false';
    this.soundConfig = this.loadFromStorage(STORAGE_KEYS.SOUND_CONFIG, {
      tone: 'chime',
      volume: 80,
      briefingEnabled: true,
      briefingTime: '08:00'
    });
    this.customAudio = localStorage.getItem(STORAGE_KEYS.CUSTOM_AUDIO) || null;
    this.customAudioName = localStorage.getItem(STORAGE_KEYS.CUSTOM_AUDIO_NAME) || '';
    this.lastBriefingDate = localStorage.getItem(STORAGE_KEYS.BRIEFING_LAST_DATE) || '';
    this.streak = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK) || '1', 10);
    this.lastActiveDate = localStorage.getItem(STORAGE_KEYS.LAST_DATE) || new Date().toISOString().split('T')[0];

    // Current View Controls
    this.statusFilter = 'all'; // all | active | today | completed
    this.categoryFilter = 'all';
    this.priorityFilter = 'all';
    this.searchQuery = '';
    this.sortBy = 'created-desc';

    // Temporary draft subtasks for Quick Add
    this.draftSubtasks = [];

    // History for Undo deletion
    this.lastDeletedTask = null;
    this.undoTimeout = null;

    this.checkStreak();
  }

  loadFromStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.error('Error loading storage for ' + key, e);
      return fallback;
    }
  }

  saveTasks() {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(this.tasks));
  }

  saveCategories() {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(this.categories));
  }

  saveTheme() {
    localStorage.setItem(STORAGE_KEYS.THEME, this.theme);
  }

  saveSound() {
    localStorage.setItem(STORAGE_KEYS.SOUND, this.soundEnabled.toString());
  }

  saveSoundConfig() {
    localStorage.setItem(STORAGE_KEYS.SOUND_CONFIG, JSON.stringify(this.soundConfig));
  }

  checkStreak() {
    const today = new Date().toISOString().split('T')[0];
    if (this.lastActiveDate !== today) {
      const lastDate = new Date(this.lastActiveDate);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        this.streak += 1;
      } else if (diffDays > 1) {
        this.streak = 1;
      }
      this.lastActiveDate = today;
      localStorage.setItem(STORAGE_KEYS.STREAK, this.streak.toString());
      localStorage.setItem(STORAGE_KEYS.LAST_DATE, today);
    }
  }
}

const state = new AppState();

// ==========================================================================
// SOUND SYNTHESIS ENGINE (Web Audio API + Custom Audio Support)
// ==========================================================================

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.activeAudio = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  getVolume() {
    return (state.soundConfig?.volume ?? 80) / 100;
  }

  playPop() {
    if (!state.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const vol = this.getVolume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.2 * vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01 * vol, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) { /* ignore sound error */ }
  }

  playComplete() {
    if (!state.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const vol = this.getVolume();
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        gain.gain.setValueAtTime(0.25 * vol, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.25);
      });
    } catch (e) { /* ignore sound error */ }
  }

  playDelete() {
    if (!state.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const vol = this.getVolume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.18 * vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01 * vol, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) { /* ignore sound error */ }
  }

  playChime() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const vol = this.getVolume();
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.09);

        gain.gain.setValueAtTime(0.3 * vol, now + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 0.65);
      });
    } catch (e) { /* ignore sound error */ }
  }

  playBell() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const vol = this.getVolume();
      const now = this.ctx.currentTime;
      const chords = [
        [659.25, 1318.51, 2637.02], // E5, E6, E7
        [880.00, 1760.00, 3520.00], // A5, A6, A7
        [1046.50, 2093.00, 4186.01] // C6, C7, C8
      ];
      chords.forEach((chord, i) => {
        chord.forEach((freq, j) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.14);

          gain.gain.setValueAtTime((0.18 / (j + 1)) * vol, now + i * 0.14);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.14 + 0.7);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now + i * 0.14);
          osc.stop(now + i * 0.14 + 0.75);
        });
      });
    } catch (e) { /* ignore sound error */ }
  }

  playDigital() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const vol = this.getVolume();
      const now = this.ctx.currentTime;
      const beeps = [880, 1174.66, 1760]; // A5, D6, A6
      beeps.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.12 * vol, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.07);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.07);
      });
    } catch (e) { /* ignore sound error */ }
  }

  playZen() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const vol = this.getVolume();
      const now = this.ctx.currentTime;
      const bowlFreqs = [216, 432, 648]; // 432Hz harmonic bowl
      bowlFreqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime((0.3 / (idx + 1)) * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 2.25);
      });
    } catch (e) { /* ignore sound error */ }
  }

  playPresetTone(tone) {
    if (tone === 'bell') this.playBell();
    else if (tone === 'digital') this.playDigital();
    else if (tone === 'zen') this.playZen();
    else this.playChime();
  }

  playCustomAudio(dataUrl, onEnded) {
    this.stopAlarm();
    try {
      const audio = new Audio(dataUrl);
      audio.volume = this.getVolume();
      this.activeAudio = audio;
      if (onEnded) {
        audio.onended = () => {
          this.activeAudio = null;
          onEnded();
        };
      }
      audio.play().catch(e => console.warn('Audio play error', e));
    } catch (e) {
      console.warn('Custom audio init error', e);
    }
  }

  playAlarm(onEnded) {
    if (!state.soundEnabled) return;
    if (state.soundConfig.tone === 'custom' && state.customAudio) {
      this.playCustomAudio(state.customAudio, onEnded);
    } else {
      this.playPresetTone(state.soundConfig.tone || 'chime');
      if (onEnded) setTimeout(onEnded, 1500);
    }
  }

  stopAlarm() {
    if (this.activeAudio) {
      this.activeAudio.pause();
      this.activeAudio.currentTime = 0;
      this.activeAudio = null;
    }
  }
}

const soundEngine = new SoundEngine();

// ==========================================================================
// DOM ELEMENTS REFERENCE
// ==========================================================================

const DOM = {
  // Theme & Settings
  html: document.documentElement,
  currentDateText: document.getElementById('current-date-text'),
  streakCount: document.getElementById('streak-count'),
  btnSoundToggle: document.getElementById('btn-sound-toggle'),
  btnReminderSettings: document.getElementById('btn-reminder-settings'),
  themeSwitcherPill: document.getElementById('theme-switcher-pill'),
  btnBackupMenu: document.getElementById('btn-backup-menu'),

  // Hero & Stats
  greetingTimeTag: document.getElementById('greeting-time-tag'),
  greetingTitle: document.getElementById('greeting-title'),
  motivationalQuote: document.getElementById('motivational-quote'),
  radialBar: document.getElementById('radial-bar'),
  radialPercentNum: document.getElementById('radial-percent-num'),
  statTotal: document.getElementById('stat-total'),
  statCompleted: document.getElementById('stat-completed'),
  statPending: document.getElementById('stat-pending'),
  statOverdue: document.getElementById('stat-overdue'),

  // Sidebar
  categoryNavList: document.getElementById('category-nav-list'),
  btnAddCategory: document.getElementById('btn-add-category'),
  priorityFilterBtns: document.querySelectorAll('.priority-filter-btn'),

  // Quick Add
  addTaskForm: document.getElementById('add-task-form'),
  taskInputTitle: document.getElementById('task-input-title'),
  btnToggleTaskDetails: document.getElementById('btn-toggle-task-details'),
  taskDetailsDrawer: document.getElementById('task-details-drawer'),
  taskInputCategory: document.getElementById('task-input-category'),
  taskInputPriority: document.getElementById('task-input-priority'),
  taskInputDue: document.getElementById('task-input-due'),
  taskInputTime: document.getElementById('task-input-time'),
  taskInputRecurring: document.getElementById('task-input-recurring'),
  taskInputDaysContainer: document.getElementById('task-input-days-container'),
  taskAddDaySelector: document.getElementById('task-add-day-selector'),
  taskInputDesc: document.getElementById('task-input-desc'),
  draftSubtaskInput: document.getElementById('draft-subtask-input'),
  btnAddDraftSubtask: document.getElementById('btn-add-draft-subtask'),
  draftSubtasksContainer: document.getElementById('draft-subtasks-container'),

  // Controls & Filters
  filterTabs: document.querySelectorAll('.filter-tab'),
  badgeAll: document.getElementById('badge-all'),
  badgeActive: document.getElementById('badge-active'),
  badgeToday: document.getElementById('badge-today'),
  badgeRecurring: document.getElementById('badge-recurring'),
  badgeCompleted: document.getElementById('badge-completed'),
  searchInput: document.getElementById('search-input'),
  btnClearSearch: document.getElementById('btn-clear-search'),
  sortSelect: document.getElementById('sort-select'),
  btnBulkMenu: document.getElementById('btn-bulk-menu'),
  bulkDropdownWrap: document.querySelectorAll('.dropdown-wrapper')[1],
  btnBulkCompleteAll: document.getElementById('btn-bulk-complete-all'),
  btnBulkClearCompleted: document.getElementById('btn-bulk-clear-completed'),
  btnBulkResetAll: document.getElementById('btn-bulk-reset-all'),

  // Task List
  tasksContainer: document.getElementById('tasks-container'),
  emptyState: document.getElementById('empty-state'),
  btnEmptyAddTask: document.getElementById('btn-empty-add-task'),

  // Modals
  modalEditTask: document.getElementById('modal-edit-task'),
  editTaskForm: document.getElementById('edit-task-form'),
  editTaskId: document.getElementById('edit-task-id'),
  editTaskTitle: document.getElementById('edit-task-title'),
  editTaskCategory: document.getElementById('edit-task-category'),
  editTaskPriority: document.getElementById('edit-task-priority'),
  editTaskDue: document.getElementById('edit-task-due'),
  editTaskTime: document.getElementById('edit-task-time'),
  editTaskRecurring: document.getElementById('edit-task-recurring'),
  editTaskDaysContainer: document.getElementById('edit-task-days-container'),
  editTaskDaySelector: document.getElementById('edit-task-day-selector'),
  editTaskDesc: document.getElementById('edit-task-desc'),
  editSubtaskInput: document.getElementById('edit-subtask-input'),
  btnAddEditSubtask: document.getElementById('btn-add-edit-subtask'),
  modalSubtasksContainer: document.getElementById('modal-subtasks-container'),
  btnCloseEditModal: document.getElementById('btn-close-edit-modal'),
  btnCancelEditModal: document.getElementById('btn-cancel-edit-modal'),

  // Category Modal
  modalCategory: document.getElementById('modal-category'),
  addCategoryForm: document.getElementById('add-category-form'),
  catNameInput: document.getElementById('cat-name-input'),
  catColorPalette: document.getElementById('cat-color-palette'),
  btnCloseCatModal: document.getElementById('btn-close-cat-modal'),
  btnCancelCatModal: document.getElementById('btn-cancel-cat-modal'),

  // Sound Settings Modal
  modalSoundSettings: document.getElementById('modal-sound-settings'),
  btnCloseSoundModal: document.getElementById('btn-close-sound-modal'),
  btnCloseSoundModalSave: document.getElementById('btn-close-sound-modal-save'),
  settingBriefingEnable: document.getElementById('setting-briefing-enable'),
  settingBriefingTime: document.getElementById('setting-briefing-time'),
  btnTestBriefing: document.getElementById('btn-test-briefing'),
  settingSoundTone: document.getElementById('setting-sound-tone'),
  customAudioBox: document.getElementById('custom-audio-box'),
  settingAudioFile: document.getElementById('setting-audio-file'),
  btnTriggerAudioUpload: document.getElementById('btn-trigger-audio-upload'),
  customAudioFilename: document.getElementById('custom-audio-filename'),
  customAudioControls: document.getElementById('custom-audio-controls'),
  btnResetAudio: document.getElementById('btn-reset-audio'),
  btnTestSound: document.getElementById('btn-test-sound'),
  testSoundIcon: document.getElementById('test-sound-icon'),
  testSoundText: document.getElementById('test-sound-text'),
  settingAudioVolume: document.getElementById('setting-audio-volume'),
  volumeDisplayVal: document.getElementById('volume-display-val'),
  btnRequestNotification: document.getElementById('btn-request-notification'),
  notificationPermStatus: document.getElementById('notification-perm-status'),

  // Daily Briefing Modal
  modalDailyBriefing: document.getElementById('modal-daily-briefing'),
  briefingTodayDate: document.getElementById('briefing-today-date'),
  briefingSummaryCount: document.getElementById('briefing-summary-count'),
  briefingTasksContainer: document.getElementById('briefing-tasks-container'),
  btnCloseBriefingModal: document.getElementById('btn-close-briefing-modal'),
  btnSnoozeBriefing: document.getElementById('btn-snooze-briefing'),
  btnActionStartDay: document.getElementById('btn-action-start-day'),

  // Backup Modal
  modalBackup: document.getElementById('modal-backup'),
  btnExportJson: document.getElementById('btn-export-json'),
  btnExportCsv: document.getElementById('btn-export-csv'),
  btnTriggerImport: document.getElementById('btn-trigger-import'),
  importFileInput: document.getElementById('import-file-input'),
  btnLoadSampleData: document.getElementById('btn-load-sample-data'),
  btnCloseBackupModal: document.getElementById('btn-close-backup-modal'),
  btnCancelBackupModal: document.getElementById('btn-cancel-backup-modal'),

  // Toast
  toastContainer: document.getElementById('toast-container')
};

// State for Modal Subtasks during Edit
let currentModalSubtasks = [];

// Recurring Days Selection State
let draftRecurringDays = [1, 2, 3, 4, 5]; // Default Sen - Jum
let modalRecurringDays = [1, 2, 3, 4, 5];

function formatDateToISO(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function calculateNextRecurringDate(baseDateStr, recurring) {
  if (!recurring || !recurring.type || recurring.type === 'none') return '';

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let base = new Date();
  if (baseDateStr) {
    const parts = baseDateStr.split('-');
    if (parts.length === 3) {
      base = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    }
  }
  base.setHours(0, 0, 0, 0);

  let start = new Date(Math.max(base.getTime(), today.getTime()));

  switch (recurring.type) {
    case 'daily': {
      start.setDate(start.getDate() + 1);
      return formatDateToISO(start);
    }
    case 'workdays': {
      start.setDate(start.getDate() + 1);
      while (start.getDay() === 0 || start.getDay() === 6) {
        start.setDate(start.getDate() + 1);
      }
      return formatDateToISO(start);
    }
    case 'weekly': {
      start.setDate(start.getDate() + 7);
      return formatDateToISO(start);
    }
    case 'monthly': {
      start.setMonth(start.getMonth() + 1);
      return formatDateToISO(start);
    }
    case 'custom': {
      const rawDays = Array.isArray(recurring.days) && recurring.days.length > 0 ? recurring.days : [1, 2, 3, 4, 5];
      const days = rawDays.map(Number);
      for (let i = 1; i <= 14; i++) {
        const candidate = new Date(start);
        candidate.setDate(candidate.getDate() + i);
        if (days.includes(candidate.getDay())) {
          return formatDateToISO(candidate);
        }
      }
      start.setDate(start.getDate() + 1);
      return formatDateToISO(start);
    }
    default:
      return '';
  }
}

function formatRecurringLabel(recurring) {
  if (!recurring || !recurring.type || recurring.type === 'none') return '';
  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  switch (recurring.type) {
    case 'daily':
      return 'Setiap Hari';
    case 'workdays':
      return 'Hari Kerja (Sen-Jum)';
    case 'weekly':
      return 'Setiap Minggu';
    case 'monthly':
      return 'Setiap Bulan';
    case 'custom': {
      const days = (recurring.days || []).map(Number);
      if (days.length === 7) return 'Setiap Hari';
      if (days.length === 5 && !days.includes(0) && !days.includes(6)) return 'Hari Kerja (Sen-Jum)';
      if (days.length === 2 && days.includes(0) && days.includes(6)) return 'Akhir Pekan (Sab-Min)';
      if (days.length === 0) return 'Hari Tertentu';
      const sortedDays = [...days].sort((a, b) => (a === 0 ? 7 : a) - (b === 0 ? 7 : b));
      const names = sortedDays.map(d => dayNames[d]);
      return `Tiap ${names.join(', ')}`;
    }
    default:
      return '';
  }
}

function updateDaySelectorChips(container, activeDays) {
  if (!container) return;
  const numDays = activeDays.map(Number);
  const chips = container.querySelectorAll('.day-chip-btn');
  chips.forEach(chip => {
    const day = parseInt(chip.getAttribute('data-day'), 10);
    if (numDays.includes(day)) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });
}

// ==========================================================================
// RENDER & UI UPDATE FUNCTIONS
// ==========================================================================

function initApp() {
  applyTheme(state.theme);
  updateSoundIcon();
  renderDateAndGreeting();
  renderCategorySelects();
  renderCategorySidebar();
  updateDaySelectorChips(DOM.taskAddDaySelector, draftRecurringDays);
  updateSoundSettingsUI();
  renderTasks();
  updateStats();
  initEventListeners();
  refreshLucideIcons();
  startReminderEngine();
}

function refreshLucideIcons() {
  createIcons({ icons: appIcons });
}

function applyTheme(themeName) {
  state.theme = themeName;
  DOM.html.setAttribute('data-theme', themeName);
  state.saveTheme();

  // Update active pill button state
  const pillBtns = document.querySelectorAll('.theme-pill-btn');
  pillBtns.forEach(btn => {
    if (btn.getAttribute('data-theme-val') === themeName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  refreshLucideIcons();
}

function updateSoundIcon() {
  if (DOM.btnSoundToggle) {
    const iconName = state.soundEnabled ? 'volume-2' : 'volume-x';
    DOM.btnSoundToggle.innerHTML = `<i data-lucide="${iconName}"></i>`;
    refreshLucideIcons();
  }
}

function renderDateAndGreeting() {
  const now = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  DOM.currentDateText.textContent = now.toLocaleDateString('id-ID', options);
  DOM.streakCount.textContent = state.streak;

  const hours = now.getHours();
  let greeting = '✨ Semangat Pagi';
  let title = 'Fokus pada hal paling penting hari ini';

  if (hours >= 11 && hours < 15) {
    greeting = '☀️ Selamat Siang';
    title = 'Jaga momentum dan terus produktif';
  } else if (hours >= 15 && hours < 18) {
    greeting = '🌇 Selamat Sore';
    title = 'Evaluasi kemajuan tugas harian Anda';
  } else if (hours >= 18 || hours < 4) {
    greeting = '🌙 Selamat Malam';
    title = 'Selesaikan prioritas dan istirahat dengan tenang';
  }

  DOM.greetingTimeTag.textContent = greeting;
  DOM.greetingTitle.textContent = title;

  // Pick random quote
  const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
  DOM.motivationalQuote.textContent = randomQuote;
}

function renderCategorySelects() {
  const optionsHtml = state.categories.map(cat => `
    <option value="${cat.id}">${cat.name}</option>
  `).join('');

  DOM.taskInputCategory.innerHTML = optionsHtml;
  DOM.editTaskCategory.innerHTML = optionsHtml;
}

function renderCategorySidebar() {
  // Calculate count per category
  const counts = {};
  state.categories.forEach(cat => {
    counts[cat.id] = state.tasks.filter(t => t.category === cat.id && !t.completed).length;
  });

  const totalActive = state.tasks.filter(t => !t.completed).length;

  let html = `
    <button class="cat-item-btn ${state.categoryFilter === 'all' ? 'active' : ''}" data-cat-id="all">
      <span class="cat-left-info">
        <span class="cat-color-dot" style="background: var(--accent-primary);"></span>
        <span>Semua Kategori</span>
      </span>
      <span class="cat-count-badge">${totalActive}</span>
    </button>
  `;

  html += state.categories.map(cat => `
    <button class="cat-item-btn ${state.categoryFilter === cat.id ? 'active' : ''}" data-cat-id="${cat.id}">
      <span class="cat-left-info">
        <span class="cat-color-dot" style="background: ${cat.color};"></span>
        <span>${cat.name}</span>
      </span>
      <span class="cat-count-badge">${counts[cat.id] || 0}</span>
    </button>
  `).join('');

  DOM.categoryNavList.innerHTML = html;
}

function updateStats() {
  const total = state.tasks.length;
  const completed = state.tasks.filter(t => t.completed).length;
  const pending = total - completed;

  const todayStr = new Date().toISOString().split('T')[0];
  const overdue = state.tasks.filter(t => !t.completed && t.dueDate && t.dueDate < todayStr).length;

  DOM.statTotal.textContent = total;
  DOM.statCompleted.textContent = completed;
  DOM.statPending.textContent = pending;
  DOM.statOverdue.textContent = overdue;

  // Badges in filter tabs
  const activeCount = state.tasks.filter(t => !t.completed).length;
  const todayCount = state.tasks.filter(t => t.dueDate === todayStr).length;
  const recurringCount = state.tasks.filter(t => t.recurring && t.recurring.type && t.recurring.type !== 'none').length;

  DOM.badgeAll.textContent = total;
  DOM.badgeActive.textContent = activeCount;
  DOM.badgeToday.textContent = todayCount;
  if (DOM.badgeRecurring) DOM.badgeRecurring.textContent = recurringCount;
  DOM.badgeCompleted.textContent = completed;

  // Radial Progress calculation
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  DOM.radialPercentNum.textContent = `${percentage}%`;

  // Circumference of radius 44 is 2 * PI * 44 ≈ 276.46
  const circumference = 276.46;
  const offset = circumference - (percentage / 100) * circumference;
  DOM.radialBar.style.strokeDashoffset = offset;
}

function getFilteredAndSortedTasks() {
  const todayStr = new Date().toISOString().split('T')[0];

  let result = state.tasks.filter(task => {
    // 1. Status Filter
    if (state.statusFilter === 'active' && task.completed) return false;
    if (state.statusFilter === 'completed' && !task.completed) return false;
    if (state.statusFilter === 'today' && task.dueDate !== todayStr) return false;
    if (state.statusFilter === 'recurring' && (!task.recurring || !task.recurring.type || task.recurring.type === 'none')) return false;

    // 2. Category Filter
    if (state.categoryFilter !== 'all' && task.category !== state.categoryFilter) return false;

    // 3. Priority Filter
    if (state.priorityFilter !== 'all' && task.priority !== state.priorityFilter) return false;

    // 4. Search Filter
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase();
      const inTitle = task.title.toLowerCase().includes(q);
      const inDesc = task.description && task.description.toLowerCase().includes(q);
      const inSubtasks = task.subtasks && task.subtasks.some(s => s.text.toLowerCase().includes(q));
      if (!inTitle && !inDesc && !inSubtasks) return false;
    }

    return true;
  });

  // Sorting
  result.sort((a, b) => {
    // Pinned tasks always stay at top
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;

    switch (state.sortBy) {
      case 'created-asc':
        return a.createdAt - b.createdAt;
      case 'due-asc':
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      case 'priority-desc': {
        const priorityWeight = { urgent: 4, high: 3, medium: 2, low: 1 };
        return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
      }
      case 'alpha-asc':
        return a.title.localeCompare(b.title);
      case 'created-desc':
      default:
        return b.createdAt - a.createdAt;
    }
  });

  return result;
}

function renderTasks() {
  const filtered = getFilteredAndSortedTasks();

  if (filtered.length === 0) {
    DOM.tasksContainer.innerHTML = '';
    DOM.emptyState.style.display = 'flex';
  } else {
    DOM.emptyState.style.display = 'none';
    DOM.tasksContainer.innerHTML = filtered.map(task => createTaskCardHtml(task)).join('');
  }

  refreshLucideIcons();
}

function createTaskCardHtml(task) {
  const category = state.categories.find(c => c.id === task.category) || { name: 'Umum', color: '#6366f1' };
  const todayStr = new Date().toISOString().split('T')[0];

  // Due Date & Time Formatting
  let dueHtml = '';
  if (task.dueDate) {
    let dueClass = '';
    let dueLabel = formatShortDate(task.dueDate);
    if (task.dueTime) {
      dueLabel += ` (${task.dueTime})`;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const nowHours = String(new Date().getHours()).padStart(2, '0');
    const nowMins = String(new Date().getMinutes()).padStart(2, '0');
    const currentTimeStr = `${nowHours}:${nowMins}`;

    if (task.dueDate < todayStr && !task.completed) {
      dueClass = 'due-overdue';
      dueLabel = `⚠️ Lewat: ${dueLabel}`;
    } else if (task.dueDate === todayStr) {
      if (task.dueTime && task.dueTime < currentTimeStr && !task.completed) {
        dueClass = 'due-overdue';
        dueLabel = `⚠️ Lewat: Hari Ini ${task.dueTime}`;
      } else {
        dueClass = 'due-today';
        dueLabel = `⭐ Hari Ini${task.dueTime ? ' ' + task.dueTime : ''}`;
      }
    }

    dueHtml = `
      <span class="meta-pill meta-pill-due ${dueClass}" title="Tenggat Waktu: ${escapeHtml(dueLabel)}">
        <i data-lucide="${task.dueTime ? 'clock' : 'calendar'}" style="width:12px;height:12px;"></i>
        <span>${escapeHtml(dueLabel)}</span>
      </span>
    `;
  }

  // Priority Label
  const priorityLabels = {
    urgent: '🔥 Urgent',
    high: '🔴 Tinggi',
    medium: '🟡 Sedang',
    low: '🟢 Rendah'
  };

  // Recurring Label & Pill
  let recurringHtml = '';
  if (task.recurring && task.recurring.type && task.recurring.type !== 'none') {
    const recurLabel = formatRecurringLabel(task.recurring);
    if (recurLabel) {
      recurringHtml = `
        <span class="meta-pill meta-pill-recurring" title="Tugas Rutin: ${escapeHtml(recurLabel)}">
          <i data-lucide="repeat" style="width:12px;height:12px;"></i>
          <span>${escapeHtml(recurLabel)}</span>
        </span>
      `;
    }
  }

  // Subtasks progress & list
  let subtasksHtml = '';
  if (task.subtasks && task.subtasks.length > 0) {
    const totalSub = task.subtasks.length;
    const completedSub = task.subtasks.filter(s => s.completed).length;
    const subPercent = Math.round((completedSub / totalSub) * 100);

    const subtasksListItems = task.subtasks.map(sub => `
      <div class="subtask-item-row ${sub.completed ? 'done' : ''}">
        <div class="subtask-mini-check" data-action="toggle-subtask" data-task-id="${task.id}" data-sub-id="${sub.id}">
          ${sub.completed ? '<i data-lucide="check" style="width:11px;height:11px;color:#fff;"></i>' : ''}
        </div>
        <span>${escapeHtml(sub.text)}</span>
      </div>
    `).join('');

    subtasksHtml = `
      <div class="task-subtasks-section">
        <div class="subtasks-header-toggle">
          <span>Checklist (${completedSub}/${totalSub})</span>
          <div class="subtasks-progress-bar-wrap">
            <div class="subtasks-progress-fill" style="width: ${subPercent}%"></div>
          </div>
        </div>
        <div class="subtasks-list-box">
          ${subtasksListItems}
        </div>
      </div>
    `;
  }

  return `
    <article class="task-card priority-${task.priority} ${task.completed ? 'completed' : ''} ${task.pinned ? 'pinned' : ''}" data-task-id="${task.id}">
      <div class="task-main-row">
        <!-- Checkbox -->
        <button class="custom-checkbox-btn" data-action="toggle-complete" data-task-id="${task.id}" aria-label="Toggle Selesai">
          <div class="checkbox-box">
            <i data-lucide="check" class="checkbox-check-icon" style="width:14px;height:14px;"></i>
          </div>
        </button>

        <!-- Main Content -->
        <div class="task-content-center">
          <div class="task-header-row">
            <h4 class="task-title-text">${escapeHtml(task.title)}</h4>
          </div>

          ${task.description ? `<p class="task-desc-text">${escapeHtml(task.description)}</p>` : ''}

          <!-- Metadata Badges -->
          <div class="task-meta-pills">
            <span class="meta-pill meta-pill-cat" style="border-left: 3px solid ${category.color};">
              <span class="cat-color-dot" style="background: ${category.color};"></span>
              <span>${category.name}</span>
            </span>

            <span class="meta-pill meta-pill-priority ${task.priority}">
              <span>${priorityLabels[task.priority] || task.priority}</span>
            </span>

            ${recurringHtml}
            ${dueHtml}
          </div>

          <!-- Subtasks -->
          ${subtasksHtml}
        </div>

        <!-- Action Buttons -->
        <div class="task-actions-wrap">
          <button class="task-act-btn btn-star ${task.pinned ? 'active' : ''}" data-action="toggle-pin" data-task-id="${task.id}" title="${task.pinned ? 'Lepas Sematan' : 'Sematkan ke Atas'}">
            <i data-lucide="pin" style="width:15px;height:15px;"></i>
          </button>
          <button class="task-act-btn" data-action="duplicate-task" data-task-id="${task.id}" title="Duplikasi Tugas">
            <i data-lucide="copy" style="width:15px;height:15px;"></i>
          </button>
          <button class="task-act-btn" data-action="edit-task" data-task-id="${task.id}" title="Edit Tugas">
            <i data-lucide="edit-2" style="width:15px;height:15px;"></i>
          </button>
          <button class="task-act-btn btn-del" data-action="delete-task" data-task-id="${task.id}" title="Hapus Tugas">
            <i data-lucide="trash-2" style="width:15px;height:15px;"></i>
          </button>
        </div>
      </div>
    </article>
  `;
}

// ==========================================================================
// TOAST NOTIFICATION ENGINE
// ==========================================================================

function showToast(message, type = 'info', actionText = null, onAction = null) {
  const toast = document.createElement('div');
  toast.className = `toast-message toast-${type}`;

  const textSpan = document.createElement('span');
  textSpan.textContent = message;
  toast.appendChild(textSpan);

  if (actionText && onAction) {
    const actionBtn = document.createElement('button');
    actionBtn.className = 'toast-undo-btn';
    actionBtn.textContent = actionText;
    actionBtn.onclick = () => {
      onAction();
      toast.remove();
    };
    toast.appendChild(actionBtn);
  }

  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ==========================================================================
// TASK ACTIONS & EVENT HANDLERS
// ==========================================================================

function handleAddTask(e) {
  e.preventDefault();
  const title = DOM.taskInputTitle.value.trim();
  if (!title) return;

  const recurType = DOM.taskInputRecurring ? DOM.taskInputRecurring.value : 'none';
  let recurDays = [];
  if (recurType === 'custom') {
    recurDays = [...draftRecurringDays];
  } else if (recurType === 'workdays') {
    recurDays = [1, 2, 3, 4, 5];
  }

  const newTask = {
    id: 'task-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
    title: title,
    description: DOM.taskInputDesc.value.trim(),
    category: DOM.taskInputCategory.value || 'work',
    priority: DOM.taskInputPriority.value || 'medium',
    dueDate: DOM.taskInputDue.value || '',
    dueTime: DOM.taskInputTime ? DOM.taskInputTime.value : '',
    recurring: {
      type: recurType,
      days: recurDays
    },
    completed: false,
    pinned: false,
    subtasks: [...state.draftSubtasks],
    createdAt: Date.now()
  };

  state.tasks.unshift(newTask);
  state.saveTasks();

  // Reset form
  DOM.addTaskForm.reset();
  state.draftSubtasks = [];
  draftEditingIndex = -1;
  renderDraftSubtasks();
  if (DOM.taskInputRecurring) DOM.taskInputRecurring.value = 'none';
  if (DOM.taskInputDaysContainer) DOM.taskInputDaysContainer.style.display = 'none';
  if (DOM.taskInputTime) DOM.taskInputTime.value = '';
  draftRecurringDays = [1, 2, 3, 4, 5];
  updateDaySelectorChips(DOM.taskAddDaySelector, draftRecurringDays);
  DOM.taskDetailsDrawer.classList.remove('open');
  DOM.btnToggleTaskDetails.classList.remove('active');

  soundEngine.playPop();
  showToast('Tugas baru berhasil ditambahkan! ✨', 'success');

  renderTasks();
  renderCategorySidebar();
  updateStats();
}

function handleToggleComplete(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;

  // If this is a recurring task and currently incomplete, reschedule to next occurrence on complete
  if (task.recurring && task.recurring.type && task.recurring.type !== 'none') {
    if (!task.completed) {
      soundEngine.playComplete();

      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.8 },
        colors: ['#6366f1', '#a855f7', '#ec4899', '#10b981', '#f59e0b']
      });

      const nextDue = calculateNextRecurringDate(task.dueDate || new Date().toISOString().split('T')[0], task.recurring);
      task.dueDate = nextDue;
      task.completed = false;
      if (task.subtasks) {
        task.subtasks.forEach(s => s.completed = false);
      }
      state.saveTasks();

      const nextLabel = formatShortDate(nextDue) || 'jadwal berikutnya';
      showToast(`🎉 Tugas rutin selesai! Dijadwalkan ulang: ${nextLabel} 🔁`, 'success');

      renderTasks();
      renderCategorySidebar();
      updateStats();
      return;
    }
  }

  task.completed = !task.completed;
  state.saveTasks();

  if (task.completed) {
    soundEngine.playComplete();

    // Trigger celebratory confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#6366f1', '#a855f7', '#ec4899', '#10b981', '#f59e0b']
    });

    // Check if ALL tasks are now completed
    const allDone = state.tasks.length > 0 && state.tasks.every(t => t.completed);
    if (allDone) {
      setTimeout(() => {
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.6 }
        });
        showToast('🎉 Luar biasa! Semua tugas telah terselesaikan!', 'success');
      }, 300);
    }
  } else {
    soundEngine.playPop();
  }

  renderTasks();
  renderCategorySidebar();
  updateStats();
}

function handleTogglePin(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;

  task.pinned = !task.pinned;
  state.saveTasks();
  soundEngine.playPop();

  showToast(task.pinned ? '📌 Tugas disematkan di paling atas' : 'Tugas dilepas dari sematan', 'info');
  renderTasks();
}

function handleDeleteTask(taskId) {
  const taskIndex = state.tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) return;

  const deleted = state.tasks.splice(taskIndex, 1)[0];
  state.saveTasks();
  soundEngine.playDelete();

  state.lastDeletedTask = { task: deleted, index: taskIndex };

  showToast(`"${deleted.title.slice(0, 25)}..." dihapus`, 'warning', 'Batalkan (Undo)', () => {
    if (state.lastDeletedTask) {
      state.tasks.splice(state.lastDeletedTask.index, 0, state.lastDeletedTask.task);
      state.saveTasks();
      state.lastDeletedTask = null;
      renderTasks();
      renderCategorySidebar();
      updateStats();
      showToast('Penghapusan dibatalkan', 'success');
    }
  });

  renderTasks();
  renderCategorySidebar();
  updateStats();
}

function handleDuplicateTask(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;

  const clone = {
    ...JSON.parse(JSON.stringify(task)),
    id: 'task-' + Date.now(),
    title: task.title + ' (Salinan)',
    completed: false,
    createdAt: Date.now()
  };

  state.tasks.unshift(clone);
  state.saveTasks();
  soundEngine.playPop();

  showToast('Tugas berhasil diduplikasi', 'info');
  renderTasks();
  renderCategorySidebar();
  updateStats();
}

function handleToggleSubtask(taskId, subId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task || !task.subtasks) return;

  const sub = task.subtasks.find(s => s.id === subId);
  if (!sub) return;

  sub.completed = !sub.completed;
  state.saveTasks();
  soundEngine.playPop();

  renderTasks();
}

// ==========================================================================
// EDIT MODAL WORKFLOW
// ==========================================================================

function openEditModal(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;

  DOM.editTaskId.value = task.id;
  DOM.editTaskTitle.value = task.title;
  DOM.editTaskCategory.value = task.category;
  DOM.editTaskPriority.value = task.priority;
  DOM.editTaskDue.value = task.dueDate || '';
  if (DOM.editTaskTime) {
    DOM.editTaskTime.value = task.dueTime || '';
  }
  DOM.editTaskDesc.value = task.description || '';

  if (DOM.editTaskRecurring) {
    const recurType = task.recurring?.type || 'none';
    DOM.editTaskRecurring.value = recurType;
    modalRecurringDays = Array.isArray(task.recurring?.days) && task.recurring.days.length > 0 
      ? task.recurring.days.map(Number) 
      : [1, 2, 3, 4, 5];
    if (DOM.editTaskDaysContainer) {
      DOM.editTaskDaysContainer.style.display = recurType === 'custom' ? 'flex' : 'none';
    }
    updateDaySelectorChips(DOM.editTaskDaySelector, modalRecurringDays);
  }

  modalEditingSubIndex = -1;
  currentModalSubtasks = JSON.parse(JSON.stringify(task.subtasks || []));
  renderModalSubtasks();

  DOM.modalEditTask.style.display = 'flex';
  refreshLucideIcons();
}

let modalEditingSubIndex = -1;

function renderModalSubtasks() {
  DOM.modalSubtasksContainer.innerHTML = currentModalSubtasks.map((sub, idx) => {
    if (modalEditingSubIndex === idx) {
      return `
        <div class="modal-subtask-item editing">
          <div class="modal-subtask-edit-wrap">
            <input 
              type="text" 
              class="modal-subtask-inline-input" 
              id="modal-sub-input-${idx}" 
              value="${escapeHtml(sub.text)}" 
              onkeydown="window.handleModalSubKey(event, ${idx})"
            >
          </div>
          <div class="modal-subtask-actions">
            <button type="button" class="modal-subtask-save-btn" onclick="window.saveModalSubEdit(${idx})" title="Simpan (Enter)">
              <i data-lucide="check" style="width:14px;height:14px;"></i>
            </button>
            <button type="button" class="modal-subtask-cancel-btn" onclick="window.cancelModalSubEdit()" title="Batal (Esc)">
              <i data-lucide="x" style="width:14px;height:14px;"></i>
            </button>
          </div>
        </div>
      `;
    }

    return `
      <div class="modal-subtask-item">
        <div class="modal-subtask-left" ondblclick="window.startModalSubEdit(${idx})" title="Klik dua kali untuk mengedit teks">
          <input type="checkbox" ${sub.completed ? 'checked' : ''} onchange="window.toggleModalSub(${idx})">
          <span class="modal-subtask-text">${escapeHtml(sub.text)}</span>
        </div>
        <div class="modal-subtask-actions">
          <button type="button" class="modal-subtask-edit-btn" onclick="window.startModalSubEdit(${idx})" title="Edit Subtask">
            <i data-lucide="edit-2" style="width:13px;height:13px;"></i>
          </button>
          <button type="button" class="modal-subtask-del-btn" onclick="window.removeModalSub(${idx})" title="Hapus Subtask">
            <i data-lucide="trash-2" style="width:13px;height:13px;"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  refreshLucideIcons();

  if (modalEditingSubIndex !== -1) {
    setTimeout(() => {
      const input = document.getElementById(`modal-sub-input-${modalEditingSubIndex}`);
      if (input) {
        input.focus();
        input.select();
      }
    }, 50);
  }
}

window.startModalSubEdit = function(idx) {
  modalEditingSubIndex = idx;
  renderModalSubtasks();
};

window.saveModalSubEdit = function(idx) {
  const input = document.getElementById(`modal-sub-input-${idx}`);
  if (input) {
    const val = input.value.trim();
    if (val) {
      currentModalSubtasks[idx].text = val;
    }
  }
  modalEditingSubIndex = -1;
  renderModalSubtasks();
  soundEngine.playPop();
};

window.cancelModalSubEdit = function() {
  modalEditingSubIndex = -1;
  renderModalSubtasks();
};

window.handleModalSubKey = function(e, idx) {
  if (e.key === 'Enter') {
    e.preventDefault();
    window.saveModalSubEdit(idx);
  } else if (e.key === 'Escape') {
    e.preventDefault();
    window.cancelModalSubEdit();
  }
};

window.toggleModalSub = function(idx) {
  if (currentModalSubtasks[idx]) {
    currentModalSubtasks[idx].completed = !currentModalSubtasks[idx].completed;
    renderModalSubtasks();
  }
};

window.removeModalSub = function(idx) {
  currentModalSubtasks.splice(idx, 1);
  if (modalEditingSubIndex === idx) {
    modalEditingSubIndex = -1;
  }
  renderModalSubtasks();
};

function handleSaveEditTask(e) {
  e.preventDefault();
  const taskId = DOM.editTaskId.value;
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;

  const editRecurType = DOM.editTaskRecurring ? DOM.editTaskRecurring.value : 'none';
  task.title = DOM.editTaskTitle.value.trim();
  task.category = DOM.editTaskCategory.value;
  task.priority = DOM.editTaskPriority.value;
  task.dueDate = DOM.editTaskDue.value;
  task.dueTime = DOM.editTaskTime ? DOM.editTaskTime.value : '';
  task.recurring = {
    type: editRecurType,
    days: editRecurType === 'custom' ? [...modalRecurringDays] : (editRecurType === 'workdays' ? [1, 2, 3, 4, 5] : [])
  };
  task.description = DOM.editTaskDesc.value.trim();
  task.subtasks = [...currentModalSubtasks];

  state.saveTasks();
  soundEngine.playPop();

  DOM.modalEditTask.style.display = 'none';
  showToast('Perubahan tugas disimpan! 💾', 'success');

  renderTasks();
  renderCategorySidebar();
  updateStats();
}

// ==========================================================================
// DRAFT SUBTASKS (FOR QUICK ADD)
// ==========================================================================

let draftEditingIndex = -1;

function handleAddDraftSubtask() {
  const text = DOM.draftSubtaskInput.value.trim();
  if (!text) return;

  state.draftSubtasks.push({
    id: 'sub-' + Date.now(),
    text: text,
    completed: false
  });

  DOM.draftSubtaskInput.value = '';
  renderDraftSubtasks();
}

function renderDraftSubtasks() {
  DOM.draftSubtasksContainer.innerHTML = state.draftSubtasks.map((sub, i) => {
    if (draftEditingIndex === i) {
      return `
        <div class="draft-subtask-chip editing">
          <input 
            type="text" 
            class="draft-subtask-inline-input" 
            id="draft-sub-input-${i}" 
            value="${escapeHtml(sub.text)}" 
            onkeydown="window.handleDraftSubKey(event, ${i})"
            onblur="window.saveDraftSubEdit(${i})"
          >
          <button type="button" class="btn-save-draft-chip" onmousedown="window.saveDraftSubEdit(${i})" title="Simpan">
            <i data-lucide="check" style="width:11px;height:11px;"></i>
          </button>
        </div>
      `;
    }

    return `
      <div class="draft-subtask-chip">
        <span class="draft-chip-text" onclick="window.startDraftSubEdit(${i})" title="Klik untuk mengedit">${escapeHtml(sub.text)}</span>
        <button type="button" class="btn-edit-chip" onclick="window.startDraftSubEdit(${i})" title="Edit subtask">
          <i data-lucide="edit-2" style="width:11px;height:11px;"></i>
        </button>
        <button type="button" class="btn-remove-chip" data-draft-index="${i}" title="Hapus subtask">
          <i data-lucide="x" style="width:11px;height:11px;"></i>
        </button>
      </div>
    `;
  }).join('');

  refreshLucideIcons();

  if (draftEditingIndex !== -1) {
    setTimeout(() => {
      const input = document.getElementById(`draft-sub-input-${draftEditingIndex}`);
      if (input) {
        input.focus();
        input.select();
      }
    }, 50);
  }
}

window.startDraftSubEdit = function(idx) {
  draftEditingIndex = idx;
  renderDraftSubtasks();
};

window.saveDraftSubEdit = function(idx) {
  if (draftEditingIndex === -1) return;
  const input = document.getElementById(`draft-sub-input-${idx}`);
  if (input) {
    const val = input.value.trim();
    if (val) {
      state.draftSubtasks[idx].text = val;
    }
  }
  draftEditingIndex = -1;
  renderDraftSubtasks();
  soundEngine.playPop();
};

window.cancelDraftSubEdit = function() {
  draftEditingIndex = -1;
  renderDraftSubtasks();
};

window.handleDraftSubKey = function(e, idx) {
  if (e.key === 'Enter') {
    e.preventDefault();
    window.saveDraftSubEdit(idx);
  } else if (e.key === 'Escape') {
    e.preventDefault();
    window.cancelDraftSubEdit();
  }
};

// ==========================================================================
// CATEGORY MODAL WORKFLOW
// ==========================================================================

let selectedCatColor = '#6366f1';

function handleAddCategory(e) {
  e.preventDefault();
  const name = DOM.catNameInput.value.trim();
  if (!name) return;

  const newCat = {
    id: 'cat-' + Date.now(),
    name: name,
    color: selectedCatColor,
    icon: 'tag'
  };

  state.categories.push(newCat);
  state.saveCategories();
  soundEngine.playPop();

  DOM.addCategoryForm.reset();
  DOM.modalCategory.style.display = 'none';
  showToast(`Kategori "${name}" berhasil dibuat! 🏷️`, 'success');

  renderCategorySelects();
  renderCategorySidebar();
}

// ==========================================================================
// DATA BACKUP, EXPORT & IMPORT
// ==========================================================================

function exportJson() {
  const data = {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    tasks: state.tasks,
    categories: state.categories
  };

  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `AuraTasks-Backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);

  showToast('Data berhasil diekspor ke JSON! 📥', 'success');
}

function exportCsv() {
  if (state.tasks.length === 0) {
    showToast('Tidak ada data tugas untuk diekspor', 'warning');
    return;
  }

  const headers = ['ID', 'Judul', 'Deskripsi', 'Kategori', 'Prioritas', 'Tenggat Waktu', 'Pengulangan', 'Status Selesai'];
  const rows = state.tasks.map(t => [
    `"${t.id}"`,
    `"${(t.title || '').replace(/"/g, '""')}"`,
    `"${(t.description || '').replace(/"/g, '""')}"`,
    `"${t.category}"`,
    `"${t.priority}"`,
    `"${t.dueDate || '-'}"`,
    `"${formatRecurringLabel(t.recurring) || '-'}"`,
    `"${t.completed ? 'Selesai' : 'Belum'}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `AuraTasks-Tasks-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);

  showToast('Data berhasil diekspor ke CSV! 📊', 'success');
}

function handleImportFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (evt) => {
    try {
      const imported = JSON.parse(evt.target.result);
      if (Array.isArray(imported.tasks)) {
        state.tasks = imported.tasks;
        if (Array.isArray(imported.categories)) {
          state.categories = imported.categories;
        }
        state.saveTasks();
        state.saveCategories();
        soundEngine.playComplete();

        DOM.modalBackup.style.display = 'none';
        showToast('Data backup berhasil dipulihkan! 🎉', 'success');

        renderCategorySelects();
        renderCategorySidebar();
        renderTasks();
        updateStats();
      } else {
        showToast('Format file JSON tidak valid', 'danger');
      }
    } catch (err) {
      showToast('Gagal membaca file JSON: ' + err.message, 'danger');
    }
  };
  reader.readAsText(file);
}

function loadSampleData() {
  state.tasks = JSON.parse(JSON.stringify(SAMPLE_TASKS));
  state.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
  state.saveTasks();
  state.saveCategories();
  soundEngine.playComplete();

  DOM.modalBackup.style.display = 'none';
  showToast('Contoh data berhasil dimuat! ✨', 'success');

  renderCategorySelects();
  renderCategorySidebar();
  renderTasks();
  updateStats();
}

// ==========================================================================
// BULK ACTIONS
// ==========================================================================

function handleBulkCompleteAll() {
  const hasActive = state.tasks.some(t => !t.completed);
  if (!hasActive) {
    showToast('Semua tugas sudah dalam status selesai', 'info');
    return;
  }

  state.tasks.forEach(t => t.completed = true);
  state.saveTasks();
  soundEngine.playComplete();

  confetti({ particleCount: 70, spread: 70 });
  showToast('Semua tugas ditandai selesai! 🎉', 'success');

  renderTasks();
  renderCategorySidebar();
  updateStats();
}

function handleBulkClearCompleted() {
  const completedCount = state.tasks.filter(t => t.completed).length;
  if (completedCount === 0) {
    showToast('Tidak ada tugas selesai untuk dibersihkan', 'info');
    return;
  }

  state.tasks = state.tasks.filter(t => !t.completed);
  state.saveTasks();
  soundEngine.playDelete();

  showToast(`${completedCount} tugas selesai dibersihkan`, 'info');
  renderTasks();
  renderCategorySidebar();
  updateStats();
}

function handleBulkResetAll() {
  if (confirm('Apakah Anda yakin ingin menghapus SEMUA tugas? Tindakan ini tidak dapat dibatalkan.')) {
    state.tasks = [];
    state.saveTasks();
    soundEngine.playDelete();

    showToast('Semua tugas telah direset', 'warning');
    renderTasks();
    renderCategorySidebar();
    updateStats();
  }
}

// ==========================================================================
// EVENT LISTENERS INITIALIZATION
// ==========================================================================

function initEventListeners() {
  // Theme pill buttons
  const themePillBtns = document.querySelectorAll('.theme-pill-btn');
  themePillBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const themeVal = btn.getAttribute('data-theme-val');
      applyTheme(themeVal);
      soundEngine.playPop();
      const themeNames = { dark: 'Dark Slate', aurora: 'Aurora Cyber', light: 'Clean Light' };
      showToast(`Tema berganti ke ${themeNames[themeVal] || themeVal} ✨`, 'info');
    });
  });

  // Sound toggle
  DOM.btnSoundToggle.addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    state.saveSound();
    updateSoundIcon();
    soundEngine.playPop();
    showToast(`Efek suara ${state.soundEnabled ? 'diaktifkan 🔊' : 'dinonaktifkan 🔇'}`, 'info');
  });

  // Backup modal toggle
  DOM.btnBackupMenu.addEventListener('click', () => {
    DOM.modalBackup.style.display = 'flex';
  });
  DOM.btnCloseBackupModal.addEventListener('click', () => DOM.modalBackup.style.display = 'none');
  DOM.btnCancelBackupModal.addEventListener('click', () => DOM.modalBackup.style.display = 'none');

  DOM.btnExportJson.addEventListener('click', exportJson);
  DOM.btnExportCsv.addEventListener('click', exportCsv);
  DOM.btnTriggerImport.addEventListener('click', () => DOM.importFileInput.click());
  DOM.importFileInput.addEventListener('change', handleImportFile);
  DOM.btnLoadSampleData.addEventListener('click', loadSampleData);

  // Quick Add Drawer toggle
  DOM.btnToggleTaskDetails.addEventListener('click', () => {
    DOM.taskDetailsDrawer.classList.toggle('open');
    DOM.btnToggleTaskDetails.classList.toggle('active');
  });

  // Quick Add Recurring Dropdown
  if (DOM.taskInputRecurring) {
    DOM.taskInputRecurring.addEventListener('change', (e) => {
      if (DOM.taskInputDaysContainer) {
        DOM.taskInputDaysContainer.style.display = e.target.value === 'custom' ? 'flex' : 'none';
      }
    });
  }

  // Quick Add Custom Days Selector
  if (DOM.taskAddDaySelector) {
    DOM.taskAddDaySelector.addEventListener('click', (e) => {
      const chip = e.target.closest('.day-chip-btn');
      if (chip) {
        const day = parseInt(chip.getAttribute('data-day'), 10);
        if (draftRecurringDays.includes(day)) {
          if (draftRecurringDays.length > 1) {
            draftRecurringDays = draftRecurringDays.filter(d => d !== day);
          } else {
            showToast('Pilih minimal 1 hari pengerjaan', 'info');
          }
        } else {
          draftRecurringDays.push(day);
        }
        updateDaySelectorChips(DOM.taskAddDaySelector, draftRecurringDays);
        soundEngine.playPop();
      }
    });
  }

  // Edit Modal Recurring Dropdown
  if (DOM.editTaskRecurring) {
    DOM.editTaskRecurring.addEventListener('change', (e) => {
      if (DOM.editTaskDaysContainer) {
        DOM.editTaskDaysContainer.style.display = e.target.value === 'custom' ? 'flex' : 'none';
      }
    });
  }

  // Edit Modal Custom Days Selector
  if (DOM.editTaskDaySelector) {
    DOM.editTaskDaySelector.addEventListener('click', (e) => {
      const chip = e.target.closest('.day-chip-btn');
      if (chip) {
        const day = parseInt(chip.getAttribute('data-day'), 10);
        if (modalRecurringDays.includes(day)) {
          if (modalRecurringDays.length > 1) {
            modalRecurringDays = modalRecurringDays.filter(d => d !== day);
          } else {
            showToast('Pilih minimal 1 hari pengerjaan', 'info');
          }
        } else {
          modalRecurringDays.push(day);
        }
        updateDaySelectorChips(DOM.editTaskDaySelector, modalRecurringDays);
        soundEngine.playPop();
      }
    });
  }

  // Add Task Form
  DOM.addTaskForm.addEventListener('submit', handleAddTask);
  DOM.btnAddDraftSubtask.addEventListener('click', handleAddDraftSubtask);
  DOM.draftSubtaskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddDraftSubtask();
    }
  });

  DOM.draftSubtasksContainer.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.btn-remove-chip');
    if (removeBtn) {
      const idx = parseInt(removeBtn.getAttribute('data-draft-index'), 10);
      state.draftSubtasks.splice(idx, 1);
      renderDraftSubtasks();
    }
  });

  // Filter Tabs
  DOM.filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      DOM.filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.statusFilter = tab.getAttribute('data-status');
      soundEngine.playPop();
      renderTasks();
    });
  });

  // Sidebar Category Filter
  DOM.categoryNavList.addEventListener('click', (e) => {
    const catBtn = e.target.closest('.cat-item-btn');
    if (catBtn) {
      state.categoryFilter = catBtn.getAttribute('data-cat-id');
      renderCategorySidebar();
      soundEngine.playPop();
      renderTasks();
    }
  });

  // Sidebar Priority Filter
  DOM.priorityFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.priorityFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.priorityFilter = btn.getAttribute('data-priority');
      soundEngine.playPop();
      renderTasks();
    });
  });

  // Search Input
  DOM.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    DOM.btnClearSearch.style.display = state.searchQuery ? 'flex' : 'none';
    renderTasks();
  });

  DOM.btnClearSearch.addEventListener('click', () => {
    DOM.searchInput.value = '';
    state.searchQuery = '';
    DOM.btnClearSearch.style.display = 'none';
    renderTasks();
  });

  // Sort Select
  DOM.sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    soundEngine.playPop();
    renderTasks();
  });

  // Bulk Actions
  DOM.btnBulkMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    DOM.bulkDropdownWrap.classList.toggle('open');
  });

  DOM.btnBulkCompleteAll.addEventListener('click', () => {
    DOM.bulkDropdownWrap.classList.remove('open');
    handleBulkCompleteAll();
  });
  DOM.btnBulkClearCompleted.addEventListener('click', () => {
    DOM.bulkDropdownWrap.classList.remove('open');
    handleBulkClearCompleted();
  });
  DOM.btnBulkResetAll.addEventListener('click', () => {
    DOM.bulkDropdownWrap.classList.remove('open');
    handleBulkResetAll();
  });

  // Task Card Clicks (Delegation)
  DOM.tasksContainer.addEventListener('click', (e) => {
    const actionEl = e.target.closest('[data-action]');
    if (!actionEl) return;

    const action = actionEl.getAttribute('data-action');
    const taskId = actionEl.getAttribute('data-task-id');

    switch (action) {
      case 'toggle-complete':
        handleToggleComplete(taskId);
        break;
      case 'toggle-pin':
        handleTogglePin(taskId);
        break;
      case 'delete-task':
        handleDeleteTask(taskId);
        break;
      case 'duplicate-task':
        handleDuplicateTask(taskId);
        break;
      case 'edit-task':
        openEditModal(taskId);
        break;
      case 'toggle-subtask': {
        const subId = actionEl.getAttribute('data-sub-id');
        handleToggleSubtask(taskId, subId);
        break;
      }
    }
  });

  // Empty State Button
  DOM.btnEmptyAddTask.addEventListener('click', () => {
    DOM.taskInputTitle.focus();
  });

  // Edit Task Modal Handlers
  DOM.editTaskForm.addEventListener('submit', handleSaveEditTask);
  DOM.btnCloseEditModal.addEventListener('click', () => DOM.modalEditTask.style.display = 'none');
  DOM.btnCancelEditModal.addEventListener('click', () => DOM.modalEditTask.style.display = 'none');

  DOM.btnAddEditSubtask.addEventListener('click', () => {
    const text = DOM.editSubtaskInput.value.trim();
    if (!text) return;
    currentModalSubtasks.push({
      id: 'sub-' + Date.now(),
      text: text,
      completed: false
    });
    DOM.editSubtaskInput.value = '';
    renderModalSubtasks();
  });

  DOM.editSubtaskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      DOM.btnAddEditSubtask.click();
    }
  });

  // Add Category Modal
  DOM.btnAddCategory.addEventListener('click', () => {
    DOM.modalCategory.style.display = 'flex';
  });
  DOM.btnCloseCatModal.addEventListener('click', () => DOM.modalCategory.style.display = 'none');
  DOM.btnCancelCatModal.addEventListener('click', () => DOM.modalCategory.style.display = 'none');
  DOM.addCategoryForm.addEventListener('submit', handleAddCategory);

  DOM.catColorPalette.addEventListener('click', (e) => {
    const swatch = e.target.closest('.color-swatch');
    if (swatch) {
      DOM.catColorPalette.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      selectedCatColor = swatch.getAttribute('data-color');
    }
  });

  // Sound Settings Modal Handlers
  if (DOM.btnReminderSettings) {
    DOM.btnReminderSettings.addEventListener('click', () => {
      updateSoundSettingsUI();
      DOM.modalSoundSettings.style.display = 'flex';
      refreshLucideIcons();
    });
  }

  if (DOM.btnCloseSoundModal) {
    DOM.btnCloseSoundModal.addEventListener('click', () => {
      soundEngine.stopAlarm();
      isTestingAudio = false;
      updateTestSoundBtn(false);
      DOM.modalSoundSettings.style.display = 'none';
    });
  }

  if (DOM.btnCloseSoundModalSave) {
    DOM.btnCloseSoundModalSave.addEventListener('click', () => {
      soundEngine.stopAlarm();
      isTestingAudio = false;
      updateTestSoundBtn(false);
      DOM.modalSoundSettings.style.display = 'none';
      showToast('Pengaturan suara & pengingat disimpan! 🔔', 'success');
    });
  }

  if (DOM.settingBriefingEnable) {
    DOM.settingBriefingEnable.addEventListener('change', (e) => {
      state.soundConfig.briefingEnabled = e.target.checked;
      state.saveSoundConfig();
      soundEngine.playPop();
    });
  }

  if (DOM.settingBriefingTime) {
    DOM.settingBriefingTime.addEventListener('change', (e) => {
      state.soundConfig.briefingTime = e.target.value;
      state.saveSoundConfig();
      soundEngine.playPop();
    });
  }

  if (DOM.btnTestBriefing) {
    DOM.btnTestBriefing.addEventListener('click', () => {
      openDailyBriefingModal(false);
    });
  }

  if (DOM.settingSoundTone) {
    DOM.settingSoundTone.addEventListener('change', (e) => {
      state.soundConfig.tone = e.target.value;
      state.saveSoundConfig();
      updateSoundSettingsUI();
      if (e.target.value !== 'custom') {
        soundEngine.playPresetTone(e.target.value);
      } else if (state.customAudio) {
        soundEngine.playCustomAudio(state.customAudio);
      }
    });
  }

  if (DOM.btnTriggerAudioUpload) {
    DOM.btnTriggerAudioUpload.addEventListener('click', () => {
      DOM.settingAudioFile.click();
    });
  }

  if (DOM.settingAudioFile) {
    DOM.settingAudioFile.addEventListener('change', handleAudioFileUpload);
  }

  if (DOM.btnResetAudio) {
    DOM.btnResetAudio.addEventListener('click', handleResetCustomAudio);
  }

  if (DOM.btnTestSound) {
    DOM.btnTestSound.addEventListener('click', toggleTestSound);
  }

  if (DOM.settingAudioVolume) {
    DOM.settingAudioVolume.addEventListener('input', (e) => {
      const vol = parseInt(e.target.value, 10);
      state.soundConfig.volume = vol;
      state.saveSoundConfig();
      if (DOM.volumeDisplayVal) {
        DOM.volumeDisplayVal.textContent = `${vol}%`;
      }
    });
  }

  if (DOM.btnRequestNotification) {
    DOM.btnRequestNotification.addEventListener('click', async () => {
      if ('Notification' in window) {
        try {
          const res = await Notification.requestPermission();
          updateNotificationPermBtn();
          if (res === 'granted') {
            showToast('Notifikasi desktop browser berhasil diizinkan! 🔔', 'success');
            sendBrowserNotification('AuraTasks Notification', {
              body: 'Izin notifikasi telah aktif. Anda akan menerima pengingat jadwal tugas!',
              icon: '/favicon.svg'
            });
          } else {
            showToast('Izin notifikasi tidak diberikan', 'info');
          }
        } catch (e) {
          console.warn(e);
        }
      }
    });
  }

  // Daily Briefing Modal Handlers
  if (DOM.btnCloseBriefingModal) {
    DOM.btnCloseBriefingModal.addEventListener('click', () => {
      DOM.modalDailyBriefing.style.display = 'none';
    });
  }

  if (DOM.btnSnoozeBriefing) {
    DOM.btnSnoozeBriefing.addEventListener('click', () => {
      DOM.modalDailyBriefing.style.display = 'none';
    });
  }

  if (DOM.btnActionStartDay) {
    DOM.btnActionStartDay.addEventListener('click', () => {
      DOM.modalDailyBriefing.style.display = 'none';
      state.statusFilter = 'today';
      DOM.filterTabs.forEach(t => {
        if (t.getAttribute('data-status') === 'today') {
          t.classList.add('active');
        } else {
          t.classList.remove('active');
        }
      });
      renderTasks();
      soundEngine.playPop();
      DOM.tasksContainer.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Close menus on outside click
  document.addEventListener('click', (e) => {
    if (DOM.bulkDropdownWrap && !DOM.bulkDropdownWrap.contains(e.target)) {
      DOM.bulkDropdownWrap.classList.remove('open');
    }
  });

  // Global Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    // Focus search on '/'
    if (e.key === '/' && document.activeElement !== DOM.searchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      DOM.searchInput.focus();
    }
    // Close modals on Escape
    if (e.key === 'Escape') {
      DOM.modalEditTask.style.display = 'none';
      DOM.modalCategory.style.display = 'none';
      DOM.modalBackup.style.display = 'none';
      if (DOM.modalSoundSettings) {
        soundEngine.stopAlarm();
        isTestingAudio = false;
        updateTestSoundBtn(false);
        DOM.modalSoundSettings.style.display = 'none';
      }
      if (DOM.modalDailyBriefing) DOM.modalDailyBriefing.style.display = 'none';
      if (DOM.bulkDropdownWrap) DOM.bulkDropdownWrap.classList.remove('open');
    }
  });
}

// ==========================================================================
// SOUND & REMINDER SETTINGS LOGIC
// ==========================================================================

let isTestingAudio = false;

function updateSoundSettingsUI() {
  if (DOM.settingBriefingEnable) {
    DOM.settingBriefingEnable.checked = state.soundConfig.briefingEnabled !== false;
  }
  if (DOM.settingBriefingTime) {
    DOM.settingBriefingTime.value = state.soundConfig.briefingTime || '08:00';
  }
  if (DOM.settingSoundTone) {
    DOM.settingSoundTone.value = state.soundConfig.tone || 'chime';
  }
  if (DOM.settingAudioVolume) {
    DOM.settingAudioVolume.value = state.soundConfig.volume ?? 80;
  }
  if (DOM.volumeDisplayVal) {
    DOM.volumeDisplayVal.textContent = `${state.soundConfig.volume ?? 80}%`;
  }

  // Custom Audio Box Visibility
  const isCustom = state.soundConfig.tone === 'custom';
  if (DOM.customAudioBox) {
    DOM.customAudioBox.style.display = isCustom ? 'flex' : 'none';
  }
  if (DOM.customAudioFilename) {
    DOM.customAudioFilename.textContent = state.customAudioName 
      ? `📁 ${state.customAudioName}` 
      : 'Belum ada file audio yang diunggah';
  }
  if (DOM.customAudioControls) {
    DOM.customAudioControls.style.display = state.customAudio ? 'flex' : 'none';
  }

  // Notification Permission Status
  updateNotificationPermBtn();
}

function updateNotificationPermBtn() {
  if (!DOM.notificationPermStatus) return;
  if (!('Notification' in window)) {
    DOM.notificationPermStatus.textContent = 'Tidak Didukung Browser';
    return;
  }
  if (Notification.permission === 'granted') {
    DOM.notificationPermStatus.textContent = '✅ Notifikasi Aktif';
    if (DOM.btnRequestNotification) DOM.btnRequestNotification.disabled = true;
  } else if (Notification.permission === 'denied') {
    DOM.notificationPermStatus.textContent = '❌ Izin Ditolak Browser';
  } else {
    DOM.notificationPermStatus.textContent = 'Aktifkan Notifikasi';
  }
}

function handleAudioFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 8 * 1024 * 1024) {
    showToast('Ukuran file audio maksimal 8MB', 'warning');
    return;
  }

  const reader = new FileReader();
  reader.onload = (evt) => {
    try {
      const dataUrl = evt.target.result;
      state.customAudio = dataUrl;
      state.customAudioName = file.name;
      localStorage.setItem(STORAGE_KEYS.CUSTOM_AUDIO, dataUrl);
      localStorage.setItem(STORAGE_KEYS.CUSTOM_AUDIO_NAME, file.name);

      state.soundConfig.tone = 'custom';
      state.saveSoundConfig();

      updateSoundSettingsUI();
      soundEngine.playCustomAudio(dataUrl);
      showToast(`Audio "${file.name}" berhasil disimpan! 🎵`, 'success');
    } catch (err) {
      showToast('Gagal menyimpan file audio: ' + err.message, 'danger');
    }
  };
  reader.readAsDataURL(file);
}

function handleResetCustomAudio() {
  state.customAudio = null;
  state.customAudioName = '';
  localStorage.removeItem(STORAGE_KEYS.CUSTOM_AUDIO);
  localStorage.removeItem(STORAGE_KEYS.CUSTOM_AUDIO_NAME);

  state.soundConfig.tone = 'chime';
  state.saveSoundConfig();

  updateSoundSettingsUI();
  showToast('Audio kustom dihapus, kembali ke nada Chime Harmoni', 'info');
}

function toggleTestSound() {
  if (isTestingAudio) {
    soundEngine.stopAlarm();
    isTestingAudio = false;
    updateTestSoundBtn(false);
  } else {
    isTestingAudio = true;
    updateTestSoundBtn(true);
    soundEngine.playAlarm(() => {
      isTestingAudio = false;
      updateTestSoundBtn(false);
    });
  }
}

function updateTestSoundBtn(playing) {
  if (DOM.testSoundText) DOM.testSoundText.textContent = playing ? 'Hentikan Nada' : 'Tes Putar Nada';
  if (DOM.testSoundIcon) {
    DOM.testSoundIcon.setAttribute('data-lucide', playing ? 'square' : 'play');
    refreshLucideIcons();
  }
}

// ==========================================================================
// DAILY BRIEFING & REMINDER ENGINE
// ==========================================================================

function openDailyBriefingModal(playSound = false) {
  const todayStr = formatDateToISO(new Date());
  const todayTasks = state.tasks.filter(t => t.dueDate === todayStr);
  const activeToday = todayTasks.filter(t => !t.completed);
  const completedToday = todayTasks.filter(t => t.completed);

  const now = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  if (DOM.briefingTodayDate) {
    DOM.briefingTodayDate.textContent = `📅 ${now.toLocaleDateString('id-ID', options)}`;
  }

  if (DOM.briefingSummaryCount) {
    DOM.briefingSummaryCount.textContent = activeToday.length > 0 
      ? `Ada ${activeToday.length} tugas aktif hari ini (${completedToday.length} telah selesai).`
      : `Tidak ada tugas tertunda untuk hari ini. Semua beres! ✨`;
  }

  if (DOM.briefingTasksContainer) {
    if (todayTasks.length === 0) {
      DOM.briefingTasksContainer.innerHTML = `
        <div class="briefing-empty">
          <p>🎉 Tidak ada jadwal tugas untuk hari ini!</p>
          <p style="font-size:0.8rem;margin-top:0.3rem;">Nikmati hari Anda atau tambahkan tugas baru di workspace.</p>
        </div>
      `;
    } else {
      DOM.briefingTasksContainer.innerHTML = todayTasks.map(t => {
        const cat = state.categories.find(c => c.id === t.category) || { name: 'Umum', color: '#6366f1' };
        return `
          <div class="briefing-task-card">
            <div style="display:flex;align-items:center;gap:0.6rem;flex:1;min-width:0;">
              <span>${t.completed ? '✅' : '⏳'}</span>
              <div style="flex:1;min-width:0;">
                <div class="briefing-task-title" style="${t.completed ? 'text-decoration:line-through;color:var(--text-muted);' : ''}">${escapeHtml(t.title)}</div>
                <div style="font-size:0.75rem;color:var(--text-muted);display:flex;gap:0.4rem;align-items:center;margin-top:2px;">
                  <span style="color:${cat.color};font-weight:600;">${cat.name}</span>
                  ${t.description ? `<span>• ${escapeHtml(t.description.slice(0, 35))}</span>` : ''}
                </div>
              </div>
            </div>
            ${t.dueTime ? `<span class="briefing-task-time-pill"><i data-lucide="clock" style="width:11px;height:11px;margin-right:3px;"></i>${t.dueTime}</span>` : ''}
          </div>
        `;
      }).join('');
    }
  }

  DOM.modalDailyBriefing.style.display = 'flex';
  refreshLucideIcons();

  if (playSound) {
    soundEngine.playAlarm();
  }
}

const notifiedTaskMinutes = new Set();

function checkTaskRemindersAndBriefing() {
  const now = new Date();
  const todayStr = formatDateToISO(now);
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const currentTimeStr = `${hours}:${minutes}`;
  const minuteKey = `${todayStr}-${currentTimeStr}`;

  // 1. Check Daily Briefing
  if (state.soundConfig.briefingEnabled !== false && currentTimeStr === (state.soundConfig.briefingTime || '08:00')) {
    if (state.lastBriefingDate !== todayStr) {
      state.lastBriefingDate = todayStr;
      localStorage.setItem(STORAGE_KEYS.BRIEFING_LAST_DATE, todayStr);
      openDailyBriefingModal(true);

      sendBrowserNotification('📋 Rekap Jadwal Hari Ini', {
        body: 'Waktunya memeriksa jadwal hari ini! Buka AuraTasks untuk melihat tugas Anda.',
        icon: '/favicon.svg'
      });
    }
  }

  // 2. Check Tasks Due at this exact minute
  const dueNowTasks = state.tasks.filter(t => !t.completed && t.dueDate === todayStr && t.dueTime === currentTimeStr);
  dueNowTasks.forEach(task => {
    const taskKey = `${task.id}-${minuteKey}`;
    if (!notifiedTaskMinutes.has(taskKey)) {
      notifiedTaskMinutes.add(taskKey);
      soundEngine.playAlarm();
      showToast(`⏰ Pengingat: "${task.title.slice(0, 30)}" waktunya sekarang! 🔔`, 'warning');

      sendBrowserNotification(`⏰ Pengingat Tugas: ${task.title}`, {
        body: task.description || 'Waktunya menyelesaikan tugas ini sekarang!',
        icon: '/favicon.svg'
      });
    }
  });
}

function sendBrowserNotification(title, options) {
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, options);
    } catch (e) {
      console.warn('Browser notification error', e);
    }
  }
}

let reminderInterval = null;
function startReminderEngine() {
  if (reminderInterval) clearInterval(reminderInterval);
  checkTaskRemindersAndBriefing();
  reminderInterval = setInterval(checkTaskRemindersAndBriefing, 10000);
}

// ==========================================================================
// UTILITY FUNCTIONS
// ==========================================================================

function getRelativeDateString(daysOffset) {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
}

function formatShortDate(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]}`;
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initApp);
