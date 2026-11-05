// یارمەتیدەرەکان + داتای هاوبەش + پەیوەندی Firebase
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const fmt = n => (+n || 0).toLocaleString('en-US') + ' د.ع';
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const val = id => $('#' + id).value, num = id => parseFloat(val(id)) || 0;
const clr = (...ids) => ids.forEach(i => $('#' + i).value = '');
const ls = { get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }, set: (k, v) => localStorage.setItem(k, JSON.stringify(v)) };
const dt = v => { const d = v?.toDate ? v.toDate() : new Date(v); return isNaN(d) ? '-' : d.toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' }) };
const rows = (L, f) => L.length ? L.map(f).join('') : '<tr><td colspan="9" class="empty">هیچ داتایەک نییە</td></tr>';
const sum = (a, f) => a.reduce((s, x) => s + (+f(x) || 0), 0);
const pin = () => prompt('پاسۆرد بنووسە') === ADMIN_PIN;
function toast(m, bad) { const t = $('#toast'); t.textContent = m; t.className = 'show' + (bad ? ' bad' : ''); clearTimeout(t._h); t._h = setTimeout(() => t.className = '', 3000) }

firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.firestore();

// inv/pos/shifts → Firebase ؛ debt/ret → localStorage
const App = { mods: {}, data: { inv: [], pos: [], shifts: [], debt: ls.get('invoices', []), ret: ls.get('returns', []) } };
App.render = () => Object.values(App.mods).forEach(m => m.render());
App.tab = k => {
  $$('main>section').forEach(s => s.hidden = s.id !== k);
  $$('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.t === k));
  location.hash = k;
};
App.load = async () => {
  $('#conn').textContent = '🔄 بارکردن…';
  try {
    const [i, s] = await Promise.all([db.collection('inventory').get(), db.collection('sales').get()]);
    const all = s.docs.map(d => ({ fid: d.id, ...d.data() }));
    const ms = x => x.timestamp?.toMillis?.() ?? (+new Date(x.date) || 0);
    App.data.inv = i.docs.map(d => ({ fid: d.id, ...d.data() }));
    // هەردوو سیستەم collectionـی "sales" بەکاردەهێنن: فرۆشتنی دوکان items[] هەیە، شێفت item
    App.data.pos = all.filter(x => Array.isArray(x.items)).sort((a, b) => ms(b) - ms(a));
    App.data.shifts = all.filter(x => !Array.isArray(x.items) && x.item).sort((a, b) => ms(b) - ms(a));
    $('#conn').textContent = '✅ Firebase';
    App.render();
  } catch (e) { $('#conn').textContent = '❌ Firebase'; toast(e.message, 1) }
};
