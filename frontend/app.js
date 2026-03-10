/**
 * Главный файл приложения
 */

// Инициализация Telegram
const tg = window.Telegram.WebApp;

// Состояние приложения
const AppState = {
    user: tg.initDataUnsafe?.user || null,
    theme: tg.colorScheme || 'light',
    data: null,
    isLoading: false
};

/**
 * Главный объект приложения
 */
const App = {
    /**
     * Инициализация приложения
     */
    async init() {
        console.log('🚀 Приложение запущено', AppState);
        
        // Растягиваем на весь экран
        tg.expand();
        
        // Настраиваем главную кнопку
        tg.MainButton.setText("🔄 Обновить");
        tg.MainButton.onClick(() => this.refreshData());
        tg.MainButton.show();
        
        // Загружаем данные
        await this.loadData();
        
        // Сообщаем Telegram, что приложение готово
        tg.ready();
    },
    
    /**
     * Загрузка данных
     */
    async loadData() {
        try {
            AppState.isLoading = true;
            this.showLoading();
            
            // Получаем данные через API
            AppState.data = await API.getData();
            
            // Отображаем данные
            this.render();
            
        } catch (error) {
            console.error('Ошибка загрузки:', error);
            this.showError('Не удалось загрузить данные');
        } finally {
            AppState.isLoading = false;
        }
    },
    
    /**
     * Обновление данных
     */
    async refreshData() {
        await this.loadData();
    },
    
    /**
     * Отрисовка интерфейса
     */
    render() {
        const contentDiv = document.getElementById('content');
        
        if (!AppState.data) {
            return;
        }
        
        // Создаем структуру страницы
        let html = '';
        
        // Приветствие
        if (AppState.user) {
            html += `<h1>Привет, ${AppState.user.first_name}!</h1>`;
        } else {
            html += '<h1>Добро пожаловать!</h1>';
        }
        
        // Информация
        html += '<p>Это тестовое мини-приложение с таблицей данных.</p>';
        
        // Таблица
        html += TableComponent.render(AppState.data);
        
        // Информация о количестве записей
        html += `<p style="margin-top: 16px; color: var(--hint-color);">
            Всего записей: ${AppState.data.length}
        </p>`;
        
        contentDiv.innerHTML = html;
    },
    
    /**
     * Показ загрузки
     */
    showLoading() {
        document.getElementById('content').innerHTML = 
            '<div class="loading">Загрузка данных...</div>';
    },
    
    /**
     * Показ ошибки
     */
    showError(message) {
        document.getElementById('content').innerHTML = 
            `<div class="loading" style="color: #ff3b30;">${message}</div>`;
    }
};

// Запуск приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});