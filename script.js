// script.js

// --- ЗАДАЧА 1: ГЕОЛОКАЦИЯ ---
function getLocation() {
    const resultDiv = document.getElementById('location-result');
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resultDiv.style.display = 'block';
                resultDiv.innerHTML = `
                    <strong>Ваши координаты:</strong><br>
                    Широта: ${position.coords.latitude}<br>
                    Долгота: ${position.coords.longitude}<br>
                    Точность: ${position.coords.accuracy} м
                `;
            },
            (error) => {
                resultDiv.style.display = 'block';
                resultDiv.style.color = 'red';
                let msg = "";
                switch(error.code) {
                    case error.PERMISSION_DENIED: msg = "Пользователь запретил геолокацию."; break;
                    case error.POSITION_UNAVAILABLE: msg = "Данные геолокации недоступны."; break;
                    case error.TIMEOUT: msg = "Запрос на геолокацию истек."; break;
                    default: msg = "Неизвестная ошибка.";
                }
                resultDiv.innerText = "Ошибка: " + msg;
            }
        );
    } else {
        resultDiv.style.display = 'block';
        resultDiv.innerText = "Геолокация не поддерживается в этом браузере.";
    }
}

// --- ЗАДАЧА 2: АНИМАЦИЯ ПРИ СКРОЛЛЕ ---
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        // Элемент появляется, когда он попадает в область видимости (чуть выше низа экрана)
        const screenPosition = ((window.innerHeight / 1.3) - position);
        if(screenPosition > 0) {
            el.classList.add('visible');
        }
    });
});

// --- ЗАДАЧА 3: FETCH API (Упрощённый вариант без сервера) ---
// Если позже захочешь настоящий fetch, раскомментируй блок с fetch и удали вывод текста
function loadTextFile() {
    const output = document.getElementById('fetch-result');
    
    // ВАРИАНТ БЕЗ СЕРВЕРА (работает сразу при открытии файла)
    output.innerText = 'Если вы открыли Fetch Api, то вы большой молодец!';
    
    /* 
    ВАРИАНТ С СЕРВЕРОМ (нужно запускать через Live Server в VS Code)
    fetch('fetch_api.txt')
        .then(response => {
            if (!response.ok) throw new Error("Файл не найден");
            return response.text();
        })
        .then(text => output.innerText = text)
        .catch(error => {
            output.innerHTML = `<span style="color:red">Ошибка: ${error.message}</span>`;
        });
    */
}

// --- ЗАДАЧА 4: XML ТАБЛИЦА ---
const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
<catalog>
    <cd>
        <title>Empire Burlesque</title>
        <artist>Bob Dylan</artist>
        <country>USA</country>
        <company>Columbia</company>
        <price>10.90</price>
        <year>1985</year>
    </cd>
    <cd>
        <title>Unchain My Heart</title>
        <artist>Joe Cocker</artist>
        <country>UK</country>
        <company>EMI</company>
        <price>8.20</price>
        <year>1987</year>
    </cd>
    <cd>
        <title>Greatest Hits</title>
        <artist>Pink Floyd</artist>
        <country>UK</country>
        <company>Harvest</company>
        <price>12.50</price>
        <year>1999</year>
    </cd>
</catalog>`;

function parseAndShowXML() {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, "text/xml");
    const cds = xmlDoc.getElementsByTagName("cd");
    const tbody = document.querySelector("#cd-table tbody");

    Array.from(cds).forEach((cd, index) => {
        const title = cd.getElementsByTagName("title")[0].childNodes[0].nodeValue;
        const artist = cd.getElementsByTagName("artist")[0].childNodes[0].nodeValue;
        
        const row = `<tr onclick="showAlbumInfo(${index})">
            <td>${title}</td>
            <td>${artist}</td>
            <td style="color:#d946ef; cursor:pointer;">👉 Подробнее</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function showAlbumInfo(index) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, "text/xml");
    const cd = xmlDoc.getElementsByTagName("cd")[index];
    
    const infoDiv = document.getElementById('album-info');
    infoDiv.style.display = 'block';
    infoDiv.innerHTML = `
        <strong>💿 Альбом: ${cd.getElementsByTagName("title")[0].childNodes[0].nodeValue}</strong><br>
        Исполнитель: ${cd.getElementsByTagName("artist")[0].childNodes[0].nodeValue}<br>
        Страна: ${cd.getElementsByTagName("country")[0].childNodes[0].nodeValue}<br>
        Цена: $${cd.getElementsByTagName("price")[0].childNodes[0].nodeValue}
    `;
}

// Запускаем заполнение таблицы сразу после загрузки скрипта
parseAndShowXML();

// --- ЗАДАЧА 5: ГЕНЕРАТОР ЦВЕТА ---
function changeRandomColor() {
    // 1. Генерируем случайный HEX цвет
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

    // 2. Получаем элемент body
    const body = document.body;

    // 3. ВАЖНО: Сбрасываем любые старые инлайн-стили фона, чтобы не было конфликтов
    body.style.removeProperty('background-color');
    body.style.removeProperty('background');

    // 4. Устанавливаем новый цвет
    body.style.backgroundColor = randomColor;
    
    // Логика для превью (оставляем как была)
    const preview = document.getElementById('color-preview');
    if (preview) {
        preview.style.backgroundColor = randomColor;
        preview.innerText = randomColor.toUpperCase();
    }

    const codeText = document.getElementById('color-code');
    if (codeText) {
        codeText.innerText = `Код цвета: ${randomColor.toUpperCase()}`;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    document.body.style.backgroundColor = '#f5f5f5'; // Цвет по умолчанию
});

