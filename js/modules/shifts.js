App.mods.shift = {
  cur: sessionStorage.getItem('shift') || '',
  pick(s) { this.cur = s; sessionStorage.setItem('shift', s); this.render() },
  render() {
    const S = App.data.shifts, tot = sum(S, x => x.total), by = {};
    $('#shiftBtns').innerHTML = ['بەیانی', 'ئێوارە', 'شەو'].map(s => `<button class="${s === this.cur ? 'on' : ''}" onclick="App.mods.shift.pick('${s}')">${s}</button>`).join('');
    S.forEach(x => { const b = by[x.user || 'نەزانراو'] ??= { n: 0, t: 0 }; b.n++; b.t += +x.total || 0 });
    $('#shiftSum').innerHTML = rows(Object.entries(by), ([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${v.n}</td><td>${fmt(v.t)}</td><td>${tot ? (v.t / tot * 100).toFixed(1) : 0}%</td></tr>`);
    $('#shiftBody').innerHTML = rows(S.slice(0, 100), (s, n) => `<tr><td>${n + 1}</td><td>${esc(s.user)}</td><td>${esc(s.item)}</td><td>${fmt(s.price)}</td><td>${s.quantity}</td><td>${fmt(s.total)}</td><td>${esc(s.date)}</td><td><button class="x" onclick="App.mods.shift.del('${s.fid}')">🗑️</button></td></tr>`);
  },
  async add() {
    if (!this.cur) return toast('سەرەتا شێفت هەڵبژێرە', 1);
    const item = val('shItem').trim(), price = num('shPrice'), q = parseInt(val('shQty')) || 0;
    if (!item || price <= 0 || q <= 0) return toast('زانیاریەکان تەواو بکە', 1);
    const d = new Date(), p = n => String(n).padStart(2, '0');
    try {
      await db.collection('sales').add({ user: this.cur, item, price, quantity: q, total: price * q, date: `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}, ${p(d.getHours())}:${p(d.getMinutes())}`, timestamp: firebase.firestore.FieldValue.serverTimestamp() });
      clr('shItem', 'shPrice'); $('#shQty').value = 1; await App.load();
    } catch (e) { toast(e.message, 1) }
  },
  async del(id) { if (!confirm('دڵنیایت؟')) return; try { await db.collection('sales').doc(id).delete(); await App.load() } catch (e) { toast(e.message, 1) } },
  async clear() {   // تەنها فرۆشتنی شێفت دەسڕێتەوە، نەک فرۆشتنی دوکان
    if (!pin()) return toast('پاسۆرد هەڵەیە', 1);
    try { const b = db.batch(); App.data.shifts.forEach(s => b.delete(db.collection('sales').doc(s.fid))); await b.commit(); await App.load(); toast('✓ سڕایەوە') } catch (e) { toast(e.message, 1) }
  }
};
