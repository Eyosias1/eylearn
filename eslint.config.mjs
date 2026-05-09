import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Raw HTML elements that must be replaced with shadcn/ui equivalents.
// Exempts files inside src/components/ui/ (the shadcn wrappers themselves).
const RAW_ELEMENT_RULES = [
  {
    selector: 'JSXOpeningElement[name.name="button"]',
    message: "Use <Button> from @/components/ui/button instead of raw <button>.",
  },
  {
    selector: 'JSXOpeningElement[name.name="input"]',
    message: "Use <Input> from @/components/ui/input instead of raw <input>.",
  },
  {
    selector: 'JSXOpeningElement[name.name="textarea"]',
    message: "Use <Textarea> from @/components/ui/textarea instead of raw <textarea>.",
  },
  {
    selector: 'JSXOpeningElement[name.name="select"]',
    message: "Use <Select> from @/components/ui/select instead of raw <select>.",
  },
  {
    selector: 'JSXOpeningElement[name.name="label"]',
    message: "Use <Label> from @/components/ui/label instead of raw <label>.",
  },
  {
    selector: 'JSXOpeningElement[name.name="hr"]',
    message: "Use <Separator> from @/components/ui/separator instead of raw <hr>.",
  },
  {
    selector: 'JSXOpeningElement[name.name="img"]',
    message: "Use <Image> from next/image instead of raw <img>.",
  },
  {
    selector: 'JSXOpeningElement[name.name="a"]',
    message: "Use <Link> from next/link instead of raw <a>.",
  },
  {
    selector: 'JSXOpeningElement[name.name="table"]',
    message: "Use <Table> from @/components/ui/table instead of raw <table>.",
  },
  {
    selector: 'JSXOpeningElement[name.name="thead"]',
    message: "Use <TableHeader> from @/components/ui/table instead of raw <thead>.",
  },
  {
    selector: 'JSXOpeningElement[name.name="tbody"]',
    message: "Use <TableBody> from @/components/ui/table instead of raw <tbody>.",
  },
  {
    selector: 'JSXOpeningElement[name.name="tfoot"]',
    message: "Use <TableFooter> from @/components/ui/table instead of raw <tfoot>.",
  },
  {
    selector: 'JSXOpeningElement[name.name="tr"]',
    message: "Use <TableRow> from @/components/ui/table instead of raw <tr>.",
  },
  {
    selector: 'JSXOpeningElement[name.name="th"]',
    message: "Use <TableHead> from @/components/ui/table instead of raw <th>.",
  },
  {
    selector: 'JSXOpeningElement[name.name="td"]',
    message: "Use <TableCell> from @/components/ui/table instead of raw <td>.",
  },
  {
    selector: 'JSXOpeningElement[name.name="caption"]',
    message: "Use <TableCaption> from @/components/ui/table instead of raw <caption>.",
  },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Non-source folders
    "EyLearn-Vault/**",
    "scripts/**",
    "content/**",
    // shadcn primitives are allowed to use raw elements internally
    "src/components/ui/**",
  ]),
  {
    // Apply to all source files outside ui/
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": ["error", ...RAW_ELEMENT_RULES],
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      }],
    },
  },
]);

export default eslintConfig;
