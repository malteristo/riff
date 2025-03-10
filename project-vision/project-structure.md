---
description: Comprehensive tree diagram of the Riff project structure
---
# Project Structure Tree Diagram

This file contains a comprehensive tree diagram of the Riff project structure, generated automatically by the update_structure.sh script.

<project_structure>

```
.
├── .codesandbox
│   ├── Dockerfile
│   └── tasks.json
├── .dockerignore
├── .editorconfig
├── .env.development
├── .env.production
├── .eslintignore
├── .eslintrc.json
├── .gitattributes
├── .github
│   ├── FUNDING.yml
│   ├── assets
│   │   ├── crowdin.svg
│   │   ├── sentry.svg
│   │   └── vercel.svg
│   └── workflows
│       ├── autorelease-excalidraw.yml
│       ├── autorelease-preview.yml
│       ├── build-docker.yml
│       ├── cancel.yml
│       ├── lint.yml
│       ├── locales-coverage.yml
│       ├── publish-docker.yml
│       ├── semantic-pr-title.yml
│       ├── sentry-production.yml
│       ├── size-limit.yml
│       ├── test-coverage-pr.yml
│       └── test.yml
├── .gitignore
├── .husky
│   └── pre-commit
├── .lintstagedrc.js
├── .npmrc
├── .nvmrc
├── .prettierignore
├── .scripts
│   └── update-structure.sh
├── .watchmanconfig
├── CONTRIBUTING.md
├── Dockerfile
├── LICENSE
├── README.md
├── crowdin.yml
├── dev-docs
│   ├── .gitignore
│   ├── README.md
│   ├── babel.config.js
│   ├── docs
│   │   ├── @excalidraw
│   │   │   ├── excalidraw
│   │   │   └── mermaid-to-excalidraw
│   │   ├── assets
│   │   │   ├── aggressive-block-fingerprint.png
│   │   │   ├── block-fingerprint.png
│   │   │   ├── brave-shield.png
│   │   │   └── nerd-stats.png
│   │   ├── codebase
│   │   │   ├── frames.mdx
│   │   │   └── json-schema.mdx
│   │   └── introduction
│   │       ├── contributing.mdx
│   │       ├── development.mdx
│   │       └── get-started.mdx
│   ├── docusaurus.config.js
│   ├── package.json
│   ├── sidebars.js
│   ├── src
│   │   ├── components
│   │   │   ├── Highlight.js
│   │   │   └── Homepage
│   │   ├── css
│   │   │   └── custom.scss
│   │   ├── initialData.js
│   │   ├── pages
│   │   │   ├── index.module.css
│   │   │   ├── index.tsx
│   │   │   └── markdown-page.md
│   │   └── theme
│   │       ├── MDXComponents.js
│   │       └── ReactLiveScope
│   ├── static
│   │   ├── .nojekyll
│   │   └── img
│   │       ├── docusaurus.png
│   │       ├── doremon.png
│   │       ├── favicon.ico
│   │       ├── favicon.png
│   │       ├── logo.svg
│   │       ├── og-image-2.png
│   │       ├── og-image.png
│   │       ├── pika.jpeg
│   │       ├── undraw_add_files.svg
│   │       ├── undraw_blank_canvas.svg
│   │       ├── undraw_innovative.svg
│   │       └── welcome-screen-overview.png
│   ├── tsconfig.json
│   ├── vercel.json
│   └── yarn.lock
├── docker-compose.yml
├── docs
│   ├── app-flow-document.md
│   ├── backend-structure.md
│   ├── frontend-guidelines.md
│   ├── implementation-plan.md
│   ├── project-milestones.md
│   ├── project-requirements-document.md
│   ├── project-structure.md
│   ├── tech-stack-api-document.md
│   ├── testing-guide.md
│   ├── testing-strategy.md
│   └── workflow-rules.md
├── examples
│   ├── with-nextjs
│   │   ├── .gitignore
│   │   ├── README.md
│   │   ├── next.config.js
│   │   ├── package.json
│   │   ├── public
│   │   │   └── images
│   │   ├── src
│   │   │   ├── app
│   │   │   ├── common.scss
│   │   │   ├── excalidrawWrapper.tsx
│   │   │   └── pages
│   │   ├── tsconfig.json
│   │   ├── vercel.json
│   │   └── yarn.lock
│   └── with-script-in-browser
│       ├── .codesandbox
│       │   ├── Dockerfile
│       │   └── tasks.json
│       ├── .gitignore
│       ├── components
│       │   ├── CustomFooter.tsx
│       │   ├── ExampleApp.scss
│       │   ├── ExampleApp.tsx
│       │   ├── MobileFooter.tsx
│       │   └── sidebar
│       ├── index.html
│       ├── index.tsx
│       ├── initialData.tsx
│       ├── package.json
│       ├── public
│       │   └── images
│       ├── tsconfig.json
│       ├── utils.ts
│       ├── vercel.json
│       └── vite.config.mts
├── excalidraw-app
│   ├── App.tsx
│   ├── CustomStats.tsx
│   ├── ExcalidrawPlusIframeExport.tsx
│   ├── app-jotai.ts
│   ├── app-language
│   │   ├── LanguageList.tsx
│   │   ├── language-detector.ts
│   │   └── language-state.ts
│   ├── app_constants.ts
│   ├── bug-issue-template.js
│   ├── collab
│   │   ├── Collab.tsx
│   │   ├── CollabError.scss
│   │   ├── CollabError.tsx
│   │   └── Portal.tsx
│   ├── components
│   │   ├── AI.tsx
│   │   ├── AppFooter.tsx
│   │   ├── AppMainMenu.tsx
│   │   ├── AppWelcomeScreen.tsx
│   │   ├── DebugCanvas.tsx
│   │   ├── EncryptedIcon.tsx
│   │   ├── ExcalidrawPlusAppLink.tsx
│   │   ├── ExportToExcalidrawPlus.tsx
│   │   ├── GitHubCorner.tsx
│   │   └── TopErrorBoundary.tsx
│   ├── data
│   │   ├── FileManager.ts
│   │   ├── LocalData.ts
│   │   ├── Locker.ts
│   │   ├── SUPABASE_SETUP.md
│   │   ├── firebase.ts
│   │   ├── index.ts
│   │   ├── localStorage.ts
│   │   ├── supabase-setup.sql
│   │   ├── supabase.ts
│   │   └── tabSync.ts
│   ├── debug.ts
│   ├── global.d.ts
│   ├── index.html
│   ├── index.scss
│   ├── index.tsx
│   ├── package.json
│   ├── sentry.ts
│   ├── share
│   │   ├── ShareDialog.scss
│   │   └── ShareDialog.tsx
│   ├── tests
│   │   ├── LanguageList.test.tsx
│   │   ├── MobileMenu.test.tsx
│   │   ├── __snapshots__
│   │   │   └── MobileMenu.test.tsx.snap
│   │   └── collab.test.tsx
│   ├── useHandleAppTheme.ts
│   ├── vite-env.d.ts
│   └── vite.config.mts
├── firebase-project
│   ├── .firebaserc
│   ├── .gitignore
│   ├── firebase.json
│   ├── firestore.indexes.json
│   ├── firestore.rules
│   └── storage.rules
├── package.json
├── packages
│   ├── excalidraw
│   │   ├── .gitignore
│   │   ├── .size-limit.json
│   │   ├── CHANGELOG.md
│   │   ├── README.md
│   │   ├── actions
│   │   │   ├── actionAddToLibrary.ts
│   │   │   ├── actionAlign.tsx
│   │   │   ├── actionBoundText.tsx
│   │   │   ├── actionCanvas.tsx
│   │   │   ├── actionClipboard.tsx
│   │   │   ├── actionCropEditor.tsx
│   │   │   ├── actionDeleteSelected.test.tsx
│   │   │   ├── actionDeleteSelected.tsx
│   │   │   ├── actionDistribute.tsx
│   │   │   ├── actionDuplicateSelection.test.tsx
│   │   │   ├── actionDuplicateSelection.tsx
│   │   │   ├── actionElementLink.ts
│   │   │   ├── actionElementLock.test.tsx
│   │   │   ├── actionElementLock.ts
│   │   │   ├── actionExport.tsx
│   │   │   ├── actionFinalize.tsx
│   │   │   ├── actionFlip.test.tsx
│   │   │   ├── actionFlip.ts
│   │   │   ├── actionFrame.ts
│   │   │   ├── actionGroup.tsx
│   │   │   ├── actionHistory.tsx
│   │   │   ├── actionLinearEditor.tsx
│   │   │   ├── actionLink.tsx
│   │   │   ├── actionMenu.tsx
│   │   │   ├── actionNavigate.tsx
│   │   │   ├── actionProperties.test.tsx
│   │   │   ├── actionProperties.tsx
│   │   │   ├── actionSelectAll.ts
│   │   │   ├── actionStyles.ts
│   │   │   ├── actionTextAutoResize.ts
│   │   │   ├── actionToggleGridMode.tsx
│   │   │   ├── actionToggleObjectsSnapMode.tsx
│   │   │   ├── actionToggleSearchMenu.ts
│   │   │   ├── actionToggleStats.tsx
│   │   │   ├── actionToggleViewMode.tsx
│   │   │   ├── actionToggleZenMode.tsx
│   │   │   ├── actionZindex.tsx
│   │   │   ├── index.ts
│   │   │   ├── manager.tsx
│   │   │   ├── register.ts
│   │   │   ├── shortcuts.ts
│   │   │   └── types.ts
│   │   ├── align.ts
│   │   ├── analytics.ts
│   │   ├── animated-trail.ts
│   │   ├── animation-frame-handler.ts
│   │   ├── appState.ts
│   │   ├── binaryheap.ts
│   │   ├── change.ts
│   │   ├── charts.test.ts
│   │   ├── charts.ts
│   │   ├── clients.ts
│   │   ├── clipboard.test.ts
│   │   ├── clipboard.ts
│   │   ├── colors.ts
│   │   ├── components
│   │   │   ├── Actions.scss
│   │   │   ├── Actions.tsx
│   │   │   ├── ActiveConfirmDialog.tsx
│   │   │   ├── App.tsx
│   │   │   ├── Avatar.scss
│   │   │   ├── Avatar.tsx
│   │   │   ├── BraveMeasureTextError.tsx
│   │   │   ├── Button.scss
│   │   │   ├── Button.tsx
│   │   │   ├── ButtonIcon.scss
│   │   │   ├── ButtonIcon.tsx
│   │   │   ├── ButtonIconCycle.tsx
│   │   │   ├── ButtonIconSelect.tsx
│   │   │   ├── ButtonSelect.tsx
│   │   │   ├── ButtonSeparator.tsx
│   │   │   ├── Card.scss
│   │   │   ├── Card.tsx
│   │   │   ├── CheckboxItem.scss
│   │   │   ├── CheckboxItem.tsx
│   │   │   ├── ColorPicker
│   │   │   ├── CommandPalette
│   │   │   ├── ConfirmDialog.scss
│   │   │   ├── ConfirmDialog.tsx
│   │   │   ├── ContextMenu.scss
│   │   │   ├── ContextMenu.tsx
│   │   │   ├── DarkModeToggle.tsx
│   │   │   ├── DefaultSidebar.test.tsx
│   │   │   ├── DefaultSidebar.tsx
│   │   │   ├── DiagramToCodePlugin
│   │   │   ├── Dialog.scss
│   │   │   ├── Dialog.tsx
│   │   │   ├── DialogActionButton.scss
│   │   │   ├── DialogActionButton.tsx
│   │   │   ├── ElementLinkDialog.scss
│   │   │   ├── ElementLinkDialog.tsx
│   │   │   ├── ErrorDialog.tsx
│   │   │   ├── ExcalidrawLogo.scss
│   │   │   ├── ExcalidrawLogo.tsx
│   │   │   ├── ExportDialog.scss
│   │   │   ├── EyeDropper.scss
│   │   │   ├── EyeDropper.tsx
│   │   │   ├── FilledButton.scss
│   │   │   ├── FilledButton.tsx
│   │   │   ├── FixedSideContainer.scss
│   │   │   ├── FixedSideContainer.tsx
│   │   │   ├── FollowMode
│   │   │   ├── FontPicker
│   │   │   ├── HandButton.tsx
│   │   │   ├── HelpButton.tsx
│   │   │   ├── HelpDialog.scss
│   │   │   ├── HelpDialog.tsx
│   │   │   ├── HintViewer.scss
│   │   │   ├── HintViewer.tsx
│   │   │   ├── IconPicker.scss
│   │   │   ├── IconPicker.tsx
│   │   │   ├── ImageExportDialog.scss
│   │   │   ├── ImageExportDialog.tsx
│   │   │   ├── InitializeApp.tsx
│   │   │   ├── InlineIcon.tsx
│   │   │   ├── Island.scss
│   │   │   ├── Island.tsx
│   │   │   ├── JSONExportDialog.tsx
│   │   │   ├── LaserPointerButton.tsx
│   │   │   ├── LayerUI.scss
│   │   │   ├── LayerUI.tsx
│   │   │   ├── LibraryMenu.scss
│   │   │   ├── LibraryMenu.tsx
│   │   │   ├── LibraryMenuBrowseButton.tsx
│   │   │   ├── LibraryMenuControlButtons.tsx
│   │   │   ├── LibraryMenuHeaderContent.tsx
│   │   │   ├── LibraryMenuItems.scss
│   │   │   ├── LibraryMenuItems.tsx
│   │   │   ├── LibraryMenuSection.tsx
│   │   │   ├── LibraryUnit.scss
│   │   │   ├── LibraryUnit.tsx
│   │   │   ├── LoadingMessage.tsx
│   │   │   ├── LockButton.tsx
│   │   │   ├── MagicButton.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   ├── Modal.scss
│   │   │   ├── Modal.tsx
│   │   │   ├── OverwriteConfirm
│   │   │   ├── Paragraph.tsx
│   │   │   ├── PasteChartDialog.scss
│   │   │   ├── PasteChartDialog.tsx
│   │   │   ├── PenModeButton.tsx
│   │   │   ├── Popover.scss
│   │   │   ├── Popover.tsx
│   │   │   ├── ProjectName.scss
│   │   │   ├── ProjectName.tsx
│   │   │   ├── PropertiesPopover.tsx
│   │   │   ├── PublishLibrary.scss
│   │   │   ├── PublishLibrary.tsx
│   │   │   ├── QuickSearch.scss
│   │   │   ├── QuickSearch.tsx
│   │   │   ├── RadioGroup.scss
│   │   │   ├── RadioGroup.tsx
│   │   │   ├── Range.scss
│   │   │   ├── Range.tsx
│   │   │   ├── SVGLayer.scss
│   │   │   ├── SVGLayer.tsx
│   │   │   ├── ScrollableList.scss
│   │   │   ├── ScrollableList.tsx
│   │   │   ├── SearchMenu.scss
│   │   │   ├── SearchMenu.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── ShareableLinkDialog.scss
│   │   │   ├── ShareableLinkDialog.tsx
│   │   │   ├── Sidebar
│   │   │   ├── Spinner.scss
│   │   │   ├── Spinner.tsx
│   │   │   ├── Stack.scss
│   │   │   ├── Stack.tsx
│   │   │   ├── Stats
│   │   │   ├── Switch.scss
│   │   │   ├── Switch.tsx
│   │   │   ├── TTDDialog
│   │   │   ├── TextField.scss
│   │   │   ├── TextField.tsx
│   │   │   ├── TextInput.scss
│   │   │   ├── Toast.scss
│   │   │   ├── Toast.tsx
│   │   │   ├── ToolButton.tsx
│   │   │   ├── ToolIcon.scss
│   │   │   ├── Toolbar.scss
│   │   │   ├── Tooltip.scss
│   │   │   ├── Tooltip.tsx
│   │   │   ├── Trans.test.tsx
│   │   │   ├── Trans.tsx
│   │   │   ├── UserList.scss
│   │   │   ├── UserList.tsx
│   │   │   ├── __snapshots__
│   │   │   ├── canvases
│   │   │   ├── dropdownMenu
│   │   │   ├── footer
│   │   │   ├── hoc
│   │   │   ├── hyperlink
│   │   │   ├── icons.tsx
│   │   │   ├── live-collaboration
│   │   │   ├── main-menu
│   │   │   └── welcome-screen
│   │   ├── constants.ts
│   │   ├── context
│   │   │   ├── tunnels.ts
│   │   │   └── ui-appState.ts
│   │   ├── css
│   │   │   ├── app.scss
│   │   │   ├── styles.scss
│   │   │   ├── theme.scss
│   │   │   └── variables.module.scss
│   │   ├── css.d.ts
│   │   ├── cursor.ts
│   │   ├── data
│   │   │   ├── EditorLocalStorage.ts
│   │   │   ├── __snapshots__
│   │   │   ├── ai
│   │   │   ├── blob.ts
│   │   │   ├── encode.ts
│   │   │   ├── encryption.ts
│   │   │   ├── filesystem.ts
│   │   │   ├── image.ts
│   │   │   ├── index.ts
│   │   │   ├── json.ts
│   │   │   ├── library.test.ts
│   │   │   ├── library.ts
│   │   │   ├── reconcile.ts
│   │   │   ├── resave.ts
│   │   │   ├── restore.ts
│   │   │   ├── transform.test.ts
│   │   │   ├── transform.ts
│   │   │   ├── types.ts
│   │   │   ├── url.test.tsx
│   │   │   └── url.ts
│   │   ├── deburr.ts
│   │   ├── distribute.ts
│   │   ├── editor-jotai.ts
│   │   ├── element
│   │   │   ├── ElementCanvasButtons.scss
│   │   │   ├── ElementCanvasButtons.tsx
│   │   │   ├── binding.ts
│   │   │   ├── bounds.test.ts
│   │   │   ├── bounds.ts
│   │   │   ├── collision.ts
│   │   │   ├── containerCache.ts
│   │   │   ├── cropElement.ts
│   │   │   ├── distance.ts
│   │   │   ├── dragElements.ts
│   │   │   ├── elbowArrow.test.tsx
│   │   │   ├── elbowArrow.ts
│   │   │   ├── elementLink.ts
│   │   │   ├── embeddable.ts
│   │   │   ├── flowchart.test.tsx
│   │   │   ├── flowchart.ts
│   │   │   ├── heading.ts
│   │   │   ├── image.ts
│   │   │   ├── index.ts
│   │   │   ├── linearElementEditor.ts
│   │   │   ├── mutateElement.ts
│   │   │   ├── newElement.test.ts
│   │   │   ├── newElement.ts
│   │   │   ├── resizeElements.ts
│   │   │   ├── resizeTest.ts
│   │   │   ├── showSelectedShapeActions.ts
│   │   │   ├── sizeHelpers.test.ts
│   │   │   ├── sizeHelpers.ts
│   │   │   ├── sortElements.test.ts
│   │   │   ├── sortElements.ts
│   │   │   ├── textElement.test.ts
│   │   │   ├── textElement.ts
│   │   │   ├── textMeasurements.ts
│   │   │   ├── textWrapping.test.ts
│   │   │   ├── textWrapping.ts
│   │   │   ├── textWysiwyg.test.tsx
│   │   │   ├── textWysiwyg.tsx
│   │   │   ├── transformHandles.ts
│   │   │   ├── typeChecks.test.ts
│   │   │   ├── typeChecks.ts
│   │   │   ├── types.ts
│   │   │   └── utils.ts
│   │   ├── emitter.ts
│   │   ├── env.cjs
│   │   ├── errors.ts
│   │   ├── fonts
│   │   │   ├── Assistant
│   │   │   ├── Cascadia
│   │   │   ├── ComicShanns
│   │   │   ├── Emoji
│   │   │   ├── ExcalidrawFontFace.ts
│   │   │   ├── Excalifont
│   │   │   ├── FontMetadata.ts
│   │   │   ├── Fonts.ts
│   │   │   ├── Helvetica
│   │   │   ├── Liberation
│   │   │   ├── Lilita
│   │   │   ├── Nunito
│   │   │   ├── Virgil
│   │   │   ├── Xiaolai
│   │   │   ├── fonts.css
│   │   │   └── index.ts
│   │   ├── fractionalIndex.ts
│   │   ├── frame.test.tsx
│   │   ├── frame.ts
│   │   ├── gesture.ts
│   │   ├── global.d.ts
│   │   ├── groups.ts
│   │   ├── history.ts
│   │   ├── hooks
│   │   │   ├── useCallbackRefState.ts
│   │   │   ├── useCopiedIndicator.ts
│   │   │   ├── useCreatePortalContainer.ts
│   │   │   ├── useEmitter.ts
│   │   │   ├── useLibraryItemSvg.ts
│   │   │   ├── useOutsideClick.ts
│   │   │   ├── useScrollPosition.ts
│   │   │   ├── useStable.ts
│   │   │   ├── useStableCallback.ts
│   │   │   └── useTransition.ts
│   │   ├── i18n.ts
│   │   ├── index-node.ts
│   │   ├── index.tsx
│   │   ├── keys.test.ts
│   │   ├── keys.ts
│   │   ├── laser-trails.ts
│   │   ├── locales
│   │   │   ├── README.md
│   │   │   ├── ar-SA.json
│   │   │   ├── az-AZ.json
│   │   │   ├── bg-BG.json
│   │   │   ├── bn-BD.json
│   │   │   ├── ca-ES.json
│   │   │   ├── cs-CZ.json
│   │   │   ├── da-DK.json
│   │   │   ├── de-DE.json
│   │   │   ├── el-GR.json
│   │   │   ├── en.json
│   │   │   ├── es-ES.json
│   │   │   ├── eu-ES.json
│   │   │   ├── fa-IR.json
│   │   │   ├── fi-FI.json
│   │   │   ├── fr-FR.json
│   │   │   ├── gl-ES.json
│   │   │   ├── he-IL.json
│   │   │   ├── hi-IN.json
│   │   │   ├── hu-HU.json
│   │   │   ├── id-ID.json
│   │   │   ├── it-IT.json
│   │   │   ├── ja-JP.json
│   │   │   ├── kaa.json
│   │   │   ├── kab-KAB.json
│   │   │   ├── kk-KZ.json
│   │   │   ├── km-KH.json
│   │   │   ├── ko-KR.json
│   │   │   ├── ku-TR.json
│   │   │   ├── lt-LT.json
│   │   │   ├── lv-LV.json
│   │   │   ├── mr-IN.json
│   │   │   ├── my-MM.json
│   │   │   ├── nb-NO.json
│   │   │   ├── nl-NL.json
│   │   │   ├── nn-NO.json
│   │   │   ├── oc-FR.json
│   │   │   ├── pa-IN.json
│   │   │   ├── percentages.json
│   │   │   ├── pl-PL.json
│   │   │   ├── pt-BR.json
│   │   │   ├── pt-PT.json
│   │   │   ├── ro-RO.json
│   │   │   ├── ru-RU.json
│   │   │   ├── si-LK.json
│   │   │   ├── sk-SK.json
│   │   │   ├── sl-SI.json
│   │   │   ├── sv-SE.json
│   │   │   ├── ta-IN.json
│   │   │   ├── th-TH.json
│   │   │   ├── tr-TR.json
│   │   │   ├── uk-UA.json
│   │   │   ├── vi-VN.json
│   │   │   ├── zh-CN.json
│   │   │   ├── zh-HK.json
│   │   │   └── zh-TW.json
│   │   ├── mermaid.test.ts
│   │   ├── mermaid.ts
│   │   ├── package.json
│   │   ├── points.ts
│   │   ├── polyfill.ts
│   │   ├── pwacompat.d.ts
│   │   ├── queue.test.ts
│   │   ├── queue.ts
│   │   ├── random.ts
│   │   ├── react-app-env.d.ts
│   │   ├── reactUtils.ts
│   │   ├── renderer
│   │   │   ├── helpers.ts
│   │   │   ├── interactiveScene.ts
│   │   │   ├── renderElement.ts
│   │   │   ├── renderNewElementScene.ts
│   │   │   ├── renderSnaps.ts
│   │   │   ├── roundRect.ts
│   │   │   ├── staticScene.ts
│   │   │   └── staticSvgScene.ts
│   │   ├── scene
│   │   │   ├── Renderer.ts
│   │   │   ├── Scene.ts
│   │   │   ├── Shape.ts
│   │   │   ├── ShapeCache.ts
│   │   │   ├── comparisons.ts
│   │   │   ├── export.ts
│   │   │   ├── index.ts
│   │   │   ├── normalize.ts
│   │   │   ├── scroll.ts
│   │   │   ├── scrollbars.ts
│   │   │   ├── selection.test.ts
│   │   │   ├── selection.ts
│   │   │   ├── types.ts
│   │   │   └── zoom.ts
│   │   ├── shapes.tsx
│   │   ├── snapping.ts
│   │   ├── store.ts
│   │   ├── subset
│   │   │   ├── harfbuzz
│   │   │   ├── subset-main.ts
│   │   │   ├── subset-shared.chunk.ts
│   │   │   ├── subset-worker.chunk.ts
│   │   │   └── woff2
│   │   ├── tests
│   │   │   ├── App.test.tsx
│   │   │   ├── MermaidToExcalidraw.test.tsx
│   │   │   ├── __snapshots__
│   │   │   ├── actionStyles.test.tsx
│   │   │   ├── align.test.tsx
│   │   │   ├── appState.test.tsx
│   │   │   ├── binding.test.tsx
│   │   │   ├── charts.test.tsx
│   │   │   ├── clients.test.ts
│   │   │   ├── clipboard.test.tsx
│   │   │   ├── contextmenu.test.tsx
│   │   │   ├── cropElement.test.tsx
│   │   │   ├── data
│   │   │   ├── dragCreate.test.tsx
│   │   │   ├── elementLocking.test.tsx
│   │   │   ├── excalidraw.test.tsx
│   │   │   ├── export.test.tsx
│   │   │   ├── fitToContent.test.tsx
│   │   │   ├── fixtures
│   │   │   ├── flip.test.tsx
│   │   │   ├── fractionalIndex.test.ts
│   │   │   ├── helpers
│   │   │   ├── history.test.tsx
│   │   │   ├── library.test.tsx
│   │   │   ├── linearElementEditor.test.tsx
│   │   │   ├── move.test.tsx
│   │   │   ├── multiPointCreate.test.tsx
│   │   │   ├── packages
│   │   │   ├── queries
│   │   │   ├── regressionTests.test.tsx
│   │   │   ├── resize.test.tsx
│   │   │   ├── rotate.test.tsx
│   │   │   ├── scene
│   │   │   ├── scroll.test.tsx
│   │   │   ├── search.test.tsx
│   │   │   ├── selection.test.tsx
│   │   │   ├── shortcuts.test.tsx
│   │   │   ├── test-utils.ts
│   │   │   ├── tool.test.tsx
│   │   │   ├── utils.test.ts
│   │   │   ├── viewMode.test.tsx
│   │   │   └── zindex.test.tsx
│   │   ├── tsconfig.json
│   │   ├── types.ts
│   │   ├── utility-types.ts
│   │   ├── utils.ts
│   │   ├── visualdebug.ts
│   │   ├── vite-env.d.ts
│   │   ├── workers.ts
│   │   └── zindex.ts
│   ├── math
│   │   ├── CHANGELOG.md
│   │   ├── README.md
│   │   ├── angle.ts
│   │   ├── curve.test.ts
│   │   ├── curve.ts
│   │   ├── ellipse.test.ts
│   │   ├── ellipse.ts
│   │   ├── global.d.ts
│   │   ├── index.ts
│   │   ├── line.test.ts
│   │   ├── line.ts
│   │   ├── package.json
│   │   ├── point.test.ts
│   │   ├── point.ts
│   │   ├── polygon.ts
│   │   ├── range.test.ts
│   │   ├── range.ts
│   │   ├── rectangle.ts
│   │   ├── segment.test.ts
│   │   ├── segment.ts
│   │   ├── triangle.ts
│   │   ├── tsconfig.json
│   │   ├── types.ts
│   │   ├── utils.ts
│   │   ├── vector.test.ts
│   │   └── vector.ts
│   └── utils
│       ├── CHANGELOG.md
│       ├── README.md
│       ├── __snapshots__
│       │   ├── export.test.ts.snap
│       │   └── utils.test.ts.snap
│       ├── bbox.ts
│       ├── collision.test.ts
│       ├── collision.ts
│       ├── export.test.ts
│       ├── export.ts
│       ├── geometry
│       │   ├── geometry.test.ts
│       │   └── shape.ts
│       ├── global.d.ts
│       ├── index.ts
│       ├── package.json
│       ├── test-utils.ts
│       ├── tsconfig.json
│       ├── utils.unmocked.test.ts
│       ├── withinBounds.test.ts
│       └── withinBounds.ts
├── project-vision
│   ├── app-flow-document.md
│   ├── backend-structure.md
│   ├── frontend-guidelines.md
│   ├── implementation-plan.md
│   ├── project-milestones.md
│   ├── project-requirements-document.md
│   ├── project-structure.md
│   ├── tech-stack-api-document.md
│   ├── testing-guide.md
│   ├── testing-strategy.md
│   └── workflow-rules.md
├── public
│   ├── Assistant-Regular.woff2
│   ├── Cascadia.woff2
│   ├── Virgil.woff2
│   ├── _headers
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── maskable_icon_x192.png
│   ├── maskable_icon_x512.png
│   ├── og-image-3.png
│   ├── robots.txt
│   ├── screenshots
│   │   ├── collaboration.png
│   │   ├── export.png
│   │   ├── illustration.png
│   │   ├── shapes.png
│   │   ├── virtual-whiteboard.png
│   │   └── wireframe.png
│   └── service-worker.js
├── scripts
│   ├── autorelease.js
│   ├── build-locales-coverage.js
│   ├── build-node.js
│   ├── build-version.js
│   ├── buildDocs.js
│   ├── buildMath.js
│   ├── buildPackage.js
│   ├── buildUtils.js
│   ├── buildWasm.js
│   ├── locales-coverage-description.js
│   ├── prerelease.js
│   ├── release.js
│   ├── updateChangelog.js
│   ├── wasm
│   │   ├── hb-subset.wasm
│   │   └── woff2.wasm
│   └── woff2
│       ├── assets
│       │   ├── LiberationSans-Regular-2048.ttf
│       │   ├── LiberationSans-Regular.ttf
│       │   ├── NotoEmoji-Regular-2048.ttf
│       │   ├── NotoEmoji-Regular.ttf
│       │   └── Xiaolai-Regular.ttf
│       ├── woff2-esbuild-plugins.js
│       └── woff2-vite-plugins.js
├── setupTests.ts
├── tsconfig.json
├── vercel.json
├── vitest.config.mts
└── yarn.lock

113 directories, 696 files
```

</project_structure>
