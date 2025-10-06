module.exports = {

"[project]/src/configs/themeConfig.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/*
 * If you change the following items in the config object, you will not see any effect in the local development server
 * as these are stored in the cookie (cookie has the highest priority over the themeConfig):
 * 1. mode
 * 2. skin
 * 3. semiDark
 * 4. layout
 * 5. navbar.contentWidth
 * 6. contentWidth
 * 7. footer.contentWidth
 *
 * To see the effect of the above items, you can click on the reset button from the Customizer
 * which is on the top-right corner of the customizer besides the close button.
 * This will reset the cookie to the values provided in the config object below.
 *
 * Another way is to clear the cookie from the browser's Application/Storage tab and then reload the page.
 */ __turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
const themeConfig = {
    templateName: 'Crosspoint',
    homePageUrl: '/dashboards/analytics',
    settingsCookieName: 'crosspoint-crm',
    mode: 'light',
    skin: 'default',
    semiDark: false,
    layout: 'vertical',
    layoutPadding: 24,
    compactContentWidth: 1440,
    navbar: {
        type: 'fixed',
        contentWidth: 'wide',
        floating: true,
        detached: true,
        blur: true // true, false
    },
    contentWidth: 'wide',
    footer: {
        type: 'static',
        contentWidth: 'wide',
        detached: true //! true, false (This will not work in the Horizontal Layout)
    },
    disableRipple: false,
    toastPosition: 'top-right' // 'top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'
};
const __TURBOPACK__default__export__ = themeConfig;
}}),
"[project]/src/configs/primaryColorConfig.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Primary color config object
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
const primaryColorConfig = [
    {
        name: 'primary-1',
        light: '#8F85F3',
        main: '#7367F0',
        dark: '#675DD8'
    },
    {
        name: 'primary-2',
        light: '#4EB0B1',
        main: '#0D9394',
        dark: '#096B6C'
    },
    {
        name: 'primary-3',
        light: '#FFC25A',
        main: '#FFAB1D',
        dark: '#BA7D15'
    },
    {
        name: 'primary-4',
        light: '#F0718D',
        main: '#EB3D63',
        dark: '#AC2D48'
    },
    {
        name: 'primary-5',
        light: '#5CAFF1',
        main: '#2092EC',
        dark: '#176BAC'
    }
];
const __TURBOPACK__default__export__ = primaryColorConfig;
}}),
"[project]/src/@layouts/LayoutWrapper.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// Hook Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useSettings$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@core/hooks/useSettings.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useLayoutInit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@core/hooks/useLayoutInit.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const LayoutWrapper = (props)=>{
    // Props
    const { systemMode, verticalLayout, horizontalLayout } = props;
    // Hooks
    const { settings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useSettings$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSettings"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useLayoutInit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(systemMode);
    // Return the layout based on the layout context
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col flex-auto",
        "data-skin": settings.skin,
        children: settings.layout === 'horizontal' ? horizontalLayout : verticalLayout
    }, void 0, false, {
        fileName: "[project]/src/@layouts/LayoutWrapper.jsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = LayoutWrapper;
}}),
"[project]/src/@layouts/utils/layoutClasses.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Classes for vertical layout
__turbopack_esm__({
    "blankLayoutClasses": (()=>blankLayoutClasses),
    "commonLayoutClasses": (()=>commonLayoutClasses),
    "frontLayoutClasses": (()=>frontLayoutClasses),
    "horizontalLayoutClasses": (()=>horizontalLayoutClasses),
    "verticalLayoutClasses": (()=>verticalLayoutClasses)
});
const verticalLayoutClasses = {
    root: 'ts-vertical-layout',
    contentWrapper: 'ts-vertical-layout-content-wrapper',
    header: 'ts-vertical-layout-header',
    headerFixed: 'ts-vertical-layout-header-fixed',
    headerStatic: 'ts-vertical-layout-header-static',
    headerFloating: 'ts-vertical-layout-header-floating',
    headerDetached: 'ts-vertical-layout-header-detached',
    headerAttached: 'ts-vertical-layout-header-attached',
    headerContentCompact: 'ts-vertical-layout-header-content-compact',
    headerContentWide: 'ts-vertical-layout-header-content-wide',
    headerBlur: 'ts-vertical-layout-header-blur',
    navbar: 'ts-vertical-layout-navbar',
    navbarContent: 'ts-vertical-layout-navbar-content',
    content: 'ts-vertical-layout-content',
    contentCompact: 'ts-vertical-layout-content-compact',
    contentWide: 'ts-vertical-layout-content-wide',
    footer: 'ts-vertical-layout-footer',
    footerStatic: 'ts-vertical-layout-footer-static',
    footerFixed: 'ts-vertical-layout-footer-fixed',
    footerDetached: 'ts-vertical-layout-footer-detached',
    footerAttached: 'ts-vertical-layout-footer-attached',
    footerContentWrapper: 'ts-vertical-layout-footer-content-wrapper',
    footerContent: 'ts-vertical-layout-footer-content',
    footerContentCompact: 'ts-vertical-layout-footer-content-compact',
    footerContentWide: 'ts-vertical-layout-footer-content-wide'
};
const horizontalLayoutClasses = {
    root: 'ts-horizontal-layout',
    contentWrapper: 'ts-horizontal-layout-content-wrapper',
    header: 'ts-horizontal-layout-header',
    headerFixed: 'ts-horizontal-layout-header-fixed',
    headerStatic: 'ts-horizontal-layout-header-static',
    headerContentCompact: 'ts-horizontal-layout-header-content-compact',
    headerContentWide: 'ts-horizontal-layout-header-content-wide',
    headerBlur: 'ts-horizontal-layout-header-blur',
    navbar: 'ts-horizontal-layout-navbar',
    navbarContent: 'ts-horizontal-layout-navbar-content',
    navigation: 'ts-horizontal-layout-navigation',
    navigationContentWrapper: 'ts-horizontal-layout-navigation-content-wrapper',
    content: 'ts-horizontal-layout-content',
    contentCompact: 'ts-horizontal-layout-content-compact',
    contentWide: 'ts-horizontal-layout-content-wide',
    footer: 'ts-horizontal-layout-footer',
    footerStatic: 'ts-horizontal-layout-footer-static',
    footerFixed: 'ts-horizontal-layout-footer-fixed',
    footerContentWrapper: 'ts-horizontal-layout-footer-content-wrapper',
    footerContent: 'ts-horizontal-layout-footer-content',
    footerContentCompact: 'ts-horizontal-layout-footer-content-compact',
    footerContentWide: 'ts-horizontal-layout-footer-content-wide'
};
const blankLayoutClasses = {
    root: 'ts-blank-layout'
};
const frontLayoutClasses = {
    root: 'ts-front-layout-root',
    header: 'ts-front-layout-header',
    navbar: 'ts-front-layout-navbar',
    navbarContent: 'ts-front-layout-navbar-content',
    footer: 'ts-front-layout-footer'
};
const commonLayoutClasses = {
    contentHeightFixed: 'ts-layout-content-height-fixed'
};
}}),
"[project]/src/@layouts/styles/shared/StyledMain.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Third-party Imports
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@emotion/styled/dist/emotion-styled.development.esm.js [app-ssr] (ecmascript)");
// Config Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/configs/themeConfig.js [app-ssr] (ecmascript)");
// Util Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@layouts/utils/layoutClasses.js [app-ssr] (ecmascript)");
;
;
;
const StyledMain = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].main`
  padding: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].layoutPadding}px;
  ${({ isContentCompact })=>isContentCompact && `
    margin-inline: auto;
    max-inline-size: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].compactContentWidth}px;
  `}

  &:has(.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commonLayoutClasses"].contentHeightFixed}) {
    display: flex;
    overflow: hidden;
  }
`;
const __TURBOPACK__default__export__ = StyledMain;
}}),
"[project]/src/@layouts/components/vertical/LayoutContent.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// Third-party Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/classnames/index.js [app-ssr] (ecmascript)");
// Hook Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useSettings$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@core/hooks/useSettings.jsx [app-ssr] (ecmascript)");
// Util Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@layouts/utils/layoutClasses.js [app-ssr] (ecmascript)");
// Styled Component Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$styles$2f$shared$2f$StyledMain$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@layouts/styles/shared/StyledMain.jsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const LayoutContent = ({ children })=>{
    // Hooks
    const { settings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useSettings$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSettings"])();
    // Vars
    const contentCompact = settings.contentWidth === 'compact';
    const contentWide = settings.contentWidth === 'wide';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$styles$2f$shared$2f$StyledMain$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        isContentCompact: contentCompact,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].content, 'flex-auto', {
            [`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].contentCompact} is-full`]: contentCompact,
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].contentWide]: contentWide
        }),
        children: children
    }, void 0, false, {
        fileName: "[project]/src/@layouts/components/vertical/LayoutContent.jsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = LayoutContent;
}}),
"[project]/src/@layouts/styles/vertical/StyledContentWrapper.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
// Third-party Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@emotion/styled/dist/emotion-styled.development.esm.js [app-ssr] (ecmascript)");
// Util Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@layouts/utils/layoutClasses.js [app-ssr] (ecmascript)");
'use client';
;
;
const StyledContentWrapper = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  &:has(.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].content}>.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commonLayoutClasses"].contentHeightFixed}) {
    max-block-size: 100dvh;
  }
