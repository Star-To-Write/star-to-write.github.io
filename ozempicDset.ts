// scripts/trimLocationData.ts
import fs from "fs";
import data from "./data.ts";

console.log(data);
const trimmed = data.map((country) => ({
    name: country.name,
    code: country.iso2,
    emoji: country.emoji,

    states: (country.states || []).map((state) => ({
        name: state.name,
        code: state.state_code,
    })),
}));

fs.writeFileSync("./data.slim.json", JSON.stringify(trimmed, null, 2));

console.log("✅ Slim data generated");
