/* ══════════════════════════════════════════════════════════════════════
   GallaMaster 2.0 — Design tokens
   Paleta: terminal de mercado, frio e funcional
   ════════════════════════════════════════════════════════════════════ */
:root {
  --bg:          #0f1115;
  --bg-elevated: #161922;
  --card:        #1a1d27;
  --card-hover:  #1f232f;
  --border:      #272b38;
  --border-soft: #20232e;

  --text:        #e4e6eb;
  --text-dim:    #8b8f9e;
  --text-faint:  #565a6b;

  --accent:      #5b8def;
  --accent-soft: rgba(91,141,239,.12);

  --green:       #3ecf8e;
  --green-soft:  rgba(62,207,142,.12);
  --red:         #f0656b;
  --red-soft:    rgba(240,101,107,.12);

  --font-ui:   'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --radius: 6px;
}

* { margin:0; padding:0; box-sizing:border-box; }

html, body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-ui);
  font-size: 14px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

/* ── Layout ── */
.app {
  display: grid;
  grid-template-columns: 230px 1fr;
  min-height: 100vh;
}

/* ── Sidebar ── */
.sidebar {
  background: var(--bg-elevated);
  border-right: 1px solid var(--border-soft);
  padding: 20px 14px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 8px;
}
.brand-mark {
  width: 34px; height: 34px;
  background: linear-gradient(135deg, var(--accent), #8b6cf0);
  border-radius: var(--radius);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 13px;
  color: #fff;
  letter-spacing: -0.5px;
}
.brand-name { font-weight: 600; font-size: 14px; color: var(--text); }
.brand-version {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-faint);
  letter-spacing: 1px;
}

.nav-section { display: flex; flex-direction: column; gap: 2px; }
.nav-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--text-faint);
  padding: 6px 10px 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  color: var(--text-dim);
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 500;
  padding: 9px 10px;
  border-radius: var(--radius);
  cursor: pointer;
  transition: background .12s, color .12s;
}
.nav-item:hover:not(:disabled) {
  background: var(--card);
  color: var(--text);
}
.nav-item.active {
  background: var(--accent-soft);
  color: var(--accent);
}
.nav-item:disabled {
  color: var(--text-faint);
  cursor: default;
  opacity: .5;
}
.nav-icon { font-size: 14px; width: 18px; text-align: center; flex-shrink: 0; }

/* ── Main content ── */
.content { padding: 28px 36px; max-width: 1280px; }
.tab { display: none; }
.tab.active { display: block; }

.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 22px;
  flex-wrap: wrap;
}
.tab-header h1 {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -.01em;
}
.tab-sub {
  color: var(--text-dim);
  font-size: 13px;
  margin-top: 4px;
}

.header-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

/* ── Buttons & selects ── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--card);
  color: var(--text);
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background .12s, border-color .12s;
}
.btn:hover { background: var(--card-hover); border-color: var(--text-faint); }
.btn-primary {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
.btn-primary:hover { background: #4a7cdb; border-color: #4a7cdb; }
.btn:disabled { opacity: .5; cursor: default; }
.btn-icon { font-size: 14px; }
.btn-icon.spin { animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.select {
  padding: 8px 12px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--card);
  color: var(--text);
  font-family: var(--font-ui);
  font-size: 13px;
  cursor: pointer;
}

/* ── Status bar ── */
.status-bar {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-faint);
  margin-bottom: 18px;
  min-height: 18px;
}
.status-bar.error { color: var(--red); }
.status-bar.success { color: var(--green); }

/* ── City tabs ── */
.city-tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  border-bottom: 1px solid var(--border-soft);
  padding-bottom: 14px;
}
.city-tab {
  padding: 6px 14px;
  border-radius: 100px;
  border: 1px solid var(--border);
  background: var(--card);
  color: var(--text-dim);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all .12s;
}
.city-tab:hover { border-color: var(--text-faint); color: var(--text); }
.city-tab.active {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent);
}

/* ── Resource grid ── */
.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 14px;
}

.resource-card {
  background: var(--card);
  border: 1px solid var(--border-soft);
  border-radius: 8px;
  padding: 16px;
  transition: border-color .15s;
}
.resource-card:hover { border-color: var(--border); }

.resource-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.resource-icon {
  width: 32px; height: 32px;
  border-radius: 5px;
  background: var(--bg-elevated);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.resource-icon img { width: 26px; height: 26px; object-fit: contain; }
.resource-name {
  font-weight: 600;
  font-size: 13px;
}
.resource-tier {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-faint);
  letter-spacing: .5px;
}

.resource-tiers {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.tier-row {
  display: grid;
  grid-template-columns: 36px 1fr auto;
  align-items: center;
  gap: 8px;
  padding: 5px 8px;
  border-radius: 4px;
  font-size: 12px;
}
.tier-row:hover { background: var(--bg-elevated); }
.tier-row .tlabel {
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--text-dim);
}
.tier-row .tprice {
  font-family: var(--font-mono);
  font-weight: 600;
  text-align: right;
  color: var(--text);
}
.tier-row .tprice.empty { color: var(--text-faint); font-weight: 400; }
.tier-row .ttrend {
  font-size: 10px;
  width: 36px;
  text-align: right;
}
.ttrend.up   { color: var(--green); }
.ttrend.down { color: var(--red); }

/* ── Responsive ── */
@media (max-width: 860px) {
  .app { grid-template-columns: 1fr; }
  .sidebar {
    flex-direction: row;
    overflow-x: auto;
    border-right: none;
    border-bottom: 1px solid var(--border-soft);
  }
  .content { padding: 20px; }
}