`;
const __TURBOPACK__default__export__ = StyledContentWrapper;
}}),
"[project]/src/@layouts/components/horizontal/LayoutContent.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// Third-party Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/classnames/index.js [app-ssr] (ecmascript)");
// Config Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/configs/themeConfig.js [app-ssr] (ecmascript)");
// Hook Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useSettings$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@core/hooks/useSettings.jsx [app-ssr] (ecmascript)");
// Util Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@layouts/utils/layoutClasses.js [app-ssr] (ecmascript)");
// Styled Component Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$styles$2f$shared$2f$StyledMain$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@layouts/styles/shared/StyledMain.jsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const LayoutContent = ({ children })=>{
    // Hooks
    const { settings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useSettings$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSettings"])();
    // Vars
    const contentCompact = settings.contentWidth === 'compact';
    const contentWide = settings.contentWidth === 'wide';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$styles$2f$shared$2f$StyledMain$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        isContentCompact: contentCompact,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].content, 'flex-auto', {
            [`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].contentCompact} is-full`]: contentCompact,
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].contentWide]: contentWide
        }),
        style: {
            padding: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].layoutPadding
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/@layouts/components/horizontal/LayoutContent.jsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = LayoutContent;
}}),
"[project]/src/@layouts/styles/horizontal/StyledContentWrapper.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
// Third-party Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@emotion/styled/dist/emotion-styled.development.esm.js [app-ssr] (ecmascript)");
// Util Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@layouts/utils/layoutClasses.js [app-ssr] (ecmascript)");
'use client';
;
;
const StyledContentWrapper = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  &:has(.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].content}>.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commonLayoutClasses"].contentHeightFixed}) {
    max-block-size: 100dvh;
  }
`;
const __TURBOPACK__default__export__ = StyledContentWrapper;
}}),
"[project]/src/@layouts/components/horizontal/Navbar.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Third-party Imports
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/classnames/index.js [app-ssr] (ecmascript)");
// Util Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@layouts/utils/layoutClasses.js [app-ssr] (ecmascript)");
;
;
;
const Navbar = ({ children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].navbar, 'flex items-center justify-between is-full'),
        children: children
    }, void 0, false, {
        fileName: "[project]/src/@layouts/components/horizontal/Navbar.jsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = Navbar;
}}),
"[project]/src/@layouts/styles/horizontal/StyledHeader.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Third-party Imports
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@emotion/styled/dist/emotion-styled.development.esm.js [app-ssr] (ecmascript)");
// Config Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/configs/themeConfig.js [app-ssr] (ecmascript)");
// Util Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@layouts/utils/layoutClasses.js [app-ssr] (ecmascript)");
;
;
;
const StyledHeader = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].header`
  box-shadow: var(--mui-customShadows-sm);

  [data-skin='bordered'] & {
    box-shadow: none;
    border-block-end: 1px solid var(--border-color);
  }

  &:not(.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].headerBlur}) {
    background-color: var(--mui-palette-background-paper);
  }

  &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].headerBlur} {
    backdrop-filter: blur(6px);
    background-color: rgb(var(--background-color-rgb) / 0.88);
  }

  &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].headerFixed} {
    position: sticky;
    inset-block-start: 0;
    z-index: var(--header-z-index);
  }

  &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].headerContentCompact} .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].navbar} {
    margin-inline: auto;
    max-inline-size: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].compactContentWidth}px;
  }

  .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].navbar} {
    position: relative;
    min-block-size: var(--header-height);
    padding-block: 8px;
    padding-inline: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].layoutPadding}px;
  }

  ${({ overrideStyles })=>overrideStyles}
`;
const __TURBOPACK__default__export__ = StyledHeader;
}}),
"[project]/src/@layouts/components/horizontal/Header.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// Third-party Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/classnames/index.js [app-ssr] (ecmascript)");
// Config Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/configs/themeConfig.js [app-ssr] (ecmascript)");
// Hook Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useSettings$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@core/hooks/useSettings.jsx [app-ssr] (ecmascript)");
// Util Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@layouts/utils/layoutClasses.js [app-ssr] (ecmascript)");
// Styled Component Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$styles$2f$horizontal$2f$StyledHeader$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@layouts/styles/horizontal/StyledHeader.jsx [app-ssr] (ecmascript)");
// MUI Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/styles/useTheme.js [app-ssr] (ecmascript) <export default as useTheme>");
'use client';
;
;
;
;
;
;
;
const Header = (props)=>{
    // Props
    const { children, overrideStyles } = props;
    // Hooks
    const { settings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useSettings$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSettings"])();
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    // Vars
    const { navbarContentWidth } = settings;
    const headerFixed = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].navbar.type === 'fixed';
    const headerStatic = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].navbar.type === 'static';
    const headerBlur = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].navbar.blur === true;
    const headerContentCompact = navbarContentWidth === 'compact';
    const headerContentWide = navbarContentWidth === 'wide';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$styles$2f$horizontal$2f$StyledHeader$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        theme: theme,
        overrideStyles: overrideStyles,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].header, {
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].headerFixed]: headerFixed,
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].headerStatic]: headerStatic,
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].headerBlur]: headerBlur,
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].headerContentCompact]: headerContentCompact,
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].headerContentWide]: headerContentWide
        }),
        children: children
    }, void 0, false, {
        fileName: "[project]/src/@layouts/components/horizontal/Header.jsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = Header;
}}),
"[project]/src/@layouts/styles/vertical/StyledHeader.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Third-party Imports
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@emotion/styled/dist/emotion-styled.development.esm.js [app-ssr] (ecmascript)");
// Config Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/configs/themeConfig.js [app-ssr] (ecmascript)");
// Util Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@layouts/utils/layoutClasses.js [app-ssr] (ecmascript)");
;
;
;
const StyledHeader = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].header`
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: 100%;
  flex-shrink: 0;
  min-block-size: var(--header-height);

  &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerContentCompact} {
    &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerFloating}
      .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].navbar},
      &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerDetached}
      .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].navbar},
      &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerAttached}
      .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].navbar} {
      margin-inline: auto;
    }

    &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerFloating}
      .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].navbar},
      &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerFixed}.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerDetached}
      .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].navbar} {
      max-inline-size: calc(${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].compactContentWidth}px - ${2 * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].layoutPadding}px);
    }

    .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].navbar} {
      max-inline-size: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].compactContentWidth}px;
    }
  }

  &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerFixed} {
    position: sticky;
    inset-block-start: 0;
    z-index: var(--header-z-index);

    &:not(.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerBlur}).scrolled.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerAttached},
      &:not(.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerBlur}).scrolled.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerDetached}
      .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].navbar} {
      background-color: var(--mui-palette-background-paper);
    }

    &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerDetached}.scrolled .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].navbar} {
      box-shadow: var(--mui-customShadows-sm);

      [data-skin='bordered'] & {
        box-shadow: none;
        border-inline: 1px solid var(--border-color);
        border-block-end: 1px solid var(--border-color);
      }
    }
    &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerDetached} .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].navbar} {
      border-end-start-radius: var(--border-radius);
      border-end-end-radius: var(--border-radius);
    }

    &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerDetached}, &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerFloating} {
      pointer-events: none;

      & .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].navbar} {
        pointer-events: auto;
      }
    }

    &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerBlur} {
      &.scrolled.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerAttached},
        &.scrolled.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerDetached}
        .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].navbar},
        &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerFloating}
        .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].navbar} {
        backdrop-filter: blur(6px);
        background-color: rgb(var(--background-color-rgb) / 0.88);
      }

      &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerFloating} {
        &:before {
          content: '';
          position: absolute;
          z-index: -1;
          inset-block-start: 0;
          inset-inline: 0;
          block-size: 100%;
          background: linear-gradient(
            180deg,
            rgb(var(--mui-palette-background-defaultChannel) / 0.7) 44%,
            rgb(var(--mui-palette-background-defaultChannel) / 0.43) 73%,
            rgb(var(--mui-palette-background-defaultChannel) / 0)
          );
          backdrop-filter: blur(10px);
          mask: linear-gradient(
            var(--mui-palette-background-default),
            var(--mui-palette-background-default) 18%,
            transparent 100%
          );
        }
      }
    }

    &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerAttached}.scrolled {
      box-shadow: var(--mui-customShadows-sm);

      [data-skin='bordered'] & {
        box-shadow: none;
        border-block-end: 1px solid var(--border-color);
      }
    }

    &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerFloating}
      .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].navbar},
      &:not(.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerFloating}).${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerAttached},
      &:not(.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerFloating}).${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerDetached}
      .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].navbar} {
      ${({ theme })=>`transition: ${theme.transitions.create([
        'box-shadow',
        'border-width',
        'padding-inline',
        'backdrop-filter'
    ])}`};
    }
    &:not(.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerFloating}).${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerAttached}
      .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].navbar},
      &:not(.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerFloating}).${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerDetached}.scrolled
      .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].navbar} {
      padding-inline: 16px;
    }
  }

  &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerFloating} {
    padding-block-start: 16px;

    .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].navbar} {
      background-color: var(--mui-palette-background-paper);
      border-radius: var(--border-radius);
      padding-inline: 16px;
      box-shadow: var(--mui-customShadows-sm);

      [data-skin='bordered'] & {
        box-shadow: none;
        border: 1px solid var(--border-color);
      }
    }
  }

  &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerFloating}
    .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].navbar},
    &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerFixed}.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerDetached}
    .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].navbar} {
    inline-size: calc(100% - ${2 * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].layoutPadding}px);
  }

  &:not(.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerFloating}).${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerStatic}
    .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].navbar} {
    padding-inline: 16px;
  }

  .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].navbar} {
    position: relative;
    padding-block: 8px;
    inline-size: 100%;
  }

  ${({ overrideStyles })=>overrideStyles}
`;
const __TURBOPACK__default__export__ = StyledHeader;
}}),
"[project]/src/@layouts/components/vertical/Navbar.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// Third-party Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/classnames/index.js [app-ssr] (ecmascript)");
// Config Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/configs/themeConfig.js [app-ssr] (ecmascript)");
// Hook Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useSettings$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@core/hooks/useSettings.jsx [app-ssr] (ecmascript)");
// Util Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@layouts/utils/layoutClasses.js [app-ssr] (ecmascript)");
// Styled Component Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$styles$2f$vertical$2f$StyledHeader$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@layouts/styles/vertical/StyledHeader.jsx [app-ssr] (ecmascript)");
// MUI Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/styles/useTheme.js [app-ssr] (ecmascript) <export default as useTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$useScrollTrigger$2f$useScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/useScrollTrigger/useScrollTrigger.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const Navbar = (props)=>{
    // Props
    const { children, overrideStyles } = props;
    // Hooks
    const { settings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useSettings$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSettings"])();
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    const trigger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$useScrollTrigger$2f$useScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
        threshold: 0,
        disableHysteresis: true
    });
    // Vars
    const { navbarContentWidth } = settings;
    const headerFixed = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].navbar.type === 'fixed';
    const headerStatic = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].navbar.type === 'static';
    const headerFloating = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].navbar.floating === true;
    const headerDetached = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].navbar.detached === true;
    const headerAttached = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].navbar.detached === false;
    const headerBlur = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].navbar.blur === true;
    const headerContentCompact = navbarContentWidth === 'compact';
    const headerContentWide = navbarContentWidth === 'wide';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$styles$2f$vertical$2f$StyledHeader$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        theme: theme,
        overrideStyles: overrideStyles,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].header, {
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerFixed]: headerFixed,
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerStatic]: headerStatic,
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerFloating]: headerFloating,
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerDetached]: !headerFloating && headerDetached,
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerAttached]: !headerFloating && headerAttached,
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerBlur]: headerBlur,
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerContentCompact]: headerContentCompact,
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].headerContentWide]: headerContentWide,
            scrolled: trigger
        }),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].navbar, 'flex bs-full'),
            children: children
        }, void 0, false, {
            fileName: "[project]/src/@layouts/components/vertical/Navbar.jsx",
            lineNumber: 62,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/@layouts/components/vertical/Navbar.jsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = Navbar;
}}),
"[project]/src/@layouts/styles/vertical/StyledFooter.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Third-party Imports
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@emotion/styled/dist/emotion-styled.development.esm.js [app-ssr] (ecmascript)");
// Config Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/configs/themeConfig.js [app-ssr] (ecmascript)");
// Util Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@layouts/utils/layoutClasses.js [app-ssr] (ecmascript)");
;
;
;
const StyledFooter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].footer`
  &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].footerContentCompact} {
    &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].footerDetached} {
      margin-inline: auto;
      max-inline-size: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].compactContentWidth}px;
    }

    &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].footerAttached} .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].footerContentWrapper} {
      margin-inline: auto;
      max-inline-size: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].compactContentWidth}px;
    }
  }

  &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].footerFixed} {
    position: sticky;
    inset-block-end: 0;
    z-index: var(--footer-z-index);

    &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].footerAttached},
      &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].footerDetached}
      .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].footerContentWrapper} {
      background-color: var(--mui-palette-background-paper);
    }

    &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].footerDetached} {
      pointer-events: none;
      padding-inline: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].layoutPadding}px;

      & .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].footerContentWrapper} {
        pointer-events: auto;
        box-shadow: 0 3px 12px 0px rgb(var(--mui-mainColorChannels-lightShadow) / 0.14);
        [data-mui-color-scheme='dark'] & {
          box-shadow: 0 3px 12px 0px rgb(var(--mui-mainColorChannels-darkShadow) / 0.14);
        }
        border-start-start-radius: var(--border-radius);
        border-start-end-radius: var(--border-radius);

        [data-skin='bordered'] & {
          box-shadow: none;
          border-inline: 1px solid var(--border-color);
          border-block-start: 1px solid var(--border-color);
        }
      }
    }

    &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].footerAttached} {
      box-shadow: 0 3px 12px 0px rgb(var(--mui-mainColorChannels-lightShadow) / 0.14);
      [data-mui-color-scheme='dark'] & {
        box-shadow: 0 3px 12px 0px rgb(var(--mui-mainColorChannels-darkShadow) / 0.14);
      }
      [data-skin='bordered'] & {
        box-shadow: none;
        border-block-start: 1px solid var(--border-color);
      }
    }
  }

  & .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].footerContentWrapper} {
    padding-block: 16px;
    padding-inline: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].layoutPadding}px;
  }

  ${({ overrideStyles })=>overrideStyles}
`;
const __TURBOPACK__default__export__ = StyledFooter;
}}),
"[project]/src/@layouts/components/vertical/Footer.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// Third-party Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/classnames/index.js [app-ssr] (ecmascript)");
// Config Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/configs/themeConfig.js [app-ssr] (ecmascript)");
// Hook Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useSettings$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@core/hooks/useSettings.jsx [app-ssr] (ecmascript)");
// Util Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@layouts/utils/layoutClasses.js [app-ssr] (ecmascript)");
// Styled Component Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$styles$2f$vertical$2f$StyledFooter$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@layouts/styles/vertical/StyledFooter.jsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const Footer = (props)=>{
    // Props
    const { children, overrideStyles } = props;
    // Hooks
    const { settings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useSettings$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSettings"])();
    // Vars
    const { footerContentWidth } = settings;
    const footerDetached = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].footer.detached === true;
    const footerAttached = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].footer.detached === false;
    const footerStatic = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].footer.type === 'static';
    const footerFixed = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].footer.type === 'fixed';
    const footerContentCompact = footerContentWidth === 'compact';
    const footerContentWide = footerContentWidth === 'wide';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$styles$2f$vertical$2f$StyledFooter$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        overrideStyles: overrideStyles,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].footer, 'is-full', {
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].footerDetached]: footerDetached,
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].footerAttached]: footerAttached,
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].footerStatic]: footerStatic,
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].footerFixed]: footerFixed,
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].footerContentCompact]: footerContentCompact,
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].footerContentWide]: footerContentWide
        }),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalLayoutClasses"].footerContentWrapper,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/@layouts/components/vertical/Footer.jsx",
            lineNumber: 46,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/@layouts/components/vertical/Footer.jsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = Footer;
}}),
"[project]/src/@layouts/styles/horizontal/StyledFooter.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Third-party Imports
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@emotion/styled/dist/emotion-styled.development.esm.js [app-ssr] (ecmascript)");
// Config Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/configs/themeConfig.js [app-ssr] (ecmascript)");
// Util Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@layouts/utils/layoutClasses.js [app-ssr] (ecmascript)");
;
;
;
const StyledFooter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].footer`
  &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].footerFixed} {
    position: sticky;
    inset-block-end: 0;
    z-index: var(--footer-z-index);
    background-color: var(--mui-palette-background-paper);
    box-shadow: 0 3px 12px 0px rgb(var(--mui-mainColorChannels-lightShadow) / 0.14);
    [data-mui-color-scheme='dark'] & {
      box-shadow: 0 3px 12px 0px rgb(var(--mui-mainColorChannels-darkShadow) / 0.14);
    }
    [data-skin='bordered'] & {
      box-shadow: none;
      border-block-start: 1px solid var(--border-color);
    }
  }

  &.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].footerContentCompact} .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].footerContentWrapper} {
    margin-inline: auto;
    max-inline-size: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].compactContentWidth}px;
  }

  .${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].footerContentWrapper} {
    padding-block: 16px;
    padding-inline: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].layoutPadding}px;
  }

  ${({ overrideStyles })=>overrideStyles}
`;
const __TURBOPACK__default__export__ = StyledFooter;
}}),
"[project]/src/@layouts/components/horizontal/Footer.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// Third-party Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/classnames/index.js [app-ssr] (ecmascript)");
// Config Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/configs/themeConfig.js [app-ssr] (ecmascript)");
// Hook Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useSettings$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@core/hooks/useSettings.jsx [app-ssr] (ecmascript)");
// Util Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@layouts/utils/layoutClasses.js [app-ssr] (ecmascript)");
// Styled Component Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$styles$2f$horizontal$2f$StyledFooter$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@layouts/styles/horizontal/StyledFooter.jsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const Footer = (props)=>{
    // Props
    const { children, overrideStyles } = props;
    // Hooks
    const { settings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useSettings$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSettings"])();
    // Vars
    const { footerContentWidth } = settings;
    const footerStatic = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].footer.type === 'static';
    const footerFixed = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].footer.type === 'fixed';
    const footerContentCompact = footerContentWidth === 'compact';
    const footerContentWide = footerContentWidth === 'wide';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$styles$2f$horizontal$2f$StyledFooter$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        overrideStyles: overrideStyles,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].footer, {
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].footerStatic]: footerStatic,
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].footerFixed]: footerFixed,
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].footerContentCompact]: footerContentCompact,
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].footerContentWide]: footerContentWide
        }),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$layouts$2f$utils$2f$layoutClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["horizontalLayoutClasses"].footerContentWrapper,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/@layouts/components/horizontal/Footer.jsx",
            lineNumber: 42,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/@layouts/components/horizontal/Footer.jsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = Footer;
}}),
"[project]/src/contexts/nextAuthProvider.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "NextAuthProvider": (()=>NextAuthProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// Third-party Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/react/index.js [app-ssr] (ecmascript)");
'use client';
;
;
const NextAuthProvider = ({ children, ...rest })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SessionProvider"], {
        ...rest,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/nextAuthProvider.jsx",
        lineNumber: 7,
        columnNumber: 10
    }, this);
};
}}),
"[project]/src/libs/styles/AppReactToastify.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-toastify/dist/react-toastify.esm.mjs [app-ssr] (ecmascript)");
// Config Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/configs/themeConfig.js [app-ssr] (ecmascript)");
// Hook Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useSettings$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@core/hooks/useSettings.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/styles/styled.js [app-ssr] (ecmascript) <locals> <export default as styled>");
// MUI Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$useMediaQuery$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/useMediaQuery/index.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
// Styled Components
const ToastifyWrapper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(({ theme })=>{
    // Hooks
    const isSmallScreen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$useMediaQuery$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])((theme)=>theme.breakpoints.down(480));
    const { settings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useSettings$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSettings"])();
    return {
        ...isSmallScreen && {
            '& .Toastify__toast-container': {
                marginBlockStart: theme.spacing(3),
                marginInline: theme.spacing(3),
                width: 'calc(100dvw - 1.5rem)'
            }
        },
        '& .Toastify__toast': {
            minBlockSize: 46,
            borderRadius: 'var(--mui-shape-borderRadius)',
            padding: theme.spacing(1.5, 2.5),
            backgroundColor: 'var(--mui-palette-background-paper)',
            boxShadow: settings.skin === 'bordered' ? 'none' : 'var(--mui-customShadows-md)',
            border: settings.skin === 'bordered' && '1px solid var(--mui-palette-divider)',
            ...isSmallScreen && {
                marginBlockEnd: theme.spacing(4)
            },
            '&:not(.custom-toast)': {
                '& .Toastify__toast-body': {
                    color: 'var(--mui-palette-text-primary)'
                },
                '&.Toastify__toast--success': {
                    '& .Toastify__toast-icon svg': {
                        fill: 'var(--mui-palette-success-main)'
                    }
                },
                '&.Toastify__toast--error': {
                    '& .Toastify__toast-icon svg': {
                        fill: 'var(--mui-palette-error-main)'
                    }
                },
                '&.Toastify__toast--warning': {
                    '& .Toastify__toast-icon svg': {
                        fill: 'var(--mui-palette-warning-main)'
                    }
                },
                '&.Toastify__toast--info': {
                    '& .Toastify__toast-icon svg': {
                        fill: 'var(--mui-palette-info-main)'
                    }
                }
            },
            '[data-skin="bordered"] &': {
                boxShadow: 'none',
                border: `1px solid var(--mui-palette-divider)`
            }
        },
        '& .Toastify__toast-body': {
            margin: 0,
            lineHeight: 1.46667,
            fontSize: theme.typography.body1.fontSize
        },
        '& .Toastify__toast-icon': {
            marginRight: theme.spacing(3),
            height: 20,
            width: 20,
            '& .Toastify__spinner': {
                margin: 3,
                height: 14,
                width: 14
            }
        },
        '& .Toastify__close-button': {
            color: 'var(--mui-palette-text-primary)'
        }
    };
});
const AppReactToastify = (props)=>{
    const { boxProps, direction = 'ltr', ...rest } = props;
    const positionMap = {
        'top-right': 'top-left',
        'top-left': 'top-right',
        'bottom-left': 'bottom-right',
        'bottom-right': 'bottom-left',
        'top-center': 'top-center',
        'bottom-center': 'bottom-center'
    };
    const position = direction === 'rtl' ? positionMap[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].toastPosition] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].toastPosition;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastifyWrapper, {
        ...boxProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastContainer"], {
            rtl: direction === 'rtl',
            position: position,
            autoClose: 5000,
            hideProgressBar: false,
            newestOnTop: false,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
            theme: "light",
            style: {
                fontSize: '14px'
            },
            toastStyle: {
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            },
            ...rest
        }, void 0, false, {
            fileName: "[project]/src/libs/styles/AppReactToastify.jsx",
            lineNumber: 109,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/libs/styles/AppReactToastify.jsx",
        lineNumber: 108,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = AppReactToastify;
}}),
"[project]/src/utils/string.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ensurePrefix": (()=>ensurePrefix),
    "withoutPrefix": (()=>withoutPrefix),
    "withoutSuffix": (()=>withoutSuffix)
});
const ensurePrefix = (str, prefix)=>str.startsWith(prefix) ? str : `${prefix}${str}`;
const withoutSuffix = (str, suffix)=>str.endsWith(suffix) ? str.slice(0, -suffix.length) : str;
const withoutPrefix = (str, prefix)=>str.startsWith(prefix) ? str.slice(prefix.length) : str;
}}),
"[project]/src/utils/i18n.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Config Imports
__turbopack_esm__({
    "getLocalizedUrl": (()=>getLocalizedUrl),
    "isUrlMissingLocale": (()=>isUrlMissingLocale)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$i18n$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/configs/i18n.js [app-ssr] (ecmascript)");
// Util Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$string$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/utils/string.js [app-ssr] (ecmascript)");
;
;
const isUrlMissingLocale = (url)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$i18n$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["i18n"].locales.every((locale)=>!(url.startsWith(`/${locale}/`) || url === `/${locale}`));
};
const getLocalizedUrl = (url, languageCode)=>{
    if (!url || !languageCode) throw new Error("URL or Language Code can't be empty");
    return isUrlMissingLocale(url) ? `/${languageCode}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$string$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ensurePrefix"])(url, '/')}` : url;
};
}}),
"[project]/src/utils/getDictionary.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Dictionary imports
__turbopack_esm__({
    "getDictionary": (()=>getDictionary)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$dictionaries$2f$en$2e$json__$28$json$29$__ = __turbopack_import__("[project]/src/data/dictionaries/en.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$dictionaries$2f$it$2e$json__$28$json$29$__ = __turbopack_import__("[project]/src/data/dictionaries/it.json (json)");
;
;
const dictionaries = {
    en: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$dictionaries$2f$en$2e$json__$28$json$29$__["default"],
    it: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$dictionaries$2f$it$2e$json__$28$json$29$__["default"]
};
const getDictionary = (locale)=>{
    return dictionaries[locale] || dictionaries.en;
};
}}),
"[project]/src/utils/getInitials.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Returns initials from string
__turbopack_esm__({
    "getInitials": (()=>getInitials)
});
const getInitials = (string)=>{
    if (!string || typeof string !== 'string') {
        return '?';
    }
    return string.split(/\s/).reduce((response, word)=>response += word.slice(0, 1), '');
};
}}),
"[project]/src/data/dictionaries/en.json (json)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__(JSON.parse("{\"common\":{\"loading\":\"Loading...\",\"error\":\"Error\",\"success\":\"Success\",\"add\":\"Add\",\"edit\":\"Edit\",\"delete\":\"Delete\",\"cancel\":\"Cancel\",\"save\":\"Save\",\"close\":\"Close\",\"search\":\"Search\",\"noData\":\"No data available\",\"actions\":\"Actions\",\"view\":\"View\",\"status\":\"Status\",\"submit\":\"Submit\",\"back\":\"Back\",\"next\":\"Next\",\"previous\":\"Previous\"},\"auth\":{\"login\":\"Login\",\"logout\":\"Logout\",\"register\":\"Register\",\"email\":\"Email\",\"password\":\"Password\",\"confirmPassword\":\"Confirm Password\",\"forgotPassword\":\"Forgot Password\",\"resetPassword\":\"Reset Password\",\"authenticationRequired\":\"Authentication Required\"},\"navigation\":{\"dashboard\":\"Dashboard\",\"branch\":\"Branch\",\"paymentMethods\":\"Payment Methods\",\"service\":\"Services\",\"employee\":\"Employees\",\"client\":\"Clients\",\"task\":\"Tasks\",\"invoice\":\"Invoices\"},\"dashboard\":{\"title\":\"Dashboard\",\"mainDashboard\":\"Main Dashboard\",\"analyticsDashboard\":\"Analytics Dashboard\",\"welcome\":\"Welcome\",\"overview\":\"Overview\",\"statistics\":\"Statistics\",\"reports\":\"Reports\",\"clockInOut\":{\"title\":\"Clock In/Out\",\"currentlyClockedOut\":\"You are currently clocked out\",\"currentlyClockedIn\":\"You are currently clocked in\",\"clockIn\":\"Clock In\",\"clockOut\":\"Clock Out\",\"lastClockIn\":\"Last Clock In\",\"lastClockOut\":\"Last Clock Out\",\"totalHoursToday\":\"Total Hours Today\",\"workingHours\":\"Working Hours\"},\"taskStatistics\":{\"title\":\"Task Statistics\",\"overviewOfMyActivities\":\"Overview of My Activities\",\"pendingActivities\":\"Pending\",\"completedActivities\":\"Completed\",\"cancelledActivities\":\"Cancelled\",\"totalTasks\":\"Total Tasks\",\"inProgress\":\"In Progress\",\"completed\":\"Completed\",\"cancelled\":\"Cancelled\",\"overdue\":\"Overdue\"},\"timesheet\":{\"title\":\"My Timesheet\",\"hoursWorkedIn\":\"Hours worked in\",\"totalHours\":\"Total Hours\",\"averageHours\":\"Average Hours\",\"hoursPerDay\":\"Hours per Day\",\"workingDays\":\"Working Days\",\"overtimeHours\":\"Overtime Hours\",\"regularHours\":\"Regular Hours\"},\"earnings\":{\"title\":\"Average Weekly Earnings\",\"currentAverage\":\"Current Average\",\"vsLastWeek\":\"vs last week\",\"vsLastMonth\":\"vs last month\",\"vsLastYear\":\"vs last year\",\"week\":\"Week\",\"month\":\"Month\",\"year\":\"Year\",\"totalWeeklyRevenue\":\"Total Weekly Revenue\",\"averagePerDay\":\"Average per Day\",\"growthVsPreviousWeek\":\"Growth vs Previous Week\",\"growthVsPreviousMonth\":\"Growth vs Previous Month\",\"growthVsPreviousYear\":\"Growth vs Previous Year\",\"revenue\":\"Revenue\",\"earnings\":\"Earnings\",\"income\":\"Income\",\"profit\":\"Profit\"},\"projects\":{\"title\":\"Projects Overview\",\"activeProjects\":\"Active Projects\",\"completedProjects\":\"Completed Projects\",\"totalProjects\":\"Total Projects\",\"projectStatus\":\"Project Status\",\"recentProjects\":\"Recent Projects\",\"projectProgress\":\"Project Progress\"},\"tickets\":{\"title\":\"Ticket Status\",\"openTickets\":\"Open Tickets\",\"closedTickets\":\"Closed Tickets\",\"totalTickets\":\"Total Tickets\",\"ticketStatus\":\"Ticket Status\",\"recentTickets\":\"Recent Tickets\",\"ticketPriority\":\"Ticket Priority\"},\"calendar\":{\"title\":\"Calendar\",\"eventsToday\":\"Events Today\",\"upcomingEvents\":\"Upcoming Events\",\"noEventsToday\":\"No events today\",\"addEvent\":\"Add Event\",\"viewCalendar\":\"View Calendar\"},\"clients\":{\"title\":\"Total Clients\",\"allTime\":\"All Time\",\"newClients\":\"New Clients\",\"activeClients\":\"Active Clients\",\"totalClients\":\"Total Clients\",\"clientGrowth\":\"Client Growth\"},\"invoices\":{\"title\":\"Recent Invoices\",\"recentInvoices\":\"Recent Invoices\",\"totalInvoices\":\"Total Invoices\",\"paidInvoices\":\"Paid Invoices\",\"unpaidInvoices\":\"Unpaid Invoices\",\"overdueInvoices\":\"Overdue Invoices\",\"totalRevenue\":\"Total Revenue\",\"averageInvoiceValue\":\"Average Invoice Value\"},\"common\":{\"loading\":\"Loading...\",\"error\":\"Error\",\"retry\":\"Retry\",\"refresh\":\"Refresh\",\"viewAll\":\"View All\",\"seeMore\":\"See More\",\"noData\":\"No data available\",\"noDataAvailable\":\"No data available\",\"comingSoon\":\"Coming Soon\",\"underConstruction\":\"Under Construction\",\"lastUpdated\":\"Last Updated\",\"today\":\"Today\",\"yesterday\":\"Yesterday\",\"thisWeek\":\"This Week\",\"thisMonth\":\"This Month\",\"thisYear\":\"This Year\",\"all\":\"All\",\"none\":\"None\",\"select\":\"Select\",\"filter\":\"Filter\",\"search\":\"Search\",\"sort\":\"Sort\",\"export\":\"Export\",\"print\":\"Print\",\"share\":\"Share\",\"settings\":\"Settings\",\"help\":\"Help\",\"support\":\"Support\",\"documentation\":\"Documentation\"},\"timePeriods\":{\"today\":\"Today\",\"yesterday\":\"Yesterday\",\"thisWeek\":\"This Week\",\"lastWeek\":\"Last Week\",\"thisMonth\":\"This Month\",\"lastMonth\":\"Last Month\",\"thisYear\":\"This Year\",\"lastYear\":\"Last Year\",\"allTime\":\"All Time\",\"custom\":\"Custom Range\",\"monday\":\"Mon\",\"tuesday\":\"Tue\",\"wednesday\":\"Wed\",\"thursday\":\"Thu\",\"friday\":\"Fri\",\"saturday\":\"Sat\",\"sunday\":\"Sun\",\"week1\":\"Week 1\",\"week2\":\"Week 2\",\"week3\":\"Week 3\",\"week4\":\"Week 4\",\"january\":\"JANUARY\",\"february\":\"FEBRUARY\",\"march\":\"MARCH\",\"april\":\"APRIL\",\"may\":\"MAY\",\"june\":\"JUNE\",\"july\":\"JULY\",\"august\":\"AUGUST\",\"september\":\"SEPTEMBER\",\"october\":\"OCTOBER\",\"november\":\"NOVEMBER\",\"december\":\"DECEMBER\"},\"status\":{\"active\":\"Active\",\"inactive\":\"Inactive\",\"pending\":\"Pending\",\"completed\":\"Completed\",\"cancelled\":\"Cancelled\",\"overdue\":\"Overdue\",\"inProgress\":\"In Progress\",\"onHold\":\"On Hold\",\"draft\":\"Draft\",\"published\":\"Published\",\"archived\":\"Archived\"},\"priorities\":{\"low\":\"Low\",\"medium\":\"Medium\",\"high\":\"High\",\"urgent\":\"Urgent\",\"critical\":\"Critical\"}},\"tasks\":{\"title\":\"Title\",\"taskManagement\":\"Task Management\",\"addNewTask\":\"Add New Task\",\"editTask\":\"Edit Task\",\"deleteTask\":\"Delete Task\",\"viewTask\":\"View Task\",\"createTask\":\"Create Task\",\"updateTask\":\"Update Task\",\"taskDetails\":\"Task Details\",\"searchTask\":\"Search Task...\",\"noTasksAvailable\":\"No tasks available\",\"loadingTasks\":\"Loading Tasks...\",\"all\":\"All\",\"status\":{\"pending\":\"Pending\",\"inProgress\":\"In Progress\",\"completed\":\"Completed\",\"cancelled\":\"Cancelled\",\"onHold\":\"On Hold\"},\"assignedTo\":\"Assigned To\",\"branch\":\"Branch\",\"client\":\"Client\",\"service\":\"Service\",\"dueDate\":\"Due Date\",\"action\":\"Action\",\"view\":\"View\",\"edit\":\"Edit\",\"generateInvoice\":\"Generate Invoice\",\"delete\":\"Delete\",\"create\":\"Create\",\"update\":\"Update\",\"cancel\":\"Cancel\",\"creating\":\"Creating...\",\"updating\":\"Updating...\",\"selectClient\":\"Select Client\",\"selectCategory\":\"Select Category\",\"selectService\":\"Select Service\",\"assignToEmployee\":\"Assign To Employee\",\"priority\":{\"low\":\"Low\",\"medium\":\"Medium\",\"high\":\"High\",\"urgent\":\"Urgent\"},\"startDate\":\"Start Date\",\"estimatedHours\":\"Estimated Hours\",\"notes\":\"Notes\",\"enterNotes\":\"Enter any additional notes\",\"loadingClients\":\"Loading clients...\",\"noClientsAvailable\":\"No clients available\",\"loadingCategories\":\"Loading categories...\",\"noCategoriesAvailable\":\"No categories available\",\"loadingServices\":\"Loading services...\",\"noServicesAvailable\":\"No services available for this category\",\"selectCategoryFirst\":\"Please select a category first\",\"loadingEmployees\":\"Loading employees...\",\"noEmployeesAvailable\":\"No employees available\",\"taskDescriptionRequired\":\"Task description is required.\",\"pleaseSelectClient\":\"Please select a client.\",\"pleaseSelectEmployee\":\"Please select an assigned employee.\",\"startDateAfterDueDate\":\"Start date cannot be after due date.\",\"categoryRequired\":\"Category is required.\",\"serviceRequired\":\"Service is required.\",\"assignedEmployeeRequired\":\"Assigned employee is required.\",\"statusRequired\":\"Status is required.\",\"priorityRequired\":\"Priority is required.\",\"startDateRequired\":\"Start date is required.\",\"dueDateRequired\":\"Due date is required.\",\"estimatedHoursRequired\":\"Estimated hours is required.\",\"estimatedHoursMin\":\"Estimated hours must be at least 0.5 hours.\",\"notesRequired\":\"Notes are required.\",\"descriptionRequired\":\"Description is required.\",\"pleaseFillAllFields\":\"Please fill all required fields\",\"pleaseFixValidationErrors\":\"Please fix validation errors before submitting\",\"authenticationRequired\":\"Authentication required to update invoice status\",\"notAuthenticated\":\"Not authenticated. Please log in to view tasks.\",\"authenticationTokenNotFound\":\"Authentication token not found. Please log in again.\",\"taskCreatedSuccessfully\":\"Task created successfully!\",\"taskUpdatedSuccessfully\":\"Task updated successfully!\",\"taskDeletedSuccessfully\":\"Task deleted successfully!\",\"failedToCreateTask\":\"Failed to create task\",\"failedToUpdateTask\":\"Failed to update task\",\"failedToDeleteTask\":\"Failed to delete task\",\"networkError\":\"Network error or unexpected issue. Please try again.\",\"deleteConfirmation\":{\"title\":\"Delete Task\",\"message\":\"Are you sure you want to delete this task? This action cannot be undone.\",\"confirm\":\"Delete\",\"cancel\":\"Cancel\",\"deleting\":\"Deleting...\"},\"fields\":{\"title\":\"Title\",\"client\":\"Client\",\"service\":\"Service\",\"assignedTo\":\"Assigned To\",\"status\":\"Status\",\"dueDate\":\"Due Date\",\"action\":\"Action\"},\"basicInformation\":\"Basic Information\",\"clientInformation\":\"Client Information\",\"serviceInformation\":\"Service Information\",\"assignmentInformation\":\"Assignment Information\",\"timeline\":\"Timeline\",\"additionalInformation\":\"Additional Information\",\"taskId\":\"Task ID\",\"createdDate\":\"Created Date\",\"description\":\"Description\",\"clientName\":\"Client Name\",\"clientEmail\":\"Client Email\",\"clientPhone\":\"Client Phone\",\"serviceName\":\"Service Name\",\"servicePrice\":\"Service Price\",\"serviceCategory\":\"Service Category\",\"assignedEmployee\":\"Assigned Employee\",\"employeeRole\":\"Employee Role\",\"employeeEmail\":\"Employee Email\",\"actualHours\":\"Actual Hours\",\"lastUpdated\":\"Last Updated\",\"hours\":\"hours\",\"markedAsPaid\":\"Invoice marked as paid\",\"markedAsUnpaid\":\"Invoice marked as unpaid\",\"failedToUpdateStatus\":\"Failed to update invoice status\"},\"clients\":{\"title\":\"Clients\",\"clientManagement\":\"Client Management\",\"addNewClient\":\"Add New Client\",\"editClient\":\"Edit Client\",\"deleteClient\":\"Delete Client\",\"viewClient\":\"View Client\",\"createClient\":\"Create Client\",\"updateClient\":\"Update Client\",\"clientDetails\":\"Client Details\",\"searchClient\":\"Search Client...\",\"noClientsAvailable\":\"No clients available\",\"loadingClients\":\"Loading Clients...\",\"all\":\"All\",\"status\":{\"active\":\"Active\",\"pending\":\"Pending\",\"processing\":\"Processing\",\"cancelled\":\"Cancelled\"},\"name\":\"Name\",\"email\":\"Email\",\"phone\":\"Phone\",\"address\":\"Address\",\"nationalId\":\"National ID\",\"branch\":\"Branch\",\"action\":\"Action\",\"view\":\"View\",\"edit\":\"Edit\",\"delete\":\"Delete\",\"create\":\"Create\",\"update\":\"Update\",\"cancel\":\"Cancel\",\"creating\":\"Creating...\",\"updating\":\"Updating...\",\"selectBranch\":\"Select Branch\",\"enterName\":\"Enter client name\",\"enterEmail\":\"Enter email address\",\"enterPhone\":\"Enter phone number\",\"enterAddress\":\"Enter address\",\"enterNationalId\":\"Enter national identification number\",\"loadingBranches\":\"Loading branches...\",\"noBranchesAvailable\":\"No branches available\",\"clientNameRequired\":\"Client name is required.\",\"emailRequired\":\"Email is required.\",\"emailInvalid\":\"Please enter a valid email address.\",\"phoneRequired\":\"Phone number is required.\",\"addressRequired\":\"Address is required.\",\"nationalIdRequired\":\"National identification number is required.\",\"branchRequired\":\"Branch is required.\",\"authenticationRequired\":\"Authentication required to fetch clients. Please log in.\",\"notAuthenticated\":\"Not authenticated. Please log in to view clients.\",\"authenticationTokenNotFound\":\"Authentication token not found. Please log in again.\",\"clientCreatedSuccessfully\":\"Client created successfully!\",\"clientUpdatedSuccessfully\":\"Client updated successfully!\",\"clientDeletedSuccessfully\":\"Client deleted successfully!\",\"close\":\"Close\",\"failedToCreateClient\":\"Failed to create client\",\"failedToUpdateClient\":\"Failed to update client\",\"failedToFetchClients\":\"Failed to fetch clients\",\"networkError\":\"Network error occurred\",\"failedToDeleteClient\":\"Failed to delete client\",\"deleteConfirmation\":{\"title\":\"Delete Client\",\"message\":\"Are you sure you want to delete this client? This action cannot be undone.\",\"confirm\":\"Delete\",\"cancel\":\"Cancel\",\"deleting\":\"Deleting...\"},\"fields\":{\"name\":\"Name\",\"email\":\"Email\",\"phone\":\"Phone\",\"address\":\"Address\",\"nationalId\":\"National ID\",\"branch\":\"Branch\",\"status\":\"Status\",\"action\":\"Action\"},\"basicInformation\":\"Basic Information\",\"contactInformation\":\"Contact Information\",\"additionalInformation\":\"Additional Information\",\"clientId\":\"Client ID\",\"createdDate\":\"Created Date\",\"lastUpdated\":\"Last Updated\",\"clientName\":\"Client Name\",\"clientEmail\":\"Client Email\",\"clientPhone\":\"Client Phone\",\"clientAddress\":\"Client Address\",\"nationalIdentificationNumber\":\"National Identification Number\",\"branchName\":\"Branch Name\",\"clientStatus\":\"Client Status\"},\"employees\":{\"title\":\"Employees\",\"employeeManagement\":\"Employee Management\",\"addNewEmployee\":\"Add New Employee\",\"editEmployee\":\"Edit Employee\",\"deleteEmployee\":\"Delete Employee\",\"viewEmployee\":\"View Employee\",\"createEmployee\":\"Create Employee\",\"updateEmployee\":\"Update Employee\",\"employeeDetails\":\"Employee Details\",\"searchEmployee\":\"Search Employee...\",\"noEmployeesAvailable\":\"No employees available\",\"loadingEmployees\":\"Loading Employees...\",\"all\":\"All\",\"status\":{\"active\":\"Active\",\"inactive\":\"Inactive\",\"pending\":\"Pending\",\"suspended\":\"Suspended\"},\"name\":\"Name\",\"email\":\"Email\",\"phone\":\"Phone\",\"role\":\"Role\",\"branch\":\"Branch\",\"permissions\":\"Permissions\",\"action\":\"Action\",\"view\":\"View\",\"edit\":\"Edit\",\"delete\":\"Delete\",\"create\":\"Create\",\"update\":\"Update\",\"cancel\":\"Cancel\",\"creating\":\"Creating...\",\"updating\":\"Updating...\",\"selectBranch\":\"Select Branch\",\"selectRole\":\"Select Role\",\"selectPermissions\":\"Select Permissions\",\"enterName\":\"Enter employee name\",\"enterEmail\":\"Enter email address\",\"enterPhone\":\"Enter phone number\",\"enterPassword\":\"Enter password\",\"confirmPassword\":\"Confirm Password\",\"loadingBranches\":\"Loading branches...\",\"noBranchesAvailable\":\"No branches available\",\"loadingRoles\":\"Loading roles...\",\"noRolesAvailable\":\"No roles available\",\"employeeNameRequired\":\"Employee name is required.\",\"emailRequired\":\"Email is required.\",\"emailInvalid\":\"Please enter a valid email address.\",\"phoneRequired\":\"Phone number is required.\",\"passwordRequired\":\"Password is required.\",\"passwordMinLength\":\"Password must be at least 6 characters long.\",\"passwordMismatch\":\"Passwords do not match.\",\"roleRequired\":\"Role is required.\",\"branchRequired\":\"Branch is required.\",\"permissionsRequired\":\"At least one permission is required.\",\"authenticationRequired\":\"Authentication required to fetch employees. Please log in.\",\"notAuthenticated\":\"Not authenticated. Please log in to view employees.\",\"authenticationTokenNotFound\":\"Authentication token not found. Please log in again.\",\"employeeCreatedSuccessfully\":\"Employee created successfully!\",\"employeeUpdatedSuccessfully\":\"Employee updated successfully!\",\"employeeDeletedSuccessfully\":\"Employee deleted successfully!\",\"failedToCreateEmployee\":\"Failed to create employee\",\"failedToUpdateEmployee\":\"Failed to update employee\",\"failedToDeleteEmployee\":\"Failed to delete employee\",\"networkError\":\"Network error or unexpected issue. Please try again.\",\"deleteConfirmation\":{\"title\":\"Delete Employee\",\"message\":\"Are you sure you want to delete this employee? This action cannot be undone.\",\"confirm\":\"Delete\",\"cancel\":\"Cancel\",\"deleting\":\"Deleting...\"},\"fields\":{\"name\":\"Name\",\"email\":\"Email\",\"phone\":\"Phone\",\"role\":\"Role\",\"branch\":\"Branch\",\"permissions\":\"Permissions\",\"status\":\"Status\",\"action\":\"Action\"},\"basicInformation\":\"Basic Information\",\"contactInformation\":\"Contact Information\",\"roleInformation\":\"Role Information\",\"permissionInformation\":\"Permission Information\",\"employeeId\":\"Employee ID\",\"createdDate\":\"Created Date\",\"lastUpdated\":\"Last Updated\",\"employeeName\":\"Employee Name\",\"employeeEmail\":\"Employee Email\",\"employeePhone\":\"Employee Phone\",\"employeeRole\":\"Employee Role\",\"employeeBranch\":\"Employee Branch\",\"employeeStatus\":\"Employee Status\",\"password\":\"Password\",\"permissionLevel\":\"Permission Level\",\"accessLevel\":\"Access Level\",\"attendanceReport\":\"Attendance Report\",\"generateReport\":\"Generate Report\",\"reportGenerated\":\"Report generated successfully!\",\"failedToGenerateReport\":\"Failed to generate report\"},\"services\":{\"title\":\"Services\",\"serviceManagement\":\"Service Management\",\"addNewService\":\"Add New Service\",\"editService\":\"Edit Service\",\"deleteService\":\"Delete Service\",\"viewService\":\"View Service\",\"createService\":\"Create Service\",\"updateService\":\"Update Service\",\"serviceDetails\":\"Service Details\",\"searchService\":\"Search Service...\",\"noServicesAvailable\":\"No services available\",\"loadingServices\":\"Loading Services...\",\"all\":\"All\",\"status\":{\"active\":\"Active\",\"inactive\":\"Inactive\",\"pending\":\"Pending\",\"discontinued\":\"Discontinued\"},\"name\":\"Name\",\"price\":\"Price\",\"category\":\"Category\",\"description\":\"Description\",\"action\":\"Action\",\"view\":\"View\",\"edit\":\"Edit\",\"delete\":\"Delete\",\"create\":\"Create\",\"update\":\"Update\",\"cancel\":\"Cancel\",\"creating\":\"Creating...\",\"updating\":\"Updating...\",\"selectCategory\":\"Select Category\",\"enterName\":\"Enter service name\",\"enterPrice\":\"Enter service price\",\"enterDescription\":\"Enter service description\",\"loadingCategories\":\"Loading categories...\",\"noCategoriesAvailable\":\"No categories available\",\"serviceNameRequired\":\"Service name is required.\",\"priceRequired\":\"Price is required.\",\"priceInvalid\":\"Please enter a valid price.\",\"categoryRequired\":\"Category is required.\",\"descriptionRequired\":\"Description is required.\",\"authenticationRequired\":\"Authentication required to fetch services. Please log in.\",\"notAuthenticated\":\"Not authenticated. Please log in to view services.\",\"authenticationTokenNotFound\":\"Authentication token not found. Please log in again.\",\"serviceCreatedSuccessfully\":\"Service created successfully!\",\"serviceUpdatedSuccessfully\":\"Service updated successfully!\",\"serviceDeletedSuccessfully\":\"Service deleted successfully!\",\"failedToCreateService\":\"Failed to create service\",\"failedToUpdateService\":\"Failed to update service\",\"failedToDeleteService\":\"Failed to delete service\",\"networkError\":\"Network error or unexpected issue. Please try again.\",\"deleteConfirmation\":{\"title\":\"Delete Service\",\"message\":\"Are you sure you want to delete this service? This action cannot be undone.\",\"confirm\":\"Delete\",\"cancel\":\"Cancel\",\"deleting\":\"Deleting...\"},\"fields\":{\"name\":\"Name\",\"price\":\"Price\",\"category\":\"Category\",\"description\":\"Description\",\"status\":\"Status\",\"action\":\"Action\"},\"basicInformation\":\"Basic Information\",\"pricingInformation\":\"Pricing Information\",\"categoryInformation\":\"Category Information\",\"serviceId\":\"Service ID\",\"createdDate\":\"Created Date\",\"lastUpdated\":\"Last Updated\",\"serviceName\":\"Service Name\",\"servicePrice\":\"Service Price\",\"serviceCategory\":\"Service Category\",\"serviceDescription\":\"Service Description\",\"serviceStatus\":\"Service Status\",\"currency\":\"Currency\",\"pricePerUnit\":\"Price Per Unit\",\"categoryName\":\"Category Name\",\"serviceType\":\"Service Type\"},\"invoices\":{\"title\":\"Invoices\",\"createInvoice\":\"Create Invoice\",\"editInvoice\":\"Edit Invoice\",\"deleteInvoice\":\"Delete Invoice\",\"invoiceDetails\":\"Invoice Details\",\"invoiceManagement\":\"Invoice Management\",\"searchInvoice\":\"Search Invoice\",\"noDataAvailable\":\"No data available\",\"loadingInvoiceData\":\"Loading invoice data...\",\"createNewInvoice\":\"Create New Invoice\",\"fillDetailsToCreate\":\"Fill in the details to create a new invoice\",\"basicInformation\":\"Basic Information\",\"invoiceItems\":\"Invoice Items\",\"paymentInformation\":\"Payment Information\",\"additionalInformation\":\"Additional Information\",\"invoiceTo\":\"Invoice To:\",\"billTo\":\"Bill To:\",\"services\":\"Services\",\"serviceCategory\":\"Service Category\",\"serviceName\":\"Service Name\",\"description\":\"Description\",\"rate\":\"Rate\",\"discount\":\"Discount\",\"total\":\"Total\",\"addService\":\"Add Service\",\"selectCategory\":\"Select Category\",\"selectService\":\"Select Service\",\"selectCategoryFirst\":\"Select Category First\",\"selectClient\":\"Select Client\",\"chooseClient\":\"Choose a client\",\"noClientSelected\":\"No client selected\",\"noInvoiceItemsFound\":\"No invoice items found\",\"salesperson\":\"Salesperson:\",\"selectSalesperson\":\"Select Salesperson\",\"thanksMessage\":\"Thanks Message\",\"thanksForBusiness\":\"Thanks for your business\",\"paymentTerms\":\"Payment Terms:\",\"enterPaymentTerms\":\"Enter payment terms (e.g., Payment due within 30 days of invoice date)\",\"clientNotes\":\"Client Notes:\",\"addClientNotes\":\"Add notes that will be visible to the client on the invoice\",\"subtotal\":\"Subtotal:\",\"tax\":\"Tax\",\"totalDue\":\"Total Due:\",\"paymentMethod\":\"Payment Method:\",\"bankName\":\"Bank name:\",\"country\":\"Country:\",\"iban\":\"IBAN:\",\"swiftCode\":\"SWIFT code:\",\"noBankAccountSelected\":\"No bank account selected\",\"dateIssued\":\"Date Issued:\",\"dateDue\":\"Date Due:\",\"invoiceNumber\":\"Invoice Number\",\"invoiceNumberGenerated\":\"Invoice number will be generated\",\"dueDate\":\"Due Date\",\"client\":\"Client\",\"amount\":\"Amount\",\"status\":{\"paid\":\"Paid\",\"pending\":\"Pending\",\"overdue\":\"Overdue\",\"draft\":\"Draft\"},\"action\":\"Action\",\"all\":\"All\",\"unpaid\":\"Unpaid\",\"paid\":\"Paid\",\"overdue\":\"Overdue\",\"cancelled\":\"Cancelled\",\"markAsPaid\":\"Mark as Paid\",\"markAsUnpaid\":\"Mark as Unpaid\",\"markAsCancelled\":\"Mark as Cancelled\",\"delete\":\"Delete\",\"service\":\"Service\",\"itemDescription\":\"Item description\",\"addItem\":\"Add Item\",\"autoGeneratedIfEmpty\":\"Auto-generated if empty\",\"notes\":\"Notes\",\"additionalNotesForInvoice\":\"Additional notes for the invoice\",\"thankYouMessage\":\"Thank You Message\",\"thankYouMessageForClient\":\"Thank you message for the client\",\"paymentTermsAndConditions\":\"Payment terms and conditions\",\"subtotalLabel\":\"Subtotal:\",\"discountLabel\":\"Discount:\",\"taxLabel\":\"Tax\",\"totalLabel\":\"Total:\",\"cancel\":\"Cancel\",\"creating\":\"Creating...\",\"clientRequired\":\"Client is required\",\"branchRequired\":\"Branch is required\",\"dueDateRequired\":\"Due date is required\",\"thankYouMessageRequired\":\"Thank you message is required\",\"atLeastOneItemRequired\":\"At least one item is required\",\"fillAllRequiredItemFields\":\"Please fill in all required item fields\",\"invoiceActions\":\"Invoice Actions\",\"preview\":\"Preview\",\"save\":\"Save\",\"saving\":\"Saving...\",\"updated\":\"Updated\",\"updateInvoice\":\"Update Invoice\",\"saved\":\"Saved\",\"invoiceCreatedSuccessfully\":\"Invoice created successfully! Invoice #\",\"invoiceUpdatedSuccessfully\":\"Invoice updated successfully! Invoice #\",\"pleaseSelectClient\":\"Please select a client to continue\",\"pleaseAddInvoiceItem\":\"Please add at least one invoice item\",\"pleaseAddThanksMessage\":\"Please add a thanks message\",\"pleaseSelectSalesperson\":\"Please select a salesperson\",\"pleaseSelectDueDate\":\"Please select a due date\",\"invoiceSummary\":\"Invoice Summary\",\"paymentSettings\":\"Payment Settings\",\"selectBankAccountForPayment\":\"Select bank account for payment details\",\"taxRate\":\"Tax Rate (%)\",\"enterTaxRate\":\"Enter tax rate (0-100%)\",\"displayOptions\":\"Display Options\",\"showPaymentTermsOnInvoice\":\"Show payment terms on invoice\",\"displayClientNotesSection\":\"Display client notes section\",\"noServicesAdded\":\"No services added\",\"notSet\":\"Not set\",\"notAssigned\":\"Not assigned\",\"note\":\"Note:\",\"loadingCategories\":\"Loading categories...\",\"noCategoriesAvailable\":\"No categories available\",\"fields\":{\"number\":\"Invoice Number\",\"date\":\"Invoice Date\",\"dueDate\":\"Due Date\",\"client\":\"Client\",\"services\":\"Services\",\"amount\":\"Amount\",\"status\":\"Status\",\"invoiceId\":\"Invoice ID\",\"service\":\"Service\",\"action\":\"Action\"},\"deleteConfirmation\":{\"title\":\"Delete Invoice\",\"message\":\"Are you sure you want to delete this invoice? This action cannot be undone.\",\"confirm\":\"Delete\",\"cancel\":\"Cancel\",\"deleting\":\"Deleting...\"}},\"paymentMethods\":{\"title\":\"Payment Methods\",\"paymentMethodManagement\":\"Payment Method Management\",\"addNewPaymentMethod\":\"Add New Payment Method\",\"editPaymentMethod\":\"Edit Payment Method\",\"deletePaymentMethod\":\"Delete Payment Method\",\"viewPaymentMethod\":\"View Payment Method\",\"createPaymentMethod\":\"Create Payment Method\",\"updatePaymentMethod\":\"Update Payment Method\",\"paymentMethodDetails\":\"Payment Method Details\",\"searchPaymentMethod\":\"Search Payment Method...\",\"noPaymentMethodsAvailable\":\"No payment methods available\",\"loadingPaymentMethods\":\"Loading Payment Methods...\",\"all\":\"All\",\"status\":{\"active\":\"Active\",\"inactive\":\"Inactive\",\"pending\":\"Pending\",\"suspended\":\"Suspended\"},\"name\":\"Name\",\"type\":\"Type\",\"accountNumber\":\"Account Number\",\"bankName\":\"Bank Name\",\"routingNumber\":\"Routing Number\",\"swiftCode\":\"SWIFT Code\",\"iban\":\"IBAN\",\"currency\":\"Currency\",\"isDefault\":\"Default\",\"action\":\"Action\",\"view\":\"View\",\"edit\":\"Edit\",\"delete\":\"Delete\",\"create\":\"Create\",\"update\":\"Update\",\"cancel\":\"Cancel\",\"creating\":\"Creating...\",\"updating\":\"Updating...\",\"selectType\":\"Select Type\",\"selectCurrency\":\"Select Currency\",\"enterName\":\"Enter payment method name\",\"enterAccountNumber\":\"Enter account number\",\"enterBankName\":\"Enter bank name\",\"enterRoutingNumber\":\"Enter routing number\",\"enterSwiftCode\":\"Enter SWIFT code\",\"enterIban\":\"Enter IBAN\",\"loadingCurrencies\":\"Loading currencies...\",\"noCurrenciesAvailable\":\"No currencies available\",\"paymentMethodNameRequired\":\"Payment method name is required.\",\"typeRequired\":\"Type is required.\",\"accountNumberRequired\":\"Account number is required.\",\"bankNameRequired\":\"Bank name is required.\",\"routingNumberRequired\":\"Routing number is required.\",\"swiftCodeRequired\":\"SWIFT code is required.\",\"ibanRequired\":\"IBAN is required.\",\"currencyRequired\":\"Currency is required.\",\"authenticationRequired\":\"Authentication required to fetch payment methods. Please log in.\",\"notAuthenticated\":\"Not authenticated. Please log in to view payment methods.\",\"authenticationTokenNotFound\":\"Authentication token not found. Please log in again.\",\"paymentMethodCreatedSuccessfully\":\"Payment method created successfully!\",\"paymentMethodUpdatedSuccessfully\":\"Payment method updated successfully!\",\"paymentMethodDeletedSuccessfully\":\"Payment method deleted successfully!\",\"failedToCreatePaymentMethod\":\"Failed to create payment method\",\"failedToUpdatePaymentMethod\":\"Failed to update payment method\",\"failedToDeletePaymentMethod\":\"Failed to delete payment method\",\"networkError\":\"Network error or unexpected issue. Please try again.\",\"deleteConfirmation\":{\"title\":\"Delete Payment Method\",\"message\":\"Are you sure you want to delete this payment method? This action cannot be undone.\",\"confirm\":\"Delete\",\"cancel\":\"Cancel\",\"deleting\":\"Deleting...\"},\"types\":{\"bankAccount\":\"Bank Account\",\"creditCard\":\"Credit Card\",\"paypal\":\"PayPal\",\"stripe\":\"Stripe\",\"crypto\":\"Cryptocurrency\",\"wireTransfer\":\"Wire Transfer\"},\"fields\":{\"name\":\"Name\",\"type\":\"Type\",\"accountNumber\":\"Account Number\",\"bankName\":\"Bank Name\",\"routingNumber\":\"Routing Number\",\"swiftCode\":\"SWIFT Code\",\"iban\":\"IBAN\",\"currency\":\"Currency\",\"isDefault\":\"Default\",\"status\":\"Status\",\"action\":\"Action\"},\"basicInformation\":\"Basic Information\",\"bankInformation\":\"Bank Information\",\"accountInformation\":\"Account Information\",\"paymentMethodId\":\"Payment Method ID\",\"createdDate\":\"Created Date\",\"lastUpdated\":\"Last Updated\",\"paymentMethodName\":\"Payment Method Name\",\"paymentMethodType\":\"Payment Method Type\",\"paymentMethodStatus\":\"Payment Method Status\",\"defaultPaymentMethod\":\"Default Payment Method\",\"setAsDefault\":\"Set as Default\",\"removeAsDefault\":\"Remove as Default\",\"supportedMethods\":\"Supported Payment Methods\",\"paymentProviders\":\"Payment Providers\",\"manualMethods\":\"Manual Payment Methods\",\"addPaymentMethods\":\"Add Payment Methods\",\"activateProvider\":\"Activate Provider\",\"deactivateProvider\":\"Deactivate Provider\",\"configureProvider\":\"Configure Provider\",\"providerSettings\":\"Provider Settings\",\"paymentSettings\":\"Payment Settings\"},\"branches\":{\"title\":\"Branches\",\"branchManagement\":\"Branch Management\",\"addNewBranch\":\"Add New Branch\",\"editBranch\":\"Edit Branch\",\"deleteBranch\":\"Delete Branch\",\"viewBranch\":\"View Branch\",\"createBranch\":\"Create Branch\",\"updateBranch\":\"Update Branch\",\"branchDetails\":\"Branch Details\",\"searchBranch\":\"Search Branch...\",\"noBranchesAvailable\":\"No branches available\",\"loadingBranches\":\"Loading Branches...\",\"all\":\"All\",\"status\":{\"active\":\"Active\",\"inactive\":\"Inactive\",\"pending\":\"Pending\",\"suspended\":\"Suspended\"},\"name\":\"Name\",\"address\":\"Address\",\"city\":\"City\",\"postalCode\":\"Postal Code\",\"province\":\"Province\",\"phone\":\"Phone\",\"email\":\"Email\",\"isActive\":\"Active\",\"action\":\"Action\",\"view\":\"View\",\"edit\":\"Edit\",\"delete\":\"Delete\",\"create\":\"Create\",\"update\":\"Update\",\"cancel\":\"Cancel\",\"creating\":\"Creating...\",\"updating\":\"Updating...\",\"enterName\":\"Enter branch name\",\"enterAddress\":\"Enter address\",\"enterCity\":\"Enter city\",\"enterPostalCode\":\"Enter postal code\",\"enterProvince\":\"Enter province\",\"enterPhone\":\"Enter phone number\",\"enterEmail\":\"Enter email address\",\"branchNameRequired\":\"Branch name is required.\",\"addressRequired\":\"Address is required.\",\"cityRequired\":\"City is required.\",\"postalCodeRequired\":\"Postal code is required.\",\"provinceRequired\":\"Province is required.\",\"phoneRequired\":\"Phone number is required.\",\"emailRequired\":\"Email is required.\",\"emailInvalid\":\"Please enter a valid email address.\",\"authenticationRequired\":\"Authentication required to fetch branches. Please log in.\",\"notAuthenticated\":\"Not authenticated. Please log in to view branches.\",\"authenticationTokenNotFound\":\"Authentication token not found. Please log in again.\",\"branchCreatedSuccessfully\":\"Branch created successfully!\",\"branchUpdatedSuccessfully\":\"Branch updated successfully!\",\"branchDeletedSuccessfully\":\"Branch deleted successfully!\",\"failedToCreateBranch\":\"Failed to create branch\",\"failedToUpdateBranch\":\"Failed to update branch\",\"failedToDeleteBranch\":\"Failed to delete branch\",\"networkError\":\"Network error or unexpected issue. Please try again.\",\"deleteConfirmation\":{\"title\":\"Delete Branch\",\"message\":\"Are you sure you want to delete this branch? This action cannot be undone.\",\"confirm\":\"Delete\",\"cancel\":\"Cancel\",\"deleting\":\"Deleting...\"},\"fields\":{\"name\":\"Name\",\"address\":\"Address\",\"city\":\"City\",\"postalCode\":\"Postal Code\",\"province\":\"Province\",\"phone\":\"Phone\",\"email\":\"Email\",\"isActive\":\"Active\",\"status\":\"Status\",\"action\":\"Action\"},\"basicInformation\":\"Basic Information\",\"contactInformation\":\"Contact Information\",\"locationInformation\":\"Location Information\",\"branchId\":\"Branch ID\",\"createdDate\":\"Created Date\",\"lastUpdated\":\"Last Updated\",\"branchName\":\"Branch Name\",\"branchAddress\":\"Branch Address\",\"branchCity\":\"Branch City\",\"branchPostalCode\":\"Branch Postal Code\",\"branchProvince\":\"Branch Province\",\"branchPhone\":\"Branch Phone\",\"branchEmail\":\"Branch Email\",\"branchStatus\":\"Branch Status\",\"setAsActive\":\"Set as Active\",\"removeAsActive\":\"Remove as Active\",\"branchLocation\":\"Branch Location\",\"contactDetails\":\"Contact Details\",\"operationalStatus\":\"Operational Status\"},\"earnings\":{\"title\":\"Earnings\",\"averageWeeklyEarnings\":\"Average Weekly Earnings\",\"thisWeekAverage\":\"This Week Average\",\"thisMonthAverage\":\"This Month Average\",\"thisYearAverage\":\"This Year Average\",\"weeklyEarnings\":\"Weekly Earnings\",\"totalWeeklyRevenue\":\"Total Weekly Revenue\",\"averagePerDay\":\"Average per Day\",\"growthVsPreviousWeek\":\"Growth vs Previous Week\",\"growthVsPreviousMonth\":\"Growth vs Previous Month\",\"growthVsPreviousYear\":\"Growth vs Previous Year\",\"vsLastWeek\":\"vs last week\",\"vsLastMonth\":\"vs last month\",\"vsLastYear\":\"vs last year\",\"week\":\"Week\",\"month\":\"Month\",\"year\":\"Year\",\"totalInvoicesThisWeek\":\"Total Invoices This Week\",\"invoices\":\"invoices\",\"paidInvoices\":\"Paid Invoices\",\"unpaidInvoices\":\"Unpaid Invoices\",\"overdueInvoices\":\"Overdue Invoices\",\"paid\":\"paid\",\"unpaid\":\"unpaid\",\"overdue\":\"overdue\",\"revenue\":\"Revenue\",\"expenses\":\"Expenses\",\"profit\":\"Profit\",\"totalEarnings\":\"Total Earnings\",\"monthlyEarnings\":\"Monthly Earnings\",\"yearlyEarnings\":\"Yearly Earnings\",\"dailyEarnings\":\"Daily Earnings\",\"hourlyEarnings\":\"Hourly Earnings\",\"earningsGrowth\":\"Earnings Growth\",\"earningsDecline\":\"Earnings Decline\",\"noEarningsData\":\"No earnings data available\",\"loadingEarnings\":\"Loading earnings data...\",\"failedToLoadEarnings\":\"Failed to load earnings data\",\"currency\":\"Currency\",\"amount\":\"Amount\",\"percentage\":\"Percentage\",\"trend\":\"Trend\",\"upward\":\"Upward\",\"downward\":\"Downward\",\"stable\":\"Stable\",\"dataPoints\":\"Data Points\",\"days\":\"days\",\"weeks\":\"weeks\",\"months\":\"months\",\"years\":\"years\"},\"settings\":{\"title\":\"Settings\",\"sections\":{\"profile\":\"Profile Settings\",\"security\":\"Security\",\"notifications\":\"Notifications\",\"preferences\":\"Preferences\",\"company\":\"Company Information\",\"branches\":\"Branch Management\"}}}"));}}),
"[project]/src/data/dictionaries/it.json (json)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__(JSON.parse("{\"common\":{\"loading\":\"Caricamento...\",\"error\":\"Errore\",\"success\":\"Successo\",\"add\":\"Aggiungi\",\"edit\":\"Modifica\",\"delete\":\"Elimina\",\"cancel\":\"Annulla\",\"save\":\"Salva\",\"close\":\"Chiudi\",\"search\":\"Cerca\",\"noData\":\"Nessun dato disponibile\",\"actions\":\"Azioni\",\"view\":\"Visualizza\",\"status\":\"Stato\",\"submit\":\"Invia\",\"back\":\"Indietro\",\"next\":\"Avanti\",\"previous\":\"Precedente\",\"pagination\":{\"showing\":\"Mostra da\",\"to\":\"a\",\"of\":\"di\",\"entries\":\"voci\"},\"branchId\":\"ID Filiale\",\"location\":\"Indirizzo\",\"contact\":\"Contatto\",\"country\":\"Paese\",\"swiftCode\":\"Codice SWIFT\",\"created\":\"Creato il\",\"internationalBankAccountNumber\":\"Numero internazionale di conto bancario (IBAN)\",\"optionalBankIdentifierCode\":\"Opzionale - Codice identificativo bancario\",\"optionalAccountHolderName\":\"Opzionale - Nome intestatario conto\",\"toMakeABetterCommunity\":\"Per creare una comunità migliore\",\"editCompanyInfo\":\"Modifica Informazioni Aziendali\",\"invoiceNumberWillBeGenerated\":\"Il numero fattura verrà generato automaticamente\",\"paymentMethod\":\"Metodo di Pagamento\",\"serviceDescriptionAndNotes\":\"Descrizione e note del servizio...\",\"thankYouMessage\":\"Messaggio di Ringraziamento\",\"thankYouForYourBusiness\":\"Grazie per il tuo business\",\"showClientSection\":\"Mostra sezione cliente\",\"monday\":\"Lunedì\",\"tuesday\":\"Martedì\",\"wednesday\":\"Mercoledì\",\"thursday\":\"Giovedì\",\"friday\":\"Venerdì\",\"saturday\":\"Sabato\",\"sunday\":\"Domenica\",\"january\":\"Gennaio\",\"february\":\"Febbraio\",\"march\":\"Marzo\",\"april\":\"Aprile\",\"may\":\"Maggio\",\"june\":\"Giugno\",\"july\":\"Luglio\",\"august\":\"Agosto\",\"september\":\"Settembre\",\"october\":\"Ottobre\",\"november\":\"Novembre\",\"december\":\"Dicembre\",\"companyLogo\":\"Logo Azienda\",\"uploadLogo\":\"Carica Logo\",\"recommendedSize\":\"Dimensione consigliata: 200x200px o maggiore\",\"companyName\":\"Nome Azienda\",\"tagline\":\"Slogan\",\"cityStateZip\":\"Città, Stato, CAP\",\"phoneNumbers\":\"Numeri di Telefono\",\"website\":\"Sito Web\",\"saveChanges\":\"Salva Modifiche\",\"serviceId\":\"ID Servizio\",\"usage\":\"Utilizzo\",\"createdAt\":\"Creato il\",\"updatedAt\":\"Aggiornato il\",\"roles\":{\"EMPLOYEE\":\"Dipendente\",\"ADMIN\":\"Amministratore\",\"MANAGER\":\"Manager\",\"HR\":\"Risorse Umane\"}},\"auth\":{\"login\":\"Accedi\",\"logout\":\"Esci\",\"register\":\"Registrati\",\"email\":\"Email\",\"password\":\"Password\",\"confirmPassword\":\"Conferma Password\",\"forgotPassword\":\"Password Dimenticata\",\"resetPassword\":\"Reimposta Password\",\"authenticationRequired\":\"Autenticazione Richiesta\"},\"navigation\":{\"dashboard\":\"Pannello di controllo\",\"branch\":\"Filiale\",\"paymentMethods\":\"Metodi di Pagamento\",\"service\":\"Servizi\",\"employee\":\"Dipendenti\",\"client\":\"Clienti\",\"task\":\"Attività\",\"invoice\":\"Fatture\"},\"dashboard\":{\"title\":\"Pannello di controllo\",\"mainDashboard\":\"Pannello di controllo Principale\",\"analyticsDashboard\":\"Pannello di controllo Analitico\",\"welcome\":\"Benvenuto\",\"overview\":\"Panoramica\",\"statistics\":\"Statistiche\",\"reports\":\"Report\",\"clockInOut\":{\"title\":\"Timbratura\",\"currentlyClockedOut\":\"Attualmente non in servizio\",\"currentlyClockedIn\":\"Attualmente in servizio\",\"clockIn\":\"Entra\",\"clockOut\":\"Esci\",\"lastClockIn\":\"Ultima Entrata\",\"lastClockOut\":\"Ultima Uscita\",\"totalHoursToday\":\"Ore Totali Oggi\",\"workingHours\":\"Ore di Lavoro\"},\"taskStatistics\":{\"title\":\"Statistiche Attività\",\"overviewOfMyActivities\":\"Panoramica Delle Mie Attività\",\"pendingActivities\":\"In Attesa\",\"completedActivities\":\"Completate\",\"cancelledActivities\":\"Annullate\",\"totalTasks\":\"Totale Attività\",\"inProgress\":\"In Corso\",\"completed\":\"Completate\",\"cancelled\":\"Annullate\",\"overdue\":\"Scadute\"},\"timesheet\":{\"title\":\"Le Mie Ore\",\"hoursWorkedIn\":\"Ore lavorate in\",\"totalHours\":\"Ore Totali\",\"averageHours\":\"Ore Medie\",\"hoursPerDay\":\"Ore per Giorno\",\"workingDays\":\"Giorni Lavorativi\",\"overtimeHours\":\"Ore Straordinarie\",\"regularHours\":\"Ore Regolari\"},\"earnings\":{\"title\":\"Guadagni Settimanali Medi\",\"currentAverage\":\"Media Attuale\",\"vsLastWeek\":\"vs settimana scorsa\",\"vsLastMonth\":\"vs mese scorso\",\"vsLastYear\":\"vs anno scorso\",\"week\":\"Settimana\",\"month\":\"Mese\",\"year\":\"Anno\",\"totalWeeklyRevenue\":\"Ricavi Settimanali Totali\",\"averagePerDay\":\"Media per Giorno\",\"growthVsPreviousWeek\":\"Crescita vs Settimana Precedente\",\"growthVsPreviousMonth\":\"Crescita vs Mese Precedente\",\"growthVsPreviousYear\":\"Crescita vs Anno Precedente\",\"revenue\":\"Ricavi\",\"earnings\":\"Guadagni\",\"income\":\"Reddito\",\"profit\":\"Profitto\"},\"projects\":{\"title\":\"Panoramica Progetti\",\"activeProjects\":\"Progetti Attivi\",\"completedProjects\":\"Progetti Completati\",\"totalProjects\":\"Totale Progetti\",\"projectStatus\":\"Stato Progetto\",\"recentProjects\":\"Progetti Recenti\",\"projectProgress\":\"Progresso Progetto\"},\"tickets\":{\"title\":\"Stato Ticket\",\"openTickets\":\"Ticket Aperti\",\"closedTickets\":\"Ticket Chiusi\",\"totalTickets\":\"Totale Ticket\",\"ticketStatus\":\"Stato Ticket\",\"recentTickets\":\"Ticket Recenti\",\"ticketPriority\":\"Priorità Ticket\"},\"calendar\":{\"title\":\"Calendario\",\"eventsToday\":\"Eventi Oggi\",\"upcomingEvents\":\"Prossimi Eventi\",\"noEventsToday\":\"Nessun evento oggi\",\"addEvent\":\"Aggiungi Evento\",\"viewCalendar\":\"Visualizza Calendario\"},\"clients\":{\"title\":\"Totale Clienti\",\"allTime\":\"Sempre\",\"newClients\":\"Nuovi Clienti\",\"activeClients\":\"Clienti Attivi\",\"totalClients\":\"Totale Clienti\",\"clientGrowth\":\"Crescita Clienti\"},\"invoices\":{\"title\":\"Fatture Recenti\",\"recentInvoices\":\"Fatture Recenti\",\"totalInvoices\":\"Totale Fatture\",\"paidInvoices\":\"Fatture Pagate\",\"unpaidInvoices\":\"Fatture Non Pagate\",\"overdueInvoices\":\"Fatture Scadute\",\"totalRevenue\":\"Ricavi Totali\",\"averageInvoiceValue\":\"Valore Medio Fattura\",\"paymentMethod\":\"Metodo di Pagamento:\"},\"common\":{\"loading\":\"Caricamento...\",\"error\":\"Errore\",\"retry\":\"Riprova\",\"refresh\":\"Aggiorna\",\"viewAll\":\"Visualizza Tutto\",\"seeMore\":\"Vedi Altro\",\"noData\":\"Nessun dato disponibile\",\"noDataAvailable\":\"Nessun dato disponibile\",\"comingSoon\":\"Prossimamente\",\"underConstruction\":\"In Costruzione\",\"lastUpdated\":\"Ultimo Aggiornamento\",\"today\":\"Oggi\",\"yesterday\":\"Ieri\",\"thisWeek\":\"Questa Settimana\",\"thisMonth\":\"Questo Mese\",\"thisYear\":\"Quest'Anno\",\"all\":\"Tutti\",\"none\":\"Nessuno\",\"select\":\"Seleziona\",\"filter\":\"Filtra\",\"search\":\"Cerca\",\"sort\":\"Ordina\",\"export\":\"Esporta\",\"print\":\"Stampa\",\"share\":\"Condividi\",\"settings\":\"Impostazioni\",\"help\":\"Aiuto\",\"support\":\"Supporto\",\"documentation\":\"Documentazione\"},\"timePeriods\":{\"today\":\"Oggi\",\"yesterday\":\"Ieri\",\"thisWeek\":\"Questa Settimana\",\"lastWeek\":\"Settimana Scorsa\",\"thisMonth\":\"Questo Mese\",\"lastMonth\":\"Mese Scorso\",\"thisYear\":\"Quest'Anno\",\"lastYear\":\"Anno Scorso\",\"allTime\":\"Sempre\",\"custom\":\"Intervallo Personalizzato\",\"monday\":\"Lun\",\"tuesday\":\"Mar\",\"wednesday\":\"Mer\",\"thursday\":\"Gio\",\"friday\":\"Ven\",\"saturday\":\"Sab\",\"sunday\":\"Dom\",\"week1\":\"Settimana 1\",\"week2\":\"Settimana 2\",\"week3\":\"Settimana 3\",\"week4\":\"Settimana 4\",\"january\":\"GENNAIO\",\"february\":\"FEBBRAIO\",\"march\":\"MARZO\",\"april\":\"APRILE\",\"may\":\"MAGGIO\",\"june\":\"GIUGNO\",\"july\":\"LUGLIO\",\"august\":\"AGOSTO\",\"september\":\"SETTEMBRE\",\"october\":\"OTTOBRE\",\"november\":\"NOVEMBRE\",\"december\":\"DICEMBRE\"},\"status\":{\"active\":\"Attivo\",\"inactive\":\"Inattivo\",\"pending\":\"In Attesa\",\"completed\":\"Completato\",\"cancelled\":\"Annullato\",\"overdue\":\"Scaduto\",\"inProgress\":\"In Corso\",\"onHold\":\"In Sospeso\",\"draft\":\"Bozza\",\"published\":\"Pubblicato\",\"archived\":\"Archiviato\"},\"priorities\":{\"low\":\"Bassa\",\"medium\":\"Media\",\"high\":\"Alta\",\"urgent\":\"Urgente\",\"critical\":\"Critica\"}},\"tasks\":{\"title\":\"Titolo\",\"taskManagement\":\"Gestione Attività\",\"addNewTask\":\"Aggiungi Nuovo Compito\",\"editTask\":\"Modifica Compito\",\"deleteTask\":\"Elimina Compito\",\"viewTask\":\"Visualizza Compito\",\"createTask\":\"Crea Compito\",\"updateTask\":\"Aggiorna Compito\",\"taskDetails\":\"Dettagli Compito\",\"searchTask\":\"Cerca Compito...\",\"noTasksAvailable\":\"Nessun compito disponibile\",\"loadingTasks\":\"Caricamento Attività...\",\"all\":\"Tutti\",\"status\":{\"pending\":\"In Attesa\",\"in_progress\":\"In Corso\",\"inProgress\":\"In Corso\",\"completed\":\"Completato\",\"cancelled\":\"Annullato\",\"on_hold\":\"In Pausa\",\"onHold\":\"In Pausa\"},\"assignedTo\":\"Assegnato A\",\"branch\":\"Filiale\",\"client\":\"Cliente\",\"service\":\"Servizio\",\"dueDate\":\"Data Scadenza\",\"action\":\"Azione\",\"view\":\"Visualizza\",\"edit\":\"Modifica\",\"generateInvoice\":\"Genera Fattura\",\"delete\":\"Elimina\",\"create\":\"Crea\",\"update\":\"Aggiorna\",\"cancel\":\"Annulla\",\"creating\":\"Creazione...\",\"updating\":\"Aggiornamento...\",\"selectClient\":\"Seleziona Cliente\",\"selectCategory\":\"Seleziona Categoria\",\"selectService\":\"Seleziona Servizio\",\"assignToEmployee\":\"Assegna a Dipendente\",\"priority\":{\"low\":\"Bassa\",\"medium\":\"Media\",\"high\":\"Alta\",\"urgent\":\"Urgente\"},\"startDate\":\"Data Inizio\",\"estimatedHours\":\"Ore Stimate\",\"notes\":\"Note\",\"enterNotes\":\"Inserisci note aggiuntive\",\"enterTaskDescription\":\"Inserisci descrizione attività\",\"createNewTask\":\"Crea Nuova Attività\",\"loadingClients\":\"Caricamento clienti...\",\"noClientsAvailable\":\"Nessun cliente disponibile\",\"loadingCategories\":\"Caricamento categorie...\",\"noCategoriesAvailable\":\"Nessuna categoria disponibile\",\"loadingServices\":\"Caricamento servizi...\",\"noServicesAvailable\":\"Nessun servizio disponibile per questa categoria\",\"selectCategoryFirst\":\"Seleziona prima una categoria\",\"loadingEmployees\":\"Caricamento dipendenti...\",\"noEmployeesAvailable\":\"Nessun dipendente disponibile\",\"categoryRequired\":\"La categoria è obbligatoria.\",\"serviceRequired\":\"Il servizio è obbligatorio.\",\"employeeRequired\":\"Il dipendente assegnato è obbligatorio.\",\"startDateRequired\":\"La data di inizio è obbligatoria.\",\"dueDateRequired\":\"La data di scadenza è obbligatoria.\",\"statusRequired\":\"Lo stato è obbligatorio.\",\"descriptionRequired\":\"La descrizione è obbligatoria.\",\"taskDescriptionRequired\":\"La descrizione del compito è obbligatoria.\",\"pleaseSelectClient\":\"Seleziona un cliente.\",\"pleaseSelectEmployee\":\"Seleziona un dipendente assegnato.\",\"startDateAfterDueDate\":\"La data di inizio non può essere dopo la data di scadenza.\",\"estimatedHoursRequired\":\"Le ore stimate sono obbligatorie.\",\"estimatedHoursMin\":\"Le ore stimate devono essere almeno 0,5 ore.\",\"notesRequired\":\"Le note sono obbligatorie.\",\"pleaseFillAllFields\":\"Compila tutti i campi obbligatori\",\"pleaseFixValidationErrors\":\"Correggi gli errori di validazione prima di inviare\",\"authenticationRequired\":\"Autenticazione richiesta per aggiornare lo stato della fattura\",\"notAuthenticated\":\"Non autenticato. Effettua l'accesso per visualizzare i compiti.\",\"authenticationTokenNotFound\":\"Token di autenticazione non trovato. Effettua nuovamente l'accesso.\",\"taskCreatedSuccessfully\":\"Compito creato con successo!\",\"taskUpdatedSuccessfully\":\"Compito aggiornato con successo!\",\"taskDeletedSuccessfully\":\"Compito eliminato con successo!\",\"failedToCreateTask\":\"Impossibile creare il compito\",\"failedToUpdateTask\":\"Impossibile aggiornare il compito\",\"failedToDeleteTask\":\"Impossibile eliminare il compito\",\"networkError\":\"Errore di rete o problema imprevisto. Riprova.\",\"deleteConfirmation\":{\"title\":\"Elimina Compito\",\"message\":\"Sei sicuro di voler eliminare questo compito? Questa azione non può essere annullata.\",\"confirm\":\"Elimina\",\"cancel\":\"Annulla\",\"deleting\":\"Eliminazione...\"},\"fields\":{\"title\":\"Titolo\",\"client\":\"Cliente\",\"service\":\"Servizio\",\"assignedTo\":\"Assegnato A\",\"status\":\"Stato\",\"dueDate\":\"Data Scadenza\",\"action\":\"Azione\"},\"basicInformation\":\"Informazioni Base\",\"clientInformation\":\"Informazioni Cliente\",\"serviceInformation\":\"Informazioni Servizio\",\"assignmentInformation\":\"Informazioni Assegnazione\",\"timeline\":\"Cronologia\",\"additionalInformation\":\"Informazioni Aggiuntive\",\"taskId\":\"ID Compito\",\"createdDate\":\"Data Creazione\",\"description\":\"Descrizione\",\"clientName\":\"Nome Cliente\",\"clientEmail\":\"Email Cliente\",\"clientPhone\":\"Telefono Cliente\",\"serviceName\":\"Nome Servizio\",\"servicePrice\":\"Prezzo Servizio\",\"serviceCategory\":\"Categoria Servizio\",\"assignedEmployee\":\"Dipendente Assegnato\",\"employeeRole\":\"Ruolo Dipendente\",\"employeeEmail\":\"Email Dipendente\",\"actualHours\":\"Ore Effettive\",\"lastUpdated\":\"Ultimo Aggiornamento\",\"hours\":\"ore\",\"markedAsPaid\":\"Fattura contrassegnata come pagata\",\"markedAsUnpaid\":\"Fattura contrassegnata come non pagata\",\"failedToUpdateStatus\":\"Impossibile aggiornare lo stato della fattura\"},\"clients\":{\"title\":\"Clienti\",\"clientManagement\":\"Gestione Clienti\",\"addNewClient\":\"Aggiungi Nuovo Cliente\",\"editClient\":\"Modifica Cliente\",\"deleteClient\":\"Elimina Cliente\",\"viewClient\":\"Visualizza Cliente\",\"createClient\":\"Crea Cliente\",\"updateClient\":\"Aggiorna Cliente\",\"clientDetails\":\"Dettagli Cliente\",\"searchClient\":\"Cerca Cliente...\",\"noClientsAvailable\":\"Nessun cliente disponibile\",\"loadingClients\":\"Caricamento Clienti...\",\"all\":\"Tutti\",\"status\":{\"active\":\"Attivo\",\"pending\":\"In Attesa\",\"processing\":\"In Elaborazione\",\"cancelled\":\"Annullato\"},\"name\":\"Nome\",\"email\":\"Email\",\"phone\":\"Telefono\",\"address\":\"Indirizzo\",\"nationalId\":\"Codice Fiscale\",\"branch\":\"Filiale\",\"action\":\"Azione\",\"view\":\"Visualizza\",\"edit\":\"Modifica\",\"delete\":\"Elimina\",\"create\":\"Crea\",\"update\":\"Aggiorna\",\"cancel\":\"Annulla\",\"creating\":\"Creazione...\",\"updating\":\"Aggiornamento...\",\"selectBranch\":\"Seleziona Filiale\",\"enterName\":\"Inserisci nome cliente\",\"enterEmail\":\"Inserisci indirizzo email\",\"enterPhone\":\"Inserisci numero di telefono\",\"enterAddress\":\"Inserisci indirizzo\",\"enterNationalId\":\"Inserisci codice fiscale\",\"enterCity\":\"Inserisci città\",\"enterPostalCode\":\"Inserisci codice postale\",\"enterProvince\":\"Inserisci provincia\",\"optional\":\"Opzionale\",\"loadingBranches\":\"Caricamento filiali...\",\"noBranchesAvailable\":\"Nessuna filiale disponibile\",\"clientNameRequired\":\"Il nome del cliente è obbligatorio.\",\"nameMinLength\":\"Il nome deve essere di almeno 2 caratteri.\",\"nameMaxLength\":\"Il nome non deve superare i 100 caratteri.\",\"emailRequired\":\"L'email è obbligatoria.\",\"emailInvalid\":\"Inserisci un indirizzo email valido.\",\"phoneRequired\":\"Il numero di telefono è obbligatorio.\",\"addressRequired\":\"L'indirizzo è obbligatorio.\",\"nationalIdRequired\":\"Il codice fiscale è obbligatorio.\",\"nationalIdMinLength\":\"L'ID nazionale deve essere di almeno 5 caratteri.\",\"nationalIdMaxLength\":\"L'ID nazionale deve essere di massimo 20 caratteri.\",\"branchRequired\":\"La filiale è obbligatoria.\",\"authenticationRequired\":\"Autenticazione richiesta per recuperare i clienti. Effettua l'accesso.\",\"notAuthenticated\":\"Non autenticato. Effettua l'accesso per visualizzare i clienti.\",\"authenticationTokenNotFound\":\"Token di autenticazione non trovato. Effettua nuovamente l'accesso.\",\"clientCreatedSuccessfully\":\"Cliente creato con successo!\",\"clientUpdatedSuccessfully\":\"Cliente aggiornato con successo!\",\"clientDeletedSuccessfully\":\"Cliente eliminato con successo!\",\"close\":\"Chiudi\",\"failedToCreateClient\":\"Impossibile creare il cliente\",\"failedToUpdateClient\":\"Impossibile aggiornare il cliente\",\"failedToFetchClients\":\"Impossibile recuperare i clienti\",\"networkError\":\"Si è verificato un errore di rete\",\"failedToDeleteClient\":\"Impossibile eliminare il cliente\",\"deleteConfirmation\":{\"title\":\"Elimina Cliente\",\"message\":\"Sei sicuro di voler eliminare questo cliente? Questa azione non può essere annullata.\",\"confirm\":\"Elimina\",\"cancel\":\"Annulla\",\"deleting\":\"Eliminazione...\"},\"fields\":{\"name\":\"Nome\",\"email\":\"Email\",\"phone\":\"Telefono\",\"address\":\"Indirizzo\",\"nationalId\":\"Codice Fiscale\",\"branch\":\"Filiale\",\"status\":\"Stato\",\"action\":\"Azione\",\"clientId\":\"ID Cliente\",\"nationalIdentificationNumber\":\"Numero di Identificazione Nazionale\",\"city\":\"Città\",\"postalCode\":\"Codice Postale (CAP)\",\"province\":\"Provincia\"},\"basicInformation\":\"Informazioni Base\",\"contactInformation\":\"Informazioni di Contatto\",\"additionalInformation\":\"Informazioni Aggiuntive\",\"clientId\":\"ID Cliente\",\"createdDate\":\"Data Creazione\",\"lastUpdated\":\"Ultimo Aggiornamento\",\"clientName\":\"Nome Cliente\",\"clientEmail\":\"Email Cliente\",\"clientPhone\":\"Telefono Cliente\",\"clientAddress\":\"Indirizzo Cliente\",\"nationalIdentificationNumber\":\"Codice Fiscale\",\"branchName\":\"Nome Filiale\",\"clientStatus\":\"Stato Cliente\"},\"employees\":{\"title\":\"Dipendenti\",\"employeeManagement\":\"Gestione Dipendenti\",\"addNewEmployee\":\"Aggiungi Nuovo Dipendente\",\"editEmployee\":\"Modifica Dipendente\",\"deleteEmployee\":\"Elimina Dipendente\",\"viewEmployee\":\"Visualizza Dipendente\",\"createEmployee\":\"Crea Dipendente\",\"updateEmployee\":\"Aggiorna Dipendente\",\"employeeDetails\":\"Dettagli Dipendente\",\"searchEmployee\":\"Cerca Dipendente...\",\"noEmployeesAvailable\":\"Nessun dipendente disponibile\",\"loadingEmployees\":\"Caricamento Dipendenti...\",\"all\":\"Tutti\",\"status\":{\"active\":\"Attivo\",\"inactive\":\"Inattivo\",\"pending\":\"In Attesa\",\"suspended\":\"Sospeso\"},\"name\":\"Nome\",\"email\":\"Email\",\"phone\":\"Telefono\",\"role\":\"Ruolo\",\"branch\":\"Filiale\",\"permissions\":\"Permessi\",\"action\":\"Azione\",\"view\":\"Visualizza\",\"edit\":\"Modifica\",\"delete\":\"Elimina\",\"create\":\"Crea\",\"update\":\"Aggiorna\",\"cancel\":\"Annulla\",\"creating\":\"Creazione...\",\"updating\":\"Aggiornamento...\",\"selectBranch\":\"Seleziona una Filiale\",\"selectRole\":\"Seleziona Ruolo\",\"selectPermissions\":\"Seleziona permessi\",\"enterName\":\"Inserisci nome dipendente\",\"enterEmail\":\"Inserisci indirizzo email\",\"enterPhone\":\"Inserisci numero di telefono\",\"enterPassword\":\"Inserisci password\",\"confirmPassword\":\"Conferma Password\",\"enterNationalId\":\"Inserisci numero di identificazione nazionale\",\"loadingBranches\":\"Caricamento filiali...\",\"noBranchesAvailable\":\"Nessuna filiale disponibile\",\"loadingRoles\":\"Caricamento ruoli...\",\"noRolesAvailable\":\"Nessun ruolo disponibile\",\"employeeNameRequired\":\"Il nome del dipendente è obbligatorio.\",\"emailRequired\":\"L'email è obbligatoria.\",\"emailInvalid\":\"Inserisci un indirizzo email valido.\",\"phoneRequired\":\"Il numero di telefono è obbligatorio.\",\"passwordRequired\":\"La password è obbligatoria.\",\"passwordMinLength\":\"La password deve essere di almeno 8 caratteri.\",\"nationalIdMinLength\":\"L'ID nazionale deve essere di almeno 5 caratteri.\",\"nationalIdMaxLength\":\"L'ID nazionale deve essere di massimo 20 caratteri.\",\"dateOfBirthRequired\":\"La data di nascita è obbligatoria.\",\"dateOfBirthMinAge\":\"Il dipendente deve avere almeno 16 anni.\",\"branchRequired\":\"La filiale è obbligatoria.\",\"roleRequired\":\"Il ruolo è obbligatorio.\",\"permissionRequired\":\"È richiesto almeno un permesso.\",\"passwordMismatch\":\"Le password non corrispondono.\",\"authenticationRequired\":\"Autenticazione richiesta per recuperare i dipendenti. Effettua l'accesso.\",\"notAuthenticated\":\"Non autenticato. Effettua l'accesso per visualizzare i dipendenti.\",\"authenticationTokenNotFound\":\"Token di autenticazione non trovato. Effettua nuovamente l'accesso.\",\"employeeCreatedSuccessfully\":\"Dipendente creato con successo!\",\"employeeUpdatedSuccessfully\":\"Dipendente aggiornato con successo!\",\"employeeDeletedSuccessfully\":\"Dipendente eliminato con successo!\",\"failedToCreateEmployee\":\"Impossibile creare il dipendente\",\"failedToUpdateEmployee\":\"Impossibile aggiornare il dipendente\",\"failedToDeleteEmployee\":\"Impossibile eliminare il dipendente\",\"networkError\":\"Errore di rete o problema imprevisto. Riprova.\",\"deleteConfirmation\":{\"title\":\"Elimina Dipendente\",\"message\":\"Sei sicuro di voler eliminare questo dipendente? Questa azione non può essere annullata.\",\"confirm\":\"Elimina\",\"cancel\":\"Annulla\",\"deleting\":\"Eliminazione...\"},\"fields\":{\"name\":\"Nome\",\"email\":\"Email\",\"phone\":\"Telefono\",\"role\":\"Ruolo\",\"branch\":\"Filiale\",\"permissions\":\"Permessi\",\"status\":\"Stato\",\"action\":\"Azione\",\"employeeId\":\"ID Dipendente\",\"nationalIdentificationNumber\":\"Numero di Identificazione Nazionale\",\"dateOfBirth\":\"Data di Nascita\",\"password\":\"Password\"},\"basicInformation\":\"Informazioni Base\",\"contactInformation\":\"Informazioni di Contatto\",\"roleInformation\":\"Informazioni Ruolo\",\"permissionInformation\":\"Informazioni Permessi\",\"employeeId\":\"ID Dipendente\",\"createdDate\":\"Data Creazione\",\"lastUpdated\":\"Ultimo Aggiornamento\",\"employeeName\":\"Nome Dipendente\",\"employeeEmail\":\"Email Dipendente\",\"employeePhone\":\"Telefono Dipendente\",\"employeeRole\":\"Ruolo Dipendente\",\"employeeBranch\":\"Filiale Dipendente\",\"employeeStatus\":\"Stato Dipendente\",\"password\":\"Password\",\"permissionLevel\":\"Livello Permessi\",\"accessLevel\":\"Livello Accesso\",\"attendanceReport\":\"Report Presenze\",\"generateReport\":\"Genera Report\",\"reportGenerated\":\"Report generato con successo!\",\"failedToGenerateReport\":\"Impossibile generare il report\"},\"services\":{\"title\":\"Servizi\",\"serviceManagement\":\"Gestione Servizi\",\"addNewService\":\"Aggiungi Nuovo Servizio\",\"editService\":\"Modifica Servizio\",\"deleteService\":\"Elimina Servizio\",\"viewService\":\"Visualizza Servizio\",\"createService\":\"Crea Servizio\",\"updateService\":\"Aggiorna Servizio\",\"serviceDetails\":\"Dettagli Servizio\",\"searchService\":\"Cerca Servizio...\",\"noServicesAvailable\":\"Nessun servizio disponibile\",\"loadingServices\":\"Caricamento Servizi...\",\"all\":\"Tutti\",\"status\":{\"active\":\"Attivo\",\"inactive\":\"Inattivo\",\"pending\":\"In Attesa\",\"discontinued\":\"Discontinuato\"},\"name\":\"Nome\",\"price\":\"Prezzo\",\"category\":\"Categoria\",\"description\":\"Descrizione\",\"action\":\"Azione\",\"view\":\"Visualizza\",\"edit\":\"Modifica\",\"delete\":\"Elimina\",\"create\":\"Crea\",\"update\":\"Aggiorna\",\"cancel\":\"Annulla\",\"creating\":\"Creazione...\",\"updating\":\"Aggiornamento...\",\"selectCategory\":\"Seleziona Categoria\",\"enterName\":\"Inserisci nome servizio\",\"enterPrice\":\"Inserisci prezzo servizio\",\"enterDescription\":\"Inserisci descrizione servizio\",\"loadingCategories\":\"Caricamento categorie...\",\"noCategoriesAvailable\":\"Nessuna categoria disponibile\",\"serviceNameRequired\":\"Il nome del servizio è obbligatorio.\",\"priceRequired\":\"Il prezzo è obbligatorio.\",\"priceInvalid\":\"Inserisci un prezzo valido.\",\"categoryRequired\":\"La categoria è obbligatoria.\",\"descriptionRequired\":\"La descrizione è obbligatoria.\",\"authenticationRequired\":\"Autenticazione richiesta per recuperare i servizi. Effettua l'accesso.\",\"notAuthenticated\":\"Non autenticato. Effettua l'accesso per visualizzare i servizi.\",\"authenticationTokenNotFound\":\"Token di autenticazione non trovato. Effettua nuovamente l'accesso.\",\"serviceCreatedSuccessfully\":\"Servizio creato con successo!\",\"serviceUpdatedSuccessfully\":\"Servizio aggiornato con successo!\",\"serviceDeletedSuccessfully\":\"Servizio eliminato con successo!\",\"failedToCreateService\":\"Impossibile creare il servizio\",\"failedToUpdateService\":\"Impossibile aggiornare il servizio\",\"failedToDeleteService\":\"Impossibile eliminare il servizio\",\"networkError\":\"Errore di rete o problema imprevisto. Riprova.\",\"deleteConfirmation\":{\"title\":\"Elimina Servizio\",\"message\":\"Sei sicuro di voler eliminare questo servizio? Questa azione non può essere annullata.\",\"confirm\":\"Elimina\",\"cancel\":\"Annulla\",\"deleting\":\"Eliminazione...\"},\"fields\":{\"name\":\"Nome\",\"price\":\"Prezzo\",\"category\":\"Categoria\",\"description\":\"Descrizione\",\"status\":\"Stato\",\"action\":\"Azione\"},\"basicInformation\":\"Informazioni Base\",\"pricingInformation\":\"Informazioni Prezzo\",\"categoryInformation\":\"Informazioni Categoria\",\"serviceId\":\"ID Servizio\",\"createdDate\":\"Data Creazione\",\"lastUpdated\":\"Ultimo Aggiornamento\",\"serviceName\":\"Nome Servizio\",\"servicePrice\":\"Prezzo Servizio\",\"serviceCategory\":\"Categoria Servizio\",\"serviceDescription\":\"Descrizione Servizio\",\"serviceStatus\":\"Stato Servizio\",\"currency\":\"Valuta\",\"pricePerUnit\":\"Prezzo Per Unità\",\"categoryName\":\"Nome Categoria\",\"serviceType\":\"Tipo Servizio\"},\"invoices\":{\"title\":\"Fatture\",\"createInvoice\":\"Crea Fattura\",\"editInvoice\":\"Modifica Fattura\",\"deleteInvoice\":\"Elimina Fattura\",\"invoiceDetails\":\"Dettagli Fattura\",\"invoiceManagement\":\"Gestione Fatture\",\"searchInvoice\":\"Cerca Fattura\",\"noDataAvailable\":\"Nessun dato disponibile\",\"loadingInvoiceData\":\"Caricamento dati fattura...\",\"createNewInvoice\":\"Crea Nuova Fattura\",\"fillDetailsToCreate\":\"Compila i dettagli per creare una nuova fattura\",\"basicInformation\":\"Informazioni Base\",\"invoiceItems\":\"Elementi Fattura\",\"paymentInformation\":\"Informazioni Pagamento\",\"additionalInformation\":\"Informazioni Aggiuntive\",\"invoiceTo\":\"Fattura a:\",\"billTo\":\"Fattura a:\",\"services\":\"Servizi\",\"serviceCategory\":\"Categoria Servizio\",\"serviceName\":\"Nome Servizio\",\"description\":\"Descrizione\",\"rate\":\"Tariffa\",\"discount\":\"Sconto\",\"total\":\"Totale\",\"addService\":\"Aggiungi Servizio\",\"selectCategory\":\"Seleziona Categoria\",\"selectService\":\"Seleziona Servizio\",\"selectCategoryFirst\":\"Seleziona Prima la Categoria\",\"selectClient\":\"Seleziona Cliente\",\"chooseClient\":\"Scegli un cliente\",\"noClientSelected\":\"Nessun cliente selezionato\",\"noInvoiceItemsFound\":\"Nessun elemento fattura trovato\",\"salesperson\":\"Venditore:\",\"selectSalesperson\":\"Seleziona Venditore\",\"thanksMessage\":\"Messaggio di Ringraziamento\",\"thanksForBusiness\":\"Grazie per il tuo business\",\"paymentTerms\":\"Termini di Pagamento:\",\"enterPaymentTerms\":\"Inserisci i termini di pagamento (es. Pagamento entro 30 giorni dalla data fattura)\",\"clientNotes\":\"Note Cliente:\",\"addClientNotes\":\"Aggiungi note che saranno visibili al cliente sulla fattura\",\"subtotal\":\"Subtotale:\",\"tax\":\"Tasse\",\"totalDue\":\"Totale Dovuto:\",\"paymentMethod\":\"Metodo di Pagamento:\",\"bankName\":\"Nome Banca:\",\"country\":\"Paese:\",\"iban\":\"IBAN:\",\"swiftCode\":\"Codice SWIFT:\",\"noBankAccountSelected\":\"Nessun conto bancario selezionato\",\"dateIssued\":\"Data Emissione:\",\"dateDue\":\"Data Scadenza:\",\"invoiceNumber\":\"Numero Fattura\",\"invoiceNumberGenerated\":\"Il numero fattura verrà generato automaticamente\",\"dueDate\":\"Data Scadenza\",\"client\":\"Cliente\",\"amount\":\"Importo\",\"status\":{\"paid\":\"Pagata\",\"pending\":\"In Attesa\",\"overdue\":\"Scaduta\",\"draft\":\"Bozza\"},\"action\":\"Azione\",\"all\":\"Tutti\",\"unpaid\":\"Non Pagata\",\"paid\":\"Pagata\",\"overdue\":\"Scaduta\",\"cancelled\":\"Annullata\",\"markAsPaid\":\"Segna come Pagata\",\"markAsUnpaid\":\"Segna come Non Pagata\",\"markAsCancelled\":\"Segna come Annullata\",\"delete\":\"Elimina\",\"service\":\"Servizio\",\"itemDescription\":\"Descrizione elemento\",\"addItem\":\"Aggiungi Elemento\",\"autoGeneratedIfEmpty\":\"Generato automaticamente se vuoto\",\"notes\":\"Note\",\"additionalNotesForInvoice\":\"Note aggiuntive per la fattura\",\"thankYouMessage\":\"Messaggio di Ringraziamento\",\"thankYouMessageForClient\":\"Messaggio di ringraziamento per il cliente\",\"paymentTermsAndConditions\":\"Termini e condizioni di pagamento\",\"subtotalLabel\":\"Subtotale:\",\"discountLabel\":\"Sconto:\",\"taxLabel\":\"Tasse\",\"totalLabel\":\"Totale:\",\"cancel\":\"Annulla\",\"creating\":\"Creazione...\",\"clientRequired\":\"Il cliente è obbligatorio\",\"branchRequired\":\"La filiale è obbligatoria\",\"dueDateRequired\":\"La data di scadenza è obbligatoria\",\"thankYouMessageRequired\":\"Il messaggio di ringraziamento è obbligatorio\",\"atLeastOneItemRequired\":\"È richiesto almeno un elemento\",\"fillAllRequiredItemFields\":\"Compila tutti i campi obbligatori dell'elemento\",\"discountAmount\":\"Importo Sconto\",\"fields\":{\"number\":\"Numero Fattura\",\"date\":\"Data Fattura\",\"dueDate\":\"Data Scadenza\",\"client\":\"Cliente\",\"services\":\"Servizi\",\"amount\":\"Importo\",\"status\":\"Stato\",\"invoiceId\":\"ID Fattura\",\"service\":\"Servizio\",\"action\":\"Azione\"},\"invoiceActions\":\"Azioni Fattura\",\"preview\":\"Anteprima\",\"save\":\"Salva\",\"saving\":\"Salvataggio...\",\"updated\":\"Aggiornato\",\"updateInvoice\":\"Aggiorna Fattura\",\"saved\":\"Salvato\",\"download\":\"Scarica\",\"downloading\":\"Download in corso...\",\"print\":\"Stampa\",\"edit\":\"Modifica\",\"invoiceCreatedSuccessfully\":\"Fattura creata con successo! Fattura #\",\"invoiceUpdatedSuccessfully\":\"Fattura aggiornata con successo! Fattura #\",\"pleaseSelectClient\":\"Seleziona un cliente per continuare\",\"pleaseAddInvoiceItem\":\"Aggiungi almeno un elemento fattura\",\"pleaseAddThanksMessage\":\"Aggiungi un messaggio di ringraziamento\",\"pleaseSelectSalesperson\":\"Seleziona un venditore\",\"pleaseSelectDueDate\":\"Seleziona una data di scadenza\",\"invoiceSummary\":\"Riepilogo Fattura\",\"paymentSettings\":\"Impostazioni Pagamento\",\"selectBankAccountForPayment\":\"Seleziona conto bancario per i dettagli di pagamento\",\"taxRate\":\"Aliquota IVA (%)\",\"enterTaxRate\":\"Inserisci aliquota IVA (0-100%)\",\"displayOptions\":\"Opzioni Visualizzazione\",\"showPaymentTermsOnInvoice\":\"Mostra termini di pagamento sulla fattura\",\"displayClientNotesSection\":\"Mostra sezione note cliente\",\"noServicesAdded\":\"Nessun servizio aggiunto\",\"notSet\":\"Non impostato\",\"notAssigned\":\"Non assegnato\",\"note\":\"Nota:\",\"loadingCategories\":\"Caricamento categorie...\",\"noCategoriesAvailable\":\"Nessuna categoria disponibile\",\"deleteConfirmation\":{\"title\":\"Elimina Fattura\",\"message\":\"Sei sicuro di voler eliminare questa fattura? Questa azione non può essere annullata.\",\"confirm\":\"Elimina\",\"cancel\":\"Annulla\",\"deleting\":\"Eliminazione...\"}},\"paymentMethods\":{\"title\":\"Metodi di Pagamento\",\"paymentMethodManagement\":\"Gestione Metodi di Pagamento\",\"addNewPaymentMethod\":\"Aggiungi Nuovo Metodo di Pagamento\",\"editPaymentMethod\":\"Modifica Metodo di Pagamento\",\"deletePaymentMethod\":\"Elimina Metodo di Pagamento\",\"viewPaymentMethod\":\"Visualizza Metodo di Pagamento\",\"createPaymentMethod\":\"Crea Metodo di Pagamento\",\"updatePaymentMethod\":\"Aggiorna Metodo di Pagamento\",\"paymentMethodDetails\":\"Dettagli Metodo di Pagamento\",\"searchPaymentMethod\":\"Cerca Metodo di Pagamento...\",\"noPaymentMethodsAvailable\":\"Nessun metodo di pagamento disponibile\",\"loadingPaymentMethods\":\"Caricamento Metodi di Pagamento...\",\"all\":\"Tutti\",\"status\":{\"active\":\"Attivo\",\"inactive\":\"Inattivo\",\"pending\":\"In Attesa\",\"suspended\":\"Sospeso\"},\"name\":\"Nome\",\"type\":\"Tipo\",\"accountNumber\":\"Numero Conto\",\"bankName\":\"Nome Banca\",\"routingNumber\":\"Codice di Routing\",\"swiftCode\":\"Codice SWIFT\",\"iban\":\"IBAN\",\"currency\":\"Valuta\",\"isDefault\":\"Predefinito\",\"action\":\"Azione\",\"view\":\"Visualizza\",\"edit\":\"Modifica\",\"delete\":\"Elimina\",\"create\":\"Crea\",\"update\":\"Aggiorna\",\"cancel\":\"Annulla\",\"creating\":\"Creazione...\",\"updating\":\"Aggiornamento...\",\"selectType\":\"Seleziona Tipo\",\"selectCurrency\":\"Seleziona Valuta\",\"enterName\":\"Inserisci nome metodo di pagamento\",\"enterAccountNumber\":\"Inserisci numero conto\",\"enterBankName\":\"Inserisci nome banca\",\"enterRoutingNumber\":\"Inserisci codice di routing\",\"enterSwiftCode\":\"Inserisci codice SWIFT\",\"enterIban\":\"Inserisci IBAN\",\"loadingCurrencies\":\"Caricamento valute...\",\"noCurrenciesAvailable\":\"Nessuna valuta disponibile\",\"paymentMethodNameRequired\":\"Il nome del metodo di pagamento è obbligatorio.\",\"typeRequired\":\"Il tipo è obbligatorio.\",\"accountNumberRequired\":\"Il numero di conto è obbligatorio.\",\"bankNameRequired\":\"Il nome della banca è obbligatorio.\",\"routingNumberRequired\":\"Il codice di routing è obbligatorio.\",\"swiftCodeRequired\":\"Il codice SWIFT è obbligatorio.\",\"ibanRequired\":\"L'IBAN è obbligatorio.\",\"currencyRequired\":\"La valuta è obbligatoria.\",\"authenticationRequired\":\"Autenticazione richiesta per recuperare i metodi di pagamento. Effettua l'accesso.\",\"notAuthenticated\":\"Non autenticato. Effettua l'accesso per visualizzare i metodi di pagamento.\",\"authenticationTokenNotFound\":\"Token di autenticazione non trovato. Effettua nuovamente l'accesso.\",\"paymentMethodCreatedSuccessfully\":\"Metodo di pagamento creato con successo!\",\"paymentMethodUpdatedSuccessfully\":\"Metodo di pagamento aggiornato con successo!\",\"paymentMethodDeletedSuccessfully\":\"Metodo di pagamento eliminato con successo!\",\"failedToCreatePaymentMethod\":\"Impossibile creare il metodo di pagamento\",\"failedToUpdatePaymentMethod\":\"Impossibile aggiornare il metodo di pagamento\",\"failedToDeletePaymentMethod\":\"Impossibile eliminare il metodo di pagamento\",\"networkError\":\"Errore di rete o problema imprevisto. Riprova.\",\"deleteConfirmation\":{\"title\":\"Elimina Metodo di Pagamento\",\"message\":\"Sei sicuro di voler eliminare questo metodo di pagamento? Questa azione non può essere annullata.\",\"confirm\":\"Elimina\",\"cancel\":\"Annulla\",\"deleting\":\"Eliminazione...\"},\"types\":{\"bankAccount\":\"Conto Bancario\",\"creditCard\":\"Carta di Credito\",\"paypal\":\"PayPal\",\"stripe\":\"Stripe\",\"crypto\":\"Criptovaluta\",\"wireTransfer\":\"Bonifico Bancario\"},\"fields\":{\"name\":\"Nome\",\"type\":\"Tipo\",\"accountNumber\":\"Numero Conto\",\"bankName\":\"Nome Banca\",\"routingNumber\":\"Codice di Routing\",\"swiftCode\":\"Codice SWIFT\",\"iban\":\"IBAN\",\"currency\":\"Valuta\",\"isDefault\":\"Predefinito\",\"status\":\"Stato\",\"action\":\"Azione\"},\"basicInformation\":\"Informazioni Base\",\"bankInformation\":\"Informazioni Bancarie\",\"accountInformation\":\"Informazioni Conto\",\"paymentMethodId\":\"ID Metodo di Pagamento\",\"createdDate\":\"Data Creazione\",\"lastUpdated\":\"Ultimo Aggiornamento\",\"paymentMethodName\":\"Nome Metodo di Pagamento\",\"paymentMethodType\":\"Tipo Metodo di Pagamento\",\"paymentMethodStatus\":\"Stato Metodo di Pagamento\",\"defaultPaymentMethod\":\"Metodo di Pagamento Predefinito\",\"setAsDefault\":\"Imposta come Predefinito\",\"removeAsDefault\":\"Rimuovi come Predefinito\",\"supportedMethods\":\"Metodi di Pagamento Supportati\",\"paymentProviders\":\"Fornitori di Pagamento\",\"manualMethods\":\"Metodi di Pagamento Manuali\",\"addPaymentMethods\":\"Aggiungi Metodi di Pagamento\",\"activateProvider\":\"Attiva Fornitore\",\"deactivateProvider\":\"Disattiva Fornitore\",\"configureProvider\":\"Configura Fornitore\",\"providerSettings\":\"Impostazioni Fornitore\",\"paymentSettings\":\"Impostazioni Pagamento\",\"activate\":\"Attiva\",\"deactivate\":\"Disattiva\"},\"branches\":{\"title\":\"Filiali\",\"branchManagement\":\"Gestione Filiali\",\"addNewBranch\":\"Aggiungi Nuova Filiale\",\"editBranch\":\"Modifica Filiale\",\"deleteBranch\":\"Elimina Filiale\",\"viewBranch\":\"Visualizza Filiale\",\"createBranch\":\"Crea Filiale\",\"updateBranch\":\"Aggiorna Filiale\",\"branchDetails\":\"Dettagli Filiale\",\"searchBranch\":\"Cerca Filiale...\",\"noBranchesAvailable\":\"Nessuna filiale disponibile\",\"loadingBranches\":\"Caricamento Filiali...\",\"all\":\"Tutte\",\"status\":{\"active\":\"Attiva\",\"inactive\":\"Inattiva\",\"pending\":\"In Attesa\",\"suspended\":\"Sospesa\"},\"name\":\"Nome\",\"address\":\"Indirizzo\",\"city\":\"Città\",\"postalCode\":\"Codice Postale\",\"province\":\"Provincia\",\"phone\":\"Telefono\",\"email\":\"Email\",\"isActive\":\"Attiva\",\"action\":\"Azione\",\"view\":\"Visualizza\",\"edit\":\"Modifica\",\"delete\":\"Elimina\",\"create\":\"Crea\",\"update\":\"Aggiorna\",\"cancel\":\"Annulla\",\"creating\":\"Creazione...\",\"updating\":\"Aggiornamento...\",\"enterName\":\"Inserisci nome filiale\",\"enterAddress\":\"Inserisci indirizzo\",\"enterCity\":\"Inserisci città\",\"enterPostalCode\":\"Inserisci codice postale\",\"enterProvince\":\"Inserisci provincia\",\"enterPhone\":\"Inserisci numero di telefono\",\"enterEmail\":\"Inserisci indirizzo email\",\"branchNameRequired\":\"Il nome della filiale è obbligatorio.\",\"addressRequired\":\"L'indirizzo è obbligatorio.\",\"cityRequired\":\"La città è obbligatoria.\",\"postalCodeRequired\":\"Il codice postale è obbligatorio.\",\"provinceRequired\":\"La provincia è obbligatoria.\",\"phoneRequired\":\"Il numero di telefono è obbligatorio.\",\"emailRequired\":\"L'email è obbligatoria.\",\"emailInvalid\":\"Inserisci un indirizzo email valido.\",\"authenticationRequired\":\"Autenticazione richiesta per recuperare le filiali. Effettua l'accesso.\",\"notAuthenticated\":\"Non autenticato. Effettua l'accesso per visualizzare le filiali.\",\"authenticationTokenNotFound\":\"Token di autenticazione non trovato. Effettua nuovamente l'accesso.\",\"branchCreatedSuccessfully\":\"Filiale creata con successo!\",\"branchUpdatedSuccessfully\":\"Filiale aggiornata con successo!\",\"branchDeletedSuccessfully\":\"Filiale eliminata con successo!\",\"failedToCreateBranch\":\"Impossibile creare la filiale\",\"failedToUpdateBranch\":\"Impossibile aggiornare la filiale\",\"failedToDeleteBranch\":\"Impossibile eliminare la filiale\",\"networkError\":\"Errore di rete o problema imprevisto. Riprova.\",\"deleteConfirmation\":{\"title\":\"Elimina Filiale\",\"message\":\"Sei sicuro di voler eliminare questa filiale? Questa azione non può essere annullata.\",\"confirm\":\"Elimina\",\"cancel\":\"Annulla\",\"deleting\":\"Eliminazione...\"},\"fields\":{\"name\":\"Nome\",\"address\":\"Indirizzo\",\"city\":\"Città\",\"postalCode\":\"Codice Postale (CAP)\",\"province\":\"Provincia\",\"phone\":\"Telefono\",\"email\":\"Email\",\"isActive\":\"Attiva\",\"status\":\"Stato\",\"action\":\"Azione\"},\"basicInformation\":\"Informazioni Base\",\"contactInformation\":\"Informazioni di Contatto\",\"locationInformation\":\"Informazioni Posizione\",\"branchId\":\"ID Filiale\",\"createdDate\":\"Data Creazione\",\"lastUpdated\":\"Ultimo Aggiornamento\",\"branchName\":\"Nome Filiale\",\"branchAddress\":\"Indirizzo Filiale\",\"branchCity\":\"Città Filiale\",\"branchPostalCode\":\"Codice Postale Filiale\",\"branchProvince\":\"Provincia Filiale\",\"branchPhone\":\"Telefono Filiale\",\"branchEmail\":\"Email Filiale\",\"branchStatus\":\"Stato Filiale\",\"setAsActive\":\"Imposta come Attiva\",\"removeAsActive\":\"Rimuovi come Attiva\",\"branchLocation\":\"Posizione Filiale\",\"contactDetails\":\"Dettagli Contatto\",\"operationalStatus\":\"Stato Operativo\"},\"earnings\":{\"title\":\"Guadagni\",\"averageWeeklyEarnings\":\"Guadagni Settimanali Medi\",\"thisWeekAverage\":\"Media di Questa Settimana\",\"thisMonthAverage\":\"Media di Questo Mese\",\"thisYearAverage\":\"Media di Questo Anno\",\"weeklyEarnings\":\"Guadagni Settimanali\",\"totalWeeklyRevenue\":\"Ricavi Settimanali Totali\",\"averagePerDay\":\"Media per Giorno\",\"growthVsPreviousWeek\":\"Crescita vs Settimana Precedente\",\"growthVsPreviousMonth\":\"Crescita vs Mese Precedente\",\"growthVsPreviousYear\":\"Crescita vs Anno Precedente\",\"vsLastWeek\":\"vs settimana scorsa\",\"vsLastMonth\":\"vs mese scorso\",\"vsLastYear\":\"vs anno scorso\",\"week\":\"Settimana\",\"month\":\"Mese\",\"year\":\"Anno\",\"totalInvoicesThisWeek\":\"Totale Fatture Questa Settimana\",\"invoices\":\"fatture\",\"paidInvoices\":\"Fatture Pagate\",\"unpaidInvoices\":\"Fatture Non Pagate\",\"overdueInvoices\":\"Fatture Scadute\",\"paid\":\"pagate\",\"unpaid\":\"non pagate\",\"overdue\":\"scadute\",\"revenue\":\"Ricavi\",\"expenses\":\"Spese\",\"profit\":\"Profitto\",\"totalEarnings\":\"Guadagni Totali\",\"monthlyEarnings\":\"Guadagni Mensili\",\"yearlyEarnings\":\"Guadagni Annuali\",\"dailyEarnings\":\"Guadagni Giornalieri\",\"hourlyEarnings\":\"Guadagni Orari\",\"earningsGrowth\":\"Crescita Guadagni\",\"earningsDecline\":\"Declino Guadagni\",\"noEarningsData\":\"Nessun dato di guadagni disponibile\",\"loadingEarnings\":\"Caricamento dati guadagni...\",\"failedToLoadEarnings\":\"Impossibile caricare i dati di guadagni\",\"currency\":\"Valuta\",\"amount\":\"Importo\",\"percentage\":\"Percentuale\",\"trend\":\"Tendenza\",\"upward\":\"In Aumento\",\"downward\":\"In Diminuzione\",\"stable\":\"Stabile\",\"dataPoints\":\"Punti Dati\",\"days\":\"giorni\",\"weeks\":\"settimane\",\"months\":\"mesi\",\"years\":\"anni\"},\"settings\":{\"title\":\"Impostazioni\",\"sections\":{\"profile\":\"Impostazioni Profilo\",\"security\":\"Sicurezza\",\"notifications\":\"Notifiche\",\"preferences\":\"Preferenze\",\"company\":\"Informazioni Azienda\",\"branches\":\"Gestione Filiali\"}}}"));}}),
"[project]/src/data/navigation/verticalMenuItems.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
'use client';
const verticalMenuItems = (t)=>[
        {
            title: t('navigation.dashboard'),
            icon: 'tabler-smart-home',
            path: '/dashboards/analytics'
        },
        {
            title: t('navigation.branch'),
            icon: 'tabler-building-bank',
            path: '/apps/branch/list'
        },
        {
            title: t('navigation.paymentMethods'),
            icon: 'tabler-credit-card',
            path: '/apps/bank-account/list'
        },
        {
            title: t('navigation.service'),
            icon: 'tabler-tools',
            path: '/apps/service/list'
        },
        {
            title: t('navigation.employee'),
            icon: 'tabler-user',
            path: '/apps/user/list'
        },
        {
            title: t('navigation.client'),
            icon: 'tabler-user-star',
            path: '/apps/client/list'
        },
        {
            title: t('navigation.task'),
            icon: 'tabler-checklist',
            path: '/apps/task/list'
        },
        {
            title: t('navigation.invoice'),
            icon: 'tabler-file-description',
            path: '/apps/invoice/list'
        }
    ];
