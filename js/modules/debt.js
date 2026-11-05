App.mods.debt = {
  save() { ls.set('invoices', App.data.debt) },
  next() { $('#dNo').value = Math.max(1000, ...App.data.debt.map(x => parseInt(x.invoiceNumber) || 0)) + 1; $('#dDate').valueAsDate = new Date() },
  render() {
    const D = App.data.debt, q = val('dQ').toLowerCase(), C = {};
    D.forEach(x => { const c = C[x.customerName] ??= { s: 0, p: 0, d: 0 }; c.s += x.saleAmount; c.p += x.paidAmount; c.d += x.debt });
    $('#dNames').innerHTML = Object.keys(C).map(n => `<option value="${esc(n)}">`).join('');
    $('#dCust').innerHTML = rows(Object.entries(C).sort((a, b) => b[1].d - a[1].d), ([n, c]) => `<tr><td><b>${esc(n)}</b></td><td>${fmt(c.s)}</td><td style="color:var(--ok)">${fmt(c.p)}</td><td style="color:var(--bad)"><b>${fmt(c.d)}</b></td></tr>`);
    $('#dBody').innerHTML = rows(D.filter(x => x.customerName.toLowerCase().includes(q)), x => `<tr><td>${esc(x.date)}</td><td>${esc(x.invoiceNumber)}</td><td><b>${esc(x.customerName)}</b></td><td>${fmt(x.saleAmount)}</td><td>${fmt(x.paidAmount)}</td><td style="color:var(--bad)">${fmt(x.debt)}</td><td><button class="x" onclick="App.mods.debt.del(${x.id})">🗑️</button></td></tr>`);
  },
  add() {
    const s = num('dSale'), p = num('dPaid'), n = val('dName').trim();
    if (!n || !s) return toast('ناو و بڕی فرۆتن پێویستە', 1);
    App.data.debt.unshift({ id: Date.now(), invoiceNumber: val('dNo'), date: val('dDate'), customerName: n, saleAmount: s, paidAmount: p, debt: s - p });
    this.save(); clr('dName', 'dSale', 'dPaid'); this.next(); App.render();
  },
  del(id) { if (confirm('دڵنیایت؟')) { App.data.debt = App.data.debt.filter(x => x.id !== id); this.save(); App.render() } }
};
