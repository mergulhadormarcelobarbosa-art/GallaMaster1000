/**
 * GallaMaster 2.0 — Busca de Preços
 * Pesquisa por nome → mostra preços em todas as cidades lado a lado
 * com seletor de tier e encantamento.
 */

let searchState = {
  query:   '',
  results: [],       // entradas do CATALOG que batem com a busca
  selected: null,    // entrada selecionada
  tier:   6,
  enc:    0,
  prices: {},        // item_id → { city → {sell, buy, date} }
  loading: false,
};

// ── Inicializa a aba de busca ─────────────────────────────────────────
function searchInit() {
  const input    = document.getElementById('search-input');
  const dropdown = document.getElementById('search-dropdown');
  const tierBtns = document.querySelectorAll('#search-tier-btns .tier-btn');
  const encBtns  = document.querySelectorAll('#search-enc-btns .enc-btn');

  // Autocomplete no input
  input.addEventListener('input', () => {
    searchState.query = input.value.trim();
    searchState.selected = null;
    searchDoSearch();
  });

  input.addEventListener('focus', () => {
    if (searchState.results.length) showDropdown();
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box')) hideDropdown();
  });

  // Tier
  tierBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tierBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      searchState.tier = parseInt(btn.dataset.tier);
      if (searchState.selected) searchFetchPrices();
    });
  });

  // Enc
  encBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      encBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      searchState.enc = parseInt(btn.dataset.enc);
      if (searchState.selected) searchFetchPrices();
    });
  });
}

// ── Normaliza texto para comparação ───────────────────────────────────
function normalize(s) {
  return s.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
}

// ── Busca no catálogo ─────────────────────────────────────────────────
function searchDoSearch() {
  const q = normalize(searchState.query);
  if (q.length < 2) {
    searchState.results = [];
    hideDropdown();
    return;
  }

  const words = q.split(' ').filter(w => w.length >= 2);

  // Pontua cada entrada
  const scored = CATALOG
    .map(entry => {
      const norm = normalize(entry.name);
      let score = 0;
      if (norm === q)                    score += 100;
      if (norm.startsWith(q))            score += 50;
      if (norm.includes(q))              score += 30;
      words.forEach(w => {
        if (norm.includes(w)) score += 10;
      });
      return { entry, score };
    })
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 15)
    .map(x => x.entry);

  searchState.results = scored;
  showDropdown();
}

// ── Dropdown de sugestões ─────────────────────────────────────────────
function showDropdown() {
  const dropdown = document.getElementById('search-dropdown');
  if (!searchState.results.length) { hideDropdown(); return; }

  const typeLabel = { item:'item', resource:'recurso', raw:'bruto', enc:'enc NPC', artifact:'artefato' };
  const typeColor = { item:'var(--accent)', resource:'var(--green)', raw:'#a8d8a8', enc:'#fbbf24', artifact:'#e879f9' };

  dropdown.innerHTML = searchState.results.map((entry, i) => `
    <div class="search-option" data-index="${i}">
      <span class="search-option-name">${entry.name}</span>
      <span class="search-option-type" style="color:${typeColor[entry.type]||'var(--text-faint)'}">
        ${typeLabel[entry.type]||entry.type}
        ${entry.line ? '· '+entry.line : ''}
      </span>
    </div>
  `).join('');

  dropdown.querySelectorAll('.search-option').forEach(el => {
    el.addEventListener('click', () => {
      const entry = searchState.results[parseInt(el.dataset.index)];
      selectEntry(entry);
    });
  });

  dropdown.style.display = 'block';
}

function hideDropdown() {
  const dropdown = document.getElementById('search-dropdown');
  if (dropdown) dropdown.style.display = 'none';
}

// ── Seleciona entrada e busca preços ──────────────────────────────────
function selectEntry(entry) {
  searchState.selected = entry;
  searchState.prices   = {};
  document.getElementById('search-input').value = entry.name;
  hideDropdown();
  renderSearchResult();
  searchFetchPrices();
}

