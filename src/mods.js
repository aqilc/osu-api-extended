const axios = require("axios");
const path = require("path");
const fs = require("fs");

let codes = {
  1: 'NF',
  2: 'EZ',
  4: 'TD',
  8: 'HD',
  16: 'HR',
  32: 'SD',
  64: 'DT',
  128: 'RX',
  256: 'HT',
  576: 'NC',
  1024: 'FL',
  2048: 'AT',
  4096: 'SO',
  8192: 'AP',
  16416: 'PF',
  32768: '4K',
  65536: '5K',
  131072: '6K',
  262144: '7K',
  524288: '8K',
  1048576: 'Fl',
  2097152: 'RD',
  4194304: 'LM',
  8388608: 'Target',
  16777216: '9K',
  33554432: 'KeyCoop',
  67108864: '1K',
  134217728: '3K',
  268435456: '2K',
  536870912: 'ScoreV2',
  1073741824: 'LastMod'
}

function mods(m) {
  const enabled = [];
  let values = Object.keys(codes).map(a => Number(a));
  for (let i = values.length - 1; i >= 0; i--) {
    if (m >= values[i]) {
      m -= values[i];
      enabled.push(codes[values[i]]);
    };
  };
  let modsText = "";
  enabled.forEach((mod) => modsText += mod);
  let Mods = JSON.parse(fs.readFileSync(path.join(__dirname, 'mods.json'), "utf-8"));
  let convert = Mods.find(m => m.bad == modsText);
  if (convert) return convert.good;
  else {
    (enabled.length > 1) ? notFound(m, modsText) : '';
    return (m == 0) ? 'NoMod' : modsText;
  };
};

async function notFound(id, txt) {
  try {
    await axios.get(`https://new-mods-osu.glitch.me/add?id=${id}&txt=${txt}`);
  } catch (err) { console.log("m/enw", err); };
};

module.exports = mods;