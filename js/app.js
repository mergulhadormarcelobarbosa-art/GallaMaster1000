/**
 * GallaMaster 2.0 — App principal (Vercel edition)
 */

let currentCity = 'Caerleon';
let priceData   = {};
let lastFetch   = null;

const statusBar    = document.getElementById('status-bar');
const refreshBtn   = document.getElementById('refresh-btn');
const cityTabsEl   = document.getElementById('city-tabs');
const gridEl       = document.getElementById('resource-grid');
const serverSelect = document.getElementById('server-select');

// ── Inicialização ──────────────────────────────────────────────────────
function init() {
  renderCityTabs();
  renderSkeleton();
  refreshBtn.addEventListener('click', fetchPrices);
  fetchPrices();
}

// ── Abas de cidade ────────────────────────────────────────────────────
function renderCityTabs() {
  cityTabsEl.innerHTML = CITIES.map(city => `
    <button class="city-tab ${city === currentCity ? 'active' : ''}" data-city="${city}">
      ${CITY_LABELS[city]}
    </button>
  `).join('');
  cityTabsEl.querySelectorAll('.city-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCity = btn.dataset.city;
      renderCityTabs();
      renderGrid();
    });
  });
}

// ── Skeleton ──────────────────────────────────────────────────────────
function renderSkeleton() {
  gridEl.innerHTML = RESOURCES.map(() => `
    <div class="resource-card">
      <div class="resource-head">
        <div class="resource-icon skeleton" style="width:32px;height:32px;"></div>
        <div style="flex:1;">
          <div class="skeleton" style="width:100px;height:14px;margin-bottom:6px;"></div>
          <div class="skeleton" style="width:60px;height:10px;"></div>
        </div>
      </div>
      ${TIERS.map(() => `<div class="skeleton" style="height:26px;margin-bottom:4px;border-radius:4px;"></div>`).join('')}
    </div>
  `).join('');
}

// ── Busca de preços ───────────────────────────────────────────────────
async function fetchPrices() {
  setStatus('Buscando preços...', '');
  refreshBtn.disabled = true;
  refreshBtn.querySelector('.btn-icon').classList.add('spin');

  // Apenas enc 0 (base) por enquanto — sem recursos encantados no mercado
  const itemIds = [];
  RESOURCES.forEach(res => {
    TIERS.forEach(tier => {
      itemIds.push(`T${tier}_${res.key}`);
    });
  });

  const server    = serverSelect.value;
  const locations = CITIES.join(',');
  const CHUNK     = 30;
  const newData   = {};
  let errors      = 0;

  // Divide em chunks para não exceder limite de URL
  for (let i = 0; i < itemIds.length; i += CHUNK) {
    const chunk = itemIds.slice(i, i + CHUNK);
    try {
      const url  = `/api/prices?items=${chunk.join(',')}&server=${server}&locations=${locations}`;
      const resp = await fetch(url, { signal: AbortSignal.timeout(15000) });
      if (!resp.ok) { errors++; continue; }
      const data = await resp.json();
      if (data.error) { errors++; continue; }

      data.forEach(entry => {
        if (!newData[entry.item_id]) newData[entry.item_id] = {};
        newData[entry.item_id][entry.city] = {
          sell: entry.sell_price_min,
          buy:  entry.buy_price_max,
          date: entry.sell_price_min_date,
        };
      });
    } catch (e) {
      errors++;
    }
  }

  priceData = newData;
  lastFetch = new Date();
  refreshBtn.disabled = false;
  refreshBtn.querySelector('.btn-icon').classList.remove('spin');

  const time = lastFetch.toLocaleTimeString('pt-BR');
  if (errors > 0 && Object.keys(priceData).length === 0) {
    setStatus(`✗ Falha ao buscar preços. Verifique a conexão.`, 'error');
  } else {
    setStatus(`✓ Atualizado às ${time}${errors ? ` · ${errors} lote(s) falharam` : ''}`, 'success');
  }

  renderGrid();
}

function setStatus(msg, type) {
  statusBar.textContent = msg;
  statusBar.className   = 'status-bar' + (type ? ' ' + type : '');
}

// ── Grid de recursos ──────────────────────────────────────────────────
function renderGrid() {
  gridEl.innerHTML = RESOURCES.map(res => renderCard(res)).join('');
}

function renderCard(res) {
  const tiers = TIERS.map(tier => {
    const id        = `T${tier}_${res.key}`;
    const cityData  = priceData[id]?.[currentCity];
    const sell      = cityData?.sell || 0;
    const buy       = cityData?.buy  || 0;
    const hasData   = sell > 0 || buy > 0;

    // Data freshness
    let freshness = '';
    if (cityData?.date) {
      const hours = (Date.now() - new Date(cityData.date)) / 3_600_000;
      if (hours < 1)       freshness = '< 1h';
      else if (hours < 24) freshness = `${Math.floor(hours)}h`;
      else                 freshness = `${Math.floor(hours/24)}d`;
    }

    return `
      <div class="tier-row">
        <span class="tlabel" style="color:${res.color}">T${tier}</span>
        <div class="tprices">
          <div class="tprice-sell ${sell ? '' : 'empty'}" title="Venda">
            ${sell ? '↑ ' + fmt(sell) : '—'}
          </div>
          <div class="tprice-buy ${buy ? '' : 'empty'}" title="Compra">
            ${buy ? '↓ ' + fmt(buy) : ''}
          </div>
        </div>
        <span class="tfresh">${freshness}</span>
      </div>`;
  }).join('');

  return `
    <div class="resource-card">
      <div class="resource-head">
        <div class="resource-icon">
          <img src="${CDN}T5_${res.key}.png?size=64" alt="" onerror="this.style.display='none'">
        </div>
        <div>
          <div class="resource-name" style="color:${res.color}">${res.name}</div>
          <div class="resource-tier">${CITY_LABELS[currentCity]}</div>
        </div>
      </div>
      <div class="tier-header">
        <span>Tier</span><span>Venda · Compra</span><span>Atualiz.</span>
      </div>
      <div class="resource-tiers">${tiers}</div>
    </div>`;
}

function fmt(v) {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(2) + 'M';
  if (v >= 1_000)     return (v / 1_000).toFixed(1) + 'k';
  return v.toLocaleString('pt-BR');
}

document.addEventListener('DOMContentLoaded', init);
