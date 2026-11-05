App.mods.inv = {
  render() {
    const q = val('invQ').toLowerCase(), L = App.data.inv.filter(i => (i.name || '').toLowerCase().includes(q));
    $('#invBody').innerHTML = rows(L, (i, n) => `<tr class="${i.stock <= i.minStock ? 'low' : ''}"><td>${n + 1}</td><td><b>${esc(i.name)}</b></td><td>${esc(i.unit)}</td><td>${fmt(i.buyPrice)}</td><td>${fmt(i.sellPrice)}</td><td>${+(+i.stock).toFixed(1)}</td><td><button onclick="App.mods.inv.edit('${i.fid}')">✏️</button><button class="x" onclick="App.mods.inv.del('${i.fid}')">🗑️</button></td></tr>`);
    $('#lowAlert').hidden = !App.data.inv.some(i => i.stock <= i.minStock);
  },
  async save() {
    const id = val('invId'), d = { name: val('invName').trim() || 'کاڵا', unit: val('invUnit'), buyPrice: num('invBuy'), sellPrice: num('invSell'), stock: num('invStock'), minStock: num('invMin') || 5 };
    try { id ? await db.collection('inventory').doc(id).update(d) : await db.collection('inventory').add(d); this.reset(); await App.load(); toast('✓ پاشەکەوت کرا') } catch (e) { toast(e.message, 1) }
  },
  edit(id) {
    const i = App.data.inv.find(x => x.fid === id);
    Object.entries({ invId: id, invName: i.name, invUnit: i.unit, invBuy: i.buyPrice, invSell: i.sellPrice, invStock: i.stock, invMin: i.minStock }).forEach(([k, v]) => $('#' + k).value = v);
    scrollTo({ top: 0, behavior: 'smooth' });
  },
  reset() { clr('invId', 'invName', 'invBuy', 'invSell', 'invStock'); $('#invMin').value = 5 },
  async del(id) { if (!confirm('دڵنیایت لە سڕینەوە؟')) return; try { await db.collection('inventory').doc(id).delete(); await App.load() } catch (e) { toast(e.message, 1) } }
};
