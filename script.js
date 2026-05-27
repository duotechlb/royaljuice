/* ============================================================
   ROYAL JUICE — script.js
   ============================================================ */

// ============================================================
// 🔧 CONFIG — Replace with your Google Apps Script URL
// ============================================================
const SHEETS_API = "https://script.google.com/macros/s/AKfycbyeCW1nbF3wXQNiHKxVaqYEqE3YsEoGp-dlxkN-lqwnHrFhqXBEiyrddXf1O-T6NPxwig/exec";

// WhatsApp number
const WA_NUMBER = "96176419154";

// ============================================================
// CATEGORIES
// ============================================================
const CATEGORIES = [
    {
        id: "juices",
        label: "Juices",
        emoji: "🍊",
        image: "https://images.unsplash.com/photo-1622597467836-f3e48ea3ff3b?w=600&auto=format&fit=crop"
    },
    {
        id: "hot_drinks",
        label: "Hot Drinks",
        emoji: "☕",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop"
    },
    {
        id: "crepes",
        label: "Crêpes",
        emoji: "🥞",
        image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&auto=format&fit=crop"
    },
    {
        id: "cocktails",
        label: "Cocktails",
        emoji: "🍸",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop"
    },
    {
        id: "milkshakes",
        label: "Milkshakes",
        emoji: "🥤",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop"
    },
    {
        id: "specialities",
        label: "Specialities",
        emoji: "✨",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop"
    }
];

// ============================================================
// FALLBACK MENU (real data from your menu images)
// ============================================================
const FALLBACK_MENU = [
    // ── JUICES ──
    {
        id: "j1", name: "Orange Juice", category: "juices",
        description: "Freshly squeezed oranges",
        price_s: 1.5, price_m: 2.0, price_l: 2.5, price_fixed: null,
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&auto=format&fit=crop"
    },
    {
        id: "j2", name: "Lemonade Juice", category: "juices",
        description: "Freshly squeezed lemons, water, sugar",
        price_s: 1.5, price_m: 2.0, price_l: 2.5, price_fixed: null,
        image: "https://images.unsplash.com/photo-1465362649024-a4c32f5d20f5?w=600&auto=format&fit=crop"
    },
    {
        id: "j3", name: "Strawberry Juice", category: "juices",
        description: "Freshly juiced strawberries, pure and simple!",
        price_s: 1.5, price_m: 2.0, price_l: 2.5, price_fixed: null,
        image: "https://images.unsplash.com/photo-1560023907-5f339617ea30?w=600&auto=format&fit=crop"
    },
    {
        id: "j4", name: "Fluffy Coffee", category: "juices",
        description: "Instant coffee, milk, honey, chocolate syrup",
        price_s: 2.0, price_m: 2.5, price_l: 3.0, price_fixed: null,
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop"
    },
    {
        id: "j5", name: "Iced Irish Coffee", category: "juices",
        description: "Instant coffee, heavy cream, Baileys / other flavors",
        price_s: 2.5, price_m: 3.5, price_l: 4.0, price_fixed: null,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop"
    },

    // ── HOT DRINKS ──
    {
        id: "h1", name: "Coffee", category: "hot_drinks",
        description: "Add chocolate for +$0.55",
        price_s: null, price_m: null, price_l: null, price_fixed: 0.8,
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop"
    },
    {
        id: "h2", name: "Nescafé", category: "hot_drinks",
        description: "",
        price_s: null, price_m: null, price_l: null, price_fixed: 1.0,
        image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop"
    },
    {
        id: "h3", name: "Cappuccino / Hot Chocolate", category: "hot_drinks",
        description: "",
        price_s: null, price_m: null, price_l: null, price_fixed: 1.0,
        image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&auto=format&fit=crop"
    },

    // ── CRÊPES (placeholder — add your items in Google Sheet) ──
    {
        id: "cr1", name: "Coming Soon!", category: "crepes",
        description: "Our crêpe menu is being crafted with love. Check back soon!",
        price_s: null, price_m: null, price_l: null, price_fixed: 0,
        image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&auto=format&fit=crop"
    },

    // ── COCKTAILS ──
    {
        id: "c1", name: "Passion Mojito", category: "cocktails",
        description: "Fresh mint, lime, rum, passion fruit",
        price_s: null, price_m: null, price_l: null, price_fixed: 9.9,
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop"
    },
    {
        id: "c2", name: "Berry Smash", category: "cocktails",
        description: "Vodka, mixed berries, lemon, soda",
        price_s: null, price_m: null, price_l: null, price_fixed: 8.5,
        image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&auto=format&fit=crop"
    },

    // ── MILKSHAKES ──
    {
        id: "m1", name: "Oreo Shake", category: "milkshakes",
        description: "Vanilla ice cream, Oreo, whipped cream",
        price_s: null, price_m: null, price_l: null, price_fixed: 6.9,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop"
    },
    {
        id: "m2", name: "Strawberry Cheesecake", category: "milkshakes",
        description: "Fresh strawberries, cheesecake bits",
        price_s: null, price_m: null, price_l: null, price_fixed: 7.5,
        image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&auto=format&fit=crop"
    },

    // ── SPECIALITIES ──
    {
        id: "s1", name: "Royal Spritz", category: "specialities",
        description: "Aperol, prosecco, orange zest",
        price_s: null, price_m: null, price_l: null, price_fixed: 10.9,
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop"
    },
    {
        id: "s2", name: "Crêpe Cocktail", category: "specialities",
        description: "Layered cream liqueur, caramel drizzle",
        price_s: null, price_m: null, price_l: null, price_fixed: 12.5,
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop"
    }
];

