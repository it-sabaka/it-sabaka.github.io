const openStoreBtn = document.getElementById('openStoreBtn');
const backHomeBtn = document.getElementById('backHomeBtn');
const themeToggle = document.getElementById('themeToggle');
const welcomePage = document.getElementById('welcomePage');
const storePage = document.getElementById('storePage');
const totalSpentEl = document.getElementById('totalSpent');
const receiptList = document.getElementById('receiptList');
const receiptTotalEl = document.getElementById('receiptTotal');
const receiptCountEl = document.getElementById('receiptCount');

let totalSpent = 0;

// Mat (food)
const matItems = [
    { name: 'Saftige donuts', price: 20, description: 'Saftige donuts', image: 'saftige donuts.png', purchased: false },
    { name: 'Chips med havsalt', price: 30, description: 'Chips med havsalt', image: 'Chips med havsalt.jfif', purchased: false },
    { name: 'Brød', price: 50, description: 'Brød', image: 'brød.jpg', purchased: false },
    { name: 'Brownies', price: 40, description: 'Brownies', image: 'brownies.jpg', purchased: false },
    { name: 'Salambi', price: 129, description: 'Salambi', image: 'salambi.jpg', purchased: false },
    { name: 'Stor te pose😍 (min favoritt)', price: 389, description: 'Stor te pose', image: 'Stor te pose😍 (min favoritt).jpg', purchased: false },
    { name: 'Kvikk lunsj', price: 16, description: 'Kvikk lunsj', image: 'Kvikk lunsj.png', purchased: false },
    { name: 'Kitkat', price: 14, description: 'Kitkat', image: 'kitkat.jpg', purchased: false },
    { name: 'Yoghurt', price: 29, description: 'Yoghurt', image: 'Yoghurt .jpg', purchased: false },
    { name: 'Kulturmjølk', price: 32, description: 'Kulturmjølk', image: 'Kulturmjølk .jpg', purchased: false }
];

// Annet (other)
const annetItems = [
    { name: 'Bleiker videregående skole', price: 366000000, description: 'Bleiker videregående skole', image: 'Bleiker videregående skole .jpg', purchased: false },
    { name: 'Møre og Romsdal fylkeskommune', price: 750000000000, description: 'Møre og Romsdal fylkeskommune', image: 'Møre og Romsdal fylkeskommune .jpg', purchased: false },
    { name: 'Tine AS', price: 25000000000, description: 'Tine AS', image: 'Tine AS .jpg', purchased: false },
    { name: 'Rema 1000 butikk', price: 25000000, description: 'Rema 1000 butikk', image: 'Rema 1000 butikk .jpg', purchased: false },
    { name: 'Små hus', price: 500000000, description: 'Små hus', image: 'Små_hus.jpg', purchased: false },
    { name: 'Student bil', price: 9899000, description: 'Student bil', image: 'student_bil.jfif', purchased: false },
    { name: 'Hungry?', price: 70000, description: 'Hungry?', image: 'Hungry.png', purchased: false }
];

// Elektronikk (electronics)
const elektronikkItems = [
    { name: 'MacBook Pro 16" (2026, M5 Max)', price: 67990, description: 'MacBook Pro 16" (2026, M5 Max)', image: 'MacBook Pro 16 (2026, M5 Max) .png', purchased: false },
    { name: 'iPhone 5S', price: 500, description: 'iPhone 5S', image: 'iPhone 5S .jfif', purchased: false },
    { name: 'iPhone 20', price: 30000, description: 'iPhone 20', image: 'iPhone 20 .png', purchased: false },
    { name: 'iPhone 17 Pro Max 2 TB', price: 29990, description: 'iPhone 17 Pro Max 2 TB', image: 'iPhone 17 Pro Max 2 TB.png', purchased: false },
    { name: 'iPhone Ultra', price: 50000, description: 'iPhone Ultra', image: 'iPhone Ultra .png', purchased: false },
    { name: 'Xiaomi Redmi 5A', price: 125, description: 'Xiaomi Redmi 5A', image: 'Xiaomi Redmi 5A .png', purchased: false },
    { name: 'Xiaomi 13 Ultra', price: 5000, description: 'Xiaomi 13 Ultra', image: 'Xiaomi 13 Ultra .jfif', purchased: false },
    { name: 'El sparke sykkel', price: 5990, description: 'El sparke sykkel', image: 'El sparke sykkel .jpg', purchased: false }
];

