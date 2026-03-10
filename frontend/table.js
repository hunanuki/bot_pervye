/**
 * Компонент таблицы
 */
const TableComponent = {
    /**
     * Создает HTML таблицы из данных
     */
    render(data) {
        if (!data || data.length === 0) {
            return '<p class="loading">Нет данных для отображения</p>';
        }
        
        // Получаем заголовки из первого объекта
        const headers = Object.keys(data[0]);
        
        // Названия колонок для отображения (красивые)
        const headerNames = {
            id: 'ID',
            name: 'Наименование',
            category: 'Категория',
            price: 'Цена',
            stock: 'Остаток'
        };
        
        let html = '<div class="table-container">';
        html += '<table class="data-table">';
        
        // Заголовок
        html += '<thead><tr>';
        headers.forEach(header => {
            const displayName = headerNames[header] || header;
            html += `<th>${displayName}</th>`;
        });
        html += '</tr></thead>';
        
        // Тело таблицы
        html += '<tbody>';
        data.forEach(row => {
            html += '<tr>';
            headers.forEach(header => {
                let value = row[header];
                
                // Форматирование цены
                if (header === 'price' && typeof value === 'number') {
                    value = new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
                }
                
                html += `<td>${value}</td>`;
            });
            html += '</tr>';
        });
        html += '</tbody>';
        
        html += '</table>';
        html += '</div>';
        
        return html;
    },
    
    /**
     * Обновляет таблицу с новыми данными
     */
    update(containerId, data) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = this.render(data);
        }
    }
};