/* ── Loading skeleton ── */
.skeleton {
  background: linear-gradient(90deg, var(--card) 25%, var(--card-hover) 50%, var(--card) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ── Focus visibility ── */
button:focus-visible, select:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .btn-icon.spin, .skeleton { animation: none; }
}

/* ── Tier row melhorado ── */
.tier-header {
  display: grid;
  grid-template-columns: 36px 1fr auto;
  font-size: 10px;
  color: var(--text-faint);
  padding: 4px 8px;
  letter-spacing: .05em;
  text-transform: uppercase;
  border-bottom: 1px solid var(--border-soft);
  margin-bottom: 4px;
}
.tier-row {
  display: grid;
  grid-template-columns: 36px 1fr auto;
  align-items: center;
  gap: 6px;
  padding: 5px 8px;
  border-radius: 4px;
  font-size: 12px;
  transition: background .1s;
}
.tier-row:hover { background: var(--bg-elevated); }

.tprices { display: flex; flex-direction: column; gap: 1px; }
.tprice-sell { font-family: var(--font-mono); font-weight: 600; font-size: 12px; color: var(--green); }
.tprice-buy  { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); }
.tprice-sell.empty, .tprice-buy.empty { color: var(--text-faint); font-weight: 400; }
.tfresh {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-faint);
  text-align: right;
}

/* ══════════════════════════════════════════════════════════════════════
   Busca de Preços
   ════════════════════════════════════════════════════════════════════ */

/* Search box */
.search-box {
  position: relative;
  margin-bottom: 24px;
}
.search-controls {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.search-input-wrap {
  position: relative;
  flex: 1;
  min-width: 260px;
}
.search-icon {
  position: absolute;
  left: 12px; top: 50%;
  transform: translateY(-50%);
  color: var(--text-faint);
  font-size: 16px;
  pointer-events: none;
}
#search-input {
  width: 100%;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 10px 14px 10px 38px;
  color: var(--text);
  font-family: var(--font-ui);
  font-size: 15px;
  outline: none;
  transition: border-color .15s;
}
#search-input:focus { border-color: var(--accent); }
#search-input::placeholder { color: var(--text-faint); }

/* Dropdown */
#search-dropdown {
  display: none;
  position: absolute;
  top: calc(100% + 4px);
  left: 0; right: 0;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: 0 8px 24px rgba(0,0,0,.4);
  z-index: 100;
  max-height: 320px;
  overflow-y: auto;
}
.search-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  cursor: pointer;
  border-bottom: 1px solid var(--border-soft);
  transition: background .1s;
}
.search-option:last-child { border-bottom: none; }
.search-option:hover { background: var(--card-hover); }
.search-option-name { font-size: 14px; font-weight: 500; }
.search-option-type { font-size: 11px; }

/* Tier / Enc selectors */
.selector-group {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.selector-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--text-faint);
  white-space: nowrap;
}
.tier-btn, .enc-btn {
  padding: 6px 12px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--card);
  color: var(--text-dim);
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all .12s;
}
.tier-btn:hover, .enc-btn:hover {
  border-color: var(--text-faint);
  color: var(--text);
}
.tier-btn.active {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent);
}
.enc-btn.active {
  background: rgba(232,121,249,.12);
  border-color: rgba(232,121,249,.4);
  color: #e879f9;
}

/* Result area */
.search-empty, .search-loading, .search-error {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-dim);
  font-size: 14px;
}
.search-error { color: var(--red); }
.spinner {
  width: 28px; height: 28px;
  border: 2px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin .7s linear infinite;
  margin: 0 auto 12px;
}

/* Result header */
.search-result-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 12px;
  flex-wrap: wrap;
}
.search-result-name {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 6px;
}
.search-result-meta {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  align-items: center;
}
.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 8px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 500;
  background: var(--accent-soft);
  border: 1px solid rgba(91,141,239,.25);
  color: var(--accent);
}
.badge-dim {
  background: var(--bg-elevated);
  border-color: var(--border);
  color: var(--text-faint);
}

/* Price table */
.price-table-wrap {
  overflow-x: auto;
  border-radius: var(--radius);
  border: 1px solid var(--border-soft);
}
.price-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.price-table thead tr {
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border);
}
.price-table th {
  padding: 10px 16px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--text-faint);
}
.price-table tbody tr {
  border-bottom: 1px solid var(--border-soft);
  transition: background .1s;
}
.price-table tbody tr:last-child { border-bottom: none; }
.price-table tbody tr:hover { background: var(--card-hover); }
.price-table td { padding: 12px 16px; vertical-align: middle; }

.row-best  { background: rgba(62,207,142,.04) !important; }
.row-worst { background: rgba(240,101,107,.04) !important; }

.city-dot {
  display: inline-block;
  width: 8px; height: 8px;
  border-radius: 50%;
  margin-right: 8px;
  flex-shrink: 0;
}
.badge-inline {
  display: inline-block;
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 100px;
  margin-left: 6px;
  font-weight: 600;
}
.badge-inline.best  { background: rgba(62,207,142,.15); color:var(--green); }
.badge-inline.worst { background: rgba(240,101,107,.15); color:var(--red); }

.price-cell {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 14px;
  color: var(--text);
}
.price-cell.price-empty  { color: var(--text-faint); font-weight: 400; }
.price-cell.price-best   { color: var(--green); }
.price-cell.price-worst  { color: var(--red); }
.price-cell.price-buy    { color: var(--text-dim); font-size: 13px; font-weight: 400; }
.price-fresh { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); }

/* Craft info */
.craft-info {
  margin-top: 16px;
  background: var(--card);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius);
  padding: 14px 16px;
}
.craft-info-title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--text-faint);
  margin-bottom: 10px;
}
.craft-info-mats {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.craft-mat {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
}
.craft-mat-qty {
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--accent);
}
.craft-mat-name { color: var(--text); }