const categories = {
    mat: matItems,
    annet: annetItems,
    elektronikk: elektronikkItems
};

const formatCurrency = value => {
    const sign = value < 0 ? '-' : '';
    const abs = Math.abs(value);
    const fmt = (n) => {
        // remove trailing .0 when present
        const s = n.toFixed(1);
        return s.endsWith('.0') ? s.slice(0, -2) : s;
    };

    if (abs >= 1e6) {
        return `${sign}${fmt(abs / 1e6)}m kr`;
    }

    if (abs >= 1e3) {
        return `${sign}${fmt(abs / 1e3)}k kr`;
    }

    // show cents for non-integer small amounts
    if (!Number.isInteger(value)) {
        return `${sign}${abs.toFixed(2)} kr`;
    }

    return `${sign}${abs} kr`;
};

const getPurchasedItems = () => {
    return Object.values(categories).flat().filter(item => item.purchased);
};

const renderReceipt = () => {
    const purchasedItems = getPurchasedItems();
    const total = purchasedItems.reduce((sum, item) => sum + item.price, 0);

    receiptTotalEl.textContent = formatCurrency(total);
    receiptCountEl.textContent = `${purchasedItems.length} item${purchasedItems.length === 1 ? '' : 's'} purchased`;

    if (purchasedItems.length === 0) {
        receiptList.innerHTML = '<li class="receipt-empty">No purchases yet.</li>';
        return;
    }

    receiptList.innerHTML = purchasedItems.map(item => {
        return `<li class="receipt-item"><span>${item.name}</span><strong>${formatCurrency(item.price)}</strong></li>`;
    }).join('');
};

const renderItems = (items, containerId, categoryKey) => {
    const container = document.getElementById(containerId);
    container.innerHTML = items.map((item, index) => {
        const buttonLabel = item.purchased ? 'Purchased' : 'Buy';
        const buttonClass = item.purchased ? 'buy-btn purchased' : 'buy-btn';

        return `
            <article class="item-card">
                <img src="./${item.image || 'product.png'}" alt="${item.name}" />
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
                <div class="item-meta">
                    <span class="price">${formatCurrency(item.price)}</span>
                    <button class="${buttonClass}" data-category="${categoryKey}" data-index="${index}" data-price="${item.price}">${buttonLabel}</button>
                </div>
            </article>
        `;
    }).join('');
};

const updateTotalSpent = amount => {
    totalSpent += amount;
    totalSpentEl.textContent = formatCurrency(totalSpent);
    renderReceipt();
};

const handlePurchaseClick = button => {
    const categoryKey = button.dataset.category;
    const index = Number(button.dataset.index);
    const item = categories[categoryKey][index];

    if (!item) {
        return;
    }

    if (item.purchased) {
        item.purchased = false;
        updateTotalSpent(-item.price);
        button.textContent = 'Buy';
        button.classList.remove('purchased');
    } else {
        item.purchased = true;
        updateTotalSpent(item.price);
        button.textContent = 'Purchased';
        button.classList.add('purchased');
    }
};

const attachBuyListeners = () => {
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', () => handlePurchaseClick(button));
    });
};

const openStore = () => {
    welcomePage.classList.add('hidden');
    storePage.classList.remove('hidden');
};

const backHome = () => {
    storePage.classList.add('hidden');
    welcomePage.classList.remove('hidden');
};

const applyTheme = isDark => {
    document.body.classList.toggle('dark', isDark);
    themeToggle.textContent = isDark ? 'Light mode' : 'Dark mode';
    localStorage.setItem('storeTheme', isDark ? 'dark' : 'light');
};

const loadTheme = () => {
    const savedTheme = localStorage.getItem('storeTheme');
    applyTheme(savedTheme === 'dark');
};

openStoreBtn.addEventListener('click', openStore);
backHomeBtn.addEventListener('click', backHome);
themeToggle.addEventListener('click', () => applyTheme(!document.body.classList.contains('dark')));

renderItems(matItems, 'matGrid', 'mat');
renderItems(annetItems, 'annetGrid', 'annet');
renderItems(elektronikkItems, 'elektronikkGrid', 'elektronikk');
attachBuyListeners();
renderReceipt();
loadTheme();
