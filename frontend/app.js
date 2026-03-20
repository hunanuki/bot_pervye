/**
 * ИГРЫ ПЕРВЫХ - Мини-приложение для Telegram
 * Полное управление страницами и интерактивом
 */

const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

// Состояние приложения
const state = {
    currentPage: 'start', // 'start', 'menu', 'rating'
    currentGame: 'dota2'  // по умолчанию
};

// DOM элементы
const elements = {
    startPage: document.getElementById('startPage'),
    menuPage: document.getElementById('menuPage'),
    ratingPage: document.getElementById('ratingPage'),
    
    menuToggle: document.getElementById('menuToggle'),
    menuClose: document.getElementById('menuClose'),
    joinButton: document.getElementById('joinButton'),
    menuToggleRating: document.getElementById('menuToggleRating'),
    
    ratingRows: document.getElementById('ratingRows'),
    ratingGameTitle: document.getElementById('ratingGameTitle'),
    ratingSeasonTitle: document.getElementById('ratingSeasonTitle'),
    ratingTableWrapper: document.getElementById('ratingTableWrapper'),
    ratingTitle: document.querySelector('.rating-season-title'),

    ratingMenuPage: document.getElementById('ratingMenuPage'),
    ratingMenuOverlay: document.getElementById('ratingMenuOverlay')
};

/**
 * Названия дисциплин
 */
const gameNames = {
    minecraft: 'MINECRAFT',
    dota2: 'DOTA 2',
    fifa: 'FIFA',
    ufc: 'UFC',
    assetto: 'ASSETTO CORSA',
    vr: 'Арена виртуальной реальности «ВАРПОИНТ»',
    sportprog: 'Спортивное программирование'
};

/**
 * Данные для рейтинга по дисциплинам
 */
const ratingData = {
    dota2: [
        { position: 1, team: 'Team Spirit' },
        { position: 2, team: 'Virtus.pro' },
        { position: 3, team: 'BetBoom Team' },
        { position: 4, team: '9Pandas' },
        { position: 5, team: 'Team Secret' },
        { position: 6, team: 'NAVI' },
        { position: 7, team: 'G2' },
        { position: 8, team: 'OG' },
        { position: 9, team: 'Tundra Esports' },
        { position: 10, team: 'Entity' },
        { position: 11, team: 'Quest Esports' },
        { position: 12, team: 'Azure Ray' }
    ],
    minecraft: [
        { position: 1, team: 'Dream Team' },
        { position: 2, team: 'Technoblade Legacy' },
        { position: 3, team: 'Hermitcraft' },
        { position: 4, team: 'BedWars Pros' },
        { position: 5, team: 'Speedrunners United' }
    ],
    fifa: [
        { position: 1, team: 'FaZe Clan' },
        { position: 2, team: 'Team Gullit' },
        { position: 3, team: 'RBLZ Gaming' },
        { position: 4, team: 'Nova Esports' },
        { position: 5, team: 'Tundra Esports' },
        { position: 6, team: 'Dijon' },
        { position: 7, team: 'Mkers' },
        { position: 8, team: 'Exeed' }
    ],
    ufc: [
        { position: 1, team: 'Team Khamzat' },
        { position: 2, team: 'Eagle FC' },
        { position: 3, team: 'American Top Team' },
        { position: 4, team: 'Team Nurmagomedov' },
        { position: 5, team: 'Chute Boxe' },
        { position: 6, team: 'Kings MMA' },
        { position: 7, team: 'Tiger Muay Thai' }
    ],
    assetto: [
        { position: 1, team: 'Redline' },
        { position: 2, team: 'BS+ COMPETITION' },
        { position: 3, team: 'TRITON RACING' },
        { position: 4, team: 'Apex Racing Team' },
        { position: 5, team: 'Williams Esports' },
        { position: 6, team: 'R8G Esports' }
    ],
    vr: [
        { position: 1, team: 'VR Warriors' },
        { position: 2, team: 'Virtual Legends' },
        { position: 3, team: 'ARENA MASTERS' },
        { position: 4, team: 'VR Challengers' },
        { position: 4, team: 'VR Challengers' },
        { position: 4, team: 'VR Challengers' },
        { position: 4, team: 'VR Challengers' },
        { position: 4, team: 'VR Challengers' },
        { position: 4, team: 'VR Challengers' },
        { position: 4, team: 'VR Challengers' },
        { position: 4, team: 'VR Challengers' },
        { position: 4, team: 'VR Challengers' },
        { position: 4, team: 'VR Challengers' },
        { position: 4, team: 'VR Challengers' },
        { position: 4, team: 'VR Challengers' },
        { position: 4, team: 'VR Challengers' },
        { position: 4, team: 'VR Challengers' },
        { position: 4, team: 'VR Challengers' },
        { position: 4, team: 'VR Challengers' }
    ],
    sportprog: [
        { position: 1, team: 'Code Warriors' },
        { position: 2, team: 'Algorithm Masters' },
        { position: 3, team: 'Sport Programming' },
        { position: 4, team: 'Dev Team' }
    ]
};

