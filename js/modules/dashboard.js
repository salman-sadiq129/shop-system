App.mods.dash = {
  render() {
    const d = App.data, pos = sum(d.pos, x => x.total), sh = sum(d.shifts, x => x.total), ds = sum(d.debt, x => x.saleAmount), rt = sum(d.ret, x => x.total);
    $('#cards').innerHTML = [['داهاتی دوکان (فرۆشتن + شێفت)', pos + sh], ['قازانجی فرۆشتن', sum(d.pos, x => x.profit)], ['دەینی ماوە', sum(d.debt, x => x.debt), 'bad'], ['بەهای گەڕاوەکان', rt]]
      .map(([l, v, c]) => `<div class="card ${c || ''}"><small>${l}</small><b>${fmt(v)}</b></div>`).join('');
    $('#sysBody').innerHTML = rows([['فرۆشتنی دوکان', pos, d.pos.length], ['فرۆشتنی شێفت', sh, d.shifts.length], ['دەین و قەرز (فرۆتن)', ds, d.debt.length], ['گەڕانەوە', rt, d.ret.length]], r => `<tr><td><b>${r[0]}</b></td><td>${fmt(r[1])}</td><td>${r[2]}</td></tr>`);
    $('#recentBody').innerHTML = rows(d.pos.slice(0, 10), s => `<tr><td>${dt(s.date)}</td><td>${s.items.map(i => esc(i.name) + '×' + i.quantity).join('، ')}</td><td>${fmt(s.total)}</td><td>${fmt(s.profit)}</td></tr>`);
  },
  xlsx() {
    const d = App.data, wb = XLSX.utils.book_new(), add = (n, a) => XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(a), n);
    add('مەخزەن', [['ناو', 'جۆر', 'کڕین', 'فرۆشتن', 'مەخزەن'], ...d.inv.map(i => [i.name, i.unit, i.buyPrice, i.sellPrice, i.stock])]);
    add('فرۆشتن', [['بەروار', 'کاڵاکان', 'کۆ', 'قازانج'], ...d.pos.map(s => [dt(s.date), s.items.map(i => i.name + '×' + i.quantity).join('، '), s.total, s.profit])]);
    add('شێفت', [['شێفت', 'کاڵا', 'نرخ', 'چەندی', 'کۆ', 'کات'], ...d.shifts.map(s => [s.user, s.item, s.price, s.quantity, s.total, s.date])]);
    add('دەین', [['بەروار', 'وەسڵ', 'کڕیار', 'فرۆتن', 'وەرگیراو', 'دەین'], ...d.debt.map(x => [x.date, x.invoiceNumber, x.customerName, x.saleAmount, x.paidAmount, x.debt])]);
    add('گەڕانەوە', [['جۆر', 'تەک', 'نرخ', 'کۆ'], ...d.ret.map(x => [x.name, x.quantity, x.price, x.total])]);
    XLSX.writeFile(wb, `report_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }
};
