# Handoff Report: Web Project Layout & Reorganization Strategy

**Agent**: `explorer_survey_3` (teamwork_explorer)  
**Date**: 2026-11-05T10:24:00Z  
**Target Repository**: `D:\repositorios\analisis_envios`  
**Milestone**: `survey_web_project_structure`  
**Status**: COMPLETE (Read-Only Investigation)

---

## 1. Observation

### 1.1 Complete Project Inventory
Direct filesystem inspection of `D:\repositorios\analisis_envios` revealed the following directory layout and file catalog:

| File / Directory | Size / Length | Type / Classification | Purpose / Role |
| :--- | :--- | :--- | :--- |
| `index.html` | 32,377 bytes | **Core Production** | Canonical public entry point (Header + Hero + Footer) |
| `styles.css` | 36,583 bytes | **Core Production** | Unified production stylesheet referenced by `index.html` |
| `main.js` | 6,867 bytes | **Core Production** | Runtime JavaScript (rAF header scroll, WAI-ARIA, GSAP hero) |
| `public/` | Directory | **Core Production Assets** | Static web assets (`card_mapa.webp`, `logo.webp`, `persona_icono.webp`, `iconos/`) |
| `package.json` | 56 bytes | **Core Configuration** | Dependency manifest (`"puppeteer": "^25.16.0"`) |
| `package-lock.json` | 12,665 bytes | **Core Configuration** | Dependency lockfile for Puppeteer |
| `.stitch/home-all-sections.html` | 467,260 bytes | **Core Production (Protected)** | Stitch monolithic standalone build with embedded styles/SVGs |
| `.stitch/` (other 3 files) | 285–356 KB | **Tool Artifacts** | Intermediate Stitch iterations (`home.html`, `home-con-carrusel.html`, `home-completo.html`) |
| `DESIGN.md` | 14,475 bytes | **Documentation / Spec** | Stitch UI/UX design tokens and system specification |
| `skills-lock.json` | 26,108 bytes | **Tool Configuration** | Lockfile for agent skills (antigravity-skills-manager) |
| `.claude/`, `.cortex/`, `.qwen/` | Directories | **Tool Environment** | Hidden agent skill link junctions |
| `.agents/` | Directory | **Tool Environment** | Teamwork coordination metadata (`.agents/teamwork/...`) |
| `node_modules/` | Directory | **Runtime Dependencies** | Installed npm dependencies (Puppeteer tree) |
| `hero_para_adaptar.html` | 27,423 bytes | **Residual Prototype** | Standalone hero section draft with inline CSS (1,112 lines) |
| `navegador.html` | 26,037 bytes | **Residual Prototype** | Standalone navigation bar draft with inline CSS (797 lines) |
| `optimized-footer.html` | 31,857 bytes | **Residual Prototype** | Standalone footer draft with inline CSS (887 lines) |
| `heroes/` | Directory (7 files) | **Residual / Static Media** | 7 `.webp` card graphics (deposito, express, flex, inicio-mapa, etc.) |
| `para_agregar/` | Directory (8 files) | **Residual / Modular Sections** | 8 HTML sectional components (carrusel, cta, logistica, etc.) |

---

### 1.2 Exact Code References & Evidence

#### A. Production Asset Linkages in `index.html`
- **Line 20**: `<link rel="preload" as="image" href="./public/card_mapa.webp" type="image/webp" fetchpriority="high" />`
- **Line 23**: `<link rel="stylesheet" href="styles.css" />`
- **Line 38**: `<img src="./public/logo.webp" alt="Envíos DosRuedas" class="brand-logo-img" width="44" height="44" decoding="async" />`
- **Line 386**: `<img class="map-art" src="./public/card_mapa.webp" alt="Mapa de Cobertura..." />`
- **Line 446**: `<img src="./public/logo.webp" alt="Envíos DosRuedas" class="brand-logo-img" width="46" height="46" decoding="async" />`
- **Line 629**: `<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js" defer></script>`
- **Line 630**: `<script src="main.js" defer></script>`

#### B. Asset Linkages in `styles.css` and `main.js`
- `Select-String -Path styles.css -Pattern 'url\([^)]+\)'`: **0 occurrences**. Stylesheet is 100% self-contained with no external image dependencies.
- `main.js`: 224 lines of vanilla JS. Manipulates DOM classes, ARIA attributes, and GSAP timeline. **0 file/asset network requests**.

#### C. Linkages to `heroes/` and `para_agregar/`
- Full project scan for `heroes[/\\]`:
  - `hero_para_adaptar.html:1006`: `<img class="map-art" src="../heroes/inicio-mapa.webp"`
  - **Zero references** in `index.html`, `styles.css`, `main.js`, or `.stitch/home-all-sections.html`.