// ============================================================
// STATE
// ============================================================
let menuItems = [];
let cart = [];
let currentPage = "home";
let selectedItem = null;
let selectedSize = null;
let activePillId = null;
let pillObserver = null;

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

    window.scrollTo({ top: 0, behavior: "smooth" });
    closeCart();
    closeMobileNav();

    if (pageId === "menu") {
        renderCategoryGrid();
    }
}

// ============================================================
// FETCH MENU FROM GOOGLE SHEETS
// ============================================================
async function fetchMenu() {
    try {
        const res = await fetch(SHEETS_API, { mode: "cors" });
        if (!res.ok) throw new Error("not ok");
        const raw = await res.json();
        if (Array.isArray(raw) && raw.length > 0) {
            menuItems = raw.map(normalizeItem);
        } else {
            menuItems = FALLBACK_MENU.map(normalizeItem);
        }
    } catch {
        menuItems = FALLBACK_MENU.map(normalizeItem);
    }
}

function normalizeItem(item) {
    const ps = parseFloat(item.price_s) || null;
    const pm = parseFloat(item.price_m) || null;
    const pl = parseFloat(item.price_l) || null;
    const pf = parseFloat(item.price_fixed ?? item.price) || null;
    const hasSizes = !!(ps && pm && pl);
    const displayPrice = hasSizes ? ps : pf;

    return {
        id:          String(item.id || crypto.randomUUID()),
        name:        String(item.name || ""),
        category:    String(item.category || "").toLowerCase().replace(/\s+/g, "_"),
        description: String(item.description || ""),
        image:       String(item.image_url || item.image || "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&auto=format"),
        hasSizes,
        prices:      hasSizes ? { s: ps, m: pm, l: pl } : null,
        price:       displayPrice,
        available:   item.available !== false && item.available !== "FALSE"
    };
}

