$('#tabs').innerHTML = [['dash', '📊 ڕاپۆرت'], ['inv', '📦 مەخزەن'], ['pos', '🛒 فرۆشتن'], ['shift', '⏱️ شێفت'], ['debt', '💰 دەین'], ['ret', '↩️ گەڕانەوە']]
  .map(([k, l]) => `<button data-t="${k}">${l}</button>`).join('');
$('#tabs').onclick = e => e.target.dataset.t && App.tab(e.target.dataset.t);
App.mods.debt.next();
App.render();
App.tab($('#' + location.hash.slice(1)) ? location.hash.slice(1) : 'dash');
App.load();
