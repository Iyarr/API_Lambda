import * as esbuild from "esbuild";
import * as fs from "fs";

const entryPoints = () => {
  const files = fs.readdirSync("./src");
  return files.map((file) => `./src/${file}`);
};

await esbuild.build({
  bundle: true,
  entryPoints: entryPoints(),
  outdir: "dist",
  platform: "node",
  format: "esm",
});
