import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { loadFiles } from "@graphql-tools/load-files";
import { DIRECTIVES } from "./schemas/directives";
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const requireMethod = (path: string) => import(pathToFileURL(path).toString());

export const typeDefs = [
  DIRECTIVES,
  mergeTypeDefs(
    await loadFiles(join(__dirname, "schemas/*.schema.ts"), {
      exportNames: ["typeDefs"]
    })
  )
];

export const resolvers = mergeResolvers(
  await loadFiles(join(__dirname, "schemas/*.schema.ts"), {
    requireMethod,
    exportNames: ["resolvers"],
    extractExports: exports => exports.resolvers
  })
);