// ── Busca preços para a entrada selecionada ───────────────────────────
async function searchFetchPrices() {
  const entry = searchState.selected;
  if (!entry) return;

  const tier = searchState.tier;
  const enc  = searchState.enc;

  // Determina os item_ids a buscar
  const ids = [];

  if (entry.type === 'item') {
    if (!entry.apiBase) {
      renderSearchResult('Esse item não tem ID de API mapeado — preço manual necessário.');
      return;
    }
    ids.push(buildItemId(tier, entry.apiBase, enc));
    // Artefato junto se tiver
    if (entry.artApiKey) ids.push(buildArtifactId(tier, entry.artApiKey));

  } else if (entry.type === 'resource') {
    // Recursos: busca enc 0 e enc selecionado
    ids.push(buildItemId(tier, entry.apiBase, 0));
    if (enc > 0) ids.push(buildItemId(tier, entry.apiBase, enc));

  } else if (entry.type === 'raw') {
    ids.push(buildItemId(tier, entry.apiBase, 0));

  } else if (entry.type === 'enc') {
    // Runa/Alma/Relíquia — só tier, sem enc no ID
    ids.push(buildEncId(tier, entry.apiBase));

  } else if (entry.type === 'artifact') {
    ids.push(buildArtifactId(tier, entry.apiBase));
  }

  if (!ids.length) { renderSearchResult('Nenhum ID de API encontrado.'); return; }

  searchState.loading = true;
  renderSearchResult();

  try {
    const server    = (document.getElementById('server-select')||{value:'west'}).value || 'west';
    const locations = CITIES.join(',');
    const url       = `/api/prices?items=${ids.join(',')}&server=${server}&locations=${locations}&qualities=1`;
    const resp      = await fetch(url, { signal: AbortSignal.timeout(15000) });
    const data      = await resp.json();

    const newPrices = {};
    data.forEach(entry => {
      if (entry.quality !== 1) return;
      const cityKey = entry.city.replace(/\s+/g,'');
      if (!newPrices[entry.item_id]) newPrices[entry.item_id] = {};
      newPrices[entry.item_id][cityKey] = {
        sell: entry.sell_price_min  > 0 ? entry.sell_price_min  : 0,
        buy:  entry.buy_price_max   > 0 ? entry.buy_price_max   : 0,
        date: entry.sell_price_min_date,
      };
    });

    searchState.prices  = newPrices;
    searchState.loading = false;
    renderSearchResult();
  } catch (e) {
    searchState.loading = false;
    renderSearchResult('Erro ao buscar preços: ' + e.message);
  }
}