- Full project scan for `para_agregar`:
  - **Zero references** in any code or stylesheet.
  - The 8 files in `para_agregar/` contain HTML section tags (`#carrusel-redes`, `#logistica-dosruedas-home`, `#segmentos-home`, `#services-overview`) that were integrated into `.stitch/home-all-sections.html`, but are not referenced as external imports.

#### D. Repository Configuration
- `git status`: Project is not yet a git repository.
- File `.gitignore`: **Does not exist**.
- File `README.md`: **Does not exist**.

---

## 2. Logic Chain

1. **Step 1 — Production Runtime Isolation (Ref: Observation 1.2.A, 1.2.B)**:
   The live application runtime is strictly confined to `index.html`, `styles.css`, `main.js`, and the `./public/` asset directory. Neither the loose root HTML files (`hero_para_adaptar.html`, `navegador.html`, `optimized-footer.html`) nor `heroes/` nor `para_agregar/` are requested by the browser during production execution.
2. **Step 2 — Root Directory Pollution & Hosting Vulnerability (Ref: Observation 1.1)**:
   In modern static web deployment (e.g. Cloudflare Pages, Vercel, Netlify, Apache/Nginx static hosting), any `.html` file placed in the repository root is automatically exposed as an addressable route (`/hero_para_adaptar`, `/navegador`, `/optimized-footer`). This exposes development scratchpads to the public internet, causing duplicate title/meta tags, unstyled layouts, and broken navigation.
3. **Step 3 — Fragmentation of Static Media Assets (Ref: Observation 1.1, 1.2.C)**:
   Modern web conventions require all public static assets to live under `public/` (or `assets/`). The presence of `heroes/` at root splits asset management across two directories (`public/` and `heroes/`). Since `heroes/` is not referenced by production code, moving it to `public/heroes/` unifies static assets and preserves them for future sub-page development.
4. **Step 4 — Component Semantic Naming (Ref: Observation 1.1, 1.2.C)**:
   The folder `para_agregar` ("to add") is an informal temporary staging name. In a standard web repository, modular HTML templates or partials belong in `components/` (or `archive/components/` if purely historical). Renaming or categorizing this folder immediately elevates project professionalism without breaking any runtime dependency.
5. **Step 5 — Tooling & Specification Boundary (Ref: Observation 1.1)**:
   `DESIGN.md` is the Stitch design system specification. Keeping `DESIGN.md` in root is standard practice for projects using Stitch MCP and AI tooling. `skills-lock.json`, `.claude`, `.cortex`, and `.qwen` are machine-managed and must remain at root.
6. **Step 6 — Core Protected Preservation (Ref: Observation 1.1, User Request Clause 2)**:
   The user explicitly demanded: *"Mantener intactos los archivos de producción críticos: index.html, styles.css, main.js, .stitch/home-all-sections.html, public/, componentes vigentes y dependencias de node_modules/package.json."* Any structural reorganization must guarantee 100% path invariance for these paths.

---

## 3. Caveats

- **No runtime caveats**: All proposed movements affect only non-production, unreferenced files. Production functionality remains 100% intact.
- **Stitch Tooling Reliance**: `.stitch/home-all-sections.html` must remain at `.stitch/home-all-sections.html`. The 3 intermediate files (`home.html`, `home-con-carrusel.html`, `home-completo.html`) could optionally be archived, but leaving them inside `.stitch/` entails zero root clutter since `.stitch` is a hidden directory.
- **Git State**: Since git is not yet initialized, moving files will be direct filesystem operations; a standard `.gitignore` must be created so subsequent git commits do not accidentally track `node_modules/` or agent scratchpads.

---

## 4. Conclusion & Reorganization Strategy

### 4.1 Recommended Target Structure (Option 1: Modern Web Best Practice)

This structure adheres to modern static/Jamstack standards while keeping the root clean, professional, and compliant with all protected path requirements:

