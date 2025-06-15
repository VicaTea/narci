// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Добавление класса 'scrolled' к header при прокрутке
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        document.querySelector('header').classList.add('scrolled');
    } else {
        document.querySelector('header').classList.remove('scrolled');
    }
});

const floatingPhrases = [
    "Идеальная анимация для идеального Вас...",
    "Наша анимация настолько качественная, что заставит ваши комплексы исчезнуть...",
    "Анимация в подарок? С нами даже ваш персонаж будет выглядеть как с обложки журнала ~",
    "В нашей студии мы уверены, что вы — гений. Наши продукты нужны лишь чтобы это доказать",
    "Заказали анимацию? Позвоните себе и похвалите себя за отличный выбор!",
    "Вы достойны только лучшего! А лучше Нарци не существует!",
    "Общение с нами настолько интуитивно, что вам покажется, что мы читаем ваши мысли... И восхищаемся ими.",
    "Сайт \"Нарци\" настолько хорош, что на главной странице размещена только одна кнопка: \"Заказать шедевр\".",
    "В \"Нарци\" настолько хорошо умеют угождать клиентам, что уже разработали нейросеть, которая создает комплименты, пока вы ждете смету.",
    "\"Нарци\" - это не просто анимация. Это медитация на тему вашего величия, визуализированная в движении.",
    "Мы в \"Нарци\" настолько уважаем ваше время, что сразу начинаем с финального варианта. Все остальное - просто завистливые черновики.",
    "Мы в \"Нарци\" настолько заняты созданием шедевров, что у нас нет времени на обычную анимацию. Но для вас сделаем исключение...",
    "Заказывая анимацию в \"Нарци\", вы автоматически становитесь почетным членом нашего клуба любителей прекрасного. Прекрасного – то есть вас.",
    "Совершенство в каждой детали. Начните с анимации.",
    "Инвестируйте в визуальное превосходство.",
    "Подчеркните свою уникальность с помощью безупречной анимации.",
    "Элегантность в движении. Анимация премиум-класса.",
    "Создайте визуальный шедевр, который запомнится.",
    "Раскройте потенциал вашего бренда с помощью профессиональной анимации.",
    "Превратите вашу идею в захватывающее визуальное путешествие.",
    "Анимация, которая говорит громче слов.",
    "Оживите свой бренд с помощью уникальной анимации.",
    "Мы создаем анимацию, которая вдохновляет."
];

const leftTableContainer = document.querySelector('.phrase-table-container.left');
const rightTableContainer = document.querySelector('.phrase-table-container.right');

let currentLeftPhrase = null;
let currentRightPhrase = null;

function updateText(textElement, isLeft) {
    let newPhrase;
    let attempts = 0;
    const maxAttempts = floatingPhrases.length; // avoid infinite loop

    do {
        newPhrase = floatingPhrases[Math.floor(Math.random() * floatingPhrases.length)];
        attempts++;// Check if the new phrase is the same as the current ones
        if (isLeft) {
            if (newPhrase !== currentLeftPhrase && newPhrase !== currentRightPhrase) {
                break; // Found a different phrase
            }
        } else {
            if (newPhrase !== currentRightPhrase && newPhrase !== currentLeftPhrase) {
                break; // Found a different phrase
            }
        }

        if (attempts >= maxAttempts) {
            console.warn("Could not find a unique phrase after several attempts.  Using the last generated phrase.");
            break; // if no unique phrase is found after trying all, use last random
        }

    } while (true);

    textElement.style.opacity = 0;
    setTimeout(() => {
        textElement.textContent = newPhrase;
        textElement.style.opacity = 1;

        // Update current phrase variables
        if (isLeft) {
            currentLeftPhrase = newPhrase;
        } else {
            currentRightPhrase = newPhrase;
        }

    }, 500);
}

function initializeTable(tableContainer, isLeft) {
    const table = tableContainer.querySelector('.phrase-table');
    const textElement = table.querySelector('.phrase-text');

    updateText(textElement, isLeft); // Pass isLeft

    function animateTable() {
        tableContainer.classList.add('animate');

        setTimeout(() => {
            tableContainer.classList.remove('animate');

            // Small delay before changing text and next animation
            setTimeout(() => {
                updateText(textElement, isLeft); // Pass isLeft
                animateTable();
            }, 500);
        }, 5000);
    }

    animateTable();
}

document.addEventListener('DOMContentLoaded', () => {
    initializeTable(leftTableContainer, true);  // Left table
    initializeTable(rightTableContainer, false); // Right table
});