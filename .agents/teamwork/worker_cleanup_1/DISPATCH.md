# Dispatch for Worker (Milestone 2: Safe Cleanup & Project Reorganization)

Read ORIGINAL_REQUEST.md at: D:\repositorios\analisis_envios\.agents\teamwork\ORIGINAL_REQUEST.md
Read the Explorer reports:
- D:\repositorios\analisis_envios\.agents\teamwork\explorer_survey_1\handoff.md
- D:\repositorios\analisis_envios\.agents\teamwork\explorer_survey_2\handoff.md
- D:\repositorios\analisis_envios\.agents\teamwork\explorer_survey_3\handoff.md

Your Working Directory: D:\repositorios\analisis_envios\.agents\teamwork\worker_cleanup_1

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Scope & Assigned Tasks:
1. PROTECTED ASSETS — STRICTLY PRESERVE:
   - index.html
   - styles.css
   - main.js
   - .stitch/home-all-sections.html
   - public/ (all original files: card_mapa.webp, logo.webp, persona_icono.webp, iconos/*)
   - package.json, package-lock.json, node_modules/
   - DESIGN.md
   - skills-lock.json, .agents/

2. CLEANUP OBSOLETE INTERMEDIATE BUILDS:
   - Delete the 3 superseded build snapshots in .stitch/:
     * .stitch/home.html
     * .stitch/home-con-carrusel.html
     * .stitch/home-completo.html
   (Verify .stitch/home-all-sections.html is preserved!)

3. REORGANIZE PROTOTYPES & RESIDUAL FILES:
   - Create archive/prototypes/ and move loose root prototypes:
     * hero_para_adaptar.html -> archive/prototypes/hero_para_adaptar.html
     * navegador.html -> archive/prototypes/navegador.html
     * optimized-footer.html -> archive/prototypes/optimized-footer.html
   - Relocate root heroes/ into public/heroes/ (centralize all static images in public/):
     * Move heroes/* -> public/heroes/* and remove empty heroes/ from root.
   - Rename para_agregar/ to components/ (standard web semantic components folder):
     * Ensure all 8 component HTML files (including cta-section.html) are safely retained in components/.

4. PROJECT STANDARDIZATION:
   - Create a standard .gitignore in root (ignoring node_modules/, OS files Thumbs.db, .DS_Store, *.tmp, *.log).
   - Create a clean, professional README.md in root documenting the project architecture, file structure, and assets.

5. VERIFICATION:
   - Run verification commands using run_command to verify:
     a) All protected files exist and have intact byte sizes/content.
     b) Production asset paths in index.html still resolve to valid files on disk.
     c) Root directory is clean and organized according to web standards.
     d) Node dependencies remain intact (npm ls / node check).
   - Document all verification commands, outputs, and status in handoff.md.

Deliverable:
Write a comprehensive handoff report to D:\repositorios\analisis_envios\.agents\teamwork\worker_cleanup_1\handoff.md.

## 2026-11-05T10:24:01Z
You are a Worker agent (teamwork_worker) assigned to execute repository cleanup and professional reorganization for D:\repositorios\analisis_envios.
Your working directory is: D:\repositorios\analisis_envios\.agents\teamwork\worker_cleanup_1
Read the original user request at: D:\repositorios\analisis_envios\.agents\teamwork\ORIGINAL_REQUEST.md
Read your detailed task dispatch at: D:\repositorios\analisis_envios\.agents\teamwork\worker_cleanup_1\DISPATCH.md
Read the survey handoff reports:
- D:\repositorios\analisis_envios\.agents\teamwork\explorer_survey_1\handoff.md
- D:\repositorios\analisis_envios\.agents\teamwork\explorer_survey_2\handoff.md
- D:\repositorios\analisis_envios\.agents\teamwork\explorer_survey_3\handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Objective:
1. Preserve all protected production files:
   - index.html, styles.css, main.js, .stitch/home-all-sections.html, public/ (all files), package.json, package-lock.json, node_modules/, DESIGN.md, skills-lock.json.
2. Clean up obsolete intermediate build files in .stitch/:
   - Remove .stitch/home.html, .stitch/home-con-carrusel.html, and .stitch/home-completo.html.
3. Reorganize residual support files:
   - Create archive/prototypes/ and move hero_para_adaptar.html, navegador.html, optimized-footer.html there.
   - Relocate the loose heroes/ folder into public/heroes/ (unifying static assets under public/).
   - Rename para_agregar/ to components/ (preserving all 8 HTML modular component templates, including cta-section.html).
4. Project standardization:
   - Create a clean .gitignore at project root (ignoring node_modules/, OS files Thumbs.db, .DS_Store, *.tmp, *.log).
   - Create a clean, professional README.md at project root documenting repository architecture, production files, component library, and asset paths.
5. Verification:
   - Run verification commands via run_command to verify all critical files are intact, relative paths in index.html work, and root directory structure is clean.
   - Document commands, outputs, and results in your report.

Output:
Write your handoff report to D:\repositorios\analisis_envios\.agents\teamwork\worker_cleanup_1\handoff.md.
When completed, notify the orchestrator with send_message.