/**
 * Закрывает все раскрытые подменю
 */
function closeAllSubmenus() {
    document.querySelectorAll('.menu-item, .rating-menu-item').forEach(item => {
        item.classList.remove('expanded');
    });
}

/**
 * Позиционирует таблицу относительно сезонного заголовка
 */
function positionRatingTable() {
    if (!elements.ratingSeasonTitle || !elements.ratingTableWrapper) return;
    
    const seasonTitleRect = elements.ratingSeasonTitle.getBoundingClientRect();
    const appRect = document.querySelector('.app').getBoundingClientRect();
    const tableWrapper = elements.ratingTableWrapper;
    const ratingRows = document.querySelector('.rating-rows');
    
    const seasonTitleBottom = seasonTitleRect.bottom - appRect.top;
    const offset = 15;
    const appHeight = 625;
    const bottomMargin = 15;
    
    const maxAllowedHeight = appHeight - (seasonTitleBottom + offset) - bottomMargin;
    const naturalHeight = tableWrapper.scrollHeight;
    
    tableWrapper.style.top = (seasonTitleBottom + offset) + 'px';
    
    if (naturalHeight > maxAllowedHeight) {
        ratingRows.style.maxHeight = maxAllowedHeight + 'px';
        ratingRows.style.overflowY = 'auto';
    } else {
        ratingRows.style.maxHeight = 'none';
        ratingRows.style.overflowY = 'visible';
    }
}


/**
 * Загрузка данных для рейтинга
 */