```text
D:\repositorios\analisis_envios\
├── .agents/                 # Teamwork & agent metadata (tool-managed)
├── .claude/                 # Agent skill junctions (tool-managed)
├── .cortex/                 # Agent skill junctions (tool-managed)
├── .qwen/                   # Agent skill junctions (tool-managed)
├── .stitch/                 # Stitch designs & home-all-sections.html (PROTECTED)
│   ├── home-all-sections.html
│   ├── home-completo.html
│   ├── home-con-carrusel.html
│   └── home.html
├── archive/                 # (or docs/prototypes/) Historical scratchpads & prototypes
│   └── prototypes/
│       ├── hero_para_adaptar.html   # Moved from root (superseded by index.html)
│       ├── navegador.html           # Moved from root (superseded by index.html)
│       └── optimized-footer.html    # Moved from root (superseded by index.html)
├── components/              # Modular section HTML templates (renamed from para_agregar/)
│   ├── carrusel-redes.html
│   ├── cta-section.html
│   ├── emprendedores-home.html
│   ├── logistica-home-section.html
│   ├── mardelivery-home-section.html
│   ├── segmentos-home.html
│   ├── services-overview.html
│   └── social-proof-section.html
├── node_modules/            # Node dependencies (PROTECTED)
├── public/                  # Static assets root (PROTECTED)
│   ├── card_mapa.webp
│   ├── logo.webp
│   ├── persona_icono.webp
│   ├── heroes/              # Consolidated from loose root /heroes/
│   │   ├── contacto-mensaje.webp
│   │   ├── deposito-local.webp
│   │   ├── express-moto.webp
│   │   ├── flex-notebook.webp
│   │   ├── inicio-mapa.webp
│   │   ├── lowcost-pallet.webp
│   │   └── redes-celular.webp
│   └── iconos/
│       ├── facebook.svg
│       ├── instagram.svg
│       └── whatapps.svg
├── .gitignore               # Standard ignore file (Node, OS, logs) [NEW RECOMMENDATION]
├── DESIGN.md                # System design tokens & design specification
├── README.md                # Project documentation & run guide [NEW RECOMMENDATION]
├── index.html               # Production core HTML entry point (PROTECTED)
├── main.js                  # Production core JS entry point (PROTECTED)
├── styles.css               # Production core CSS entry point (PROTECTED)
├── package.json             # Manifest (PROTECTED)
├── package-lock.json        # Lockfile
└── skills-lock.json         # Skills lockfile
```

---

### 4.2 Alternative Structure (Option 2: Ultra-Conservative Archive)
If the user prefers zero renaming of existing subdirectories (`para_agregar/` and `heroes/`), the minimal clean reorganization consists of:
1. Creating `archive/` at root.
2. Moving only the 3 obsolete root scratchpads:
   - `hero_para_adaptar.html` → `archive/hero_para_adaptar.html`
   - `navegador.html` → `archive/navegador.html`
   - `optimized-footer.html` → `archive/optimized-footer.html`
3. Leaving `para_agregar/` and `heroes/` untouched in root.

*Recommendation*: **Option 1** is strongly recommended as it resolves both root clutter and asset fragmentation.

---

### 4.3 Risk Analysis Matrix

| Proposed Action | Affected Files | Risk Level | Likelihood of Disruption | Mitigation / Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Move root HTML drafts to `archive/prototypes/`** | `hero_para_adaptar.html`<br>`navegador.html`<br>`optimized-footer.html` | **None** | 0% | Files are unreferenced standalone drafts. Eliminates accidental public routing on web hosts. |
| **Move `heroes/` to `public/heroes/`** | 7 `.webp` images in `heroes/` | **None** | 0% | `index.html` only references `public/card_mapa.webp` and `public/logo.webp`. Centralizes assets under `public/`. |
| **Rename `para_agregar/` to `components/`** | 8 `.html` modular section files | **Very Low** | 0% | No JS or CSS build process imports `para_agregar/`. Aligns project with standard web naming conventions. |
| **Preserve `DESIGN.md` in root** | `DESIGN.md` | **None** | 0% | Standard root position for Stitch MCP design system synthesis. |
| **Preserve `.stitch/` in root** | `.stitch/home-all-sections.html` + 3 history files | **None** | 0% | Fulfills explicit user mandate. Hidden directory keeps root visually clean. |
| **Preserve `index.html`, `styles.css`, `main.js`, `public/`, `package.json`** | All critical production files | **None** | 0% | Unchanged. Absolute zero disruption to website operation. |
| **Add `.gitignore` and `README.md`** | `.gitignore`, `README.md` | **None** | 0% | Prevents accidental commits of `node_modules` or `.agents` and documents project structure. |

---

## 5. Verification Method

To verify the proposed reorganization independently:

1. **Production Path Invariance Check**:
   Confirm that all links and assets in `index.html` continue to resolve:
   ```powershell
   Get-Content "D:\repositorios\analisis_envios\index.html" | Select-String -Pattern '(\./public/[^"'"']+|styles\.css|main\.js)'
   ```
2. **Residual File Isolation Check**:
   Verify that no files remain in the root directory other than the approved minimal set:
   ```powershell
   Get-ChildItem -Path "D:\repositorios\analisis_envios" -File | Select-Object Name
   # Expected output: .gitignore, DESIGN.md, index.html, main.js, package-lock.json, package.json, README.md, skills-lock.json, styles.css
   ```
3. **Asset Resolution Verification**:
   Verify that all static assets under `public/` are accessible and valid webp/svg images:
   ```powershell
   Get-ChildItem -Path "D:\repositorios\analisis_envios\public" -Recurse -File | Select-Object FullName, Length
   ```
4. **Invalidation Condition**:
   Any change that modifies the path or contents of `index.html`, `styles.css`, `main.js`, or `.stitch/home-all-sections.html` is an immediate violation of project constraints.
