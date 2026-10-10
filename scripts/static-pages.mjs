import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
const html = readFileSync("dist/index.html", "utf8");
for (const [slug, title] of [
  ["privacy-policy", "Privacy Policy"],
  ["terms-and-conditions", "Terms & Conditions"],
  ["home-1", "Boutique Stays & Rajasthan Experiences"],
]) {
  mkdirSync(`dist/${slug}`, { recursive: true });
  writeFileSync(
    `dist/${slug}/index.html`,
    html.replace(
      /<title>.*?<\/title>/,
      `<title>${title} | Voitto Ventures</title>`,
    ),
  );
}
