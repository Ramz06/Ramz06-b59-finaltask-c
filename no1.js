function totalInvestasi() {
    const modalAwal = 1000 * 1000 * 1000
    const depositoBank = 350 * 1000 * 1000
    const keuntunganDepositoBank = depositoBank * 0.035 * 2;
    const obligasiNegara = (650 * 1000 * 1000) * 0.30;
    const keuntunganObligasiNegara = obligasiNegara * 0.13 * 2;
    const sahamA = (650 * 1000 * 1000) * 0.35;
    const keuntunganSahamA = sahamA * 0.145 * 2;
    const sahamB = (650 * 1000 * 1000) - obligasiNegara - sahamA;
    const keuntunganSahamB = sahamB * 0.125 * 2;

    const totalUang = modalAwal + keuntunganDepositoBank + keuntunganObligasiNegara + keuntunganSahamA + keuntunganSahamB;

    console.log(`Modal Awal: ${formatIDR(modalAwal)}`)
    console.log(`Deposito Bank: ${formatIDR(depositoBank)}`)
    console.log(`Keuntungan Deposito Bank: ${formatIDR(keuntunganDepositoBank)}`)
    console.log(`Obligasi Negara: ${formatIDR(obligasiNegara)}`)
    console.log(`Keuntungan Obligasi Negara: ${formatIDR(keuntunganObligasiNegara)}`)
    console.log(`Saham A: ${formatIDR(sahamA)}`)
    console.log(`Keuntungan Saham A: ${formatIDR(keuntunganSahamA)}`)
    console.log(`Saham B: ${formatIDR(sahamB)}`)
    console.log(`Keuntungan Saham B: ${formatIDR(keuntunganSahamB)}`)
    return "Total uang setelah 2 tahun investasi: " + formatIDR(totalUang);
}

function formatIDR(numb) {
    return numb.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
}

console.log(totalInvestasi())