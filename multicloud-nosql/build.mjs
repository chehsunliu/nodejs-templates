import esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./src/main.ts"],
  bundle: true,
  platform: "node",
  sourcemap: true,
  outfile: "./dist/main.js",
});