async function loadRatingData(game) {
    if (!elements.ratingRows) return;
    
    elements.ratingRows.innerHTML = '<div class="loading">Загрузка...</div>';
    
    try {
        // ID вашей таблицы (замените на свой)
        const SPREADSHEET_ID = '1Z4D4i1FkPxfOMRLtWXKHctbCoWJwjVQn5EqmiYRPy3I';
        
        // Маппинг дисциплин на названия листов
        const sheetMap = {
            dota2: 'DOTA2',
            minecraft: 'MINECRAFT',
            fifa: 'FIFA',
            ufc: 'UFC',
            assetto: 'ASSETTO',
            vr: 'VR_ARENA',
            sportprog: 'SPORT_PROG'
        };
        
        const sheetName = sheetMap[game] || game;
        const url = `https://opensheet.elk.sh/${SPREADSHEET_ID}/${sheetName}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        // opensheet возвращает массив объектов с колонками как ключами
        // Предполагаем, что в таблице есть колонки position и team
        renderRatingTable(data);
        
    } catch (error) {
        console.error('Ошибка:', error);
        elements.ratingRows.innerHTML = '<div class="loading">Ошибка загрузки</div>';
    }
}


/**
 * Отрисовка таблицы рейтинга
 */
function renderRatingTable(data) {
    if (!elements.ratingRows) return;
    
    if (!data || data.length === 0) {
        elements.ratingRows.innerHTML = '<div class="loading">Нет данных</div>';
        return;
    }
    
    let html = '';
    data.forEach((item, index) => {
        const isTopThree = index < 3;
        
        // Проверяем, какие ключи приходят из Google Sheets
        // Может быть position/team или Position/Team
        const position = item.position || item.Position || item.Позиция;
        const team = item.team || item.Team || item.Команда;
        
        html += `
            <div class="rating-row ${isTopThree ? 'top-three' : ''}">
                <span class="position">#${position}</span>
                <span class="team-name">${team}</span>
            </div>
        `;
    });
    
    elements.ratingRows.innerHTML = html;
    setTimeout(positionRatingTable, 10);
}

/**
 * Переключение между страницами
 */
function showPage(page) {
    if (page === 'menu') {
        // Показываем меню поверх стартовой страницы
        if (elements.menuPage) elements.menuPage.classList.remove('hidden');
        // НЕ скрываем startPage - меню должно быть поверх
        if (elements.ratingPage) elements.ratingPage.classList.add('hidden');
        if (elements.ratingMenuPage) elements.ratingMenuPage.classList.add('hidden');
    } 
    else if (page === 'rating') {
        if (elements.startPage) elements.startPage.classList.add('hidden');
        if (elements.menuPage) elements.menuPage.classList.add('hidden');
        if (elements.ratingPage) elements.ratingPage.classList.remove('hidden');
        if (elements.ratingMenuPage) elements.ratingMenuPage.classList.add('hidden');
        
        loadRatingData(state.currentGame);
    }
    else { // start
        if (elements.startPage) elements.startPage.classList.remove('hidden');
        if (elements.menuPage) elements.menuPage.classList.add('hidden');
        if (elements.ratingPage) elements.ratingPage.classList.add('hidden');
        if (elements.ratingMenuPage) elements.ratingMenuPage.classList.add('hidden');
        closeAllSubmenus();
    }
    
    state.currentPage = page;
    tg.HapticFeedback.impactOccurred('light');
}

/**
 * Открытие внешних ссылок
 */
function openLink(url) {
    if (url && url.startsWith('http')) {
        window.open(url, '_blank');
        tg.HapticFeedback.impactOccurred('light');
    }
}

/**
 * Инициализация приложения
 */
function init() {
    // Кнопка меню на стартовой странице
    if (elements.menuToggle) {
        elements.menuToggle.addEventListener('click', () => {
            showPage('menu');
        });
    }
    
    // Кнопка "Принять участие"
    if (elements.joinButton) {
        elements.joinButton.addEventListener('click', () => {
            showPage('menu');
            tg.HapticFeedback.impactOccurred('medium');
        });
    }
    
    // Кнопка меню на странице рейтинга - ОТКРЫТИЕ
    if (elements.menuToggleRating) {
        elements.menuToggleRating.addEventListener('click', (e) => {
            e.stopPropagation();
            if (elements.ratingMenuPage) {
                elements.ratingMenuPage.classList.remove('hidden');
                tg.HapticFeedback.impactOccurred('light');
            }
        });
    }
    
    // Закрытие меню по overlay на странице рейтинга
    if (elements.ratingMenuOverlay) {
        elements.ratingMenuOverlay.addEventListener('click', () => {
            if (elements.ratingMenuPage) {
                elements.ratingMenuPage.classList.add('hidden');
                closeAllSubmenus();
            }
        });
    }
    
    // Закрытие меню по overlay на главной
    const menuOverlay = document.getElementById('menuOverlay');
    if (menuOverlay) {
        menuOverlay.addEventListener('click', () => {
            showPage('start');
        });
    }
    
    // Аккордеон для главного меню
    document.querySelectorAll('.menu-item-header').forEach(header => {
        header.addEventListener('click', (e) => {
            const menuItem = e.currentTarget.closest('.menu-item');
            const wasExpanded = menuItem.classList.contains('expanded');
            
            document.querySelectorAll('.menu-item').forEach(item => {
                item.classList.remove('expanded');
            });
            
            if (!wasExpanded) {
                menuItem.classList.add('expanded');
            }
            
            tg.HapticFeedback.impactOccurred('light');
        });
    });

    // Аккордеон для меню на странице рейтинга
    document.querySelectorAll('.rating-menu-item-header').forEach(header => {
        header.addEventListener('click', (e) => {
            e.stopPropagation();
            const menuItem = e.currentTarget.closest('.rating-menu-item');
            const wasExpanded = menuItem.classList.contains('expanded');
            
            document.querySelectorAll('.rating-menu-item').forEach(item => {
                item.classList.remove('expanded');
            });
            
            if (!wasExpanded) {
                menuItem.classList.add('expanded');
            }
            
            tg.HapticFeedback.impactOccurred('light');
        });
    });
    
    // Обработчики для подпунктов рейтинга
    document.querySelectorAll('[data-game]').forEach(item => {
        item.addEventListener('click', (e) => {
            const game = e.target.dataset.game;
            state.currentGame = game;
            showPage('rating');
            tg.HapticFeedback.impactOccurred('medium');
        });
    });
    
    // Обработчики для ссылок
    document.querySelectorAll('[data-link]').forEach(item => {
        item.addEventListener('click', (e) => {
            const link = e.target.dataset.link;
            openLink(link);
        });
    });
    
    // Обработчики для FAQ
    document.querySelectorAll('[data-faq]').forEach(item => {
        item.addEventListener('click', (e) => {
            const faqId = e.target.dataset.faq;
            const answers = {
                '1': 'Для участия нужно нажать кнопку "Принять участие" и заполнить форму',
                '2': 'Турнир начнется 1 апреля 2026 года',
                '3': 'Общий призовой фонд: 1 000 000 ₽'
            };
            alert(answers[faqId] || 'Информация появится позже');
            tg.HapticFeedback.impactOccurred('light');
        });
    });
    
    // Ресайз
    window.addEventListener('resize', () => {
        if (state.currentPage === 'rating') {
            positionRatingTable();
        }
    });
    
    showPage('start');
}

// Запуск
document.addEventListener('DOMContentLoaded', init);