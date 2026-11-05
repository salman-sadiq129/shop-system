App.mods.pos = {
  cart: [],
  per: x => x.unit === 'کارتۆن' ? CARTON_SIZE : 1,   // کارتۆن بە دانە دەفرۆشرێت
  render() {
    $('#posItems').innerHTML = App.data.inv.filter(i => i.stock > 0).map(i => `<div class="row" onclick="App.mods.pos.add('${i.fid}')"><b>${esc(i.name)}</b><small>${+(+i.stock).toFixed(1)} ${esc(i.unit)}</small><span>${fmt(i.sellPrice)}</span></div>`).join('') || '<p class="empty">مەخزەن بەتاڵە</p>';
    $('#cart').innerHTML = this.cart.map((x, n) => `<div class="row"><b>${esc(x.name)}</b><input type="number" min="1" value="${x.quantity}" onchange="App.mods.pos.qty(${n},this.value)"><span>${fmt(x.sellPrice * x.quantity)}</span><button class="x" onclick="App.mods.pos.cart.splice(${n},1);App.mods.pos.render()">🗑️</button></div>`).join('') || '<p class="empty">سەبەتە بەتاڵە</p>';
    $('#cartTotal').textContent = fmt(sum(this.cart, x => x.sellPrice * x.quantity));
  },
  add(fid) {
    const i = App.data.inv.find(x => x.fid === fid), c = this.cart.find(x => x.fid === fid);
    c ? c.quantity++ : this.cart.push({ fid, name: i.name, unit: i.unit, buyPrice: i.buyPrice, sellPrice: i.sellPrice, quantity: 1 });
    this.render();
  },
  qty(n, v) { this.cart[n].quantity = Math.max(1, parseInt(v) || 1); this.render() },
  async done() {
    const c = this.cart; if (!c.length) return toast('سەبەتە بەتاڵە', 1);
    for (const x of c) { const i = App.data.inv.find(y => y.fid === x.fid); if (!i || x.quantity / this.per(x) > i.stock) return toast('مەخزەن بەس نییە: ' + x.name, 1) }
    const sale = { date: Date.now(), items: c, total: sum(c, x => x.sellPrice * x.quantity), profit: sum(c, x => (x.sellPrice - x.buyPrice / this.per(x)) * x.quantity) };
    try {
      const b = db.batch();   // فرۆشتن + کەمکردنەوەی مەخزەن پێکەوە
      b.set(db.collection('sales').doc(), sale);
      c.forEach(x => b.update(db.collection('inventory').doc(x.fid), { stock: firebase.firestore.FieldValue.increment(-x.quantity / this.per(x)) }));
      await b.commit(); this.cart = []; await App.load(); toast('✓ فرۆشتن تەواو بوو');
    } catch (e) { toast(e.message, 1) }
  }
};
