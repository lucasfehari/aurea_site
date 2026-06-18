const url = "https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-residencial-alphaville-iii/667161";

async function run() {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    }
  });
  console.log("Status:", res.status);
  const text = await res.text();
  console.log("HTML length:", text.length);
  // Extract title
  const titleMatch = text.match(/<title>(.*?)<\/title>/);
  console.log("Title:", titleMatch ? titleMatch[1] : "Not found");
}
run();
