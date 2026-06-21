/**
 * GallaMaster 2.0 — Catálogo de recursos
 * Reorganizado a partir do CRAFT_DB do HTML 1.
 * Cada entrada gera os IDs de item para todos os tiers/encantamentos.
 */

// Cidades para consulta de preço
const CITIES = ['Caerleon', 'Martlock', 'Lymhurst', 'Bridgewatch', 'Thetford', 'FortSterling', 'Brecilien'];

const CITY_LABELS = {
  Caerleon:     'Caerleon',
  Martlock:     'Martlock',
  Lymhurst:     'Lymhurst',
  Bridgewatch:  'Bridgewatch',
  Thetford:     'Thetford',
  FortSterling: 'Fort Sterling',
  Brecilien:    'Brecilien',
};

// Tiers e encantamentos disponíveis
const TIERS = [4, 5, 6, 7, 8];
const ENCHANTS = [0, 1, 2, 3, 4];

// Recursos base — refinados (matérias-primas dos crafts)
const RESOURCES = [
  { key: 'METALBAR',   name: 'Barra de Metal', color: '#e08080' },
  { key: 'PLANKS',     name: 'Tábua',          color: '#c8a060' },
  { key: 'LEATHER',    name: 'Couro',          color: '#a8d8a8' },
  { key: 'CLOTH',      name: 'Tecido',         color: '#7ec8f0' },
  { key: 'STONEBLOCK', name: 'Bloco de Pedra', color: '#c8c8c8' },
];

const CDN = 'https://render.albiononline.com/v1/item/';

/**
 * Constrói o item_id do Albion no formato esperado pela API.
 * Ex: T6_METALBAR (enc 0) ou T6_METALBAR_LEVEL1@1 (enc 1)
 */
function buildItemId(tier, key, enc) {
  if (enc === 0) return `T${tier}_${key}`;
  return `T${tier}_${key}_LEVEL${enc}@${enc}`;
}

/**
 * Gera a lista completa de item_ids para todos os recursos/tiers/enc.
 */
function buildAllItemIds() {
  const ids = [];
  RESOURCES.forEach(res => {
    TIERS.forEach(tier => {
      ENCHANTS.forEach(enc => {
        ids.push(buildItemId(tier, res.key, enc));
      });
    });
  });
  return ids;
}