const __TURBOPACK__default__export__ = verticalMenuItems;
}}),
"[project]/src/hooks/useTranslation.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useTranslation": (()=>useTranslation)
});
// React Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
// Config Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$getDictionary$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/utils/getDictionary.js [app-ssr] (ecmascript)");
'use client';
;
;
const useTranslation = ()=>{
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    // Function to get translation string
    const t = (key)=>{
        try {
            // Split the key by dots to access nested properties
            const keys = key.split('.');
            // Get the dictionary based on the current locale
            const locale = params?.lang || 'en';
            const dictionary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$getDictionary$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDictionary"])(locale);
            // Traverse the dictionary using the keys
            let value = dictionary;
            for (const k of keys){
                value = value?.[k];
                if (!value) break;
            }
            // Return the translation or the key if not found
            return value || key;
        } catch (error) {
            console.error(`Translation error for key: ${key}`, error);
            return key;
        }
    };
    return {
        t
    };
};
}}),
"[project]/src/views/dashboards/main/DateTimeCard.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// React Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
// Hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/useTranslation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Typography/Typography.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const DateTimeCard = ()=>{
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])();
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Date());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = setInterval(()=>{
            setCurrentTime(new Date());
        }, 1000);
        return ()=>clearInterval(timer);
    }, []);
    const formatTime = (date)=>{
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };
    const formatDate = (date)=>{
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        className: "flex flex-row items-center text-left gap-2 px-3 py-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                variant: "body1",
                className: "font-semibold text-text-primary",
                sx: {
                    fontFamily: 'monospace',
                    letterSpacing: '0.05em',
                    fontSize: '1rem',
                    fontWeight: 600
                },
                children: formatTime(currentTime)
            }, void 0, false, {
                fileName: "[project]/src/views/dashboards/main/DateTimeCard.jsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                variant: "caption",
                color: "text.disabled",
                className: "font-normal",
                sx: {
                    fontSize: '0.75rem'
                },
                children: "|"
            }, void 0, false, {
                fileName: "[project]/src/views/dashboards/main/DateTimeCard.jsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                variant: "caption",
                color: "text.secondary",
                className: "font-normal",
                sx: {
                    fontSize: '0.75rem'
                },
                children: formatDate(currentTime)
            }, void 0, false, {
                fileName: "[project]/src/views/dashboards/main/DateTimeCard.jsx",
                lineNumber: 67,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/views/dashboards/main/DateTimeCard.jsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = DateTimeCard;
}}),
"[project]/src/app/[lang]/(dashboard)/(private)/layout.jsx [app-rsc] (ecmascript, Next.js server component, client modules ssr)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=src_f4c7be._.js.map