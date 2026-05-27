/* ============================================================
   ROYAL JUICE — script.js
   ============================================================ */

// ============================================================
// CONFIG — Google Sheet (fetched via gviz API, no CORS issues)
// ============================================================
const SHEET_ID  = "1N7apz3BducRmDsAC00SfMFsEJOHISu1_JF8zs81swg";
const SHEET_GID = "1143054748"; // Sheet tab ID from the URL

// WhatsApp number
const WA_NUMBER = "96176419154";

// ============================================================
// CATEGORIES
// ============================================================
const CATEGORIES = [
    { id:"juices",       label:"Juices",       emoji:"🍊", image:"https://images.unsplash.com/photo-1622597467836-f3e48ea3ff3b?w=600&auto=format&fit=crop" },
    { id:"hot_drinks",   label:"Hot Drinks",   emoji:"☕", image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop" },
    { id:"crepes",       label:"Crêpes",       emoji:"🥞", image:"https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&auto=format&fit=crop" },
    { id:"cocktails",    label:"Cocktails",    emoji:"🍸", image:"https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop" },
    { id:"milkshakes",   label:"Milkshakes",   emoji:"🥤", image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop" },
    { id:"specialities", label:"Specialities", emoji:"✨", image:"https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop" }
];

// ============================================================
// FALLBACK MENU — only used if the sheet cannot be loaded
// ============================================================
const FALLBACK_MENU = [
    { id:"j1", name:"Orange Juice",     category:"juices", description:"Freshly squeezed oranges", price_s:5, price_m:5, price_l:5, price_fixed:null, image:"https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600" },
    { id:"j2", name:"Lemonade Juice",   category:"juices", description:"Freshly squeezed lemons, water, sugar", price_s:1.5, price_m:2, price_l:2.5, price_fixed:null, image:"https://images.unsplash.com/photo-1465362649024-a4c32f5d20f5?w=600" },
    { id:"j3", name:"Strawberry Juice", category:"juices", description:"Freshly juiced strawberries", price_s:1.5, price_m:2, price_l:2.5, price_fixed:null, image:"https://images.unsplash.com/photo-1560023907-5f339617ea30?w=600" },
    { id:"j4", name:"Fluffy Coffee",    category:"juices", description:"Instant coffee, milk, honey", price_s:2, price_m:2.5, price_l:3, price_fixed:null, image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600" },
    { id:"j5", name:"Iced Irish Coffee",category:"juices", description:"Instant coffee, cream, Baileys", price_s:2.5, price_m:3.5, price_l:4, price_fixed:null, image:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600" },
    { id:"h1", name:"Coffee",           category:"hot_drinks", description:"Add chocolate for +$0.55", price_s:null, price_m:null, price_l:null, price_fixed:1, image:"https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600" },
    { id:"h2", name:"Nescafé",          category:"hot_drinks", description:"", price_s:null, price_m:null, price_l:null, price_fixed:1, image:"https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600" },
    { id:"h3", name:"Cappuccino / Hot Chocolate", category:"hot_drinks", description:"", price_s:null, price_m:null, price_l:null, price_fixed:1, image:"https://images.unsplash.com/photo-1534778101976-62847782c213?w=600" },
    { id:"cr1", name:"Sweet Nutella Crêpe", category:"crepes", description:"Warm crêpe with Nutella and banana", price_s:null, price_m:null, price_l:null, price_fixed:4.5, image:"https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600" },
    { id:"cr2", name:"Strawberry Cream Crêpe", category:"crepes", description:"Fresh strawberries, whipped cream", price_s:null, price_m:null, price_l:null, price_fixed:5, image:"https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600" },
    { id:"c1", name:"Passion Mojito",   category:"cocktails", description:"Fresh mint, lime, rum, passion fruit", price_s:null, price_m:null, price_l:null, price_fixed:9.9, image:"https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600" },
    { id:"c2", name:"Berry Smash",      category:"cocktails", description:"Vodka, mixed berries, lemon, soda", price_s:null, price_m:null, price_l:null, price_fixed:8.5, image:"https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600" },
    { id:"m1", name:"Oreo Shake",       category:"milkshakes", description:"Vanilla ice cream, Oreo, whipped cream", price_s:null, price_m:null, price_l:null, price_fixed:6.9, image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600" },
    { id:"m2", name:"Strawberry Cheesecake", category:"milkshakes", description:"Fresh strawberries, cheesecake bits", price_s:null, price_m:null, price_l:null, price_fixed:7.5, image:"https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600" },
    { id:"s1", name:"Royal Spritz",     category:"specialities", description:"Aperol, prosecco, orange zest", price_s:null, price_m:null, price_l:null, price_fixed:10.9, image:"https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600" },
    { id:"s2", name:"Crêpe Cocktail",   category:"specialities", description:"Layered cream liqueur, caramel drizzle", price_s:null, price_m:null, price_l:null, price_fixed:12.5, image:"https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600" }
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

    if (pageId === "menu") {
        showCategoryGrid();
    }
}

// ============================================================
// FETCH MENU — from Google Sheets (public required)
// ============================================================
async function fetchMenu() {
    try {
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${SHEET_GID}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status} – make sure your sheet is published to the web`);
        
        const text = await res.text();
        const match = text.match(/setResponse\((\{[\s\S]+\})\)/);
        if (!match) throw new Error("Invalid gviz response format");
        
        const gviz = JSON.parse(match[1]);
        if (gviz.status !== "ok") throw new Error(`gviz error: ${gviz.status}`);
        
        const rows = gviz.table.rows;
        if (!rows || rows.length === 0) throw new Error("Sheet is empty");
        
        const items = rows
            .filter(row => row.c && row.c[1] && row.c[1].v) // name column must exist
            .map(row => {
                const cell = (i) => (row.c && row.c[i] != null) ? row.c[i].v : null;
                return {
                    id:          cell(0),
                    name:        cell(1),
                    category:    cell(2),
                    description: cell(3),
                    price_s:     cell(4),
                    price_m:     cell(5),
                    price_l:     cell(6),
                    price_fixed: cell(7),
                    image_url:   cell(8),
                    available:   cell(9)
                };
            });
        
        if (items.length === 0) throw new Error("No valid items found in sheet");
        
        menuItems = items.map(normalizeItem);
        console.log(`✅ Loaded ${menuItems.length} items from Google Sheets`);
        return; // success
    } catch (err) {
        console.error("❌ Google Sheets fetch failed:", err);
        showToast("⚠️ Could not load from sheet. Using fallback menu. Make sure your sheet is published to the web.");
        // Fallback to static data so the site still works
        menuItems = FALLBACK_MENU.map(normalizeItem);
    }
    itemsViewReady = false;
}

function normalizeItem(item) {
    const ps = parseFloat(item.price_s)     || null;
    const pm = parseFloat(item.price_m)     || null;
    const pl = parseFloat(item.price_l)     || null;
    const pf = parseFloat(item.price_fixed) || null;

    // hasSizes only if all three S/M/L exist and not all equal
    const hasSizes = !!(ps && pm && pl && !(ps === pm && pm === pl));
    const displayPrice = hasSizes ? ps : (pf || ps || pm || pl);

    return {
        id:          String(item.id || crypto.randomUUID()),
        name:        String(item.name || ""),
        category:    String(item.category || "").toLowerCase().replace(/\s+/g, "_"),
        description: String(item.description || ""),
        image:       String(item.image_url || "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&auto=format"),
        hasSizes,
        prices:      hasSizes ? { s:ps, m:pm, l:pl } : null,
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
        btn.textContent = `${cat.emoji} ${cat.label}`;

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
    const offset = el.getBoundingClientRect().top + window.scrollY - 136;
    window.scrollTo({ top: Math.max(0, offset), behavior:"smooth" });
}

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
                <span class="s-emoji">${cat.emoji}</span>${cat.label}
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
}

function renderItemCard(item) {
    const priceHtml = item.hasSizes
        ? `<div class="item-price"><span class="item-price-from">from</span>$${item.prices.s.toFixed(2)}</div>`
        : `<div class="item-price">$${(item.price || 0).toFixed(2)}</div>`;

    const btnHtml = (item.price === 0 || item.price == null)
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
    toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
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
        if (e.key === "Enter") {
            e.preventDefault();
            confirmCheckoutOrder();
        }
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
    await fetchMenu();
    updateCartUI();
    if (currentPage === "menu") showCategoryGrid();
}

boot();