// ── Renderiza tabela comparativa por cidade ───────────────────────────
function renderSearchResult(errorMsg) {
  const container = document.getElementById('search-result');
  if (!container) return;

  const entry   = searchState.selected;

  if (!entry) {
    container.innerHTML = `
      <div class="search-empty">
        <div style="font-size:32px;margin-bottom:12px;">⌕</div>
        <div>Digite o nome de um item, recurso ou artefato</div>
        <div style="font-size:12px;margin-top:6px;color:var(--text-faint)">
          Exemplo: "Espada Larga", "Barra de Metal", "Lâmina Demoníaca", "Runa"
        </div>
      </div>`;
    return;
  }

  if (searchState.loading) {
    container.innerHTML = `
      <div class="search-loading">
        <div class="spinner"></div>
        <div>Buscando preços em todas as cidades...</div>
      </div>`;
    return;
  }

  if (errorMsg) {
    container.innerHTML = `<div class="search-error">${errorMsg}</div>`;
    return;
  }

  const tier = searchState.tier;
  const enc  = searchState.enc;

  // Item ID principal
  let mainId = null;
  if (entry.type === 'item')      mainId = buildItemId(tier, entry.apiBase, enc);
  else if (entry.type === 'resource') mainId = buildItemId(tier, entry.apiBase, enc > 0 ? enc : 0);
  else if (entry.type === 'raw')  mainId = buildItemId(tier, entry.apiBase, 0);
  else if (entry.type === 'enc')  mainId = buildEncId(tier, entry.apiBase);
  else if (entry.type === 'artifact') mainId = buildArtifactId(tier, entry.apiBase);

  const mainPrices = searchState.prices[mainId] || {};

  // Artefato (se item com artefato)
  const artId     = entry.artApiKey ? buildArtifactId(tier, entry.artApiKey) : null;
  const artPrices = artId ? (searchState.prices[artId] || {}) : null;

  // Acha melhor e pior preço de venda para highlight
  const sellValues = CITIES.map(c => mainPrices[c]?.sell || 0).filter(v => v > 0);
  const bestSell   = sellValues.length ? Math.max(...sellValues) : 0;
  const worstSell  = sellValues.length > 1 ? Math.min(...sellValues) : 0;

  // Info do item
  const typeLabel = { item:'Item', resource:'Recurso Refinado', raw:'Recurso Bruto', enc:'Enc. NPC', artifact:'Artefato' };
  const encLabel  = ['Base','.1 Runa','.2 Alma','.3 Relíquia'][enc];

  let html = `
    <div class="search-result-header">
      <div class="search-result-title">
        <div class="search-result-name">${entry.name}</div>
        <div class="search-result-meta">
          <span class="badge">${typeLabel[entry.type]||entry.type}</span>
          ${entry.line ? `<span class="badge badge-dim">${entry.line}</span>` : ''}
          ${entry.bonusCity ? `<span class="badge" style="background:rgba(74,222,128,.1);color:var(--green);border-color:rgba(74,222,128,.3)">⭐ ${entry.bonusCity}</span>` : ''}
          <span class="badge badge-dim">T${tier} ${encLabel}</span>
        </div>
      </div>
    </div>`;

  // Tabela de preços por cidade
  html += `<div class="price-table-wrap">
    <table class="price-table">
      <thead>
        <tr>
          <th>Cidade</th>
          <th>Menor Venda</th>
          <th>Maior Compra</th>
          <th>Atualizado</th>
          ${artPrices !== null ? '<th>Artefato</th>' : ''}
        </tr>
      </thead>
      <tbody>`;

  CITIES.forEach(cityKey => {
    const d    = mainPrices[cityKey] || {};
    const sell = d.sell || 0;
    const buy  = d.buy  || 0;
    const isBest  = sell > 0 && sell === bestSell;
    const isWorst = sell > 0 && sell === worstSell && worstSell !== bestSell;
    const color   = CITY_COLORS[cityKey] || 'var(--text)';

    let freshness = '—';
    if (d.date && d.date !== '0001-01-01T00:00:00') {
      const h = (Date.now() - new Date(d.date)) / 3_600_000;
      freshness = h < 1 ? '< 1h' : h < 24 ? `${Math.floor(h)}h` : `${Math.floor(h/24)}d`;
    }

    const artD    = artPrices ? (artPrices[cityKey] || {}) : null;
    const artSell = artD?.sell || 0;

    html += `
      <tr class="${isBest ? 'row-best' : isWorst ? 'row-worst' : ''}">
        <td>
          <span class="city-dot" style="background:${color}"></span>
          <span style="color:${color};font-weight:600">${CITY_LABELS[cityKey]}</span>
          ${isBest  ? '<span class="badge-inline best">melhor</span>'  : ''}
          ${isWorst ? '<span class="badge-inline worst">pior</span>'   : ''}
        </td>
        <td class="price-cell ${sell ? (isBest?'price-best':isWorst?'price-worst':'') : 'price-empty'}">
          ${sell ? fmt(sell) : '—'}
        </td>
        <td class="price-cell price-buy">
          ${buy ? fmt(buy) : '—'}
        </td>
        <td class="price-fresh">${freshness}</td>
        ${artPrices !== null ? `<td class="price-cell">${artSell ? fmt(artSell) : '—'}</td>` : ''}
      </tr>`;
  });

  html += `</tbody></table></div>`;

  // Info de craft (se item)
  if (entry.type === 'item' && entry.mat1) {
    html += `
      <div class="craft-info">
        <div class="craft-info-title">Materiais (por unidade)</div>
        <div class="craft-info-mats">
          <div class="craft-mat">
            <span class="craft-mat-qty">${entry.qty1}×</span>
            <span class="craft-mat-name">${entry.mat1} T${tier}</span>
          </div>
          ${entry.mat2 && entry.qty2 > 0 ? `
          <div class="craft-mat">
            <span class="craft-mat-qty">${entry.qty2}×</span>
            <span class="craft-mat-name">${entry.mat2} T${tier}</span>
          </div>` : ''}
          ${entry.artifact ? `
          <div class="craft-mat">
            <span class="craft-mat-qty">1×</span>
            <span class="craft-mat-name" style="color:#e879f9">${entry.artifact}</span>
          </div>` : ''}
        </div>
      </div>`;
  }

  container.innerHTML = html;
}

function fmt(v) {
  if (v >= 1_000_000) return (v/1_000_000).toFixed(2)+'M';
  if (v >= 1_000)     return (v/1_000).toFixed(1)+'k';
  return v.toLocaleString('pt-BR');
}
