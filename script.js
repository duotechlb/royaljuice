/* ============================================================
   ROYAL JUICE — script.js
   Bright citrus theme · friendly UX · mobile-first
   ============================================================ */

// WhatsApp number
const WA_NUMBER = "96176419154";

// Optional: live menu from your Google Apps Script (leave blank to use built-in menu)
const APPS_SCRIPT_URL = "";

// ============================================================
// CATEGORIES
// ============================================================
const CATEGORIES = [
    { id:"cocktails",    label:"Cocktails",    emoji:"🍹", image:"https://images.unsplash.com/photo-1607446045710-d5a8fd9c1f7a?w=700&q=80&auto=format&fit=crop" },
    { id:"specialities", label:"Specialities", emoji:"✨", image:"https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=700&q=80&auto=format&fit=crop" },
    { id:"milkshakes",   label:"Milkshakes",   emoji:"🥤", image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&q=80&auto=format&fit=crop" },
    { id:"crepes",       label:"Crêpes",       emoji:"🥞", image:"https://images.unsplash.com/photo-1519676867240-f03562e64548?w=700&q=80&auto=format&fit=crop" },
    { id:"juices",       label:"Juices",       emoji:"🍊", image:"https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=700&q=80&auto=format&fit=crop" },
    { id:"hot_drinks",   label:"Hot Drinks",   emoji:"☕", image:"https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&q=80&auto=format&fit=crop" },
    { id:"add_ons",      label:"Add-Ons",      emoji:"➕", image:"https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=700&q=80&auto=format&fit=crop" }
];

// ============================================================
// MENU — taken from the printed menu + crêpes added in-house
// ============================================================
const MENU = [
    // ---------- COCKTAILS (sized S/M/L) ----------
    { id:"c1", name:"Fruit Smoothie Cocktail", category:"cocktails",
      description:"Avocado, strawberry, banana, kiwi, mango, pineapple + seasonal fruits. Chocolate option.",
      price_s:4, price_m:5, price_l:6,
      image:"https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=700&q=80&auto=format&fit=crop" },

    { id:"c2", name:"Avocado Dream Cocktail", category:"cocktails",
      description:"Avocado, lime juice, honey. Chocolate option.",
      price_s:4.5, price_m:5.5, price_l:6.5,
      image:"https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=700&q=80&auto=format&fit=crop" },

    { id:"c3", name:"Dream Cocktail", category:"cocktails",
      description:"Strawberry, banana, honey. Chocolate option.",
      price_s:3.5, price_m:4, price_l:5,
      image:"https://images.unsplash.com/photo-1638176067000-9e2c3f0b9b4e?w=700&q=80&auto=format&fit=crop" },

    { id:"c4", name:"Brownie Cocktail", category:"cocktails",
      description:"Brownie, fruits, honey, chocolate syrup.",
      price_s:4, price_m:5, price_l:6,
      image:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=700&q=80&auto=format&fit=crop" },

    // ---------- SPECIALITIES (sized S/M/L) ----------
    { id:"s1", name:"Avocado with Halewet El Jibin", category:"specialities",
      description:"Creamy avocado layered with halewet el jibin. Served with nuts.",
      price_s:7.5, price_m:11, price_l:14,
      image:"https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=700&q=80&auto=format&fit=crop" },

    { id:"s2", name:"Avocado with Znoud El Sit", category:"specialities",
      description:"Avocado paired with crispy znoud el sit. Served with nuts.",
      price_s:7.5, price_m:11, price_l:14,
      image:"https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=700&q=80&auto=format&fit=crop" },

    { id:"s3", name:"Avocado with Ashta", category:"specialities",
      description:"Smooth avocado topped with fresh ashta. Served with nuts.",
      price_s:6.5, price_m:9, price_l:12,
      image:"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700&q=80&auto=format&fit=crop" },

    { id:"s4", name:"Ice Cream with Biscuit Cups", category:"specialities",
      description:"Scoops of ice cream in crunchy biscuit cups. Served with nuts.",
      price_s:3.5, price_m:4, price_l:5,
      image:"https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=700&q=80&auto=format&fit=crop" },

    // ---------- MILKSHAKES (sized S/M/L) ----------
    { id:"m1", name:"Decadent Chocolate", category:"milkshakes",
      description:"Chocolate ice cream, milk, chocolate syrup.",
      price_s:2.5, price_m:2.75, price_l:3,
      image:"https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=700&q=80&auto=format&fit=crop" },

    { id:"m2", name:"Vanilla – Nutella", category:"milkshakes",
      description:"Vanilla ice cream, milk, Nutella, vanilla extract.",
      price_s:3, price_m:3.75, price_l:4.5,
      image:"https://images.unsplash.com/photo-1626202373152-8db1760c8f57?w=700&q=80&auto=format&fit=crop" },

    { id:"m3", name:"Refreshing Strawberry / Chocolate Iced Latte", category:"milkshakes",
      description:"Strawberry ice cream, milk, fresh strawberries, chocolate syrup / instant coffee.",
      price_s:3, price_m:3.75, price_l:4.5,
      image:"https://images.unsplash.com/photo-1586917079582-e5d0f7d2e62b?w=700&q=80&auto=format&fit=crop" },

    { id:"m4", name:"Caramel – Lotus", category:"milkshakes",
      description:"Caramel sauce, milk, double shot of espresso, Lotus.",
      price_s:3, price_m:3.75, price_l:4.5,
      image:"https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=700&q=80&auto=format&fit=crop" },

    { id:"m5", name:"Dalgona / Oreo / Kit-Kat Shake", category:"milkshakes",
      description:"Dark chocolate Oreo, milk, brown sugar, double espresso. (Oreo biscuits, milk, sugar, vanilla ice cream, chocolate syrup)",
      price_s:3, price_m:3.5, price_l:4.5,
      image:"https://images.unsplash.com/photo-1577805947697-89e18249d767?w=700&q=80&auto=format&fit=crop" },

    // ---------- CRÊPES (added in-house) ----------
    { id:"cr1", name:"Nutella Banana Crêpe", category:"crepes",
      description:"Warm crêpe filled with Nutella and fresh banana slices.",
      price_fixed:5,
      image:"https://images.unsplash.com/photo-1519676867240-f03562e64548?w=700&q=80&auto=format&fit=crop" },

    { id:"cr2", name:"Strawberry Cream Crêpe", category:"crepes",
      description:"Fresh strawberries, whipped cream, light chocolate drizzle.",
      price_fixed:5.5,
      image:"https://images.unsplash.com/photo-1565299543923-37dd37887442?w=700&q=80&auto=format&fit=crop" },

    { id:"cr3", name:"Lotus Biscoff Crêpe", category:"crepes",
      description:"Crêpe loaded with Lotus Biscoff spread and crushed biscuits.",
      price_fixed:6,
      image:"https://images.unsplash.com/photo-1612182062631-94f1c5b4b9d1?w=700&q=80&auto=format&fit=crop" },

    { id:"cr4", name:"Kinder Bueno Crêpe", category:"crepes",
      description:"Milk chocolate, hazelnut cream and Kinder Bueno pieces.",
      price_fixed:6.5,
      image:"https://images.unsplash.com/photo-1607478900766-efe13248b125?w=700&q=80&auto=format&fit=crop" },

    { id:"cr5", name:"Mixed Fruit Crêpe", category:"crepes",
      description:"Honey, fresh seasonal fruits and a touch of cream.",
      price_fixed:6,
      image:"https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=700&q=80&auto=format&fit=crop" },

    // ---------- JUICES (sized S/M/L) ----------
    { id:"j1", name:"Orange Juice", category:"juices",
      description:"Freshly squeezed oranges.",
      price_s:1.5, price_m:2, price_l:2.5,
      image:"https://images.unsplash.com/photo-1613478223719-2ab802602423?w=700&q=80&auto=format&fit=crop" },

    { id:"j2", name:"Lemonade Juice", category:"juices",
      description:"Freshly squeezed lemons, water, sugar.",
      price_s:1.5, price_m:2, price_l:2.5,
      image:"https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=700&q=80&auto=format&fit=crop" },

    { id:"j3", name:"Strawberry Juice", category:"juices",
      description:"Freshly juiced strawberries, pure and simple!",
      price_s:1.5, price_m:2, price_l:2.5,
      image:"https://images.unsplash.com/photo-1560508180-03f285f67ded?w=700&q=80&auto=format&fit=crop" },

    { id:"j4", name:"Fluffy Coffee", category:"juices",
      description:"Instant coffee, milk, honey, chocolate syrup.",
      price_s:2, price_m:2.5, price_l:3,
      image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=700&q=80&auto=format&fit=crop" },

    { id:"j5", name:"Iced Irish Coffee / Other Flavors", category:"juices",
      description:"Instant coffee, heavy cream, Baileys / other flavors.",
      price_s:2.5, price_m:3.5, price_l:4,
      image:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700&q=80&auto=format&fit=crop" },

    // ---------- HOT DRINKS (fixed price) ----------
    { id:"h1", name:"Coffee", category:"hot_drinks",
      description:"Add chocolate for +$0.55.",
      price_fixed:0.8,
      image:"https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&q=80&auto=format&fit=crop" },

    { id:"h2", name:"Nescafé", category:"hot_drinks",
      description:"Classic instant Nescafé.",
      price_fixed:1,
      image:"https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=700&q=80&auto=format&fit=crop" },

    { id:"h3", name:"Cappuccino / Hot Chocolate", category:"hot_drinks",
      description:"Creamy cappuccino or rich hot chocolate.",
      price_fixed:1,
      image:"https://images.unsplash.com/photo-1534778101976-62847782c213?w=700&q=80&auto=format&fit=crop" },

    { id:"h4", name:"Water", category:"hot_drinks",
      description:"Bottled water.",
      price_fixed:0.33,
      image:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&q=80&auto=format&fit=crop" },

    // ---------- ADD-ONS (fixed price) ----------
    { id:"a1", name:"Ashta", category:"add_ons",
      description:"Add a scoop of fresh ashta.",
      price_fixed:1,
      image:"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700&q=80&auto=format&fit=crop" },

    { id:"a2", name:"Alcohol Shot", category:"add_ons",
      description:"Per shot.",
      price_fixed:1,
      image:"https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=700&q=80&auto=format&fit=crop" },

    { id:"a3", name:"Liquor Shot", category:"add_ons",
      description:"Per shot.",
      price_fixed:1,
      image:"https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=700&q=80&auto=format&fit=crop" },

    { id:"a4", name:"Syrup Flavor", category:"add_ons",
      description:"Per shot — choose your flavor.",
      price_fixed:1,
      image:"https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=700&q=80&auto=format&fit=crop" }
];

// ============================================================
// STATE
// ============================================================
let menuItems       = [];
let cart            = [];
let currentPage     = "home";
let selectedItem    = null;
let selectedSize    = null;
let activePillId    = null;
let pillObserver    = null;
let itemsViewReady  = false;
let scrollLock      = false;
let scrollLockTimer = null;
let selectedOrderType = null;

// ============================================================
// DOM REFS
// ============================================================
const $ = id => document.getElementById(id);

const pages = {
    home:    $("homePage"),
    menu:    $("menuPage"),
    about:   $("aboutPage"),
    contact: $("contactPage")
};

// ============================================================
// NAVIGATION
// ============================================================
function navigate(pageId) {
    if (!pages[pageId]) return;
    currentPage = pageId;

    Object.values(pages).forEach(p => p.classList.remove("active"));
    pages[pageId].classList.add("active");

    document.querySelectorAll(".nav-item").forEach(el => {
        el.classList.toggle("active", el.dataset.page === pageId);
    });

    window.scrollTo({ top:0, behavior:"smooth" });
    closeCart();
    closeMobileNav();

    if (pageId === "menu") showCategoryGrid();
}

// ============================================================
// LOAD MENU  (instant from built-in data, optional live refresh)
// ============================================================
async function loadMenu() {
    // 1) Load built-in menu instantly so the page never feels empty
    menuItems = MENU.map(normalizeItem);
    itemsViewReady = false;

    // 2) If a live sheet URL is set, try to refresh quietly in the background
    if (APPS_SCRIPT_URL) {
        try {
            const res = await fetch(APPS_SCRIPT_URL, { cache: "no-store" });
            if (res.ok) {
                const items = await res.json();
                if (Array.isArray(items) && items.length) {
                    menuItems = items.map(normalizeItem);
                    itemsViewReady = false;
                    if (currentPage === "menu") {
                        renderCategoryGrid();
                        if (!$("itemsView").classList.contains("hidden")) {
                            renderPills(activePillId);
                            renderAllSections();
                            itemsViewReady = true;
                        }
                    }
                }
            }
        } catch (e) {
            // Silent — built-in menu already loaded. No scary error toast.
            console.warn("Live menu refresh skipped:", e.message);
        }
    }
}

function normalizeItem(item) {
    const ps = parseFloat(item.price_s)     || null;
    const pm = parseFloat(item.price_m)     || null;
    const pl = parseFloat(item.price_l)     || null;
    const pf = parseFloat(item.price_fixed) || null;

    const hasSizes = !!(ps && pm && pl && !(ps === pm && pm === pl));
    const displayPrice = hasSizes ? ps : (pf || ps || pm || pl || 0);

    return {
        id:          String(item.id || (crypto.randomUUID ? crypto.randomUUID() : Math.random())),
        name:        String(item.name || ""),
        category:    String(item.category || "").toLowerCase().replace(/\s+/g, "_"),
        description: String(item.description || ""),
        image:       String(item.image || item.image_url || ""),
        hasSizes,
        prices:      hasSizes ? { s:ps, m:pm, l:pl } : null,
        price:       displayPrice,
        available:   item.available !== false && item.available !== "FALSE" && item.available !== 0
    };
}

// Local SVG placeholder (no external request, instant, on-brand)
function placeholder() {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>` +
        `<rect width='400' height='400' fill='#231820'/>` +
        `<text x='200' y='215' font-size='130' text-anchor='middle'>🍹</text>` +
        `</svg>`;
    return "data:image/svg+xml," + encodeURIComponent(svg);
}

// ============================================================
// CATEGORY GRID
// ============================================================
function showCategoryGrid() {
    $("categoryGridView").classList.remove("hidden");
    $("itemsView").classList.add("hidden");
    renderCategoryGrid();
}

function renderCategoryGrid() {
    const grid = $("catGrid");
    grid.innerHTML = "";

    CATEGORIES.forEach(cat => {
        const count = menuItems.filter(i => i.category === cat.id && i.available).length;
        if (count === 0) return; // don't show empty categories
        const tile = document.createElement("div");
        tile.className = "cat-tile";
        tile.innerHTML = `
            <div class="cat-tile-img" style="background-image:url('${cat.image}')"></div>
            <div class="cat-tile-overlay"></div>
            <div class="cat-tile-label">
                <span class="cat-tile-emoji">${cat.emoji}</span>
                <span class="cat-tile-name">${cat.label}</span>
                <span class="cat-tile-count">${count} item${count !== 1 ? "s" : ""}</span>
            </div>
        `;
        tile.addEventListener("click", () => showItemsView(cat.id));
        grid.appendChild(tile);
    });
}

// ============================================================
// ITEMS VIEW
// ============================================================
function showItemsView(focusCatId) {
    $("categoryGridView").classList.add("hidden");
    $("itemsView").classList.remove("hidden");

    if (!itemsViewReady) {
        renderPills(focusCatId);
        renderAllSections();
        itemsViewReady = true;
    } else {
        setActivePill(focusCatId, true);
    }

    requestAnimationFrame(() => {
        scrollToSection(focusCatId);
        setupScrollObserver();
    });
}

function renderPills(activeCat) {
    const container = $("pillsScroll");
    container.innerHTML = "";

    const back = document.createElement("span");
    back.className = "pill-btn back-pill";
    back.textContent = "← All";
    back.addEventListener("click", () => navigate("menu"));
    container.appendChild(back);

    CATEGORIES.forEach(cat => {
        const count = menuItems.filter(i => i.category === cat.id && i.available).length;
        if (count === 0) return;
        const btn = document.createElement("button");
        btn.className = "pill-btn" + (cat.id === activeCat ? " active" : "");
        btn.dataset.cat = cat.id;
        btn.textContent = cat.label;

        btn.addEventListener("click", () => {
            scrollLock = true;
            clearTimeout(scrollLockTimer);
            setActivePill(cat.id, true);
            scrollToSection(cat.id);
            scrollLockTimer = setTimeout(() => { scrollLock = false; }, 900);
        });
        container.appendChild(btn);
    });
    activePillId = activeCat;
}

function setActivePill(catId, force = false) {
    if (!force && scrollLock) return;
    if (catId === activePillId && !force) return;

    activePillId = catId;
    document.querySelectorAll(".pill-btn[data-cat]").forEach(b => {
        b.classList.toggle("active", b.dataset.cat === catId);
    });
    const active = document.querySelector(`.pill-btn[data-cat="${catId}"]`);
    if (active) active.scrollIntoView({ inline:"center", behavior:"smooth", block:"nearest" });
}

function scrollToSection(catId) {
    const el = document.querySelector(`[data-section="${catId}"]`);
    if (!el) return;
    const offset = el.getBoundingClientRect().top + window.scrollY - 130;
    window.scrollTo({ top: Math.max(0, offset), behavior:"smooth" });
}

function renderAllSections() {
    const container = $("allSections");
    container.innerHTML = "";

    CATEGORIES.forEach(cat => {
        const items = menuItems.filter(i => i.category === cat.id && i.available);
        if (items.length === 0) return;
        const section = document.createElement("div");
        section.className = "cat-section";
        section.dataset.section = cat.id;
        section.innerHTML = `
            <h2 class="cat-section-title">
                <span class="s-emoji">${cat.emoji}</span>${cat.label}
            </h2>
            <div class="items-grid" id="grid-${cat.id}">
                ${items.map(renderItemCard).join("")}
            </div>
        `;
        container.appendChild(section);
    });

    container.querySelectorAll(".add-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            e.stopPropagation();
            const item = menuItems.find(i => i.id === btn.dataset.id);
            if (!item) return;
            if (item.hasSizes) {
                openSizeSheet(item);
            } else {
                addToCart(item, null, item.price);
                showToast(`${item.name} added 🛍`);
            }
        });
    });
}

function renderItemCard(item) {
    const priceHtml = item.hasSizes
        ? `<div class="item-price"><span class="item-price-from">from</span>$${item.prices.s.toFixed(2)}</div>`
        : `<div class="item-price">$${(item.price || 0).toFixed(2)}</div>`;

    const btnHtml = (item.price === 0 || item.price == null)
        ? ``
        : `<button class="add-btn" data-id="${item.id}" aria-label="Add ${escHtml(item.name)}">
               <i class="fas fa-plus"></i> Add
           </button>`;

    return `
        <div class="item-card">
            <div class="item-img-wrap">
                <img class="item-img" src="${escHtml(item.image)}" alt="${escHtml(item.name)}"
                     loading="lazy" decoding="async"
                     onerror="this.onerror=null;this.src='${placeholder()}'">
            </div>
            <div class="item-body">
                <div class="item-name">${escHtml(item.name)}</div>
                ${item.description ? `<div class="item-desc">${escHtml(item.description)}</div>` : ""}
                <div class="item-footer">
                    ${priceHtml}
                    ${btnHtml}
                </div>
            </div>
        </div>
    `;
}

function setupScrollObserver() {
    if (pillObserver) pillObserver.disconnect();
    const sections = document.querySelectorAll("[data-section]");

    pillObserver = new IntersectionObserver(entries => {
        if (scrollLock) return;
        let best = null;
        entries.forEach(e => {
            if (e.isIntersecting) {
                if (!best || e.intersectionRatio > best.ratio) {
                    best = { id: e.target.dataset.section, ratio: e.intersectionRatio };
                }
            }
        });
        if (best) setActivePill(best.id);
    }, { rootMargin:"-25% 0px -55% 0px", threshold:[0, 0.1, 0.25, 0.5] });

    sections.forEach(s => pillObserver.observe(s));
}

// ============================================================
// SIZE BOTTOM SHEET
// ============================================================
function openSizeSheet(item) {
    selectedItem = item;
    selectedSize = null;

    const SIZE_LABELS = {
        s: { label:"Small",  sub:"Regular glass" },
        m: { label:"Medium", sub:"Large glass" },
        l: { label:"Large",  sub:"Extra large" }
    };

    $("sizeSheetContent").innerHTML = `
        <div class="ss-inner">
            <div class="ss-item-row">
                <img class="ss-img" src="${escHtml(item.image)}" alt="${escHtml(item.name)}"
                     onerror="this.onerror=null;this.src='${placeholder()}'">
                <div class="ss-item-info">
                    <div class="ss-item-name">${escHtml(item.name)}</div>
                    <div class="ss-item-sub">${escHtml(item.description)}</div>
                </div>
            </div>
            <div class="ss-label">Choose your size</div>
            <div class="size-options" id="sizeOptions">
                ${["s","m","l"].map(sz => `
                    <div class="size-opt" data-size="${sz}" data-price="${item.prices[sz]}">
                        <div class="size-opt-left">
                            <div class="size-circle">${sz.toUpperCase()}</div>
                            <div>
                                <div class="size-name">${SIZE_LABELS[sz].label}</div>
                                <div class="size-sub">${SIZE_LABELS[sz].sub}</div>
                            </div>
                        </div>
                        <div class="size-price">$${item.prices[sz].toFixed(2)}</div>
                    </div>
                `).join("")}
            </div>
            <button class="ss-add-btn" id="ssAddBtn" disabled>
                <i class="fas fa-bag-shopping"></i> Add to Bag
            </button>
        </div>
    `;

    document.querySelectorAll(".size-opt").forEach(opt => {
        opt.addEventListener("click", () => {
            document.querySelectorAll(".size-opt").forEach(o => o.classList.remove("selected"));
            opt.classList.add("selected");
            selectedSize = opt.dataset.size;
            const btn = $("ssAddBtn");
            btn.disabled = false;
            btn.innerHTML = `<i class="fas fa-bag-shopping"></i> Add to Bag — $${parseFloat(opt.dataset.price).toFixed(2)}`;
        });
    });

    $("ssAddBtn").addEventListener("click", () => {
        if (!selectedSize) return;
        const price = selectedItem.prices[selectedSize];
        addToCart(selectedItem, selectedSize, price);
        showToast(`${selectedItem.name} (${selectedSize.toUpperCase()}) added 🛍`);
        closeSizeSheet();
    });

    $("sizeBackdrop").style.display = "block";
    requestAnimationFrame(() => {
        $("sizeBackdrop").classList.add("visible");
        $("sizeSheet").classList.add("open");
    });
}

function closeSizeSheet() {
    $("sizeSheet").classList.remove("open");
    $("sizeBackdrop").classList.remove("visible");
    setTimeout(() => { $("sizeBackdrop").style.display = "none"; }, 320);
    selectedItem = null;
    selectedSize = null;
}

// ============================================================
// CART LOGIC
// ============================================================
function addToCart(item, size, price) {
    const key = `${item.id}-${size || "fixed"}`;
    const existing = cart.find(i => i.key === key);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            key, id:item.id,
            name:  item.name,
            image: item.image,
            size:  size ? size.toUpperCase() : null,
            price, qty:1
        });
    }
    updateCartUI();
    bumpCartIcon();
}

function bumpCartIcon() {
    const btn = $("cartIconBtn");
    btn.classList.remove("bump");
    void btn.offsetWidth; // restart animation
    btn.classList.add("bump");
}

function updateCartUI() {
    const totalQty = cart.reduce((s, i) => s + i.qty, 0);
    const badge = $("cartCountBadge");
    badge.textContent = totalQty;
    badge.classList.toggle("show", totalQty > 0);

    const list = $("cartItemsList");
    const foot = $("cartFooter");

    if (cart.length === 0) {
        list.innerHTML = `
            <div class="empty-bag">
                <div class="empty-bag-emoji">🍹</div>
                <p class="empty-msg">Your bag is empty</p>
                <span class="empty-sub">Add a drink to get started</span>
            </div>`;
        foot.style.display = "none";
        return;
    }
    foot.style.display = "flex";
    foot.style.flexDirection = "column";

    let totalPrice = 0;
    list.innerHTML = cart.map((item, idx) => {
        const sub = item.price * item.qty;
        totalPrice += sub;
        return `
            <div class="cart-item">
                <img class="ci-img" src="${item.image}" alt="${escHtml(item.name)}"
                     onerror="this.onerror=null;this.src='${placeholder()}'">
                <div class="ci-info">
                    <div class="ci-name">${escHtml(item.name)}</div>
                    ${item.size ? `<div class="ci-size">Size: ${item.size}</div>` : ""}
                    <div class="ci-price">$${item.price.toFixed(2)} each</div>
                    <div class="ci-controls">
                        <button class="ci-btn" data-action="dec" data-idx="${idx}" aria-label="Decrease">−</button>
                        <span class="ci-qty">${item.qty}</span>
                        <button class="ci-btn" data-action="inc" data-idx="${idx}" aria-label="Increase">+</button>
                        <button class="ci-btn del" data-action="remove" data-idx="${idx}" aria-label="Remove"><i class="fas fa-trash-can"></i></button>
                    </div>
                </div>
                <div class="ci-sub">$${sub.toFixed(2)}</div>
            </div>
        `;
    }).join("");

    $("cartTotalAmount").textContent = `$${totalPrice.toFixed(2)}`;

    list.querySelectorAll(".ci-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const idx = parseInt(btn.dataset.idx);
            if (btn.dataset.action === "inc") {
                cart[idx].qty++;
            } else if (btn.dataset.action === "dec") {
                cart[idx].qty--;
                if (cart[idx].qty <= 0) cart.splice(idx, 1);
            } else if (btn.dataset.action === "remove") {
                cart.splice(idx, 1);
            }
            updateCartUI();
        });
    });
}

function clearCart() {
    cart = [];
    updateCartUI();
    showToast("Bag cleared");
}

// ============================================================
// CART OPEN / CLOSE
// ============================================================
function openCart() {
    $("cartSidebar").classList.add("open");
    $("cartOverlay").style.display = "block";
    document.body.style.overflow = "hidden";
}
function closeCart() {
    $("cartSidebar").classList.remove("open");
    $("cartOverlay").style.display = "none";
    document.body.style.overflow = "";
}

// ============================================================
// CHECKOUT MODAL
// ============================================================
function openCheckoutModal() {
    if (!cart.length) { showToast("Your bag is empty!"); return; }
    selectedOrderType = null;
    $("coNameInput").value = "";
    document.querySelectorAll(".co-type-btn").forEach(b => b.classList.remove("selected"));
    $("checkoutBackdrop").classList.add("visible");
    $("checkoutModal").classList.add("open");
    setTimeout(() => { $("coNameInput").focus(); }, 380);
}

function closeCheckoutModal() {
    $("checkoutModal").classList.remove("open");
    $("checkoutBackdrop").classList.remove("visible");
    selectedOrderType = null;
}

function confirmCheckoutOrder() {
    const name = $("coNameInput").value.trim();
    if (!name) {
        showToast("Please enter your name ✏️");
        $("coNameInput").focus();
        return;
    }
    if (!selectedOrderType) {
        showToast("Please choose an order type 📦");
        return;
    }

    const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    const lines = [
        "🍹 *Royal Juice Order*",
        `👤 *Name:* ${name}`,
        `📦 *Type:* ${selectedOrderType}`,
        "",
        ...cart.map(i => {
            const sz = i.size ? ` (${i.size})` : "";
            return `• ${i.name}${sz} x${i.qty} → $${(i.price * i.qty).toFixed(2)}`;
        }),
        "",
        `*Total: $${total.toFixed(2)}*`,
        "Thank you! 🙌"
    ];

    const msg = encodeURIComponent(lines.join("\n"));
    closeCheckoutModal();
    closeCart();
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
}

// ============================================================
// MOBILE NAV
// ============================================================
let mobileNavOpen = false;
function toggleMobileNav() {
    mobileNavOpen = !mobileNavOpen;
    $("mobileNav").classList.toggle("open", mobileNavOpen);
    $("mobileMenuToggle").classList.toggle("active", mobileNavOpen);
}
function closeMobileNav() {
    mobileNavOpen = false;
    $("mobileNav").classList.remove("open");
    $("mobileMenuToggle").classList.remove("active");
}

// ============================================================
// TOAST
// ============================================================
let toastTimer;
function showToast(msg, duration = 2000) {
    const t = $("toastMsg");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), duration);
}

// ============================================================
// UTILS
// ============================================================
function escHtml(str) {
    return String(str).replace(/[&<>"']/g, m => ({
        "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
    })[m]);
}

// ============================================================
// INIT EVENTS
// ============================================================
function initEvents() {
    document.querySelectorAll(".nav-item").forEach(el => {
        el.addEventListener("click", () => navigate(el.dataset.page));
    });
    document.querySelectorAll(".mob-nav-item").forEach(el => {
        el.addEventListener("click", () => navigate(el.dataset.page));
    });

    $("logoHomeBtn").addEventListener("click", () => navigate("home"));
    $("mobileMenuToggle").addEventListener("click", toggleMobileNav);
    $("exploreMenuBtn")?.addEventListener("click", () => navigate("menu"));

    $("cartIconBtn").addEventListener("click", openCart);
    $("closeCartBtn").addEventListener("click", closeCart);
    $("cartOverlay").addEventListener("click", closeCart);
    $("clearCartBtn").addEventListener("click", clearCart);
    $("whatsappOrderBtn").addEventListener("click", () => {
        closeCart();
        setTimeout(openCheckoutModal, 120);
    });

    $("checkoutBackdrop").addEventListener("click", closeCheckoutModal);
    $("coCancelBtn").addEventListener("click", closeCheckoutModal);
    $("coConfirmBtn").addEventListener("click", confirmCheckoutOrder);

    document.querySelectorAll(".co-type-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".co-type-btn").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            selectedOrderType = btn.dataset.type;
        });
    });

    $("coNameInput").addEventListener("keydown", e => {
        if (e.key === "Enter") { e.preventDefault(); confirmCheckoutOrder(); }
    });

    $("sizeBackdrop").addEventListener("click", closeSizeSheet);

    let sheetStartY = 0;
    const sheet = $("sizeSheet");
    sheet.addEventListener("touchstart", e => { sheetStartY = e.touches[0].clientY; }, { passive:true });
    sheet.addEventListener("touchend", e => {
        if (e.changedTouches[0].clientY - sheetStartY > 80) closeSizeSheet();
    }, { passive:true });

    let coStartY = 0;
    const coModal = $("checkoutModal");
    coModal.addEventListener("touchstart", e => { coStartY = e.touches[0].clientY; }, { passive:true });
    coModal.addEventListener("touchend", e => {
        if (e.changedTouches[0].clientY - coStartY > 80) closeCheckoutModal();
    }, { passive:true });
}

// ============================================================
// BOOT
// ============================================================
async function boot() {
    initEvents();
    await loadMenu();
    updateCartUI();
    if (currentPage === "menu") showCategoryGrid();
}

boot();
