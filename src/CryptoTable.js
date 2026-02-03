import React, { useEffect, useState } from "react";


export default function CryptoTable() {
const [coins, setCoins] = useState([]);


useEffect(() => {
fetch(
"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1"
)
.then(res => res.json())
.then(setCoins);
}, []);


return (
<table>
<thead>
<tr><th>Name</th><th>Price</th><th>Market Cap</th></tr>
</thead>
<tbody>
{coins.map(c => (
<tr key={c.id}>
<td>{c.name}</td>
<td>${c.current_price}</td>
<td>${c.market_cap}</td>
</tr>
))}
</tbody>
</table>
);
}