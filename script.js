/* ============================================================
   ROYAL JUICE — script.js
   Categories are now built DYNAMICALLY from Google Sheets data.
   Adding a new category in column C of the sheet is all you need —
   a tile + pill will appear automatically.
   ============================================================ */

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyAuUTvIJKa_eOYMbqILTfvw6S9M0DTJ0U_cV6HE0iD100dEdO8n6rESlOufpPlBGH-Yw/exec";

const WA_NUMBER = "96176419154";

// ============================================================
// KNOWN CATEGORY METADATA
// Add entries here only if you want a custom emoji or image.
// Any NEW category added in the sheet will still appear automatically
// using a default emoji and the first item's own image.
// The ORDER of categories on the website is controlled by the
// order they first appear in your Google Sheet (top to bottom).
// ============================================================
const KNOWN_CATEGORY_META = {
    juices:       { label: "Juices",       emoji: "", image: "https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/juices.webp" },
    cold_drinks:  { label: "Cold Drinks",  emoji: "", image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&auto=format&fit=crop" },
    hot_drinks:   { label: "Hot Drinks",   emoji: "", image: "https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/hotdrinks.webp" },
    crepes:       { label: "Crêpes",       emoji: "", image: "https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/c.webp" },
    cocktails:    { label: "Cocktails",    emoji: "", image: "https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/c1.jpg" },
    milkshakes:   { label: "Milkshakes",   emoji: "", image: "https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/m1.jpg" },
    specialities: { label: "Specialities", emoji: "", image: "https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/s3.jpg" }
};

// Default emojis for unknown categories (empty — no emoji style)
const DEFAULT_EMOJIS = ["","","","","","","","","","","",""];

// ============================================================
// FALLBACK MENU — used if Google Sheets fetch fails
// ============================================================
const FALLBACK_MENU = [
    { id:"j1",  name:"Orange Juice",          category:"juices",       description:"Freshly squeezed oranges",                                              price_s:2.00,  price_m:3.00, price_l:4.00, price_fixed:null, image_url:"https://raw.githubusercontent.com/alecosrestaurant/alecosrestaurant.github.io/main/orange.webp",         available:true },
    { id:"j2",  name:"Lemonade Juice",         category:"juices",       description:"Freshly squeezed lemons, water, sugar",                                 price_s:2.50,  price_m:3.00, price_l:3.50, price_fixed:null, image_url:"https://raw.githubusercontent.com/alecosrestaurant/alecosrestaurant.github.io/main/lemonade.webp",       available:true },
    { id:"j3",  name:"Strawberry Juice",       category:"juices",       description:"Freshly juiced strawberries, pure and simple!",                         price_s:1.50,  price_m:2.00, price_l:2.50, price_fixed:null, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/j3.webp",                          available:true },
    { id:"j4",  name:"Mango Juice",            category:"juices",       description:"Fresh tropical mango, blended smooth",                                  price_s:null,  price_m:null, price_l:null, price_fixed:3.50, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/j4.webp",                          available:true },
    { id:"j5",  name:"Kiwi Juice",             category:"juices",       description:"Fresh kiwi, naturally sweet and tangy",                                 price_s:null,  price_m:null, price_l:null, price_fixed:3.50, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/j5.webp",                          available:true },
    { id:"j6",  name:"Pineapple Juice",        category:"juices",       description:"Fresh pressed pineapple",                                               price_s:null,  price_m:null, price_l:null, price_fixed:3.50, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/j6.webp",                          available:true },
    { id:"j7",  name:"Iced Irish Coffee",      category:"juices",       description:"Instant coffee, heavy cream, Baileys/other flavors",                    price_s:null,  price_m:null, price_l:null, price_fixed:4.00, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/j7.webp",                          available:true },
    { id:"cd1", name:"Water (Small)",          category:"cold_drinks",  description:"",                                                                      price_s:null,  price_m:null, price_l:null, price_fixed:0.33, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/cd1-2.webp",                        available:true },
    { id:"cd2", name:"Water (Large)",          category:"cold_drinks",  description:"",                                                                      price_s:null,  price_m:null, price_l:null, price_fixed:1.00, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/cd1-2.webp",                        available:true },
    { id:"h1",  name:"Coffee",                 category:"hot_drinks",   description:"With Water Small",                                                      price_s:null,  price_m:null, price_l:null, price_fixed:1.00, image_url:"https://github.com/alecosrestaurant/alecosrestaurant.github.io/raw/main/espressso.webp",                  available:true },
    { id:"h2",  name:"Nescafé",               category:"hot_drinks",   description:"",                                                                      price_s:null,  price_m:null, price_l:null, price_fixed:1.50, image_url:"https://raw.githubusercontent.com/alecosrestaurant/alecosrestaurant.github.io/main/nescafe.webp",          available:true },
    { id:"h3",  name:"Cappuccino",             category:"hot_drinks",   description:"",                                                                      price_s:null,  price_m:null, price_l:null, price_fixed:1.50, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/h3.webp",                          available:true },
    { id:"h4",  name:"Hot Chocolate",          category:"hot_drinks",   description:"",                                                                      price_s:null,  price_m:null, price_l:null, price_fixed:1.50, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/h4.webp",                          available:true },
    { id:"cr1", name:"Lotus Crêpe",           category:"crepes",       description:"Biscoff spread, golden and irresistible",                               price_s:null,  price_m:null, price_l:null, price_fixed:4.50, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/c.webp",                           available:true },
    { id:"cr2", name:"Dark Crêpe",            category:"crepes",       description:"Dark chocolate crêpe",                                                 price_s:null,  price_m:null, price_l:null, price_fixed:4.50, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/c.webp",                           available:true },
    { id:"cr3", name:"White Crêpe",           category:"crepes",       description:"White chocolate crêpe",                                                price_s:null,  price_m:null, price_l:null, price_fixed:4.00, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/c.webp",                           available:true },
    { id:"cr4", name:"Nutella Crêpe",         category:"crepes",       description:"Warm crêpe filled with Nutella",                                       price_s:null,  price_m:null, price_l:null, price_fixed:5.50, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/c.webp",                           available:true },
    { id:"cr5", name:"Kinder Crêpe",          category:"crepes",       description:"Creamy Kinder filling, melted magic",                                   price_s:null,  price_m:null, price_l:null, price_fixed:5.50, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/c.webp",                           available:true },
    { id:"cr6", name:"Oreo Crêpe",            category:"crepes",       description:"Crushed Oreo, cream filling",                                           price_s:null,  price_m:null, price_l:null, price_fixed:5.50, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/c.webp",                           available:true },
    { id:"cr7", name:"Fettuccini Crêpe",      category:"crepes",       description:"Rich fettuccini-style creamy crêpe",                                   price_s:null,  price_m:null, price_l:null, price_fixed:5.50, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/c.webp",                           available:true },
    { id:"cr8", name:"Mix Crêpe",             category:"crepes",       description:"A mix of our favorite fillings",                                        price_s:null,  price_m:null, price_l:null, price_fixed:6.00, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/c.webp",                           available:true },
    { id:"cr9", name:"Fluo Crêpe",            category:"crepes",       description:"Vibrant colorful fluo crêpe",                                           price_s:null,  price_m:null, price_l:null, price_fixed:7.00, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/c.webp",                           available:true },
    { id:"c1",  name:"Fruit Smoothie Cocktail", category:"cocktails",  description:"Avocado, Strawberry, Banana, kiwi, Mango, Pineapple...",               price_s:4,     price_m:5,    price_l:6,    price_fixed:null, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/c1.jpg",                           available:true },
    { id:"c2",  name:"Avocado Cocktail",       category:"cocktails",   description:"Avocado, Lime Juice, Honey/Chocolate",                                  price_s:5,     price_m:5.5,  price_l:6.5,  price_fixed:null, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/avocat-cocktail.jpg",               available:true },
    { id:"c3",  name:"Brownie Cocktail",       category:"cocktails",   description:"Brownie, Fruits, Honey, Chocolate Syrup",                               price_s:4,     price_m:5,    price_l:6,    price_fixed:null, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/c3.webp",                          available:true },
    { id:"m1",  name:"Decadent Chocolate",     category:"milkshakes",  description:"Chocolate Ice Cream, Milk, Chocolate Syrup",                            price_s:null,  price_m:null, price_l:null, price_fixed:3.50, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/m1.jpg",                           available:true },
    { id:"m2",  name:"Vanilla - Nutella",      category:"milkshakes",  description:"Vanilla Ice Cream, Milk, Nutella, Vanilla Extract",                    price_s:null,  price_m:null, price_l:null, price_fixed:3.50, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/m2.jpg",                           available:true },
    { id:"m3",  name:"Refreshing Strawberry/Chocolate Iced Latte", category:"milkshakes", description:"Strawberry Ice Cream, Milk, Fresh Strawberries, Chocolate Syrup/Instant Coffee", price_s:null, price_m:null, price_l:null, price_fixed:3.50, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/m3.jpg", available:true },
    { id:"m4",  name:"Caramel - Lotus",        category:"milkshakes",  description:"Caramel Sauce, Milk, Double Shot Of Espresso, Lotus",                  price_s:null,  price_m:null, price_l:null, price_fixed:3.50, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/m4.webp",                          available:true },
    { id:"s1",  name:"Avocado With Halawet el Jibin", category:"specialities", description:"With Chocolate Extra 1$",                                        price_s:4.00,  price_m:5.00, price_l:6.00, price_fixed:null, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/s2.jpg",                          available:true },
    { id:"s2",  name:"Avocado With Ashta",     category:"specialities", description:"With Chocolate Extra 1$",                                               price_s:4.00,  price_m:5.00, price_l:6.00, price_fixed:null, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/s2.jpg",                          available:true },
    { id:"s3",  name:"Ice Cream With Biscuit Cups", category:"specialities", description:"With Chocolate Extra 1$",                                          price_s:4.00,  price_m:5.00, price_l:6.00, price_fixed:null, image_url:"https://raw.githubusercontent.com/duotechlb/royaljuice/main/royaljuice/s3.jpg",                          available:true }
];

// ============================================================
// STATE
// ============================================================
let menuItems        = [];
let CATEGORIES       = [];   // built dynamically after menu loads
let cart             = [];
let currentPage      = "home";
let selectedItem     = null;
let selectedSize     = null;
let activePillId     = null;
let pillObserver     = null;
let itemsViewReady   = false;
let scrollLock       = false;
let scrollLockTimer  = null;
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
// BUILD CATEGORIES FROM MENU DATA
// Called after menuItems is populated. Preserves sheet row order.
// ============================================================
function buildCategoriesFromMenu(items) {
    const seen = new Map();   // catId -> first item's image (fallback)
    let unknownCount = 0;

    items.forEach(item => {
        if (!item.category) return;
        const id = item.category;
        if (!seen.has(id)) {
            seen.set(id, item.image);
        }
    });

    const result = [];
    seen.forEach((firstImage, id) => {
        if (KNOWN_CATEGORY_META[id]) {
            // Use the curated metadata
            result.push({ id, ...KNOWN_CATEGORY_META[id] });
        } else {
            // Brand-new category — auto-generate label, emoji, and use the item's own image
            const emoji = DEFAULT_EMOJIS[unknownCount % DEFAULT_EMOJIS.length];
            unknownCount++;
            // Convert snake_case / underscores to Title Case for the label
            const label = id
                .replace(/_/g, " ")
                .replace(/\b\w/g, c => c.toUpperCase());
            result.push({ id, label, emoji, image: firstImage });
        }
    });

    return result;
}

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

    window.scrollTo({ top: 0, behavior: "smooth" });
    closeCart();
    closeMobileNav();

    if (pageId === "menu") {
        showCategoryGrid();
    }
}

// ============================================================
// FETCH MENU — from Apps Script (domain check, no secret key)
// ============================================================
async function fetchMenu() {
    try {
        if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes("PASTE_YOUR_FULL")) {
            throw new Error("Apps Script URL not set — using the built-in menu");
        }

        const hostname = window.location.hostname;
        const url = `${APPS_SCRIPT_URL}?ref=${encodeURIComponent(hostname)}&origin=${encodeURIComponent(hostname)}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (data.error) throw new Error(data.error);
        if (!data || data.length === 0) throw new Error("No items returned");

        menuItems = data.map(normalizeItem);
        console.log(`✅ Loaded ${menuItems.length} items from Apps Script`);
    } catch (err) {
        console.warn("⚠️ Apps Script fetch failed, using fallback:", err.message);
        menuItems = FALLBACK_MENU.map(normalizeItem);
    }

    // Always rebuild categories from whatever data we now have
    CATEGORIES = buildCategoriesFromMenu(menuItems);
    console.log(`📂 Categories detected:`, CATEGORIES.map(c => c.id));

    itemsViewReady = false;
}

function normalizeItem(item) {
    const ps = parseFloat(item.price_s)     || null;
    const pm = parseFloat(item.price_m)     || null;
    const pl = parseFloat(item.price_l)     || null;
    const pf = parseFloat(item.price_fixed) || null;

    const hasSizes     = !!(ps && pm && pl && !(ps === pm && pm === pl));
    const displayPrice = hasSizes ? ps : (pf || ps || pm || pl);

    return {
        id:          String(item.id || crypto.randomUUID()),
        name:        String(item.name || ""),
        category:    String(item.category || "").toLowerCase().trim().replace(/\s+/g, "_"),
        description: String(item.description || ""),
        image:       String(item.image_url || "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&auto=format").trim(),
        hasSizes,
        prices:      hasSizes ? { s: ps, m: pm, l: pl } : null,
        price:       displayPrice,
        available:   item.available !== false && item.available !== "FALSE" && item.available !== 0
    };
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
        const tile  = document.createElement("div");
        tile.className = "cat-tile";
        tile.innerHTML = `
            <div class="cat-tile-img" style="background-image:url('${cat.image}')"></div>
            <div class="cat-tile-overlay"></div>
            <div class="cat-tile-label">
                <span class="cat-tile-emoji">${cat.emoji}</span>
                <span class="cat-tile-name">${cat.label}</span>
                ${count > 0 ? `<span class="cat-tile-count">${count} item${count !== 1 ? "s" : ""}</span>` : ""}
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
    if (active) active.scrollIntoView({ inline: "center", behavior: "smooth", block: "nearest" });
}

function scrollToSection(catId) {
    const el = document.querySelector(`[data-section="${catId}"]`);
    if (!el) return;
    const offset = el.getBoundingClientRect().top + window.scrollY - 136;
    window.scrollTo({ top: Math.max(0, offset), behavior: "smooth" });
}

function renderAllSections() {
    const container = $("allSections");
    container.innerHTML = "";

    CATEGORIES.forEach(cat => {
        const items   = menuItems.filter(i => i.category === cat.id && i.available);
        const section = document.createElement("div");
        section.className    = "cat-section";
        section.dataset.section = cat.id;

        section.innerHTML = `
            <h2 class="cat-section-title">
                ${cat.label}
            </h2>
            <div class="items-grid" id="grid-${cat.id}">
                ${items.length === 0
                    ? `<div class="empty-section">✨ Coming soon — check back later</div>`
                    : items.map(renderItemCard).join("")
                }
            </div>
        `;
        container.appendChild(section);
    });

    // "Add" / "Choose size" button
    container.querySelectorAll(".add-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            e.stopPropagation();
            const item = menuItems.find(i => i.id === btn.dataset.id);
            if (!item) return;
            if (item.hasSizes) {
                openSizeSheet(item);
            } else {
                addToCart(item, null, item.price);
                showToast(`${item.name} added! 🛍`);
            }
        });
    });

    // Tapping a size chip opens the sheet with that size already chosen
    container.querySelectorAll(".size-chip[data-id]").forEach(chip => {
        chip.addEventListener("click", e => {
            e.stopPropagation();
            const item = menuItems.find(i => i.id === chip.dataset.id);
            if (!item) return;
            openSizeSheet(item, chip.dataset.size);
        });
    });
}

function renderItemCard(item) {
    let priceBlockHtml;
    if (item.hasSizes) {
        priceBlockHtml = `
            <div class="item-sizes">
                ${["s","m","l"].map(sz => `
                    <button class="size-chip" data-id="${item.id}" data-size="${sz}" type="button">
                        <span class="sc-sz">${sz.toUpperCase()}</span>
                        <span class="sc-price">$${item.prices[sz].toFixed(2)}</span>
                    </button>
                `).join("")}
            </div>`;
    } else {
        priceBlockHtml = `<div class="item-price">$${(item.price || 0).toFixed(2)}</div>`;
    }

    const isUnavailable = (item.price === 0 || item.price == null);
    const btnHtml = isUnavailable
        ? ``
        : `<button class="add-btn" data-id="${item.id}">
               <i class="fas fa-plus"></i> ${item.hasSizes ? "Choose size" : "Add"}
           </button>`;

    return `
        <div class="item-card${item.hasSizes ? " has-sizes" : ""}">
            <div class="item-img-wrap">
                <img class="item-img"
                    src="${escHtml(item.image)}"
                    alt="${escHtml(item.name)}"
                    loading="lazy"
                    onerror="this.src='https://placehold.co/400x400/111520/888?text=🍹'">
            </div>
            <div class="item-body">
                <div class="item-name">${escHtml(item.name)}</div>
                ${item.description ? `<div class="item-desc">${escHtml(item.description)}</div>` : ""}
                ${item.hasSizes ? priceBlockHtml : ""}
                <div class="item-footer">
                    ${item.hasSizes ? "" : priceBlockHtml}
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
    }, { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5] });

    sections.forEach(s => pillObserver.observe(s));
}

// ============================================================
// SIZE BOTTOM SHEET
// ============================================================
function openSizeSheet(item, presetSize = null) {
    selectedItem = item;
    selectedSize = null;

    const SIZE_LABELS = {
        s: { label: "Small",  sub: "Regular glass" },
        m: { label: "Medium", sub: "Large glass" },
        l: { label: "Large",  sub: "Extra large" }
    };

    $("sizeSheetContent").innerHTML = `
        <div class="ss-inner">
            <div class="ss-item-row">
                <img class="ss-img" src="${escHtml(item.image)}" alt="${escHtml(item.name)}"
                     onerror="this.src='https://placehold.co/100x100/111520/888?text=🍹'">
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
        showToast(`${selectedItem.name} (${selectedSize.toUpperCase()}) added! 🛍`);
        closeSizeSheet();
    });

    $("sizeBackdrop").style.display = "block";
    requestAnimationFrame(() => {
        $("sizeBackdrop").classList.add("visible");
        $("sizeSheet").classList.add("open");

        if (presetSize) {
            const presetOpt = document.querySelector(`.size-opt[data-size="${presetSize}"]`);
            if (presetOpt) presetOpt.click();
        }
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
            key, id: item.id,
            name:  item.name,
            image: item.image,
            size:  size ? size.toUpperCase() : null,
            price, qty: 1
        });
    }
    updateCartUI();
}

function updateCartUI() {
    const total = cart.reduce((s, i) => s + i.qty, 0);
    const badge = $("cartCountBadge");
    badge.textContent = total;
    badge.classList.toggle("show", total > 0);

    const list = $("cartItemsList");
    const foot = $("cartFooter");

    if (cart.length === 0) {
        list.innerHTML = `
            <div class="empty-bag">
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
                     onerror="this.src='https://placehold.co/60x60/111520/888?text=🍹'">
                <div class="ci-info">
                    <div class="ci-name">${escHtml(item.name)}</div>
                    ${item.size ? `<div class="ci-size">Size: ${item.size}</div>` : ""}
                    <div class="ci-price">$${item.price.toFixed(2)} each</div>
                    <div class="ci-controls">
                        <button class="ci-btn" data-action="dec" data-idx="${idx}">−</button>
                        <span class="ci-qty">${item.qty}</span>
                        <button class="ci-btn" data-action="inc" data-idx="${idx}">+</button>
                        <button class="ci-btn del" data-action="remove" data-idx="${idx}">🗑</button>
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
}
function closeCart() {
    $("cartSidebar").classList.remove("open");
    $("cartOverlay").style.display = "none";
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
function showToast(msg, duration = 2200) {
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
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
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
        if (e.key === "Enter") {
            e.preventDefault();
            confirmCheckoutOrder();
        }
    });

    $("sizeBackdrop").addEventListener("click", closeSizeSheet);

    let sheetStartY = 0;
    const sheet = $("sizeSheet");
    sheet.addEventListener("touchstart", e => { sheetStartY = e.touches[0].clientY; }, { passive: true });
    sheet.addEventListener("touchend", e => {
        if (e.changedTouches[0].clientY - sheetStartY > 80) closeSizeSheet();
    }, { passive: true });

    let coStartY = 0;
    const coModal = $("checkoutModal");
    coModal.addEventListener("touchstart", e => { coStartY = e.touches[0].clientY; }, { passive: true });
    coModal.addEventListener("touchend", e => {
        if (e.changedTouches[0].clientY - coStartY > 80) closeCheckoutModal();
    }, { passive: true });
}

// ============================================================
// BOOT
// ============================================================
async function boot() {
    initEvents();
    await fetchMenu();   // builds CATEGORIES dynamically
    updateCartUI();
    if (currentPage === "menu") showCategoryGrid();
}

boot();