// ============================================================
// CATEGORY GRID
// ============================================================
function renderCategoryGrid() {
    $("categoryGridView").classList.remove("hidden");
    $("itemsView").classList.add("hidden");

    const grid = $("catGrid");
    grid.innerHTML = "";

    CATEGORIES.forEach(cat => {
        const count = menuItems.filter(i => i.category === cat.id && i.available).length;
        const tile = document.createElement("div");
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
// ITEMS VIEW (all sections stacked, scroll to selected)
// ============================================================
function showItemsView(focusCatId) {
    $("categoryGridView").classList.add("hidden");
    $("itemsView").classList.remove("hidden");

    renderPills(focusCatId);
    renderAllSections();

    // Scroll to the focused section after render
    requestAnimationFrame(() => {
        const el = document.querySelector(`[data-section="${focusCatId}"]`);
        if (el) {
            const offset = el.getBoundingClientRect().top + window.scrollY - 130;
            window.scrollTo({ top: offset, behavior: "smooth" });
        }
        setupScrollObserver();
    });
}

// ── Pills ──
function renderPills(activeCat) {
    const container = $("pillsScroll");
    container.innerHTML = `
        <span class="pill-btn back-pill" id="backToGridPill">← All Categories</span>
    `;
    $("backToGridPill").addEventListener("click", () => {
        navigate("menu");
        renderCategoryGrid();
    });

    CATEGORIES.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = "pill-btn" + (cat.id === activeCat ? " active" : "");
        btn.dataset.cat = cat.id;
        btn.textContent = `${cat.emoji} ${cat.label}`;
        btn.addEventListener("click", () => {
            // Scroll to section
            const el = document.querySelector(`[data-section="${cat.id}"]`);
            if (el) {
                const offset = el.getBoundingClientRect().top + window.scrollY - 130;
                window.scrollTo({ top: offset, behavior: "smooth" });
            }
        });
        container.appendChild(btn);
    });
}

function setActivePill(catId) {
    if (catId === activePillId) return;
    activePillId = catId;
    document.querySelectorAll(".pill-btn[data-cat]").forEach(b => {
        b.classList.toggle("active", b.dataset.cat === catId);
    });
    // Scroll pill into view
    const active = document.querySelector(`.pill-btn[data-cat="${catId}"]`);
    if (active) active.scrollIntoView({ inline: "center", behavior: "smooth" });
}

// ── All sections ──
function renderAllSections() {
    const container = $("allSections");
    container.innerHTML = "";

    CATEGORIES.forEach(cat => {
        const items = menuItems.filter(i => i.category === cat.id && i.available);
        const section = document.createElement("div");
        section.className = "cat-section";
        section.dataset.section = cat.id;

        section.innerHTML = `
            <h2 class="cat-section-title">
                <span class="s-emoji">${cat.emoji}</span>
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

    // Attach add-to-cart listeners
    container.querySelectorAll(".add-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            e.stopPropagation();
            const item = menuItems.find(i => i.id === btn.dataset.id);
            if (!item) return;
            if (item.hasSizes) {
                openSizeSheet(item);
            } else {
                addToCart(item, null, item.price);
                showToast(`${item.name} added!`);
            }
        });
    });
}

function renderItemCard(item) {
    const priceHtml = item.hasSizes
        ? `<div class="item-price"><span class="item-price-from">from</span>$${item.prices.s.toFixed(2)}</div>`
        : `<div class="item-price">$${(item.price || 0).toFixed(2)}</div>`;

    // Don't show Add for $0 items (placeholder)
    const btnHtml = item.price === 0
        ? ``
        : `<button class="add-btn" data-id="${item.id}">
               <i class="fas fa-plus"></i> Add
           </button>`;

    return `
        <div class="item-card">
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
                <div class="item-footer">
                    ${priceHtml}
                    ${btnHtml}
                </div>
            </div>
        </div>
    `;
}

// ── IntersectionObserver for active pill ──
function setupScrollObserver() {
    if (pillObserver) pillObserver.disconnect();
    const sections = document.querySelectorAll("[data-section]");
    pillObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) setActivePill(e.target.dataset.section);
        });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach(s => pillObserver.observe(s));
}

// ============================================================
// SIZE BOTTOM SHEET
// ============================================================
function openSizeSheet(item) {
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
                ${["s", "m", "l"].map(sz => `
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

    // Size selection
    document.querySelectorAll(".size-opt").forEach(opt => {
        opt.addEventListener("click", () => {
            document.querySelectorAll(".size-opt").forEach(o => o.classList.remove("selected"));
            opt.classList.add("selected");
            selectedSize = opt.dataset.size;
            const btn = $("ssAddBtn");
            btn.disabled = false;
            btn.textContent = `Add to Bag — $${parseFloat(opt.dataset.price).toFixed(2)}`;
            btn.innerHTML = `<i class="fas fa-bag-shopping"></i> Add to Bag — $${parseFloat(opt.dataset.price).toFixed(2)}`;
        });
    });

    $("ssAddBtn").addEventListener("click", () => {
        if (!selectedSize) return;
        const price = selectedItem.prices[selectedSize];
        addToCart(selectedItem, selectedSize, price);
        showToast(`${selectedItem.name} (${selectedSize.toUpperCase()}) added!`);
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
    setTimeout(() => { $("sizeBackdrop").style.display = "none"; }, 300);
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
            name: item.name,
            image: item.image,
            size: size ? size.toUpperCase() : null,
            price, qty: 1
        });
    }
    updateCartUI();
}

function updateCartUI() {
    const total = cart.reduce((s, i) => s + i.qty, 0);
    $("cartCountBadge").textContent = total;

    const list = $("cartItemsList");
    const foot = $("cartFooter");

    if (cart.length === 0) {
        list.innerHTML = `<p class="empty-msg">Your bag is empty 🛍</p>`;
        foot.style.display = "none";
        return;
    }
    foot.style.display = "block";

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
// WHATSAPP ORDER
// ============================================================
function sendWhatsAppOrder() {
    if (!cart.length) { showToast("Your bag is empty!"); return; }
    const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    let msg = "🍹 *Royal Juice Order*%0A%0A";
    cart.forEach(i => {
        const sizeStr = i.size ? ` (${i.size})` : "";
        msg += `• ${i.name}${sizeStr} x${i.qty} → $${(i.price * i.qty).toFixed(2)}%0A`;
    });
    msg += `%0A*Total: $${total.toFixed(2)}*%0A%0AThank you! 🙌`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
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
// MOBILE NAV
// ============================================================
let mobileNavOpen = false;
function toggleMobileNav() {
    mobileNavOpen = !mobileNavOpen;
    $("mobileNav").classList.toggle("open", mobileNavOpen);
}
function closeMobileNav() {
    mobileNavOpen = false;
    $("mobileNav").classList.remove("open");
}

// ============================================================
// TOAST
// ============================================================
let toastTimer;
function showToast(msg) {
    const t = $("toastMsg");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2000);
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
    // Desktop nav
    document.querySelectorAll(".nav-item").forEach(el => {
        el.addEventListener("click", () => navigate(el.dataset.page));
    });

    // Mobile nav
    document.querySelectorAll(".mob-nav-item").forEach(el => {
        el.addEventListener("click", () => navigate(el.dataset.page));
    });

    // Logo → home
    $("logoHomeBtn").addEventListener("click", () => navigate("home"));

    // Hamburger
    $("mobileMenuToggle").addEventListener("click", toggleMobileNav);

    // Explore menu button (home page)
    $("exploreMenuBtn")?.addEventListener("click", () => navigate("menu"));

    // Cart
    $("cartIconBtn").addEventListener("click", openCart);
    $("closeCartBtn").addEventListener("click", closeCart);
    $("cartOverlay").addEventListener("click", closeCart);
    $("clearCartBtn").addEventListener("click", clearCart);
    $("whatsappOrderBtn").addEventListener("click", sendWhatsAppOrder);

    // Size sheet backdrop
    $("sizeBackdrop").addEventListener("click", closeSizeSheet);

    // Swipe down to close size sheet
    let sheetStartY = 0;
    const sheet = $("sizeSheet");
    sheet.addEventListener("touchstart", e => { sheetStartY = e.touches[0].clientY; }, { passive: true });
    sheet.addEventListener("touchend", e => {
        if (e.changedTouches[0].clientY - sheetStartY > 80) closeSizeSheet();
    }, { passive: true });
}

// ============================================================
// BOOT
// ============================================================
async function boot() {
    initEvents();
    await fetchMenu();
    updateCartUI();
    if (currentPage === "menu") renderCategoryGrid();
}

boot();