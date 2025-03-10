---
description: Comprehensive tree diagram of the Riff project structure
---
# Project Structure Tree Diagram

This file contains a comprehensive tree diagram of the Riff project structure, generated automatically by the update_structure.sh script.

<project_structure>

```
.
├── .cursor
│   ├── mcp.json
│   └── rules
│       ├── .DS_Store
│       ├── nextjs-best-practices.mdc
│       ├── react-best-practices.mdc
│       ├── supabase-best-practices.mdc
│       ├── tailwindcss-best-practices.mdc
│       └── typescript-best-practices.mdc
├── .github
│   ├── dependabot.yml
│   └── workflows
│       ├── cd.yml
│       ├── ci.yml
│       └── tests.yml
├── .gitignore
├── .husky
│   └── pre-commit
├── .nvmrc
├── .prettierignore
├── .prettierrc
├── .scripts
│   └── update-structure.sh
├── DEVELOPMENT.md
├── README.md
├── app
│   ├── canvas
│   │   ├── [sessionId]
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── components
│   │   ├── CustomMainMenu.tsx
│   │   ├── CustomSidebar.tsx
│   │   ├── ExcalidrawCanvas.tsx
│   │   ├── ExcalidrawLibraryManager.tsx
│   │   ├── ExcalidrawWrapper.tsx
│   │   ├── debugging-helper.tsx
│   │   └── excalidraw
│   │       └── StyledComponents.tsx
│   ├── debug
│   │   └── page.tsx
│   ├── excalidraw-demo
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── styles
│       ├── excalidraw-theme.ts
│       └── global.css
├── docs
│   ├── app-flow-document.md
│   ├── backend-structure.md
│   ├── excalidraw-example-nextjs
│   ├── frontend-guidelines.md
│   ├── implementation-plan.md
│   ├── project-milestones.md
│   ├── project-requirements-document.md
│   ├── project-structure.md
│   ├── screenshots
│   │   └── screenshot-2025-03-08T15-49-40-935Z.png
│   ├── supabase-setup.md
│   ├── tech-stack-api-document.md
│   ├── testing-guide.md
│   ├── testing-improvements.md
│   ├── testing-mocks.md
│   └── testing-strategy.md
├── e2e
│   ├── pages
│   │   ├── auth.page.ts
│   │   └── home.page.ts
│   └── tests
│       └── auth.spec.ts
├── eslint.config.excalidraw.mjs
├── eslint.config.mjs
├── jest.config.ts
├── jest.env.setup.js
├── jest.setup.ts
├── lib
│   └── supabase.ts
├── next.config.js
├── package-lock.json
├── package.json
├── playwright.config.ts
├── postcss.config.mjs
├── public
│   ├── excalidraw
│   │   ├── Assistant-Bold.woff2
│   │   ├── Assistant-Medium.woff2
│   │   ├── Assistant-Regular.woff2
│   │   ├── Assistant-SemiBold.woff2
│   │   ├── Cascadia.woff2
│   │   ├── Virgil.woff2
│   │   ├── locales
│   │   │   ├── ar-SA-json-db7c644ccbeb85d54a47.js
│   │   │   ├── az-AZ-json-08a6de50238dbb21926c.js
│   │   │   ├── bg-BG-json-42fb0378311f3ade2627.js
│   │   │   ├── bn-BD-json-9ad9e5ae95c4c66297b1.js
│   │   │   ├── ca-ES-json-a6b2c18f7e85cfd11599.js
│   │   │   ├── cs-CZ-json-ea03835d73f9b921f7c4.js
│   │   │   ├── da-DK-json-a94944ac6fa9756d2fac.js
│   │   │   ├── de-DE-json-d82053ab52357510811b.js
│   │   │   ├── el-GR-json-4cbc2dbda5a5df636ee1.js
│   │   │   ├── es-ES-json-7afb66536ee40d852fa2.js
│   │   │   ├── eu-ES-json-671a4afcfce7b0a7660b.js
│   │   │   ├── fa-IR-json-76b039039b043cc4280c.js
│   │   │   ├── fi-FI-json-64c8902f10425e1b2e81.js
│   │   │   ├── fr-FR-json-d16a471290ba26a6c66a.js
│   │   │   ├── gl-ES-json-d11c7966c3c2f95756e0.js
│   │   │   ├── he-IL-json-a7bc2a673875b2e655e1.js
│   │   │   ├── hi-IN-json-4947c9dace32cc3c6eef.js
│   │   │   ├── hu-HU-json-0419027d32efac73d518.js
│   │   │   ├── id-ID-json-6542dd92ab54a2c1c48e.js
│   │   │   ├── it-IT-json-ab410570df07304cb0ca.js
│   │   │   ├── ja-JP-json-2cb067da0fb518e73564.js
│   │   │   ├── kaa-json-4d0a4868835d0334a549.js
│   │   │   ├── kab-KAB-json-0d400ba2836cc0752cd6.js
│   │   │   ├── kk-KZ-json-2224f237cc93465f126f.js
│   │   │   ├── km-KH-json-cbe8e2e8d26d30a3175c.js
│   │   │   ├── ko-KR-json-c2387972637d47f15765.js
│   │   │   ├── ku-TR-json-bafa8865ed7002bb249e.js
│   │   │   ├── lt-LT-json-9b7e91a51b90ee551cad.js
│   │   │   ├── lv-LV-json-f7f9363e42ee2e3a7c67.js
│   │   │   ├── mr-IN-json-ad1359c30c334d05eee0.js
│   │   │   ├── my-MM-json-3ba296b6fcf2a2197a7c.js
│   │   │   ├── nb-NO-json-798d785698d467e76fcf.js
│   │   │   ├── nl-NL-json-2cf913fe2f491c5d7075.js
│   │   │   ├── nn-NO-json-aa607835ad9408789c5f.js
│   │   │   ├── oc-FR-json-644a5eaa1311f70cb697.js
│   │   │   ├── pa-IN-json-165c5c2760688033b2cc.js
│   │   │   ├── pl-PL-json-35c1f168f53af24b657a.js
│   │   │   ├── pt-BR-json-370215dc506c58ee3217.js
│   │   │   ├── pt-PT-json-6f3d80656622a222b4e2.js
│   │   │   ├── ro-RO-json-3c32b962880e225d3416.js
│   │   │   ├── ru-RU-json-e1f4ed9d2d074f778304.js
│   │   │   ├── si-LK-json-4921d4298abfa256fe6f.js
│   │   │   ├── sk-SK-json-27b59d7e026675f929c4.js
│   │   │   ├── sl-SI-json-efb839ef0456f5c72e6e.js
│   │   │   ├── sv-SE-json-cfab3adbd37dd273c61e.js
│   │   │   ├── ta-IN-json-2fa1854af68381c61913.js
│   │   │   ├── th-TH-json-9a390d3cc7a7a6226b63.js
│   │   │   ├── tr-TR-json-fc9b16e9dc2be2660439.js
│   │   │   ├── uk-UA-json-82753e98dced302ac187.js
│   │   │   ├── vi-VN-json-9c1c2a9fa9d6b5a58223.js
│   │   │   ├── zh-CN-json-069c304b5011429be615.js
│   │   │   ├── zh-HK-json-d9bf1e4e2d1f8650c680.js
│   │   │   └── zh-TW-json-5a3fa7cacfa83c411d89.js
│   │   ├── vendor-677e88ca78c86bddf13d.js
│   │   └── vendor-677e88ca78c86bddf13d.js.LICENSE.txt
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── scripts
│   └── copy-excalidraw-assets.sh
├── setup-excalidraw-manual.sql
├── sql
│   ├── README.md
│   ├── canvas-tables.sql
│   ├── excalidraw-libraries-table.sql
│   ├── excalidraw-tables.sql
│   ├── migrations
│   │   └── create_storage_bucket.sql
│   ├── setup-canvas.sh
│   ├── setup-excalidraw-manual.sql
│   ├── setup-excalidraw.sh
│   └── users-table.sql
├── src
│   ├── app
│   │   ├── auth
│   │   │   ├── AuthClient.tsx
│   │   │   └── page.tsx
│   │   ├── canvas
│   │   │   ├── [sessionId]
│   │   │   ├── not-found.tsx
│   │   │   └── page.tsx
│   │   ├── dashboard
│   │   │   ├── DashboardClient.tsx
│   │   │   └── page.tsx
│   │   ├── error.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── README.md
│   │   ├── auth
│   │   │   ├── AuthForm.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── SignIn.tsx
│   │   │   └── SignUp.tsx
│   │   ├── canvas
│   │   │   ├── Canvas.tsx
│   │   │   ├── CanvasImpl.tsx
│   │   │   ├── ImageComponent.tsx
│   │   │   ├── ImageUploader.tsx
│   │   │   └── TextComponent.tsx
│   │   └── error
│   │       ├── ApiErrorBoundary.tsx
│   │       ├── AuthErrorBoundary.tsx
│   │       ├── ErrorBoundary.tsx
│   │       └── ErrorFallback.tsx
│   ├── context
│   │   ├── AuthContext.tsx
│   │   └── README.md
│   ├── hooks
│   │   ├── README.md
│   │   └── useErrorHandler.ts
│   ├── pages
│   │   └── api
│   │       └── storage
│   ├── services
│   │   ├── README.md
│   │   ├── api.ts
│   │   └── supabase.ts
│   ├── store
│   │   └── canvasStore.ts
│   ├── types
│   │   ├── README.md
│   │   └── canvas.ts
│   └── utils
│       └── errorHandler.ts
├── tailwind.config.js
├── tailwind.config.ts
├── tests
│   ├── README.md
│   ├── components
│   │   └── auth
│   │       └── SignIn.test.tsx
│   ├── features
│   │   ├── authentication
│   │   │   └── unit
│   │   └── canvas
│   │       ├── integration
│   │       └── unit
│   ├── fixtures
│   │   ├── README.md
│   │   ├── collections.ts
│   │   ├── factories.ts
│   │   └── index.ts
│   ├── hooks
│   │   └── useErrorHandler.test.ts
│   ├── integration
│   │   └── canvas
│   │       └── CanvasStore.test.ts
│   ├── services
│   │   ├── canvas.test.ts
│   │   └── supabase.test.ts
│   ├── shared
│   │   ├── hooks
│   │   │   └── useErrorHandler.test.ts
│   │   └── services
│   │       └── supabase.test.ts
│   └── utils
│       ├── supabase-mocks.ts
│       └── test-utils.tsx
├── tsconfig.json
└── types
    ├── canvas.ts
    ├── excalidraw-helpers.ts
    ├── excalidraw.ts
    └── supabase.ts

65 directories, 199 files
```

</project_structure>
