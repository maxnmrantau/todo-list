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
  Tag 
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
  Tag 
};

// ==========================================================================
// DEFAULT DATA & CONSTANTS
// ==========================================================================

const STORAGE_KEYS = {
  TASKS: 'auratasks_data_tasks',
  CATEGORIES: 'auratasks_data_categories',
  THEME: 'auratasks_setting_theme',
  SOUND: 'auratasks_setting_sound',
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
    completed: false,
    pinned: false,
    subtasks: [],
    createdAt: Date.now() - 1000 * 60 * 60 * 20
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
// SOUND SYNTHESIS ENGINE (Web Audio API — Zero Asset Dependencies)
// ==========================================================================

class SoundEngine {
  constructor() {
    this.ctx = null;
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

  playPop() {
    if (!state.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

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
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        gain.gain.setValueAtTime(0.25, now + i * 0.06);
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
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) { /* ignore sound error */ }
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
  taskInputDesc: document.getElementById('task-input-desc'),
  draftSubtaskInput: document.getElementById('draft-subtask-input'),
  btnAddDraftSubtask: document.getElementById('btn-add-draft-subtask'),
  draftSubtasksContainer: document.getElementById('draft-subtasks-container'),

  // Controls & Filters
  filterTabs: document.querySelectorAll('.filter-tab'),
  badgeAll: document.getElementById('badge-all'),
  badgeActive: document.getElementById('badge-active'),
  badgeToday: document.getElementById('badge-today'),
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

// ==========================================================================
// RENDER & UI UPDATE FUNCTIONS
// ==========================================================================

function initApp() {
  applyTheme(state.theme);
  updateSoundIcon();
  renderDateAndGreeting();
  renderCategorySelects();
  renderCategorySidebar();
  renderTasks();
  updateStats();
  initEventListeners();
  refreshLucideIcons();
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

  DOM.badgeAll.textContent = total;
  DOM.badgeActive.textContent = activeCount;
  DOM.badgeToday.textContent = todayCount;
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

  // Due Date Formatting
  let dueHtml = '';
  if (task.dueDate) {
    let dueClass = '';
    let dueLabel = formatShortDate(task.dueDate);

    if (task.dueDate < todayStr && !task.completed) {
      dueClass = 'due-overdue';
      dueLabel = `⚠️ Lewat: ${dueLabel}`;
    } else if (task.dueDate === todayStr) {
      dueClass = 'due-today';
      dueLabel = `⭐ Hari Ini`;
    }

    dueHtml = `
      <span class="meta-pill meta-pill-due ${dueClass}">
        <i data-lucide="calendar" style="width:12px;height:12px;"></i>
        <span>${dueLabel}</span>
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

  const newTask = {
    id: 'task-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
    title: title,
    description: DOM.taskInputDesc.value.trim(),
    category: DOM.taskInputCategory.value || 'work',
    priority: DOM.taskInputPriority.value || 'medium',
    dueDate: DOM.taskInputDue.value || '',
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
  renderDraftSubtasks();
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
  DOM.editTaskDesc.value = task.description || '';

  currentModalSubtasks = JSON.parse(JSON.stringify(task.subtasks || []));
  renderModalSubtasks();

  DOM.modalEditTask.style.display = 'flex';
  refreshLucideIcons();
}

function renderModalSubtasks() {
  DOM.modalSubtasksContainer.innerHTML = currentModalSubtasks.map((sub, idx) => `
    <div class="modal-subtask-item">
      <div class="modal-subtask-left">
        <input type="checkbox" ${sub.completed ? 'checked' : ''} onchange="window.toggleModalSub(${idx})">
        <span>${escapeHtml(sub.text)}</span>
      </div>
      <button type="button" class="modal-subtask-del-btn" onclick="window.removeModalSub(${idx})">
        <i data-lucide="x" style="width:14px;height:14px;"></i>
      </button>
    </div>
  `).join('');

  refreshLucideIcons();
}

window.toggleModalSub = function(idx) {
  if (currentModalSubtasks[idx]) {
    currentModalSubtasks[idx].completed = !currentModalSubtasks[idx].completed;
    renderModalSubtasks();
  }
};

window.removeModalSub = function(idx) {
  currentModalSubtasks.splice(idx, 1);
  renderModalSubtasks();
};

function handleSaveEditTask(e) {
  e.preventDefault();
  const taskId = DOM.editTaskId.value;
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;

  task.title = DOM.editTaskTitle.value.trim();
  task.category = DOM.editTaskCategory.value;
  task.priority = DOM.editTaskPriority.value;
  task.dueDate = DOM.editTaskDue.value;
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
  DOM.draftSubtasksContainer.innerHTML = state.draftSubtasks.map((sub, i) => `
    <div class="draft-subtask-chip">
      <span>${escapeHtml(sub.text)}</span>
      <button type="button" class="btn-remove-chip" data-draft-index="${i}">
        <i data-lucide="x" style="width:12px;height:12px;"></i>
      </button>
    </div>
  `).join('');

  refreshLucideIcons();
}

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

  const headers = ['ID', 'Judul', 'Deskripsi', 'Kategori', 'Prioritas', 'Tenggat Waktu', 'Status Selesai'];
  const rows = state.tasks.map(t => [
    `"${t.id}"`,
    `"${(t.title || '').replace(/"/g, '""')}"`,
    `"${(t.description || '').replace(/"/g, '""')}"`,
    `"${t.category}"`,
    `"${t.priority}"`,
    `"${t.dueDate || '-'}"`,
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
      if (DOM.bulkDropdownWrap) DOM.bulkDropdownWrap.classList.remove('open');
    }
  });
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
