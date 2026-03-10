/**
 * Модуль для работы с сервером
 */
const API = {
    // Базовый URL твоего сервера (когда появится)
    BASE_URL: '',  // пока пусто, потом вставишь 'https://твой-сервер.com/api'
    
    /**
     * Получение данных (тестовые данные)
     */
    async getData() {
        // ПОКА: тестовые данные
        // ПОТОМ заменишь на реальный запрос:
        /*
        try {
            const response = await fetch(`${this.BASE_URL}/data`);
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
        */
        
        // Временные данные для теста
        return [
            { id: 1, name: 'Товар 1', category: 'Категория А', price: 1500, stock: 12 },
            { id: 2, name: 'Товар 2', category: 'Категория Б', price: 2300, stock: 8 },
            { id: 3, name: 'Товар 3', category: 'Категория А', price: 800, stock: 25 },
            { id: 4, name: 'Товар 4', category: 'Категория В', price: 4200, stock: 3 }
        ];
    },
    
    /**
     * Отправка данных на сервер (когда понадобится)
     */
    async postData(data) {
        // Реальный запрос будет выглядеть так:
        /*
        const response = await fetch(`${this.BASE_URL}/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return await response.json();
        */
        
        console.log('Отправка данных:', data);
        return { success: true };
    }
};