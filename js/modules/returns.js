App.mods.ret = {
  save() { ls.set('returns', App.data.ret) },
  render() {
    $('#retBody').innerHTML = rows(App.data.ret, (x, n) => `<tr><td>${n + 1}</td><td><b>${esc(x.name)}</b></td><td>${x.quantity}</td><td>${fmt(x.price)}</td><td>${fmt(x.total)}</td><td><button class="x" onclick="App.mods.ret.del(${x.id})">🗑️</button></td></tr>`);
  },
  add() {
    const name = val('rName').trim(), q = parseInt(val('rQty')), p = num('rPrice');
    if (!name || !(q > 0) || p < 0) return toast('زانیاریەکان بە دروستی پڕبکەرەوە', 1);
    App.data.ret.push({ id: Date.now(), name, quantity: q, price: p, total: q * p });
    this.save(); clr('rName', 'rQty', 'rPrice'); App.render();
  },
  del(id) { App.data.ret = App.data.ret.filter(x => x.id !== id); this.save(); App.render() },
  clear() { if (confirm('هەموو گەڕانەوەکان بسڕدرێنەوە؟')) { App.data.ret = []; this.save(); App.render() } }
};
