# Project: Clean and Optimize Repository Structure

## Architecture
- Root web application project: `D:\repositorios\analisis_envios`
- Production core components: `index.html`, `styles.css`, `main.js`, `.stitch/home-all-sections.html`, `public/`, `node_modules/`, `package.json`.
- Goal: Audit, remove temporary/cache/log/redundant files without touching core runtime assets, and organize residual non-production files cleanly.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | File Audit | Enumerate all files, identifying obsolete/temp vs core production files | M1 | Survey consensus |
| 2 | Safe Cleanup | Remove redundant, test, log, or temp files safely (.stitch/home*.html intermediate builds) | M2 | Survey consensus |
| 3 | Project Organization | Move loose root prototypes to archive/prototypes/, heroes/ to public/heroes/, rename para_agregar/ to components/, add .gitignore & README.md | M2 | Survey consensus |
| 4 | Verification & Audit | Ensure critical files remain intact and no functionality broke | M3 | Survey consensus |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Directory Audit | Audit all files and categorize candidate deletions | none | DONE |
| 2 | Safe Cleanup & Reorganization | Execute cleanup of approved obsolete files and organize folders | M1 | DONE |
| 3 | Review & Integrity Verification | Verify critical files, check integrity and validate clean state | M2 | DONE |

## Code Layout
- Production Entrypoints (100% INTACT & SHA256 VERIFIED):
  - `index.html`
  - `styles.css`
  - `main.js`
  - `.stitch/home-all-sections.html`
  - `public/card_mapa.webp`
  - `public/logo.webp`
  - `package.json`
  - `node_modules/`
- Target Clean Layout for Support Assets:
  - `archive/prototypes/` (hero_para_adaptar.html, navegador.html, optimized-footer.html)
  - `public/heroes/` (contacto-mensaje.webp, deposito-local.webp, express-moto.webp, flex-notebook.webp, inicio-mapa.webp, lowcost-pallet.webp, redes-celular.webp)
  - `components/` (carrusel-redes.html, cta-section.html, emprendedores-home.html, logistica-home-section.html, mardelivery-home-section.html, segmentos-home.html, services-overview.html, social-proof-section.html)
  - `.gitignore`, `README.md`
