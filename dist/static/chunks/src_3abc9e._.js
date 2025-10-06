(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_3abc9e._.js", {

"[project]/src/components/ClockOutNoteDialog.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/Dialog/Dialog.js [app-client] (ecmascript) <export default as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/DialogTitle/DialogTitle.js [app-client] (ecmascript) <export default as DialogTitle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/Typography/Typography.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/DialogContent/DialogContent.js [app-client] (ecmascript) <export default as DialogContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/Alert/Alert.js [app-client] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/TextField/TextField.js [app-client] (ecmascript) <export default as TextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/DialogActions/DialogActions.js [app-client] (ecmascript) <export default as DialogActions>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/Button/Button.js [app-client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/CircularProgress/CircularProgress.js [app-client] (ecmascript) <export default as CircularProgress>");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
const ClockOutNoteDialog = ({ open, onClose, onConfirm, loading = false })=>{
    _s();
    const [note, setNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [currentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date().toLocaleString());
    const handleClose = ()=>{
        if (!loading) {
            setNote('');
            setError('');
            onClose();
        }
    };
    const handleConfirm = ()=>{
        const trimmedNote = note.trim();
        if (!trimmedNote) {
            setError('Please enter a work summary note before clocking out');
            return;
        }
        if (trimmedNote.length < 10) {
            setError('Please provide a more detailed work summary (at least 10 characters)');
            return;
        }
        // Check for meaningful content (not just repeated characters or single words)
        const words = trimmedNote.split(/\s+/).filter((word)=>word.length > 0);
        if (words.length < 2) {
            setError('Please provide a more detailed summary with multiple words');
            return;
        }
        setError('');
        onConfirm(trimmedNote);
    };
    const handleNoteChange = (event)=>{
        setNote(event.target.value);
        if (error) {
            setError('');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
        open: open,
        onClose: handleClose,
        maxWidth: "sm",
        fullWidth: true,
        disableEscapeKeyDown: loading,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__["DialogTitle"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "tabler-clock-off text-2xl text-red-500"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ClockOutNoteDialog.jsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            variant: "h6",
                            children: "Clock Out - Work Summary"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ClockOutNoteDialog.jsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ClockOutNoteDialog.jsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ClockOutNoteDialog.jsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__["DialogContent"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        pt: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            variant: "body2",
                            color: "text.secondary",
                            sx: {
                                mb: 1
                            },
                            children: "Please provide a summary of your work completed today. This will be used as your daily work summary."
                        }, void 0, false, {
                            fileName: "[project]/src/components/ClockOutNoteDialog.jsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            variant: "caption",
                            color: "text.primary",
                            sx: {
                                mb: 2,
                                display: 'block',
                                fontWeight: 500
                            },
                            children: [
                                "Clocking out at: ",
                                currentTime
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ClockOutNoteDialog.jsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                            severity: "error",
                            sx: {
                                mb: 2
                            },
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/src/components/ClockOutNoteDialog.jsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                            autoFocus: true,
                            fullWidth: true,
                            multiline: true,
                            rows: 4,
                            variant: "outlined",
                            label: "Work Summary",
                            placeholder: "Describe what you accomplished today, tasks completed, meetings attended, etc.",
                            value: note,
                            onChange: handleNoteChange,
                            disabled: loading,
                            error: !!error,
                            helperText: `${note.length}/500 characters (minimum 10 required)`,
                            inputProps: {
                                maxLength: 500
                            },
                            sx: {
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#1976d2'
                                    }
                                }
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/ClockOutNoteDialog.jsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            variant: "caption",
                            color: "text.secondary",
                            sx: {
                                mt: 1,
                                display: 'block'
                            },
                            children: "This information will be stored as part of your attendance record and can be used for reporting and performance tracking."
                        }, void 0, false, {
                            fileName: "[project]/src/components/ClockOutNoteDialog.jsx",
                            lineNumber: 110,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ClockOutNoteDialog.jsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ClockOutNoteDialog.jsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__["DialogActions"], {
                sx: {
                    px: 3,
                    pb: 3
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                        onClick: handleClose,
                        disabled: loading,
                        color: "inherit",
                        children: "Cancel"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ClockOutNoteDialog.jsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                        onClick: handleConfirm,
                        variant: "contained",
                        color: "error",
                        disabled: loading || !note.trim(),
                        startIcon: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/src/components/ClockOutNoteDialog.jsx",
                            lineNumber: 126,
                            columnNumber: 32
                        }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "tabler-clock-off"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ClockOutNoteDialog.jsx",
                            lineNumber: 126,
                            columnNumber: 65
                        }, void 0),
                        children: loading ? 'Processing...' : 'Clock Out'
                    }, void 0, false, {
                        fileName: "[project]/src/components/ClockOutNoteDialog.jsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ClockOutNoteDialog.jsx",
                lineNumber: 117,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ClockOutNoteDialog.jsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
};
_s(ClockOutNoteDialog, "L2kHVoVY64wMeA3OxklShjwIO2U=");
_c = ClockOutNoteDialog;
const __TURBOPACK__default__export__ = ClockOutNoteDialog;
var _c;
__turbopack_refresh__.register(_c, "ClockOutNoteDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/services/attendanceService.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "attendanceService": (()=>attendanceService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
class AttendanceService {
    constructor(){
        this.baseURL = ("TURBOPACK compile-time value", "http://localhost:8000/v1");
    }
    async checkIn(token = null) {
        try {
            const response = await fetch(`${this.baseURL}/attendance/check-in`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-client-type': 'web',
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Check-in failed');
            }
            return data;
        } catch (error) {
            console.error('Check-in error:', error);
            throw error;
        }
    }
    async checkOut(token = null, notes = '') {
        try {
            const response = await fetch(`${this.baseURL}/attendance/check-out`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-client-type': 'web',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    notes
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Check-out failed');
            }
            return data;
        } catch (error) {
            console.error('Check-out error:', error);
            throw error;
        }
    }
    async getMyAttendance(date = null, token = null) {
        try {
            const url = date ? `${this.baseURL}/attendance/my-attendance?date=${date}` : `${this.baseURL}/attendance/my-attendance`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-client-type': 'web',
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch attendance');
            }
            return data;
        } catch (error) {
            console.error('Get attendance error:', error);
            throw error;
        }
    }
    async getMyAttendanceRange(startDate, endDate, token = null) {
        try {
            const response = await fetch(`${this.baseURL}/attendance/my-attendance/range?startDate=${startDate}&endDate=${endDate}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-client-type': 'web',
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch attendance range');
            }
            return data;
        } catch (error) {
            console.error('Get attendance range error:', error);
            throw error;
        }
    }
    async getMyAttendanceStats(startDate, endDate, token = null) {
        try {
            const response = await fetch(`${this.baseURL}/attendance/my-attendance/stats?startDate=${startDate}&endDate=${endDate}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-client-type': 'web',
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch attendance stats');
            }
            return data;
        } catch (error) {
            console.error('Get attendance stats error:', error);
            throw error;
        }
    }
    // Helper method to get current month date range
    getCurrentMonthRange() {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return {
            startDate: startOfMonth.toISOString().split('T')[0],
            endDate: endOfMonth.toISOString().split('T')[0]
        };
    }
}
const attendanceService = new AttendanceService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/views/dashboards/main/ClockInOutCard.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// React Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
// Component Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$components$2f$mui$2f$Avatar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@core/components/mui/Avatar.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ClockOutNoteDialog$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ClockOutNoteDialog.jsx [app-client] (ecmascript)");
// Service Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$attendanceService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/services/attendanceService.js [app-client] (ecmascript)");
// Hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/useTranslation.js [app-client] (ecmascript)");
// MUI Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Card/Card.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/CardContent/CardContent.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Alert/Alert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Button/Button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/CircularProgress/CircularProgress.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
const ClockInOutCard = ()=>{
    _s();
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const [isClockedIn, setIsClockedIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [clockInTime, setClockInTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [attendanceData, setAttendanceData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showNoteDialog, setShowNoteDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [clockOutLoading, setClockOutLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fetchTodayAttendance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ClockInOutCard.useCallback[fetchTodayAttendance]": async ()=>{
            try {
                setLoading(true);
                setError(null);
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$attendanceService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["attendanceService"].getMyAttendance(null, session.accessToken);
                if (response.success && response.data) {
                    setAttendanceData(response.data);
                    setIsClockedIn(!!response.data.checkIn && !response.data.checkOut);
                    if (response.data.checkIn) {
                        setClockInTime(new Date(response.data.checkIn));
                    }
                }
            } catch (err) {
                console.error('Error fetching attendance:', err);
                setError(t('dashboard.common.error'));
            } finally{
                setLoading(false);
            }
        }
    }["ClockInOutCard.useCallback[fetchTodayAttendance]"], [
        session?.accessToken
    ]);
    // Fetch today's attendance on component mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClockInOutCard.useEffect": ()=>{
            if (session?.accessToken) {
                fetchTodayAttendance();
            }
        }
    }["ClockInOutCard.useEffect"], [
        session?.accessToken
    ]);
    const handleClockInOut = async ()=>{
        if (!session?.accessToken) {
            setError(t('dashboard.common.error'));
            return;
        }
        if (isClockedIn) {
            // Show note dialog for clock out
            setShowNoteDialog(true);
        } else {
            // Clock in directly
            try {
                setLoading(true);
                setError(null);
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$attendanceService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["attendanceService"].checkIn(session.accessToken);
                if (response.success) {
                    setIsClockedIn(true);
                    setClockInTime(new Date(response.data.checkIn));
                    setAttendanceData(response.data);
                }
            } catch (err) {
                console.error('Clock in error:', err);
                setError(err.message || t('dashboard.common.error'));
            } finally{
                setLoading(false);
            }
        }
    };
    const handleClockOutWithNote = async (note)=>{
        if (!session?.accessToken) {
            setError(t('dashboard.common.error'));
            return;
        }
        try {
            setClockOutLoading(true);
            setError(null);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$attendanceService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["attendanceService"].checkOut(session.accessToken, note);
            if (response.success) {
                setIsClockedIn(false);
                setClockInTime(null);
                setAttendanceData(response.data);
                setShowNoteDialog(false);
            }
        } catch (err) {
            console.error('Clock out error:', err);
            setError(err.message || t('dashboard.common.error'));
        } finally{
            setClockOutLoading(false);
        }
    };
    const handleCloseNoteDialog = ()=>{
        if (!clockOutLoading) {
            setShowNoteDialog(false);
        }
    };
    const formatTime = (date)=>{
        if (!date) return '';
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };
    if (loading && !attendanceData) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            sx: {
                height: '100%'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                className: "flex flex-col gap-y-4 items-center justify-center h-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        size: 40
                    }, void 0, false, {
                        fileName: "[project]/src/views/dashboards/main/ClockInOutCard.jsx",
                        lineNumber: 140,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "body2",
                        color: "text.secondary",
                        children: t('dashboard.common.loading')
                    }, void 0, false, {
                        fileName: "[project]/src/views/dashboards/main/ClockInOutCard.jsx",
                        lineNumber: 141,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/views/dashboards/main/ClockInOutCard.jsx",
                lineNumber: 139,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/views/dashboards/main/ClockInOutCard.jsx",
            lineNumber: 138,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        sx: {
            height: '100%'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: "flex flex-col gap-y-4 items-start h-full",
            children: [
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    severity: "error",
                    sx: {
                        width: '100%',
                        mb: 2
                    },
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/views/dashboards/main/ClockInOutCard.jsx",
                    lineNumber: 153,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$components$2f$mui$2f$Avatar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    variant: "rounded",
                    skin: "light",
                    size: 44,
                    color: isClockedIn ? 'success' : 'error',
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: "tabler-clock text-[28px]"
                    }, void 0, false, {
                        fileName: "[project]/src/views/dashboards/main/ClockInOutCard.jsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/views/dashboards/main/ClockInOutCard.jsx",
                    lineNumber: 158,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-y-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: "h6",
                            color: "text.primary",
                            children: isClockedIn ? t('dashboard.clockInOut.currentlyClockedIn') : t('dashboard.clockInOut.currentlyClockedOut')
                        }, void 0, false, {
                            fileName: "[project]/src/views/dashboards/main/ClockInOutCard.jsx",
                            lineNumber: 163,
                            columnNumber: 11
                        }, this),
                        isClockedIn && clockInTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: "body2",
                            color: "text.secondary",
                            children: [
                                "Since ",
                                formatTime(clockInTime)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/views/dashboards/main/ClockInOutCard.jsx",
                            lineNumber: 167,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/views/dashboards/main/ClockInOutCard.jsx",
                    lineNumber: 162,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    variant: "contained",
                    color: isClockedIn ? 'error' : 'primary',
                    onClick: handleClockInOut,
                    disabled: loading,
                    startIcon: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        size: 16
                    }, void 0, false, {
                        fileName: "[project]/src/views/dashboards/main/ClockInOutCard.jsx",
                        lineNumber: 180,
                        columnNumber: 15
                    }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: isClockedIn ? 'tabler-clock-off' : 'tabler-clock'
                    }, void 0, false, {
                        fileName: "[project]/src/views/dashboards/main/ClockInOutCard.jsx",
                        lineNumber: 182,
                        columnNumber: 15
                    }, void 0),
                    sx: {
                        mt: 1
                    },
                    children: loading ? t('dashboard.common.loading') : isClockedIn ? t('dashboard.clockInOut.clockOut') : t('dashboard.clockInOut.clockIn')
                }, void 0, false, {
                    fileName: "[project]/src/views/dashboards/main/ClockInOutCard.jsx",
                    lineNumber: 173,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ClockOutNoteDialog$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    open: showNoteDialog,
                    onClose: handleCloseNoteDialog,
                    onConfirm: handleClockOutWithNote,
                    loading: clockOutLoading
                }, void 0, false, {
                    fileName: "[project]/src/views/dashboards/main/ClockInOutCard.jsx",
                    lineNumber: 195,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/views/dashboards/main/ClockInOutCard.jsx",
            lineNumber: 151,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/views/dashboards/main/ClockInOutCard.jsx",
        lineNumber: 150,
        columnNumber: 5
    }, this);
};
_s(ClockInOutCard, "dMu1iCnV0PYCAvWAlJVzwdmVcA0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = ClockInOutCard;
const __TURBOPACK__default__export__ = ClockInOutCard;
var _c;
__turbopack_refresh__.register(_c, "ClockInOutCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/services/apiClient.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "createApiClient": (()=>createApiClient),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:8000/v1") || 'http://localhost:5000/v1';
// Create axios instance
const apiClient = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'x-client-type': 'web'
    }
});
const createApiClient = (token)=>{
    const client = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
        baseURL: API_BASE_URL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'x-client-type': 'web',
            ...token && {
                Authorization: `Bearer ${token}`
            }
        }
    });
    // Add response interceptor for error handling
    client.interceptors.response.use({
        "createApiClient.use": (response)=>response
    }["createApiClient.use"], {
        "createApiClient.use": (error)=>{
            // Handle authentication errors
            if (error.response?.status === 401) {
                if ("TURBOPACK compile-time truthy", 1) {
                    localStorage.removeItem('token');
                    sessionStorage.clear();
                    window.location.href = '/login';
                }
            }
            return Promise.reject(error);
        }
    }["createApiClient.use"]);
    return client;
};
// Request interceptor to add auth token
apiClient.interceptors.request.use((config)=>{
    // Get token from localStorage or config
    let token = null;
    if ("TURBOPACK compile-time truthy", 1) {
        // First try to get token from localStorage
        token = localStorage.getItem('token');
        // If no token in localStorage, try to get from session (if available)
        if (!token && window.sessionStorage) {
            token = sessionStorage.getItem('accessToken');
        }
        // If still no token, try to get from global session object
        if (!token && window.__NEXT_DATA__?.props?.pageProps?.session?.accessToken) {
            token = window.__NEXT_DATA__.props.pageProps.session.accessToken;
        }
    }
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error)=>{
    return Promise.reject(error);
});
// Response interceptor to handle common errors
apiClient.interceptors.response.use((response)=>{
    return response;
}, (error)=>{
    // Handle authentication errors
    if (error.response?.status === 401) {
        // Clear token and redirect to login
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem('token');
            sessionStorage.clear();
            // Show toast before redirect
            if (window.toastService) {
                window.toastService.showError('Your session has expired. Please log in again.');
            }
            setTimeout(()=>{
                window.location.href = '/login';
            }, 2000);
        }
    }
    // Handle network errors
    if (!error.response) {
        error.message = 'Network error. Please check your internet connection.';
    }
    // Handle server errors
    if (error.response?.status >= 500) {
        error.message = 'Server error. Please try again later.';
    }
    // Handle client errors
    if (error.response?.status >= 400 && error.response?.status < 500) {
        if (error.response?.data?.message) {
            error.message = error.response.data.message;
        } else {
            error.message = `Request failed with status ${error.response.status}`;
        }
    }
    return Promise.reject(error);
});
const __TURBOPACK__default__export__ = apiClient;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/services/BaseService.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/services/apiClient.js [app-client] (ecmascript)");
;
/**
 * Base service class that provides common API operations
 * All services should extend this class for consistency
 */ class BaseService {
    constructor(endpoint){
        this.endpoint = endpoint;
    }
    // Get API client with optional token
    getApiClient(token = null) {
        if (token) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createApiClient"])(token);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
    }
    /**
   * Get all items with optional filters
   * @param {Object} params - Query parameters
   * @param {string} token - Optional auth token
   * @returns {Promise} - API response
   */ async getAll(params = {}, token = null) {
        try {
            const client = this.getApiClient(token);
            const response = await client.get(this.endpoint, {
                params
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching ${this.endpoint}:`, error);
            throw error;
        }
    }
    /**
   * Get single item by ID
   * @param {string} id - Item ID
   * @param {string} token - Optional auth token
   * @returns {Promise} - API response
   */ async getById(id, token = null) {
        try {
            const client = this.getApiClient(token);
            const response = await client.get(`${this.endpoint}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching ${this.endpoint} by ID:`, error);
            throw error;
        }
    }
    /**
   * Create new item
   * @param {Object} data - Item data
   * @param {string} token - Optional auth token
   * @returns {Promise} - API response
   */ async create(data, token = null) {
        try {
            const client = this.getApiClient(token);
            const response = await client.post(this.endpoint, data);
            return response.data;
        } catch (error) {
            console.error(`Error creating ${this.endpoint}:`, error);
            throw error;
        }
    }
    /**
   * Update item by ID
   * @param {string} id - Item ID
   * @param {Object} data - Updated data
   * @param {string} token - Optional auth token
   * @returns {Promise} - API response
   */ async update(id, data, token = null) {
        try {
            const client = this.getApiClient(token);
            const response = await client.patch(`${this.endpoint}/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(`Error updating ${this.endpoint}:`, error);
            throw error;
        }
    }
    /**
   * Delete item by ID
   * @param {string} id - Item ID
   * @param {string} token - Optional auth token
   * @returns {Promise} - API response
   */ async delete(id, token = null) {
        try {
            const client = this.getApiClient(token);
            const response = await client.delete(`${this.endpoint}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting ${this.endpoint}:`, error);
            throw error;
        }
    }
    /**
   * Bulk delete items
   * @param {Array} ids - Array of item IDs
   * @param {string} token - Optional auth token
   * @returns {Promise} - API response
   */ async bulkDelete(ids, token = null) {
        try {
            const client = this.getApiClient(token);
            const response = await client.delete(`${this.endpoint}/bulk`, {
                data: {
                    ids
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error bulk deleting ${this.endpoint}:`, error);
            throw error;
        }
    }
}
const __TURBOPACK__default__export__ = BaseService;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/services/ServiceFactory.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "services": (()=>services)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$BaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/services/BaseService.js [app-client] (ecmascript)");
;
/**
 * Service Factory - Creates consistent API services
 * Usage: const userService = ServiceFactory.create('/users')
 */ class ServiceFactory {
    /**
   * Create a new service instance
   * @param {string} endpoint - API endpoint
   * @returns {BaseService} - Service instance
   */ static create(endpoint) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$BaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](endpoint);
    }
    /**
   * Create multiple services at once
   * @param {Object} endpoints - Object with service names as keys and endpoints as values
   * @returns {Object} - Object with service instances
   */ static createMultiple(endpoints) {
        const services = {};
        for (const [name, endpoint] of Object.entries(endpoints)){
            services[name] = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$BaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](endpoint);
        }
        return services;
    }
}
const services = ServiceFactory.createMultiple({
    clients: '/clients',
    invoices: '/invoices',
    tasks: '/tasks',
    employees: '/employees',
    branches: '/branches',
    services: '/services',
    bankAccounts: '/bank-accounts',
    companyInfo: '/company-info',
    dashboard: '/dashboard',
    attendance: '/attendance'
});
const __TURBOPACK__default__export__ = ServiceFactory;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/views/dashboards/main/TaskStatisticsCard.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// React Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
// Component Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$components$2f$mui$2f$Avatar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@core/components/mui/Avatar.jsx [app-client] (ecmascript)");
// Service Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ServiceFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/services/ServiceFactory.js [app-client] (ecmascript)");
// Hooks Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/useTranslation.js [app-client] (ecmascript)");
// MUI Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Card/Card.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/CardContent/CardContent.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Alert/Alert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid2$2f$Grid2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Grid2/Grid2.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/CircularProgress/CircularProgress.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
const TaskStatisticsCard = ()=>{
    _s();
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const [taskStats, setTaskStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        pending: 0,
        completed: 0,
        cancelled: 0
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchTaskStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TaskStatisticsCard.useCallback[fetchTaskStats]": async ()=>{
            try {
                setLoading(true);
                setError(null);
                if (!session?.accessToken) {
                    setError(t('dashboard.common.error'));
                    return;
                }
                const client = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ServiceFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["services"].tasks.getApiClient(session.accessToken);
                const response = await client.get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ServiceFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["services"].tasks.endpoint}/statistics`);
                if (response && response.data) {
                    setTaskStats(response.data.data);
                } else {
                    setError(t('dashboard.common.error'));
                }
            } catch (err) {
                console.error('Error fetching task stats:', err);
                setError(t('dashboard.common.error'));
            } finally{
                setLoading(false);
            }
        }
    }["TaskStatisticsCard.useCallback[fetchTaskStats]"], [
        session?.accessToken
    ]);
    // Fetch task statistics on component mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TaskStatisticsCard.useEffect": ()=>{
            if (session?.accessToken) {
                fetchTaskStats();
            }
        }
    }["TaskStatisticsCard.useEffect"], [
        session?.accessToken
    ]);
    const statsData = [
        {
            title: t('dashboard.taskStatistics.pendingActivities'),
            count: taskStats.pending,
            color: 'warning',
            icon: 'tabler-clock'
        },
        {
            title: t('dashboard.taskStatistics.completedActivities'),
            count: taskStats.completed,
            color: 'success',
            icon: 'tabler-check'
        },
        {
            title: t('dashboard.taskStatistics.cancelledActivities'),
            count: taskStats.cancelled,
            color: 'error',
            icon: 'tabler-x'
        }
    ];
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            sx: {
                height: '100%'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        size: 40
                    }, void 0, false, {
                        fileName: "[project]/src/views/dashboards/main/TaskStatisticsCard.jsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "body2",
                        color: "text.secondary",
                        sx: {
                            mt: 2
                        },
                        children: t('dashboard.common.loading')
                    }, void 0, false, {
                        fileName: "[project]/src/views/dashboards/main/TaskStatisticsCard.jsx",
                        lineNumber: 103,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/views/dashboards/main/TaskStatisticsCard.jsx",
                lineNumber: 93,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/views/dashboards/main/TaskStatisticsCard.jsx",
            lineNumber: 92,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        sx: {
            height: '100%'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            sx: {
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    variant: "h5",
                    sx: {
                        mb: 3
                    },
                    children: t('dashboard.taskStatistics.title')
                }, void 0, false, {
                    fileName: "[project]/src/views/dashboards/main/TaskStatisticsCard.jsx",
                    lineNumber: 114,
                    columnNumber: 9
                }, this),
                ' ',
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    severity: "error",
                    sx: {
                        mb: 2
                    },
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/views/dashboards/main/TaskStatisticsCard.jsx",
                    lineNumber: 118,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid2$2f$Grid2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    container: true,
                    spacing: 3,
                    justifyContent: "space-between",
                    children: statsData.map((stat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid2$2f$Grid2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            xs: 12,
                            sm: 4,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$components$2f$mui$2f$Avatar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "rounded",
                                        skin: "light",
                                        size: 40,
                                        color: stat.color,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: `${stat.icon} text-[20px]`
                                        }, void 0, false, {
                                            fileName: "[project]/src/views/dashboards/main/TaskStatisticsCard.jsx",
                                            lineNumber: 127,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/dashboards/main/TaskStatisticsCard.jsx",
                                        lineNumber: 126,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "h4",
                                                color: "text.primary",
                                                children: stat.count
                                            }, void 0, false, {
                                                fileName: "[project]/src/views/dashboards/main/TaskStatisticsCard.jsx",
                                                lineNumber: 130,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "body2",
                                                color: "text.secondary",
                                                children: stat.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/views/dashboards/main/TaskStatisticsCard.jsx",
                                                lineNumber: 133,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/views/dashboards/main/TaskStatisticsCard.jsx",
                                        lineNumber: 129,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/dashboards/main/TaskStatisticsCard.jsx",
                                lineNumber: 125,
                                columnNumber: 15
                            }, this)
                        }, index, false, {
                            fileName: "[project]/src/views/dashboards/main/TaskStatisticsCard.jsx",
                            lineNumber: 124,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/views/dashboards/main/TaskStatisticsCard.jsx",
                    lineNumber: 122,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/views/dashboards/main/TaskStatisticsCard.jsx",
            lineNumber: 113,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/views/dashboards/main/TaskStatisticsCard.jsx",
        lineNumber: 112,
        columnNumber: 5
    }, this);
};
_s(TaskStatisticsCard, "BlEnSBIom0kWzU4l/1W+w/TXwDg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = TaskStatisticsCard;
const __TURBOPACK__default__export__ = TaskStatisticsCard;
var _c;
__turbopack_refresh__.register(_c, "TaskStatisticsCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/views/dashboards/main/TimesheetChart.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// React Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// Next Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
// Service Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$attendanceService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/services/attendanceService.js [app-client] (ecmascript)");
// Hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/useTranslation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/styles/useTheme.js [app-client] (ecmascript) <export default as useTheme>");
// MUI Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Card/Card.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/CardHeader/CardHeader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/CardContent/CardContent.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Alert/Alert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/CircularProgress/CircularProgress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Typography/Typography.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
// Styled Component Imports
const AppReactApexCharts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_require__("[project]/src/libs/styles/AppReactApexCharts.jsx [app-client] (ecmascript, async loader)")(__turbopack_import__), {
    loadableGenerated: {
        modules: [
            "src/views/dashboards/main/TimesheetChart.jsx -> " + "@/libs/styles/AppReactApexCharts"
        ]
    }
});
_c = AppReactApexCharts;
;
;
const TimesheetChart = ()=>{
    _s();
    // Hook
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const [timesheetData, setTimesheetData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchTimesheetData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TimesheetChart.useCallback[fetchTimesheetData]": async ()=>{
            try {
                setLoading(true);
                setError(null);
                // Get current month date range
                const { startDate, endDate } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$attendanceService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["attendanceService"].getCurrentMonthRange();
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$attendanceService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["attendanceService"].getMyAttendanceRange(startDate, endDate, session.accessToken);
                if (response.success && response.data) {
                    // Process attendance data to create timesheet chart data
                    const processedData = processAttendanceData(response.data);
                    setTimesheetData(processedData);
                }
            } catch (err) {
                console.error('Error fetching timesheet data:', err);
                setError(t('dashboard.common.error'));
                // Fallback to mock data
                setTimesheetData(generateMockData());
            } finally{
                setLoading(false);
            }
        }
    }["TimesheetChart.useCallback[fetchTimesheetData]"], [
        session?.accessToken
    ]);
    // Fetch timesheet data on component mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TimesheetChart.useEffect": ()=>{
            if (session?.accessToken) {
                fetchTimesheetData();
            }
        }
    }["TimesheetChart.useEffect"], [
        session?.accessToken
    ]);
    const getDaysInCurrentMonth = ()=>{
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    };
    const processAttendanceData = (attendanceRecords)=>{
        const daysInMonth = getDaysInCurrentMonth();
        const data = new Array(daysInMonth).fill(0);
        attendanceRecords.forEach((record)=>{
            if (record.checkIn && record.checkOut) {
                const day = new Date(record.date).getDate() - 1 // Convert to 0-based index
                ;
                if (day >= 0 && day < daysInMonth) {
                    const checkIn = new Date(record.checkIn);
                    const checkOut = new Date(record.checkOut);
                    const hours = (checkOut - checkIn) / (1000 * 60 * 60) // Convert to hours
                    ;
                    data[day] = parseFloat(hours.toFixed(1));
                }
            }
        });
        return data;
    };
    const generateMockData = ()=>{
        const daysInMonth = getDaysInCurrentMonth();
        const data = [];
        for(let i = 1; i <= daysInMonth; i++){
            // Mock data: some days with 8 hours, some with 0, some with partial hours
            const hours = Math.random() > 0.3 ? Math.random() * 8 : 0;
            data.push(parseFloat(hours.toFixed(1)));
        }
        return data;
    };
    const series = [
        {
            name: t('dashboard.timesheet.totalHours'),
            data: timesheetData
        }
    ];
    const options = {
        chart: {
            parentHeightOffset: 0,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: [
            'var(--mui-palette-success-main)'
        ],
        stroke: {
            curve: 'smooth',
            width: 3
        },
        markers: {
            size: 4,
            strokeWidth: 2,
            colors: [
                'var(--mui-palette-success-main)'
            ],
            strokeColors: 'var(--mui-palette-background-paper)',
            hover: {
                size: 6
            }
        },
        grid: {
            strokeDashArray: 6,
            borderColor: 'var(--mui-palette-divider)',
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: false
                }
            },
            padding: {
                top: -20,
                left: -5,
                right: 10,
                bottom: -10
            }
        },
        tooltip: {
            enabled: true,
            x: {
                show: true,
                formatter: (val)=>`${t('dashboard.common.today')} ${val}`
            },
            y: {
                formatter: (val)=>`${val} ${t('dashboard.timesheet.hoursPerDay')}`
            }
        },
        xaxis: {
            categories: Array.from({
                length: getDaysInCurrentMonth()
            }, (_, i)=>i + 1),
            labels: {
                style: {
                    colors: 'var(--mui-palette-text-disabled)',
                    fontSize: '12px'
                }
            },
            axisTicks: {
                show: false
            },
            axisBorder: {
                show: false
            }
        },
        yaxis: {
            min: 0,
            max: 8,
            tickAmount: 4,
            labels: {
                style: {
                    colors: 'var(--mui-palette-text-disabled)',
                    fontSize: '12px'
                },
                formatter: (val)=>`${val}h`
            }
        },
        dataLabels: {
            enabled: false
        }
    };
    const getCurrentMonthName = ()=>{
        const now = new Date();
        return now.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            sx: {
                height: '100%'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    title: t('dashboard.timesheet.title'),
                    subheader: `${t('dashboard.timesheet.hoursWorkedIn')} ${getCurrentMonthName()}`
                }, void 0, false, {
                    fileName: "[project]/src/views/dashboards/main/TimesheetChart.jsx",
                    lineNumber: 193,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    sx: {
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            size: 40
                        }, void 0, false, {
                            fileName: "[project]/src/views/dashboards/main/TimesheetChart.jsx",
                            lineNumber: 206,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: "body2",
                            color: "text.secondary",
                            sx: {
                                mt: 2
                            },
                            children: t('dashboard.common.loading')
                        }, void 0, false, {
                            fileName: "[project]/src/views/dashboards/main/TimesheetChart.jsx",
                            lineNumber: 207,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/views/dashboards/main/TimesheetChart.jsx",
                    lineNumber: 197,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/views/dashboards/main/TimesheetChart.jsx",
            lineNumber: 192,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        sx: {
            height: '100%'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: t('dashboard.timesheet.title'),
                subheader: `${t('dashboard.timesheet.hoursWorkedIn')} ${getCurrentMonthName()}`
            }, void 0, false, {
                fileName: "[project]/src/views/dashboards/main/TimesheetChart.jsx",
                lineNumber: 217,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                },
                children: [
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        severity: "error",
                        sx: {
                            mb: 2
                        },
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/views/dashboards/main/TimesheetChart.jsx",
                        lineNumber: 223,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AppReactApexCharts, {
                        type: "line",
                        height: 300,
                        series: series,
                        options: options
                    }, void 0, false, {
                        fileName: "[project]/src/views/dashboards/main/TimesheetChart.jsx",
                        lineNumber: 227,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/views/dashboards/main/TimesheetChart.jsx",
                lineNumber: 221,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/views/dashboards/main/TimesheetChart.jsx",
        lineNumber: 216,
        columnNumber: 5
    }, this);
};
_s(TimesheetChart, "nMYgxZ/1HUcbCaWJOANhpeK6k84=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c1 = TimesheetChart;
const __TURBOPACK__default__export__ = TimesheetChart;
var _c, _c1;
__turbopack_refresh__.register(_c, "AppReactApexCharts");
__turbopack_refresh__.register(_c1, "TimesheetChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/services/dashboardService.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "dashboardService": (()=>dashboardService),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:8000/v1") || 'http://localhost:8000/v1';
class DashboardService {
    constructor(){
        this.baseURL = `${API_BASE_URL}/dashboard`;
    }
    // Get auth token from localStorage
    getAuthToken() {
        if ("TURBOPACK compile-time truthy", 1) {
            return localStorage.getItem('token');
        }
        "TURBOPACK unreachable";
    }
    // Get headers with auth token
    getHeaders(token = null) {
        const authToken = token || this.getAuthToken();
        return {
            'Content-Type': 'application/json',
            'x-client-type': 'web',
            ...authToken && {
                Authorization: `Bearer ${authToken}`
            }
        };
    }
    // Get dashboard statistics
    async getDashboardStats(params = {}, token = null) {
        try {
            const queryParams = new URLSearchParams();
            if (params.startDate) queryParams.append('startDate', params.startDate);
            if (params.endDate) queryParams.append('endDate', params.endDate);
            const url = `${this.baseURL}/stats?${queryParams.toString()}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: this.getHeaders(token)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            throw error;
        }
    }
    // Get weekly earnings data
    async getWeeklyEarnings(params = {}, token = null) {
        try {
            const queryParams = new URLSearchParams();
            if (params.weeks) queryParams.append('weeks', params.weeks);
            const url = `${this.baseURL}/weekly-earnings?${queryParams.toString()}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: this.getHeaders(token)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching weekly earnings:', error);
            throw error;
        }
    }
    // Get earnings data for any period (week/month/year)
    async getEarningsData(params = {}, token = null) {
        try {
            const queryParams = new URLSearchParams();
            if (params.branchId) queryParams.append('branchId', params.branchId);
            if (params.period) queryParams.append('period', params.period);
            const url = `${this.baseURL}/earnings?${queryParams.toString()}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: this.getHeaders(token)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching earnings data:', error);
            throw error;
        }
    }
    // Get invoice statistics
    async getInvoiceStats(params = {}, token = null) {
        try {
            const queryParams = new URLSearchParams();
            if (params.startDate) queryParams.append('startDate', params.startDate);
            if (params.endDate) queryParams.append('endDate', params.endDate);
            const url = `${this.baseURL}/invoice-stats?${queryParams.toString()}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: this.getHeaders(token)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching invoice stats:', error);
            throw error;
        }
    }
    // Get invoices list
    async getInvoices(params = {}, token = null) {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page);
            if (params.limit) queryParams.append('limit', params.limit);
            if (params.status) queryParams.append('status', params.status);
            if (params.search) queryParams.append('search', params.search);
            const url = `${this.baseURL.replace('/dashboard', '')}/invoices?${queryParams.toString()}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: this.getHeaders(token)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching invoices:', error);
            throw error;
        }
    }
}
const dashboardService = new DashboardService();
const __TURBOPACK__default__export__ = dashboardService;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/hooks/useEarningsData.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "useEarningsData": (()=>useEarningsData)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$dashboardService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/services/dashboardService.js [app-client] (ecmascript)");
var _s = __turbopack_refresh__.signature();
;
;
;
const useEarningsData = (params = {})=>{
    _s();
    const { data: session, status: sessionStatus } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [period, setPeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(params.period || 'week');
    const fetchData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEarningsData.useCallback[fetchData]": async (selectedPeriod = period)=>{
            try {
                setLoading(true);
                setError(null);
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$dashboardService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dashboardService"].getEarningsData({
                    ...params,
                    period: selectedPeriod
                }, session.accessToken);
                setData(response.data);
            } catch (err) {
                console.error('Error fetching earnings data:', err);
                // Handle different types of errors
                if (err.response?.status === 401) {
                    setError('Authentication required. Please log in again.');
                } else if (err.response?.status === 403) {
                    setError('You do not have permission to view earnings data.');
                } else if (err.response?.status >= 500) {
                    setError('Server error. Please try again later.');
                } else {
                    setError(err.message || 'Failed to fetch earnings data');
                }
            } finally{
                setLoading(false);
            }
        }
    }["useEarningsData.useCallback[fetchData]"], [
        params,
        session?.accessToken,
        period
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useEarningsData.useEffect": ()=>{
            // Only fetch data if we have a valid session
            if (sessionStatus === 'loading') return;
            if (sessionStatus === 'unauthenticated' || !session?.accessToken) {
                setError('Authentication required. Please log in.');
                setLoading(false);
                return;
            }
            fetchData();
        }
    }["useEarningsData.useEffect"], [
        JSON.stringify(params),
        sessionStatus,
        session?.accessToken,
        period
    ]);
    const changePeriod = (newPeriod)=>{
        setPeriod(newPeriod);
        fetchData(newPeriod);
    };
    const refetch = ()=>{
        fetchData();
    };
    return {
        data,
        loading,
        error,
        period,
        changePeriod,
        refetch
    };
};
_s(useEarningsData, "EU9cyFx8Ct1SO2ln/4PMZFwuInQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"]
    ];
});
const __TURBOPACK__default__export__ = useEarningsData;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Next Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
// React Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// Hook Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useEarningsData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/useEarningsData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/useTranslation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/styles/useTheme.js [app-client] (ecmascript) <export default as useTheme>");
// MUI Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Card/Card.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/CardHeader/CardHeader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$ButtonGroup$2f$ButtonGroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/ButtonGroup/ButtonGroup.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Button/Button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/CardContent/CardContent.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Chip/Chip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Divider$2f$Divider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Divider/Divider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Alert/Alert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/CircularProgress/CircularProgress.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// Styled Component Imports
const AppReactApexCharts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_require__("[project]/src/libs/styles/AppReactApexCharts.jsx [app-client] (ecmascript, async loader)")(__turbopack_import__), {
    loadableGenerated: {
        modules: [
            "src/views/dashboards/analytics/LineAreaDailySalesChart.jsx -> " + "@/libs/styles/AppReactApexCharts"
        ]
    }
});
_c = AppReactApexCharts;
;
;
const LineAreaDailySalesChart = ({ data, loading, error })=>{
    _s();
    // Hooks
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const { data: earningsData, loading: earningsLoading, error: earningsError, period, changePeriod } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useEarningsData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEarningsData"])();
    // Handle loading and error states
    if (loading || earningsLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: "h-[100%] flex flex-col justify-center items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    variant: "body2",
                    sx: {
                        mt: 2
                    },
                    children: t('earnings.loadingEarnings')
                }, void 0, false, {
                    fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
            lineNumber: 39,
            columnNumber: 7
        }, this);
    }
    if (error || earningsError) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: "h-[100%] flex flex-col justify-center items-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                severity: "error",
                sx: {
                    width: '100%'
                },
                children: error || earningsError
            }, void 0, false, {
                fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                lineNumber: 51,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
            lineNumber: 50,
            columnNumber: 7
        }, this);
    }
    // Prepare chart data
    const chartData = earningsData?.chartData || [
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ];
    const periodTotal = earningsData?.periodTotal || 0;
    const periodAverage = earningsData?.periodAverage || 0;
    const growthPercentage = earningsData?.growthPercentage || 0;
    const labels = earningsData?.labels || [
        t('dashboard.timePeriods.monday'),
        t('dashboard.timePeriods.tuesday'),
        t('dashboard.timePeriods.wednesday'),
        t('dashboard.timePeriods.thursday'),
        t('dashboard.timePeriods.friday'),
        t('dashboard.timePeriods.saturday'),
        t('dashboard.timePeriods.sunday')
    ];
    // Get period-specific labels and series name
    const getPeriodInfo = (period)=>{
        switch(period){
            case 'week':
                return {
                    seriesName: t('earnings.dailyEarnings'),
                    xAxisLabels: [
                        t('dashboard.timePeriods.monday'),
                        t('dashboard.timePeriods.tuesday'),
                        t('dashboard.timePeriods.wednesday'),
                        t('dashboard.timePeriods.thursday'),
                        t('dashboard.timePeriods.friday'),
                        t('dashboard.timePeriods.saturday'),
                        t('dashboard.timePeriods.sunday')
                    ],
                    periodLabel: t('earnings.thisWeekAverage')
                };
            case 'month':
                return {
                    seriesName: t('earnings.weeklyEarnings'),
                    xAxisLabels: [
                        t('dashboard.timePeriods.week1'),
                        t('dashboard.timePeriods.week2'),
                        t('dashboard.timePeriods.week3'),
                        t('dashboard.timePeriods.week4')
                    ],
                    periodLabel: t('earnings.thisMonthAverage')
                };
            case 'year':
                return {
                    seriesName: t('earnings.monthlyEarnings'),
                    xAxisLabels: [
                        t('dashboard.timePeriods.january'),
                        t('dashboard.timePeriods.february'),
                        t('dashboard.timePeriods.march'),
                        t('dashboard.timePeriods.april'),
                        t('dashboard.timePeriods.may'),
                        t('dashboard.timePeriods.june'),
                        t('dashboard.timePeriods.july'),
                        t('dashboard.timePeriods.august'),
                        t('dashboard.timePeriods.september'),
                        t('dashboard.timePeriods.october'),
                        t('dashboard.timePeriods.november'),
                        t('dashboard.timePeriods.december')
                    ],
                    periodLabel: t('earnings.thisYearAverage')
                };
            default:
                return {
                    seriesName: t('earnings.dailyEarnings'),
                    xAxisLabels: [
                        t('dashboard.timePeriods.monday'),
                        t('dashboard.timePeriods.tuesday'),
                        t('dashboard.timePeriods.wednesday'),
                        t('dashboard.timePeriods.thursday'),
                        t('dashboard.timePeriods.friday'),
                        t('dashboard.timePeriods.saturday'),
                        t('dashboard.timePeriods.sunday')
                    ],
                    periodLabel: t('earnings.thisWeekAverage')
                };
        }
    };
    const periodInfo = getPeriodInfo(period);
    const xAxisLabels = labels.length > 0 ? labels : periodInfo.xAxisLabels;
    const series = [
        {
            name: periodInfo.seriesName,
            data: chartData
        }
    ];
    const options = {
        chart: {
            parentHeightOffset: 0,
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: false
            },
            height: 90
        },
        tooltip: {
            enabled: true,
            shared: false,
            intersect: false,
            x: {
                show: true,
                formatter: (val, { dataPointIndex })=>{
                    return xAxisLabels[dataPointIndex] || `${periodInfo.seriesName} ${dataPointIndex + 1}`;
                }
            },
            y: {
                formatter: (val)=>`${periodInfo.seriesName}: $${val.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    })}`
            },
            marker: {
                show: true
            },
            style: {
                fontSize: '12px',
                fontFamily: theme.typography.fontFamily
            },
            custom: function({ series, seriesIndex, dataPointIndex, w }) {
                const label = xAxisLabels[dataPointIndex] || `${periodInfo.seriesName} ${dataPointIndex + 1}`;
                const value = series[seriesIndex][dataPointIndex];
                return `
          <div style="padding: 8px 12px; background: white; border: 1px solid #e0e0e0; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="font-weight: 600; margin-bottom: 4px;">${label}</div>
            <div style="color: #666;">${periodInfo.seriesName}: $${value.toLocaleString('en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                })}</div>
          </div>
        `;
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 3,
            curve: 'smooth'
        },
        grid: {
            show: true,
            strokeDashArray: 3,
            borderColor: 'var(--mui-palette-divider)',
            padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                opacityTo: 0.1,
                opacityFrom: 0.6,
                shadeIntensity: 1,
                stops: [
                    0,
                    90,
                    100
                ],
                colorStops: [
                    [
                        {
                            offset: 0,
                            opacity: 0.6,
                            color: theme.palette.success.main
                        },
                        {
                            offset: 90,
                            opacity: 0.2,
                            color: theme.palette.success.main
                        },
                        {
                            opacity: 0,
                            offset: 100,
                            color: 'var(--mui-palette-background-paper)'
                        }
                    ]
                ]
            }
        },
        theme: {
            monochrome: {
                enabled: true,
                shadeTo: 'light',
                shadeIntensity: 1,
                color: theme.palette.success.main
            }
        },
        xaxis: {
            categories: xAxisLabels,
            labels: {
                show: true,
                style: {
                    fontSize: '11px',
                    colors: 'var(--mui-palette-text-disabled)',
                    fontFamily: theme.typography.fontFamily
                }
            },
            axisTicks: {
                show: false
            },
            axisBorder: {
                show: false
            }
        },
        yaxis: {
            show: true,
            labels: {
                show: true,
                formatter: (val)=>`$${val.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    })}`,
                style: {
                    fontSize: '11px',
                    colors: 'var(--mui-palette-text-disabled)',
                    fontFamily: theme.typography.fontFamily
                }
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        className: "h-[100%] flex flex-col justify-between",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: periodInfo.periodLabel,
                className: "pbe-0",
                action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$ButtonGroup$2f$ButtonGroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    size: "small",
                    variant: "outlined",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: period === 'week' ? 'contained' : 'outlined',
                            onClick: ()=>changePeriod('week'),
                            children: t('earnings.week')
                        }, void 0, false, {
                            fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                            lineNumber: 270,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: period === 'month' ? 'contained' : 'outlined',
                            onClick: ()=>changePeriod('month'),
                            children: t('earnings.month')
                        }, void 0, false, {
                            fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                            lineNumber: 273,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: period === 'year' ? 'contained' : 'outlined',
                            onClick: ()=>changePeriod('year'),
                            children: t('earnings.year')
                        }, void 0, false, {
                            fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                            lineNumber: 276,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                    lineNumber: 269,
                    columnNumber: 11
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                lineNumber: 265,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    pt: 0,
                    justifyContent: 'space-between'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            mb: 2
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "body2",
                                color: "text.secondary",
                                sx: {
                                    mb: 0.5
                                },
                                children: periodInfo.periodLabel
                            }, void 0, false, {
                                fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                                lineNumber: 286,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "h3",
                                sx: {
                                    fontWeight: 700,
                                    color: theme.palette.success.main,
                                    mb: 1
                                },
                                children: [
                                    "$",
                                    periodAverage.toLocaleString('en-US', {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                                lineNumber: 289,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                label: `↗ ${growthPercentage >= 0 ? '+' : ''}${growthPercentage.toFixed(1)}% ${t('earnings.vsLastWeek')}`,
                                size: "small",
                                sx: {
                                    bgcolor: growthPercentage >= 0 ? theme.palette.success.light + '20' : theme.palette.error.light + '20',
                                    color: growthPercentage >= 0 ? theme.palette.success.main : theme.palette.error.main,
                                    fontWeight: 600,
                                    fontSize: '0.75rem'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                                lineNumber: 299,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                        lineNumber: 285,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            height: 90,
                            mb: 2,
                            position: 'relative',
                            zIndex: 1
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AppReactApexCharts, {
                            type: "area",
                            height: 110,
                            width: "100%",
                            series: series,
                            options: options
                        }, void 0, false, {
                            fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                            lineNumber: 313,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                        lineNumber: 312,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Divider$2f$Divider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            mb: 2
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                        lineNumber: 316,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                sx: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "body2",
                                        color: "text.secondary",
                                        children: t('earnings.totalWeeklyRevenue')
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                                        lineNumber: 321,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "body2",
                                        fontWeight: 600,
                                        children: [
                                            "$",
                                            periodTotal.toLocaleString('en-US', {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                                        lineNumber: 324,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                                lineNumber: 320,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                sx: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "body2",
                                        color: "text.secondary",
                                        children: t('earnings.averagePerDay')
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                                        lineNumber: 330,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "body2",
                                        fontWeight: 600,
                                        color: "success.main",
                                        children: [
                                            "$",
                                            periodAverage.toLocaleString('en-US', {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                                        lineNumber: 333,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                                lineNumber: 329,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                sx: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "body2",
                                        color: "text.secondary",
                                        children: t('earnings.growthVsPreviousWeek')
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                                        lineNumber: 339,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "body2",
                                        fontWeight: 600,
                                        color: growthPercentage >= 0 ? 'success.main' : 'error.main',
                                        children: [
                                            growthPercentage >= 0 ? '+' : '',
                                            growthPercentage.toFixed(1),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                                        lineNumber: 342,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                                lineNumber: 338,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                sx: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "body2",
                                        color: "text.secondary",
                                        children: "Data Points"
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                                        lineNumber: 349,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "body2",
                                        fontWeight: 600,
                                        color: "primary.main",
                                        children: [
                                            chartData.length,
                                            " ",
                                            period === 'week' ? 'days' : period === 'month' ? 'weeks' : 'months'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                                        lineNumber: 352,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                                lineNumber: 348,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                        lineNumber: 319,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
                lineNumber: 283,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/views/dashboards/analytics/LineAreaDailySalesChart.jsx",
        lineNumber: 264,
        columnNumber: 5
    }, this);
};
_s(LineAreaDailySalesChart, "5l9N0d1hlBM4kxRyBCNfD9vr8yQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useEarningsData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEarningsData"]
    ];
});
_c1 = LineAreaDailySalesChart;
const __TURBOPACK__default__export__ = LineAreaDailySalesChart;
var _c, _c1;
__turbopack_refresh__.register(_c, "AppReactApexCharts");
__turbopack_refresh__.register(_c1, "LineAreaDailySalesChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/@core/components/option-menu/index.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// React Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// Next Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
// Third-party Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/classnames/index.js [app-client] (ecmascript)");
// Hook Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useSettings$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@core/hooks/useSettings.jsx [app-client] (ecmascript)");
// MUI Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Tooltip/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/IconButton/IconButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Popper$2f$Popper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Popper/Popper.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Fade$2f$Fade$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Fade/Fade.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Paper/Paper.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$ClickAwayListener$2f$ClickAwayListener$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ClickAwayListener__as__default$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/ClickAwayListener/ClickAwayListener.js [app-client] (ecmascript) <export ClickAwayListener as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuList$2f$MenuList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/MenuList/MenuList.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Divider$2f$Divider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Divider/Divider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/MenuItem/MenuItem.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const IconButtonWrapper = (props)=>{
    // Props
    const { tooltipProps, children } = props;
    return tooltipProps?.title ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        ...tooltipProps,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/@core/components/option-menu/index.jsx",
        lineNumber: 31,
        columnNumber: 32
    }, this) : children;
};
_c = IconButtonWrapper;
const MenuItemWrapper = ({ children, option })=>{
    if (option.href) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            component: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            href: option.href,
            ...option.linkProps,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/@core/components/option-menu/index.jsx",
            lineNumber: 37,
            columnNumber: 7
        }, this);
    } else {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
    }
};
_c1 = MenuItemWrapper;
const OptionMenu = (props)=>{
    _s();
    // Props
    const { tooltipProps, icon, iconClassName, options, leftAlignMenu, iconButtonProps } = props;
    // States
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Refs
    const anchorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Hooks
    const { settings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useSettings$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSettings"])();
    const handleToggle = ()=>{
        setOpen((prevOpen)=>!prevOpen);
    };
    const handleClose = (event)=>{
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconButtonWrapper, {
                tooltipProps: tooltipProps,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    ref: anchorRef,
                    size: "small",
                    onClick: handleToggle,
                    ...iconButtonProps,
                    children: typeof icon === 'string' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(icon, iconClassName)
                    }, void 0, false, {
                        fileName: "[project]/src/@core/components/option-menu/index.jsx",
                        lineNumber: 76,
                        columnNumber: 13
                    }, this) : icon ? icon : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('tabler-dots-vertical', iconClassName)
                    }, void 0, false, {
                        fileName: "[project]/src/@core/components/option-menu/index.jsx",
                        lineNumber: 80,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/@core/components/option-menu/index.jsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/@core/components/option-menu/index.jsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Popper$2f$Popper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: open,
                anchorEl: anchorRef.current,
                placement: leftAlignMenu ? 'bottom-start' : 'bottom-end',
                transition: true,
                disablePortal: true,
                sx: {
                    zIndex: 1
                },
                children: ({ TransitionProps })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Fade$2f$Fade$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        ...TransitionProps,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            className: settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg',
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$ClickAwayListener$2f$ClickAwayListener$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ClickAwayListener__as__default$3e$__["default"], {
                                onClickAway: handleClose,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuList$2f$MenuList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    autoFocusItem: open,
                                    children: options.map((option, index)=>{
                                        if (typeof option === 'string') {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                onClick: handleClose,
                                                children: option
                                            }, index, false, {
                                                fileName: "[project]/src/@core/components/option-menu/index.jsx",
                                                lineNumber: 100,
                                                columnNumber: 25
                                            }, this);
                                        } else if ('divider' in option) {
                                            return option.divider && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Divider$2f$Divider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                ...option.dividerProps
                                            }, index, false, {
                                                fileName: "[project]/src/@core/components/option-menu/index.jsx",
                                                lineNumber: 105,
                                                columnNumber: 48
                                            }, this);
                                        } else {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                ...option.menuItemProps,
                                                ...option.href && {
                                                    className: 'p-0'
                                                },
                                                onClick: (e)=>{
                                                    handleClose(e);
                                                    if (option.onClick) {
                                                        option.onClick(e);
                                                    } else if (option.menuItemProps && option.menuItemProps.onClick) {
                                                        option.menuItemProps.onClick(e);
                                                    }
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuItemWrapper, {
                                                    option: option,
                                                    children: [
                                                        (typeof option.icon === 'string' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: option.icon
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/@core/components/option-menu/index.jsx",
                                                            lineNumber: 122,
                                                            columnNumber: 65
                                                        }, this) : option.icon) || null,
                                                        option.text
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/@core/components/option-menu/index.jsx",
                                                    lineNumber: 121,
                                                    columnNumber: 27
                                                }, this)
                                            }, index, false, {
                                                fileName: "[project]/src/@core/components/option-menu/index.jsx",
                                                lineNumber: 108,
                                                columnNumber: 25
                                            }, this);
                                        }
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/@core/components/option-menu/index.jsx",
                                    lineNumber: 96,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/@core/components/option-menu/index.jsx",
                                lineNumber: 95,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/@core/components/option-menu/index.jsx",
                            lineNumber: 94,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/@core/components/option-menu/index.jsx",
                        lineNumber: 93,
                        columnNumber: 11
                    }, this)
            }, void 0, false, {
                fileName: "[project]/src/@core/components/option-menu/index.jsx",
                lineNumber: 84,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
};
_s(OptionMenu, "/+0p/Sjp+TdvEGm+5HDlNgtTfRo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useSettings$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSettings"]
    ];
});
_c2 = OptionMenu;
const __TURBOPACK__default__export__ = OptionMenu;
var _c, _c1, _c2;
__turbopack_refresh__.register(_c, "IconButtonWrapper");
__turbopack_refresh__.register(_c1, "MenuItemWrapper");
__turbopack_refresh__.register(_c2, "OptionMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/@core/components/mui/TextField.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// React Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// MUI Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/styles/styled.js [app-client] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/TextField/TextField.js [app-client] (ecmascript)");
'use client';
;
;
;
;
const TextFieldStyled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(({ theme })=>({
        '& .MuiInputLabel-root': {
            transform: 'none',
            width: 'fit-content',
            maxWidth: '100%',
            lineHeight: 1.153,
            position: 'relative',
            fontSize: theme.typography.body2.fontSize,
            marginBottom: theme.spacing(1),
            color: 'var(--mui-palette-text-primary)',
            '&:not(.Mui-error).MuiFormLabel-colorPrimary.Mui-focused': {
                color: 'var(--mui-palette-primary-main) !important'
            },
            '&.Mui-disabled': {
                color: 'var(--mui-palette-text-disabled)'
            },
            '&.Mui-error': {
                color: 'var(--mui-palette-error-main)'
            }
        },
        '& .MuiInputBase-root': {
            backgroundColor: 'transparent !important',
            border: `1px solid var(--mui-palette-customColors-inputBorder)`,
            '&:not(.Mui-focused):not(.Mui-disabled):not(.Mui-error):hover': {
                borderColor: 'var(--mui-palette-action-active)'
            },
            '&:before, &:after': {
                display: 'none'
            },
            '&.MuiInputBase-sizeSmall': {
                borderRadius: 'var(--mui-shape-borderRadius)'
            },
            '&.Mui-error': {
                borderColor: 'var(--mui-palette-error-main)'
            },
            '&.Mui-focused': {
                borderWidth: 2,
                '& .MuiInputBase-input:not(.MuiInputBase-readOnly):not([readonly])::placeholder': {
                    transform: 'translateX(4px)'
                },
                '& :not(textarea).MuiFilledInput-input': {
                    padding: '6.25px 13px'
                },
                '&:not(.Mui-error).MuiInputBase-colorPrimary': {
                    borderColor: 'var(--mui-palette-primary-main)',
                    boxShadow: 'var(--mui-customShadows-primary-sm)'
                },
                '&.MuiInputBase-colorSecondary': {
                    borderColor: 'var(--mui-palette-secondary-main)'
                },
                '&.MuiInputBase-colorInfo': {
                    borderColor: 'var(--mui-palette-info-main)'
                },
                '&.MuiInputBase-colorSuccess': {
                    borderColor: 'var(--mui-palette-success-main)'
                },
                '&.MuiInputBase-colorWarning': {
                    borderColor: 'var(--mui-palette-warning-main)'
                },
                '&.MuiInputBase-colorError': {
                    borderColor: 'var(--mui-palette-error-main)'
                },
                '&.Mui-error': {
                    borderColor: 'var(--mui-palette-error-main)'
                }
            },
            '&.Mui-disabled': {
                backgroundColor: 'var(--mui-palette-action-hover) !important'
            }
        },
        // Adornments
        '& .MuiInputAdornment-root': {
            marginBlockStart: '0px !important',
            '&.MuiInputAdornment-positionStart + .MuiInputBase-input:not(textarea)': {
                paddingInlineStart: '0px !important'
            }
        },
        '& .MuiInputBase-inputAdornedEnd.MuiInputBase-input': {
            paddingInlineEnd: '0px !important'
        },
        '& .MuiInputBase-sizeSmall.MuiInputBase-adornedStart.Mui-focused': {
            paddingInlineStart: '13px',
            '& .MuiInputBase-input': {
                paddingInlineStart: '0px !important'
            }
        },
        '& .MuiInputBase-sizeSmall.MuiInputBase-adornedStart:not(.MuiAutocomplete-inputRoot)': {
            paddingInlineStart: '14px'
        },
        '& .MuiInputBase-sizeSmall.MuiInputBase-adornedEnd:not(.MuiAutocomplete-inputRoot)': {
            paddingInlineEnd: '14px'
        },
        '& .MuiInputBase-sizeSmall.MuiInputBase-adornedEnd.Mui-focused:not(.MuiAutocomplete-inputRoot)': {
            paddingInlineEnd: '13px',
            '& .MuiInputBase-input': {
                paddingInlineEnd: '0px !important'
            }
        },
        '& :not(.MuiInputBase-sizeSmall).MuiInputBase-adornedStart.Mui-focused': {
            paddingInlineStart: '15px',
            '& .MuiInputBase-input': {
                paddingInlineStart: '0px !important'
            }
        },
        '& :not(.MuiInputBase-sizeSmall).MuiInputBase-adornedStart': {
            paddingInlineStart: '16px'
        },
        '& :not(.MuiInputBase-sizeSmall).MuiInputBase-adornedEnd.Mui-focused': {
            paddingInlineEnd: '15px',
            '& .MuiInputBase-input': {
                paddingInlineEnd: '0px !important'
            }
        },
        '& :not(.MuiInputBase-sizeSmall).MuiInputBase-adornedEnd': {
            paddingInlineEnd: '16px'
        },
        '& .MuiInputAdornment-sizeMedium': {
            'i, svg': {
                fontSize: '1.25rem'
            }
        },
        '& .MuiInputBase-input': {
            '&:not(textarea).MuiInputBase-inputSizeSmall': {
                padding: '7.25px 14px'
            },
            '&:not(.MuiInputBase-readOnly):not([readonly])::placeholder': {
                transition: theme.transitions.create([
                    'opacity',
                    'transform'
                ], {
                    duration: theme.transitions.duration.shorter
                })
            }
        },
        '& :not(.MuiInputBase-sizeSmall).MuiInputBase-root': {
            borderRadius: '8px',
            fontSize: '17px',
            lineHeight: '1.41',
            '& .MuiInputBase-input': {
                padding: '10.8px 16px'
            },
            '&.Mui-focused': {
                '& .MuiInputBase-input': {
                    padding: '9.8px 15px'
                }
            }
        },
        '& .MuiFormHelperText-root': {
            lineHeight: 1.154,
            margin: theme.spacing(1, 0, 0),
            fontSize: theme.typography.body2.fontSize,
            '&.Mui-error': {
                color: 'var(--mui-palette-error-main)'
            },
            '&.Mui-disabled': {
                color: 'var(--mui-palette-text-disabled)'
            }
        },
        // For Select
        '& .MuiSelect-select.MuiInputBase-inputSizeSmall, & .MuiNativeSelect-select.MuiInputBase-inputSizeSmall': {
            '& ~ i, & ~ svg': {
                inlineSize: '1.125rem',
                blockSize: '1.125rem'
            }
        },
        '& .MuiSelect-select': {
            // lineHeight: 1.5,
            minHeight: 'unset !important',
            lineHeight: '1.4375em',
            '&.MuiInputBase-input': {
                paddingInlineEnd: '32px !important'
            }
        },
        '& .Mui-focused .MuiSelect-select': {
            '& ~ i, & ~ svg': {
                right: '0.9375rem'
            }
        },
        '& .MuiSelect-select:focus, & .MuiNativeSelect-select:focus': {
            backgroundColor: 'transparent'
        },
        // For Autocomplete
        '& :not(.MuiInputBase-sizeSmall).MuiAutocomplete-inputRoot': {
            paddingBlock: '5.55px',
            '& .MuiAutocomplete-input': {
                paddingInline: '8px !important',
                paddingBlock: '5.25px !important'
            },
            '&.Mui-focused .MuiAutocomplete-input': {
                paddingInlineStart: '7px !important'
            },
            '&.Mui-focused': {
                paddingBlock: '4.55px !important'
            },
            '& .MuiAutocomplete-endAdornment': {
                top: 'calc(50% - 12px)'
            }
        },
        '& .MuiAutocomplete-inputRoot.MuiInputBase-sizeSmall': {
            paddingBlock: '4.75px !important',
            paddingInlineStart: '10px',
            '&.Mui-focused': {
                paddingBlock: '3.75px !important',
                paddingInlineStart: '9px',
                '.MuiAutocomplete-input': {
                    paddingBlock: '2.5px',
                    paddingInline: '3px !important'
                }
            },
            '& .MuiAutocomplete-input': {
                paddingInline: '3px !important'
            }
        },
        '& .MuiAutocomplete-inputRoot': {
            display: 'flex',
            gap: '0.25rem',
            '& .MuiAutocomplete-tag': {
                margin: 0
            }
        },
        '& .MuiAutocomplete-inputRoot.Mui-focused .MuiAutocomplete-endAdornment': {
            right: '.9375rem'
        },
        // For Textarea
        '& .MuiInputBase-multiline': {
            '&.MuiInputBase-sizeSmall': {
                padding: '6px 14px',
                '&.Mui-focused': {
                    padding: '5px 13px'
                }
            },
            '& textarea.MuiInputBase-inputSizeSmall:placeholder-shown': {
                overflowX: 'hidden'
            }
        }
    }));
_c = TextFieldStyled;
const CustomTextField = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c1 = (props, ref)=>{
    const { size = 'small', slotProps, ...rest } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextFieldStyled, {
        size: size,
        inputRef: ref,
        ...rest,
        variant: "filled",
        slotProps: {
            ...slotProps,
            inputLabel: {
                ...slotProps?.inputLabel,
                shrink: true
            }
        }
    }, void 0, false, {
        fileName: "[project]/src/@core/components/mui/TextField.jsx",
        lineNumber: 252,
        columnNumber: 5
    }, this);
});
_c2 = CustomTextField;
const __TURBOPACK__default__export__ = CustomTextField;
var _c, _c1, _c2;
__turbopack_refresh__.register(_c, "TextFieldStyled");
__turbopack_refresh__.register(_c1, "CustomTextField$forwardRef");
__turbopack_refresh__.register(_c2, "CustomTextField");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/TablePaginationComponent.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// MUI Imports
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/useTranslation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Pagination$2f$Pagination$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Pagination/Pagination.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
;
;
;
const TablePaginationComponent = ({ table })=>{
    _s();
    // Hooks
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                color: "text.disabled",
                children: `${t('common.pagination.showing')} ${table.getFilteredRowModel().rows.length === 0 ? 0 : table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} ${t('common.pagination.to')} ${Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)} ${t('common.pagination.of')} ${table.getFilteredRowModel().rows.length} ${t('common.pagination.entries')}`
            }, void 0, false, {
                fileName: "[project]/src/components/TablePaginationComponent.jsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Pagination$2f$Pagination$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                shape: "rounded",
                color: "primary",
                variant: "tonal",
                count: Math.ceil(table.getFilteredRowModel().rows.length / table.getState().pagination.pageSize),
                page: table.getState().pagination.pageIndex + 1,
                onChange: (_, page)=>{
                    table.setPageIndex(page - 1);
                },
                showFirstButton: true,
                showLastButton: true
            }, void 0, false, {
                fileName: "[project]/src/components/TablePaginationComponent.jsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/TablePaginationComponent.jsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
};
_s(TablePaginationComponent, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = TablePaginationComponent;
const __TURBOPACK__default__export__ = TablePaginationComponent;
var _c;
__turbopack_refresh__.register(_c, "TablePaginationComponent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/@core/styles/table.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__({
  "cellWithInput": "table-module__Mig-TG__cellWithInput",
  "table": "table-module__Mig-TG__table",
});
}}),
"[project]/src/services/toastService.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "clearAllToasts": (()=>clearAllToasts),
    "clearToast": (()=>clearToast),
    "default": (()=>__TURBOPACK__default__export__),
    "enhancedFetch": (()=>enhancedFetch),
    "handleApiError": (()=>handleApiError),
    "handleApiSuccess": (()=>handleApiSuccess),
    "handleAsyncOperation": (()=>handleAsyncOperation),
    "handleAuthError": (()=>handleAuthError),
    "showError": (()=>showError),
    "showInfo": (()=>showInfo),
    "showSuccess": (()=>showSuccess),
    "showWarning": (()=>showWarning)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-toastify/dist/react-toastify.esm.mjs [app-client] (ecmascript)");
;
/**
 * Toast Service - Centralized toast notification management
 * Handles success, error, warning, and info messages consistently
 */ // Toast configuration
const defaultToastConfig = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
};
// Toast types with custom styling
const toastTypes = {
    success: {
        className: 'toast-success'
    },
    error: {
        className: 'toast-error'
    },
    warning: {
        className: 'toast-warning'
    },
    info: {
        className: 'toast-info'
    }
};
const showSuccess = (message, options = {})=>{
    const config = {
        ...defaultToastConfig,
        ...options,
        className: `${toastTypes.success.className} ${options.className || ''}`
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(message, config);
};
const showError = (message, options = {})=>{
    const config = {
        ...defaultToastConfig,
        autoClose: 7000,
        ...options,
        className: `${toastTypes.error.className} ${options.className || ''}`
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(message, config);
};
const showWarning = (message, options = {})=>{
    const config = {
        ...defaultToastConfig,
        ...options,
        className: `${toastTypes.warning.className} ${options.className || ''}`
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].warning(message, config);
};
const showInfo = (message, options = {})=>{
    const config = {
        ...defaultToastConfig,
        ...options,
        className: `${toastTypes.info.className} ${options.className || ''}`
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info(`${toastTypes.info.icon} ${message}`, config);
};
const handleApiError = async (error, fallbackMessage = 'An unexpected error occurred', options = {})=>{
    let errorMessage = fallbackMessage;
    try {
        // Handle fetch response errors
        if (error && typeof error.json === 'function') {
            try {
                const errorData = await error.json();
                errorMessage = errorData.message || errorData.error || fallbackMessage;
            } catch (jsonError) {
                // Handle cases where response is not JSON (like HTML error pages)
                if (jsonError.message.includes('Unexpected token') || jsonError.message.includes('<!DOCTYPE')) {
                    if (error.status === 404) {
                        errorMessage = 'The requested resource was not found. Please check your connection and try again.';
                    } else if (error.status === 500) {
                        errorMessage = 'Server error occurred. Please try again later.';
                    } else if (error.status === 401) {
                        handleAuthError(error, fallbackMessage, options);
                        return; // Don't show regular error toast, auth handler takes care of it
                    } else if (error.status === 403) {
                        errorMessage = 'You do not have permission to perform this action.';
                    } else if (error.status === 0) {
                        errorMessage = 'Network error. Please check your internet connection.';
                    } else {
                        errorMessage = `Server error (${error.status}). Please try again later.`;
                    }
                } else {
                    errorMessage = fallbackMessage;
                }
            }
        } else if (error?.response?.data?.message) {
            errorMessage = error.response.data.message;
        } else if (error?.message) {
            // Check for authentication errors
            if (error.message.includes('Please authenticate') || error.message.includes('Authentication failed')) {
                handleAuthError(error, fallbackMessage, options);
                return; // Don't show regular error toast, auth handler takes care of it
            } else if (error.message.includes('Unexpected token') || error.message.includes('<!DOCTYPE')) {
                errorMessage = 'Server returned an invalid response. Please try again later.';
            } else {
                errorMessage = error.message;
            }
        } else if (typeof error === 'string') {
            errorMessage = error;
        }
    } catch (parseError) {
        console.error('Error parsing API error:', parseError);
    // Use fallback message if parsing fails
    }
    showError(errorMessage, options);
};
const handleApiSuccess = (action, entity, options = {})=>{
    const message = `${entity} ${action} successfully!`;
    showSuccess(message, options);
};
const handleAsyncOperation = async (promise, options = {})=>{
    const { loadingMessage = 'Processing...', successMessage = 'Operation completed successfully!', errorMessage = 'Operation failed', showLoading = false } = options;
    let loadingToastId = null;
    try {
        if (showLoading) {
            loadingToastId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].loading(loadingMessage);
        }
        const result = await promise;
        if (loadingToastId) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].dismiss(loadingToastId);
        }
        if (successMessage) {
            showSuccess(successMessage);
        }
        return result;
    } catch (error) {
        if (loadingToastId) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].dismiss(loadingToastId);
        }
        await handleApiError(error, errorMessage);
        throw error;
    }
};
const clearAllToasts = ()=>{
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].dismiss();
};
const clearToast = (toastId)=>{
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].dismiss(toastId);
};
const handleAuthError = (error, fallbackMessage = 'Authentication failed', options = {})=>{
    const authErrorMessage = 'Your session has expired. Please log in again.';
    // Show error toast
    showError(authErrorMessage, {
        ...options,
        autoClose: 5000 // Longer duration for auth errors
    });
    // Redirect to login page after a delay
    setTimeout(()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            // Clear any stored tokens
            localStorage.removeItem('token');
            sessionStorage.clear();
            // Redirect to login
            window.location.href = '/login';
        }
    }, 3000);
};
const enhancedFetch = async (url, options = {})=>{
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-client-type': 'web',
                ...options.headers
            },
            ...options
        });
        // Check if response is ok
        if (!response.ok) {
            // Try to parse error response
            try {
                const errorData = await response.json();
                const error = new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
                error.status = response.status;
                error.response = response;
                throw error;
            } catch (jsonError) {
                // If JSON parsing fails, create a meaningful error
                const error = new Error(`Server error (${response.status}): ${response.statusText}`);
                error.status = response.status;
                error.response = response;
                throw error;
            }
        }
        // Try to parse JSON response
        try {
            const data = await response.json();
            return {
                ...response,
                data
            };
        } catch (jsonError) {
            // If response is not JSON, return the response as is
            return response;
        }
    } catch (error) {
        // Re-throw with enhanced error message if needed
        if (error.message && error.message.includes('Unexpected token')) {
            throw new Error('Server returned an invalid response. Please check your connection and try again.');
        }
        throw error;
    }
};
const __TURBOPACK__default__export__ = {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    handleApiError,
    handleApiSuccess,
    handleAsyncOperation,
    handleAuthError,
    clearAllToasts,
    clearToast,
    enhancedFetch
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/services/taskService.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "taskService": (()=>taskService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
class TaskService {
    constructor(){
        this.baseURL = ("TURBOPACK compile-time value", "http://localhost:8000/v1") || 'http://localhost:3001/v1';
    }
    async fetchWithAuth(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        if (!response.ok) {
            throw new Error('API request failed');
        }
        return response.json();
    }
    async getTaskStats(token) {
        try {
            return await this.fetchWithAuth('/tasks/statistics', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Get task stats error:', error);
            throw error;
        }
    }
    // Mock task list - in real app, this would call actual task APIs
    async getMyTasks(status = null, token = null) {
        try {
            // For now, return mock data
            // In the future, this would call something like:
            // GET /api/v1/tasks/my-tasks?status=pending
            const mockTasks = [
                {
                    id: 1,
                    title: 'Task 1',
                    status: 'pending',
                    priority: 'high'
                },
                {
                    id: 2,
                    title: 'Task 2',
                    status: 'completed',
                    priority: 'medium'
                },
                {
                    id: 3,
                    title: 'Task 3',
                    status: 'cancelled',
                    priority: 'low'
                }
            ];
            const filteredTasks = status ? mockTasks.filter((task)=>task.status === status) : mockTasks;
            return {
                success: true,
                data: {
                    tasks: filteredTasks,
                    total: filteredTasks.length
                }
            };
        } catch (error) {
            console.error('Get tasks error:', error);
            throw error;
        }
    }
    // Create task - in real app, this would call actual task APIs
    async createTask(taskData, token = null) {
        try {
            // For now, return mock success
            // In the future, this would call:
            // POST /api/v1/tasks
            return {
                success: true,
                data: {
                    id: Date.now(),
                    ...taskData,
                    createdAt: new Date().toISOString()
                }
            };
        } catch (error) {
            console.error('Create task error:', error);
            throw error;
        }
    }
    // Update task - in real app, this would call actual task APIs
    async updateTask(taskId, taskData, token = null) {
        try {
            // For now, return mock success
            // In the future, this would call:
            // PUT /api/v1/tasks/{id}
            return {
                success: true,
                data: {
                    id: taskId,
                    ...taskData,
                    updatedAt: new Date().toISOString()
                }
            };
        } catch (error) {
            console.error('Update task error:', error);
            throw error;
        }
    }
    // Delete task - in real app, this would call actual task APIs
    async deleteTask(taskId, token = null) {
        try {
            // For now, return mock success
            // In the future, this would call:
            // DELETE /api/v1/tasks/{id}
            return {
                success: true,
                message: 'Task deleted successfully'
            };
        } catch (error) {
            console.error('Delete task error:', error);
            throw error;
        }
    }
}
const taskService = new TaskService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/services/enhancedTaskService.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$taskService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/services/taskService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$toastService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/services/toastService.js [app-client] (ecmascript)");
;
;
/**
 * Enhanced Task Service with Toast Integration
 * Wraps the existing task service with toast notifications
 */ class EnhancedTaskService {
    constructor(){
        this.baseService = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$taskService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["taskService"];
    }
    // Get all tasks with toast notifications
    async getTasks(token = null, params = {}, options = {}) {
        const { showToast = false, successMessage = null, errorMessage = 'Failed to fetch tasks' } = options;
        try {
            const result = await this.baseService.getMyTasks(params.status, token);
            if (showToast && successMessage) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$toastService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].showSuccess(successMessage);
            }
            return result;
        } catch (error) {
            if (showToast) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$toastService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].handleApiError(error, errorMessage);
            }
            throw error;
        }
    }
    // Get single task by ID with toast notifications
    async getTaskById(id, options = {}) {
        const { showToast = false, successMessage = null, errorMessage = 'Failed to fetch task details' } = options;
        try {
            // This would need to be implemented in the base service
            const result = await this.baseService.getTaskById(id);
            if (showToast && successMessage) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$toastService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].showSuccess(successMessage);
            }
            return result;
        } catch (error) {
            if (showToast) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$toastService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].handleApiError(error, errorMessage);
            }
            throw error;
        }
    }
    // Create new task with toast notifications
    async createTask(taskData, token = null, options = {}) {
        const { showToast = true, successMessage = 'Task created successfully!', errorMessage = 'Failed to create task', showLoading = true } = options;
        const apiCall = async ()=>{
            try {
                return await this.baseService.createTask(taskData, token);
            } catch (error) {
                // Enhanced error handling for common API issues
                if (error.message && error.message.includes('Please authenticate')) {
                    throw new Error('Your session has expired. Please log in again.');
                } else if (error.message && error.message.includes('Unexpected token')) {
                    throw new Error('Server returned an invalid response. Please check your connection and try again.');
                }
                throw error;
            }
        };
        if (showLoading) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$toastService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].handleAsyncOperation(apiCall, {
                loadingMessage: 'Creating task...',
                successMessage: showToast ? successMessage : null,
                errorMessage,
                showLoading: true
            });
        } else {
            try {
                const result = await apiCall();
                if (showToast) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$toastService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].showSuccess(successMessage);
                }
                return result;
            } catch (error) {
                if (showToast) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$toastService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].handleApiError(error, errorMessage);
                }
                throw error;
            }
        }
    }
    // Update task with toast notifications
    async updateTask(id, taskData, token = null, options = {}) {
        const { showToast = true, successMessage = 'Task updated successfully!', errorMessage = 'Failed to update task', showLoading = true } = options;
        const apiCall = async ()=>{
            try {
                return await this.baseService.updateTask(id, taskData, token);
            } catch (error) {
                // Enhanced error handling for common API issues
                if (error.message && error.message.includes('Please authenticate')) {
                    throw new Error('Your session has expired. Please log in again.');
                } else if (error.message && error.message.includes('Unexpected token')) {
                    throw new Error('Server returned an invalid response. Please check your connection and try again.');
                }
                throw error;
            }
        };
        if (showLoading) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$toastService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].handleAsyncOperation(apiCall, {
                loadingMessage: 'Updating task...',
                successMessage: showToast ? successMessage : null,
                errorMessage,
                showLoading: true
            });
        } else {
            try {
                const result = await apiCall();
                if (showToast) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$toastService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].showSuccess(successMessage);
                }
                return result;
            } catch (error) {
                if (showToast) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$toastService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].handleApiError(error, errorMessage);
                }
                throw error;
            }
        }
    }
    // Delete task with toast notifications
    async deleteTask(id, token = null, options = {}) {
        const { showToast = true, successMessage = 'Task deleted successfully!', errorMessage = 'Failed to delete task', showLoading = true } = options;
        const apiCall = ()=>this.baseService.deleteTask(id, token);
        if (showLoading) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$toastService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].handleAsyncOperation(apiCall, {
                loadingMessage: 'Deleting task...',
                successMessage: showToast ? successMessage : null,
                errorMessage,
                showLoading: true
            });
        } else {
            try {
                const result = await apiCall();
                if (showToast) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$toastService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].showSuccess(successMessage);
                }
                return result;
            } catch (error) {
                if (showToast) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$toastService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].handleApiError(error, errorMessage);
                }
                throw error;
            }
        }
    }
    // Get task statistics with toast notifications
    async getTaskStats(token = null, options = {}) {
        const { showToast = false, successMessage = null, errorMessage = 'Failed to fetch task statistics' } = options;
        try {
            const result = await this.baseService.getTaskStats(token);
            if (showToast && successMessage) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$toastService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].showSuccess(successMessage);
            }
            return result;
        } catch (error) {
            if (showToast) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$toastService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].handleApiError(error, errorMessage);
            }
            throw error;
        }
    }
}
const __TURBOPACK__default__export__ = new EnhancedTaskService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/dialogs/DialogCloseButton.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
//Mui Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/styles/styled.js [app-client] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Button/Button.js [app-client] (ecmascript)");
'use client';
;
;
const DialogCloseButton = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
    top: 0,
    right: 0,
    color: 'var(--mui-palette-text-disabled)',
    position: 'absolute',
    boxShadow: 'var(--mui-customShadows-xs)',
    transform: 'translate(9px, -10px)',
    borderRadius: 'var(--mui-shape-customBorderRadius-sm)',
    backgroundColor: 'var(--mui-palette-background-paper) !important',
    transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
    blockSize: 30,
    inlineSize: 30,
    minInlineSize: 0,
    padding: 0,
    '&:hover, &:active': {
        transform: 'translate(7px, -5px) !important'
    },
    '& i, & svg': {
        fontSize: '1.25rem'
    }
});
const __TURBOPACK__default__export__ = DialogCloseButton;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/dialogs/DeleteConfirmationDialog.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// React Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// Component Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dialogs$2f$DialogCloseButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/dialogs/DialogCloseButton.jsx [app-client] (ecmascript)");
// MUI Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Dialog/Dialog.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/DialogTitle/DialogTitle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/DialogContent/DialogContent.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/DialogActions/DialogActions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Button/Button.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
const DeleteConfirmationDialog = ({ open, setOpen, onConfirm, title, message, itemName, loading = false })=>{
    const handleClose = ()=>{
        if (!loading) {
            setOpen(false);
        }
    };
    const handleConfirm = ()=>{
        onConfirm();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        fullWidth: true,
        maxWidth: "sm",
        scroll: "body",
        open: open,
        onClose: handleClose,
        closeAfterTransition: false,
        sx: {
            '& .MuiDialog-paper': {
                overflow: 'visible'
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dialogs$2f$DialogCloseButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onClick: handleClose,
                disableRipple: true,
                disabled: loading,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                    className: "tabler-x"
                }, void 0, false, {
                    fileName: "[project]/src/components/dialogs/DeleteConfirmationDialog.jsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/dialogs/DeleteConfirmationDialog.jsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                variant: "h4",
                className: "flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16",
                sx: {
                    color: '#000000'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        className: "flex justify-center mb-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            className: "flex items-center justify-center w-16 h-16 rounded-full",
                            sx: {
                                backgroundColor: '#f44336',
                                color: '#ffffff'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "tabler-trash text-2xl"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dialogs/DeleteConfirmationDialog.jsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/dialogs/DeleteConfirmationDialog.jsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/dialogs/DeleteConfirmationDialog.jsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    title || 'Delete Confirmation',
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        component: "span",
                        className: "flex flex-col text-center text-textSecondary",
                        children: message || `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
                    }, void 0, false, {
                        fileName: "[project]/src/components/dialogs/DeleteConfirmationDialog.jsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dialogs/DeleteConfirmationDialog.jsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                className: "pbs-0 sm:pli-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "flex flex-col items-center gap-4 p-4 rounded-lg",
                    sx: {
                        backgroundColor: 'rgba(255, 171, 29, 0.1)',
                        color: '#FFAB1D',
                        border: '1px solid rgba(255, 171, 29, 0.3)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "body2",
                        className: "text-center font-medium flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "tabler-alert-triangle text-lg"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dialogs/DeleteConfirmationDialog.jsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this),
                            "This action is permanent and cannot be reversed."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dialogs/DeleteConfirmationDialog.jsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/dialogs/DeleteConfirmationDialog.jsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/dialogs/DeleteConfirmationDialog.jsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                className: "pbs-0 sm:pbe-16 sm:pli-16 flex justify-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "tonal",
                        color: "secondary",
                        onClick: handleClose,
                        disabled: loading,
                        className: "capitalize",
                        children: "Cancel"
                    }, void 0, false, {
                        fileName: "[project]/src/components/dialogs/DeleteConfirmationDialog.jsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "contained",
                        onClick: handleConfirm,
                        disabled: loading,
                        startIcon: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "tabler-loader-2 animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/src/components/dialogs/DeleteConfirmationDialog.jsx",
                            lineNumber: 89,
                            columnNumber: 32
                        }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "tabler-trash"
                        }, void 0, false, {
                            fileName: "[project]/src/components/dialogs/DeleteConfirmationDialog.jsx",
                            lineNumber: 89,
                            columnNumber: 81
                        }, void 0),
                        className: "capitalize",
                        sx: {
                            backgroundColor: '#f44336',
                            color: '#ffffff',
                            '&:hover': {
                                backgroundColor: '#d32f2f'
                            },
                            '&:disabled': {
                                backgroundColor: 'rgba(244, 67, 54, 0.3)',
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        },
                        children: loading ? 'Deleting...' : 'Delete'
                    }, void 0, false, {
                        fileName: "[project]/src/components/dialogs/DeleteConfirmationDialog.jsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dialogs/DeleteConfirmationDialog.jsx",
                lineNumber: 81,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dialogs/DeleteConfirmationDialog.jsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
};
_c = DeleteConfirmationDialog;
const __TURBOPACK__default__export__ = DeleteConfirmationDialog;
var _c;
__turbopack_refresh__.register(_c, "DeleteConfirmationDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/views/apps/task/list/TaskListTable.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/classnames/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$components$2f$option$2d$menu$2f$index$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@core/components/option-menu/index.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$components$2f$mui$2f$TextField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@core/components/mui/TextField.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TablePaginationComponent$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/TablePaginationComponent.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$i18n$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/utils/i18n.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$styles$2f$table$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_import__("[project]/src/@core/styles/table.module.css [app-client] (css module)");
// Services
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$toastService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/services/toastService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$enhancedTaskService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/services/enhancedTaskService.js [app-client] (ecmascript)");
// Component Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dialogs$2f$DeleteConfirmationDialog$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/dialogs/DeleteConfirmationDialog.jsx [app-client] (ecmascript)");
// Hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/useTranslation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@tanstack/table-core/build/lib/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$match$2d$sorter$2d$utils$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@tanstack/match-sorter-utils/build/lib/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Chip/Chip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/IconButton/IconButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@tanstack/react-table/build/lib/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Card/Card.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/CardHeader/CardHeader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/MenuItem/MenuItem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Button/Button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/CircularProgress/CircularProgress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TablePagination$2f$TablePagination$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/TablePagination/TablePagination.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const columnHelper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createColumnHelper"])();
const taskStatusObj = {
    PENDING: 'warning',
    IN_PROGRESS: 'info',
    COMPLETED: 'success',
    CANCELLED: 'error',
    ON_HOLD: 'secondary'
};
// Fuzzy filter for search
const fuzzyFilter = (row, columnId, value, addMeta)=>{
    const itemRank = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$match$2d$sorter$2d$utils$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rankItem"])(row.getValue(columnId), value);
    addMeta({
        itemRank
    });
    return itemRank.passed;
};
const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props })=>{
    _s();
    const [value, setValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialValue);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DebouncedInput.useEffect": ()=>{
            setValue(initialValue);
        }
    }["DebouncedInput.useEffect"], [
        initialValue
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DebouncedInput.useEffect": ()=>{
            const timeout = setTimeout({
                "DebouncedInput.useEffect.timeout": ()=>{
                    onChange(value);
                }
            }["DebouncedInput.useEffect.timeout"], debounce);
            return ({
                "DebouncedInput.useEffect": ()=>clearTimeout(timeout)
            })["DebouncedInput.useEffect"];
        }
    }["DebouncedInput.useEffect"], [
        value,
        debounce,
        onChange
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$components$2f$mui$2f$TextField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        ...props,
        value: value,
        onChange: (e)=>setValue(e.target.value)
    }, void 0, false, {
        fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
        lineNumber: 74,
        columnNumber: 10
    }, this);
};
_s(DebouncedInput, "Wogv9twUGnfds4rVOUUjop35/IU=");
_c = DebouncedInput;
const TaskListTable = ({ tasks: externalTasks = null, showTitle = true, showAddButton = true, limitActions = false })=>{
    _s1();
    // States for Table Data and API Operations
    const [tasks, setTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(externalTasks || []);
    const [branches, setBranches] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [fetchLoading, setFetchLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [fetchError, setFetchError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // States for Filtering and Search
    const [filteredData, setFilteredData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [globalFilter, setGlobalFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        status: '',
        assignedEmployee: '',
        branch: ''
    });
    // States for Delete Dialog
    const [deleteDialogOpen, setDeleteDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [taskToDelete, setTaskToDelete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deleteLoading, setDeleteLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Hooks
    const { lang: locale } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const { data: session, status: sessionStatus } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    // Function to fetch branches
    const fetchBranches = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TaskListTable.useCallback[fetchBranches]": async ()=>{
            if (!session?.accessToken) return;
            try {
                const response = await fetch(`${("TURBOPACK compile-time value", "http://localhost:8000/v1")}/branches`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-client-type': 'web',
                        Authorization: `Bearer ${session.accessToken}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setBranches(data.data || []);
                } else {
                    console.error('Failed to fetch branches');
                }
            } catch (error) {
                console.error('Error fetching branches:', error);
            }
        }
    }["TaskListTable.useCallback[fetchBranches]"], [
        session?.accessToken
    ]);
    // Function to fetch task data from API
    const fetchTasks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TaskListTable.useCallback[fetchTasks]": async ()=>{
            setFetchLoading(true);
            setFetchError(null);
            if (sessionStatus === 'loading') return;
            if (sessionStatus === 'unauthenticated' || !session?.accessToken) {
                setFetchError(t('tasks.authenticationRequired'));
                setFetchLoading(false);
                return;
            }
            try {
                const response = await fetch(`${("TURBOPACK compile-time value", "http://localhost:8000/v1")}/tasks`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-client-type': 'web',
                        Authorization: `Bearer ${session.accessToken}`
                    }
                });
                const responseData = await response.json();
                if (response.ok) {
                    setTasks(responseData.data?.results || responseData.data || []);
                } else {
                    const errorMessage = responseData.message || `Failed to fetch tasks: ${response.status}`;
                    setFetchError(errorMessage);
                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$toastService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].handleApiError(response, errorMessage);
                }
            } catch (error) {
                const errorMessage = t('tasks.networkError');
                setFetchError(errorMessage);
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$toastService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].handleApiError(error, errorMessage);
            } finally{
                setFetchLoading(false);
            }
        }
    }["TaskListTable.useCallback[fetchTasks]"], [
        sessionStatus,
        session?.accessToken
    ]);
    // Effect to fetch data on component mount or when session/token changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TaskListTable.useEffect": ()=>{
            if (externalTasks) {
                // Use external tasks, no need to fetch
                setFetchLoading(false);
                setFetchError(null);
                return;
            }
            if (sessionStatus === 'authenticated') {
                fetchTasks();
                fetchBranches();
            } else if (sessionStatus === 'unauthenticated') {
                setFetchError(t('tasks.notAuthenticated'));
                setFetchLoading(false);
            }
        }
    }["TaskListTable.useEffect"], [
        sessionStatus,
        session?.accessToken,
        fetchTasks,
        fetchBranches,
        externalTasks
    ]);
    // Effect for client-side filtering
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TaskListTable.useEffect": ()=>{
            let tempData = [
                ...tasks
            ];
            if (filters.status) {
                tempData = tempData.filter({
                    "TaskListTable.useEffect": (row)=>row.status === filters.status
                }["TaskListTable.useEffect"]);
            }
            if (filters.assignedEmployee) {
                tempData = tempData.filter({
                    "TaskListTable.useEffect": (row)=>row.assignedEmployee?.name === filters.assignedEmployee
                }["TaskListTable.useEffect"]);
            }
            if (filters.branch) {
                tempData = tempData.filter({
                    "TaskListTable.useEffect": (row)=>row.client?.branch?.name === filters.branch
                }["TaskListTable.useEffect"]);
            }
            setFilteredData(tempData);
        }
    }["TaskListTable.useEffect"], [
        filters,
        tasks
    ]);
    // Function to handle task deletion
    const handleDeleteClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TaskListTable.useCallback[handleDeleteClick]": (taskId)=>{
            const task = tasks.find({
                "TaskListTable.useCallback[handleDeleteClick].task": (t)=>t.id === taskId
            }["TaskListTable.useCallback[handleDeleteClick].task"]);
            setTaskToDelete(task);
            setDeleteDialogOpen(true);
        }
    }["TaskListTable.useCallback[handleDeleteClick]"], [
        tasks
    ]);
    // Function to confirm task deletion
    const handleDeleteTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TaskListTable.useCallback[handleDeleteTask]": async ()=>{
            if (!taskToDelete) return;
            if (!session?.accessToken) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$toastService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].showError('Authentication token not found. Cannot delete task.');
                setDeleteDialogOpen(false);
                return;
            }
            setDeleteLoading(true);
            try {
                const response = await fetch(`${("TURBOPACK compile-time value", "http://localhost:8000/v1")}/tasks/${taskToDelete.id}`, {
                    method: 'DELETE',
                    headers: {
                        'x-client-type': 'web',
                        Authorization: `Bearer ${session.accessToken}`
                    }
                });
                if (response.ok) {
                    // Show success toast
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$toastService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].handleApiSuccess('deleted', 'Task');
                    console.log(`Task ${taskToDelete.id} deleted successfully.`);
                    fetchTasks() // Re-fetch data to update the table
                    ;
                    setDeleteDialogOpen(false);
                    setTaskToDelete(null);
                } else {
                    // Show error toast
                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$toastService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].handleApiError(response, 'Failed to delete task');
                    console.error('API Error deleting task:', await response.json());
                }
            } catch (error) {
                // Show error toast
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$toastService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].handleApiError(error, 'Network error or unexpected issue during deletion. Please try again.');
                console.error('Fetch error deleting task:', error);
            } finally{
                setDeleteLoading(false);
            }
        }
    }["TaskListTable.useCallback[handleDeleteTask]"], [
        session?.accessToken,
        fetchTasks,
        taskToDelete
    ]);
    // Function to handle generate invoice - redirect to invoice add page with pre-filled data
    const handleGenerateInvoiceClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TaskListTable.useCallback[handleGenerateInvoiceClick]": (task)=>{
            // Prepare pre-filled data for invoice creation - only use data that exists in task
            const preFilledData = {
                selectedClient: task.client,
                selectedSalesperson: task.assignedEmployee,
                serviceItems: [
                    {
                        categoryId: task.service?.category,
                        serviceId: task.service?.id,
                        description: task.description,
                        rate: task.service?.price,
                        discount: 0
                    }
                ]
            };
            // Only add notes if task has description
            if (task.description) {
                preFilledData.notes = task.description;
            }
            // Add dates if they exist in task
            if (task.startDate) {
                preFilledData.issuedDate = task.startDate;
            }
            if (task.dueDate) {
                preFilledData.dueDate = task.dueDate;
            }
            // Store pre-filled data in sessionStorage
            sessionStorage.setItem('invoicePrefillData', JSON.stringify(preFilledData));
            // Redirect to invoice add page
            window.location.href = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$i18n$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocalizedUrl"])('/apps/invoice/add', locale);
        }
    }["TaskListTable.useCallback[handleGenerateInvoiceClick]"], [
        locale
    ]);
    // Derive unique values for filter dropdowns from the fetched data
    const assignedEmployees = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TaskListTable.useMemo[assignedEmployees]": ()=>Array.from(new Set(tasks.map({
                "TaskListTable.useMemo[assignedEmployees]": (item)=>item.assignedEmployee?.name
            }["TaskListTable.useMemo[assignedEmployees]"]).filter(Boolean)))
    }["TaskListTable.useMemo[assignedEmployees]"], [
        tasks
    ]);
    const statuses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TaskListTable.useMemo[statuses]": ()=>Array.from(new Set(tasks.map({
                "TaskListTable.useMemo[statuses]": (item)=>item.status
            }["TaskListTable.useMemo[statuses]"])))
    }["TaskListTable.useMemo[statuses]"], [
        tasks
    ]);
    const branchNames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TaskListTable.useMemo[branchNames]": ()=>Array.from(new Set(tasks.map({
                "TaskListTable.useMemo[branchNames]": (item)=>item.client?.branch?.name
            }["TaskListTable.useMemo[branchNames]"]).filter(Boolean)))
    }["TaskListTable.useMemo[branchNames]"], [
        tasks
    ]);
    // Function to format date
    const formatDate = (dateString)=>{
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString();
    };
    // Column definitions
    const columns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TaskListTable.useMemo[columns]": ()=>[
                // Only show title column if not in minimal mode
                ...showTitle ? [
                    columnHelper.accessor('title', {
                        header: t('tasks.fields.title'),
                        cell: {
                            "TaskListTable.useMemo[columns]": ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    color: "text.primary",
                                    className: "font-medium",
                                    children: row.original.title
                                }, void 0, false, {
                                    fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                    lineNumber: 324,
                                    columnNumber: 17
                                }, this)
                        }["TaskListTable.useMemo[columns]"]
                    })
                ] : [],
                columnHelper.accessor('client', {
                    header: t('tasks.fields.client'),
                    cell: {
                        "TaskListTable.useMemo[columns]": ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                color: "text.primary",
                                children: row.original.client?.name || '-'
                            }, void 0, false, {
                                fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                lineNumber: 333,
                                columnNumber: 28
                            }, this)
                    }["TaskListTable.useMemo[columns]"]
                }),
                columnHelper.accessor('service', {
                    header: t('tasks.fields.service'),
                    cell: {
                        "TaskListTable.useMemo[columns]": ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                color: "text.primary",
                                children: row.original.service?.name || '-'
                            }, void 0, false, {
                                fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                lineNumber: 337,
                                columnNumber: 28
                            }, this)
                    }["TaskListTable.useMemo[columns]"]
                }),
                columnHelper.accessor('assignedEmployee', {
                    header: t('tasks.fields.assignedTo'),
                    cell: {
                        "TaskListTable.useMemo[columns]": ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                color: "text.primary",
                                children: row.original.assignedEmployee?.name || '-'
                            }, void 0, false, {
                                fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                lineNumber: 341,
                                columnNumber: 28
                            }, this)
                    }["TaskListTable.useMemo[columns]"]
                }),
                columnHelper.accessor('status', {
                    header: t('tasks.fields.status'),
                    cell: {
                        "TaskListTable.useMemo[columns]": ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "tonal",
                                    label: ({
                                        "TaskListTable.useMemo[columns]": ()=>{
                                            const statusKey = row.original.status?.toLowerCase();
                                            let translatedStatus = row.original.status;
                                            // Map status values to translations
                                            const statusTranslations = {
                                                pending: t('tasks.status.pending'),
                                                in_progress: t('tasks.status.inProgress'),
                                                completed: t('tasks.status.completed'),
                                                cancelled: t('tasks.status.cancelled'),
                                                on_hold: t('tasks.status.onHold')
                                            };
                                            if (statusTranslations[statusKey]) {
                                                translatedStatus = statusTranslations[statusKey];
                                            }
                                            return translatedStatus;
                                        }
                                    })["TaskListTable.useMemo[columns]"](),
                                    size: "small",
                                    color: taskStatusObj[row.original.status],
                                    className: "capitalize"
                                }, void 0, false, {
                                    fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                    lineNumber: 347,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                lineNumber: 346,
                                columnNumber: 11
                            }, this)
                    }["TaskListTable.useMemo[columns]"]
                }),
                columnHelper.accessor('dueDate', {
                    header: t('tasks.fields.dueDate'),
                    cell: {
                        "TaskListTable.useMemo[columns]": ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                color: "text.primary",
                                children: formatDate(row.original.dueDate)
                            }, void 0, false, {
                                fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                lineNumber: 377,
                                columnNumber: 28
                            }, this)
                    }["TaskListTable.useMemo[columns]"]
                }),
                columnHelper.accessor('action', {
                    header: t('tasks.fields.action'),
                    cell: {
                        "TaskListTable.useMemo[columns]": ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center",
                                children: limitActions ? // Direct button for minimal mode
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    size: "medium",
                                    component: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                                    href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$i18n$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocalizedUrl"])(`/apps/task/view/${row.original.id}`, locale),
                                    className: "text-textSecondary",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "tabler-eye"
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                        lineNumber: 391,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                    lineNumber: 385,
                                    columnNumber: 15
                                }, this) : // Full dropdown for normal mode
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$components$2f$option$2d$menu$2f$index$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    iconButtonProps: {
                                        size: 'medium'
                                    },
                                    iconClassName: "text-textSecondary",
                                    options: [
                                        // Full actions in normal mode
                                        {
                                            text: t('tasks.view'),
                                            icon: 'tabler-eye',
                                            menuItemProps: {
                                                component: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                                                href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$i18n$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocalizedUrl"])(`/apps/task/view/${row.original.id}`, locale),
                                                className: 'flex items-center gap-2 text-textSecondary'
                                            }
                                        },
                                        {
                                            text: t('tasks.edit'),
                                            icon: 'tabler-edit',
                                            menuItemProps: {
                                                component: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                                                href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$i18n$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocalizedUrl"])(`/apps/task/edit/${row.original.id}`, locale),
                                                className: 'flex items-center gap-2 text-textSecondary'
                                            }
                                        },
                                        ...!row.original.invoices || row.original.invoices.length === 0 ? [
                                            {
                                                text: t('tasks.generateInvoice'),
                                                icon: 'tabler-file-invoice',
                                                menuItemProps: {
                                                    className: 'flex items-center gap-2 text-textSecondary',
                                                    onClick: {
                                                        "TaskListTable.useMemo[columns]": ()=>handleGenerateInvoiceClick(row.original)
                                                    }["TaskListTable.useMemo[columns]"]
                                                }
                                            }
                                        ] : [],
                                        {
                                            text: t('tasks.delete'),
                                            icon: 'tabler-trash',
                                            menuItemProps: {
                                                className: 'flex items-center gap-2 text-textSecondary',
                                                onClick: {
                                                    "TaskListTable.useMemo[columns]": ()=>handleDeleteClick(row.original.id)
                                                }["TaskListTable.useMemo[columns]"]
                                            }
                                        }
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                    lineNumber: 395,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                lineNumber: 382,
                                columnNumber: 11
                            }, this)
                    }["TaskListTable.useMemo[columns]"],
                    enableSorting: false
                })
            ]
    }["TaskListTable.useMemo[columns]"], [
        handleDeleteClick,
        handleGenerateInvoiceClick,
        locale
    ]);
    const table = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactTable"])({
        data: filteredData,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter
        },
        state: {
            globalFilter
        },
        initialState: {
            pagination: {
                pageSize: 10
            }
        },
        globalFilterFn: fuzzyFilter,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCoreRowModel"])(),
        getFilteredRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFilteredRowModel"])(),
        getSortedRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSortedRowModel"])(),
        getPaginationRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPaginationRowModel"])(),
        getFacetedRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFacetedRowModel"])(),
        getFacetedUniqueValues: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFacetedUniqueValues"])(),
        getFacetedMinMaxValues: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFacetedMinMaxValues"])()
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        title: t('tasks.taskManagement'),
                        className: "pbe-4"
                    }, void 0, false, {
                        fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                        lineNumber: 469,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-end gap-4 p-6 border-bs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$components$2f$mui$2f$TextField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                select: true,
                                label: t('tasks.fields.status'),
                                value: filters.status,
                                onChange: (e)=>setFilters({
                                        ...filters,
                                        status: e.target.value
                                    }),
                                className: "min-w-[180px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        value: "",
                                        children: t('tasks.all')
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                        lineNumber: 479,
                                        columnNumber: 13
                                    }, this),
                                    statuses.map((status)=>{
                                        const statusKey = typeof status === 'string' ? status.toLowerCase() : status;
                                        let translatedStatus = status;
                                        // Map status values to translations
                                        const statusTranslations = {
                                            pending: t('tasks.status.pending'),
                                            in_progress: t('tasks.status.inProgress'),
                                            completed: t('tasks.status.completed'),
                                            cancelled: t('tasks.status.cancelled'),
                                            on_hold: t('tasks.status.onHold')
                                        };
                                        if (statusTranslations[statusKey]) {
                                            translatedStatus = statusTranslations[statusKey];
                                        }
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            value: status,
                                            children: translatedStatus
                                        }, status, false, {
                                            fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                            lineNumber: 498,
                                            columnNumber: 17
                                        }, this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                lineNumber: 472,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$components$2f$mui$2f$TextField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                select: true,
                                label: t('tasks.fields.assignedTo'),
                                value: filters.assignedEmployee,
                                onChange: (e)=>setFilters({
                                        ...filters,
                                        assignedEmployee: e.target.value
                                    }),
                                className: "min-w-[180px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        value: "",
                                        children: t('tasks.all')
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                        lineNumber: 513,
                                        columnNumber: 13
                                    }, this),
                                    assignedEmployees.map((employee)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            value: employee,
                                            children: employee
                                        }, employee, false, {
                                            fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                            lineNumber: 515,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                lineNumber: 506,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$components$2f$mui$2f$TextField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                select: true,
                                label: t('employees.fields.branch'),
                                value: filters.branch,
                                onChange: (e)=>setFilters({
                                        ...filters,
                                        branch: e.target.value
                                    }),
                                className: "min-w-[180px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        value: "",
                                        children: t('tasks.all')
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                        lineNumber: 529,
                                        columnNumber: 13
                                    }, this),
                                    branchNames.map((branch)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            value: branch,
                                            children: branch
                                        }, branch, false, {
                                            fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                            lineNumber: 531,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                lineNumber: 522,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DebouncedInput, {
                                value: globalFilter ?? '',
                                onChange: (value)=>setGlobalFilter(String(value)),
                                placeholder: t('tasks.searchTask'),
                                className: "min-w-[200px]"
                            }, void 0, false, {
                                fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                lineNumber: 537,
                                columnNumber: 11
                            }, this),
                            showAddButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "contained",
                                startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "tabler-plus"
                                }, void 0, false, {
                                    fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                    lineNumber: 547,
                                    columnNumber: 26
                                }, void 0),
                                component: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                                href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$i18n$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocalizedUrl"])('/apps/task/add', locale),
                                className: "ml-auto h-[40px]",
                                children: t('tasks.addNewTask')
                            }, void 0, false, {
                                fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                lineNumber: 545,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                        lineNumber: 470,
                        columnNumber: 9
                    }, this),
                    fetchLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center items-center p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                lineNumber: 559,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "ml-4",
                                children: t('tasks.loadingTasks')
                            }, void 0, false, {
                                fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                lineNumber: 560,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                        lineNumber: 558,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$styles$2f$table$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].table,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: table.getHeaderGroups().map((headerGroup)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: headerGroup.headers.map((header)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: header.isPlaceholder ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
                                                            'flex items-center': header.column.getIsSorted(),
                                                            'cursor-pointer select-none': header.column.getCanSort()
                                                        }),
                                                        onClick: header.column.getToggleSortingHandler(),
                                                        children: [
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flexRender"])(header.column.columnDef.header, header.getContext()),
                                                            {
                                                                asc: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "tabler-chevron-up text-xl"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                                                    lineNumber: 580,
                                                                    columnNumber: 36
                                                                }, this),
                                                                desc: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "tabler-chevron-down text-xl"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                                                    lineNumber: 581,
                                                                    columnNumber: 37
                                                                }, this)
                                                            }[header.column.getIsSorted()] ?? null
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                                        lineNumber: 571,
                                                        columnNumber: 27
                                                    }, this)
                                                }, header.id, false, {
                                                    fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                                    lineNumber: 569,
                                                    columnNumber: 23
                                                }, this))
                                        }, headerGroup.id, false, {
                                            fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                            lineNumber: 567,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                    lineNumber: 565,
                                    columnNumber: 15
                                }, this),
                                table.getFilteredRowModel().rows.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: table.getVisibleFlatColumns().length,
                                            className: "text-center",
                                            children: t('tasks.noTasksAvailable')
                                        }, void 0, false, {
                                            fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                            lineNumber: 593,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                        lineNumber: 592,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                    lineNumber: 591,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: table.getRowModel().rows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
                                                selected: row.getIsSelected()
                                            }),
                                            children: row.getVisibleCells().map((cell)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flexRender"])(cell.column.columnDef.cell, cell.getContext())
                                                }, cell.id, false, {
                                                    fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                                    lineNumber: 603,
                                                    columnNumber: 25
                                                }, this))
                                        }, row.id, false, {
                                            fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                            lineNumber: 601,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                    lineNumber: 599,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                            lineNumber: 564,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                        lineNumber: 563,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TablePagination$2f$TablePagination$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        component: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TablePaginationComponent$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                table: table
                            }, void 0, false, {
                                fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                                lineNumber: 614,
                                columnNumber: 28
                            }, void 0),
                        count: table.getFilteredRowModel().rows.length,
                        rowsPerPage: table.getState().pagination.pageSize,
                        page: table.getState().pagination.pageIndex,
                        onPageChange: (_, page)=>{
                            table.setPageIndex(page);
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                        lineNumber: 613,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                lineNumber: 468,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dialogs$2f$DeleteConfirmationDialog$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: deleteDialogOpen,
                setOpen: setDeleteDialogOpen,
                onConfirm: handleDeleteTask,
                title: t('tasks.deleteConfirmation.title'),
                message: t('tasks.deleteConfirmation.message'),
                itemName: taskToDelete?.title || taskToDelete?.description,
                loading: deleteLoading
            }, void 0, false, {
                fileName: "[project]/src/views/apps/task/list/TaskListTable.jsx",
                lineNumber: 625,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
};
_s1(TaskListTable, "HkL+jP/fGNmK176ep4/XQuPM12M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactTable"]
    ];
});
_c1 = TaskListTable;
const __TURBOPACK__default__export__ = TaskListTable;
var _c, _c1;
__turbopack_refresh__.register(_c, "DebouncedInput");
__turbopack_refresh__.register(_c1, "TaskListTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/views/dashboards/main/MinimalTaskListTable.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// React Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
// Component Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$views$2f$apps$2f$task$2f$list$2f$TaskListTable$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/views/apps/task/list/TaskListTable.jsx [app-client] (ecmascript)");
// Hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/useTranslation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Alert/Alert.js [app-client] (ecmascript)");
// MUI Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Card/Card.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/CardHeader/CardHeader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/CardContent/CardContent.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/CircularProgress/CircularProgress.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
const MinimalTaskListTable = ({ taskData = [] })=>{
    _s();
    // States
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        ...taskData
    ]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Hooks
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    // Fetch tasks if no data provided
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MinimalTaskListTable.useEffect": ()=>{
            const fetchTasks = {
                "MinimalTaskListTable.useEffect.fetchTasks": async ()=>{
                    if (taskData.length > 0) return; // Use provided data
                    try {
                        setLoading(true);
                        setError(null);
                        if (!session?.accessToken) {
                            setError(t('dashboard.common.error'));
                            return;
                        }
                        const response = await fetch(`${("TURBOPACK compile-time value", "http://localhost:8000/v1")}/tasks`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'x-client-type': 'web',
                                Authorization: `Bearer ${session.accessToken}`
                            }
                        });
                        const responseData = await response.json();
                        if (response.ok) {
                            const tasks = responseData.data?.results || responseData.data || [];
                            setData(tasks);
                        } else {
                            setError(t('dashboard.common.error'));
                        }
                    } catch (err) {
                        console.error('Error fetching tasks:', err);
                        setError(t('dashboard.common.error'));
                    } finally{
                        setLoading(false);
                    }
                }
            }["MinimalTaskListTable.useEffect.fetchTasks"];
            fetchTasks();
        }
    }["MinimalTaskListTable.useEffect"], [
        session?.accessToken,
        taskData.length
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            sx: {
                height: '100%'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    title: t('tasks.title')
                }, void 0, false, {
                    fileName: "[project]/src/views/dashboards/main/MinimalTaskListTable.jsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: 200
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/views/dashboards/main/MinimalTaskListTable.jsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/views/dashboards/main/MinimalTaskListTable.jsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/views/dashboards/main/MinimalTaskListTable.jsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/views/dashboards/main/MinimalTaskListTable.jsx",
            lineNumber: 76,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                severity: "error",
                sx: {
                    mb: 2
                },
                children: error
            }, void 0, false, {
                fileName: "[project]/src/views/dashboards/main/MinimalTaskListTable.jsx",
                lineNumber: 90,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$views$2f$apps$2f$task$2f$list$2f$TaskListTable$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                tasks: data,
                showTitle: false,
                showAddButton: false,
                limitActions: true
            }, void 0, false, {
                fileName: "[project]/src/views/dashboards/main/MinimalTaskListTable.jsx",
                lineNumber: 95,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
};
_s(MinimalTaskListTable, "U+5UndNeyHO/Snic+TXZHUqzlQw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"]
    ];
});
_c = MinimalTaskListTable;
const __TURBOPACK__default__export__ = MinimalTaskListTable;
var _c;
__turbopack_refresh__.register(_c, "MinimalTaskListTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// React Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// Next Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
// Third-party Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/classnames/index.js [app-client] (ecmascript)");
// Component Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$components$2f$mui$2f$Avatar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@core/components/mui/Avatar.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$components$2f$mui$2f$TextField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/@core/components/mui/TextField.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TablePaginationComponent$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/TablePaginationComponent.jsx [app-client] (ecmascript)");
// Util Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$i18n$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/utils/i18n.js [app-client] (ecmascript)");
// Style Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$styles$2f$table$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_import__("[project]/src/@core/styles/table.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$getInitials$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/utils/getInitials.js [app-client] (ecmascript)");
// Hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/useTranslation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$match$2d$sorter$2d$utils$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@tanstack/match-sorter-utils/build/lib/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@tanstack/table-core/build/lib/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Chip/Chip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Tooltip/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/IconButton/IconButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@tanstack/react-table/build/lib/index.mjs [app-client] (ecmascript) <locals>");
// MUI Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/Card/Card.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/CardHeader/CardHeader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TablePagination$2f$TablePagination$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mui/material/TablePagination/TablePagination.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const fuzzyFilter = (row, columnId, value, addMeta)=>{
    // Rank the item
    const itemRank = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$match$2d$sorter$2d$utils$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rankItem"])(row.getValue(columnId), value);
    // Store the itemRank info
    addMeta({
        itemRank
    });
    // Return if the item should be filtered in/out
    return itemRank.passed;
};
const getAvatar = (params)=>{
    const { avatar, name } = params;
    if (avatar) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$components$2f$mui$2f$Avatar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: avatar,
            skin: "light",
            size: 34
        }, void 0, false, {
            fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
            lineNumber: 69,
            columnNumber: 12
        }, this);
    } else {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$components$2f$mui$2f$Avatar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            skin: "light",
            size: 34,
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$getInitials$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitials"])(name)
        }, void 0, false, {
            fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
            lineNumber: 72,
            columnNumber: 7
        }, this);
    }
};
const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props })=>{
    _s();
    // States
    const [value, setValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialValue);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DebouncedInput.useEffect": ()=>{
            setValue(initialValue);
        }
    }["DebouncedInput.useEffect"], [
        initialValue
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DebouncedInput.useEffect": ()=>{
            const timeout = setTimeout({
                "DebouncedInput.useEffect.timeout": ()=>{
                    onChange(value);
                }
            }["DebouncedInput.useEffect.timeout"], debounce);
            return ({
                "DebouncedInput.useEffect": ()=>clearTimeout(timeout)
            })["DebouncedInput.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["DebouncedInput.useEffect"], [
        value
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$components$2f$mui$2f$TextField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        ...props,
        value: value,
        onChange: (e)=>setValue(e.target.value)
    }, void 0, false, {
        fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
        lineNumber: 95,
        columnNumber: 10
    }, this);
};
_s(DebouncedInput, "Wogv9twUGnfds4rVOUUjop35/IU=");
_c = DebouncedInput;
// Vars
const invoiceStatusObj = {
    Paid: {
        color: 'success',
        icon: 'tabler-check'
    },
    Unpaid: {
        color: 'warning',
        icon: 'tabler-clock'
    },
    'Past Due': {
        color: 'error',
        icon: 'tabler-alert-circle'
    },
    Cancelled: {
        color: 'default',
        icon: 'tabler-x'
    },
    Sent: {
        color: 'info',
        icon: 'tabler-send-2'
    },
    Draft: {
        color: 'primary',
        icon: 'tabler-mail'
    },
    'Partial Payment': {
        color: 'warning',
        icon: 'tabler-chart-pie-2'
    },
    Downloaded: {
        color: 'info',
        icon: 'tabler-arrow-down'
    }
};
// Column Definitions
const columnHelper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createColumnHelper"])();
const MinimalInvoiceListTable = ({ invoiceData })=>{
    _s1();
    // States
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(...[
        invoiceData
    ]);
    const [globalFilter, setGlobalFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Hooks
    const { lang: locale } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const columns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MinimalInvoiceListTable.useMemo[columns]": ()=>[
                columnHelper.accessor('invoiceId', {
                    header: t('invoices.fields.invoiceId'),
                    cell: {
                        "MinimalInvoiceListTable.useMemo[columns]": ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                component: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                                href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$i18n$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocalizedUrl"])(`apps/invoice/preview/${row.original.id}`, locale),
                                color: "primary.main",
                                className: "font-medium",
                                children: row.original.invoiceId || `#${row.original.id.slice(-8)}`
                            }, void 0, false, {
                                fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this)
                    }["MinimalInvoiceListTable.useMemo[columns]"]
                }),
                columnHelper.accessor('name', {
                    header: t('invoices.fields.client'),
                    cell: {
                        "MinimalInvoiceListTable.useMemo[columns]": ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: "font-medium",
                                        color: "text.primary",
                                        children: row.original.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                        lineNumber: 141,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "body2",
                                        color: "text.secondary",
                                        children: row.original.companyEmail
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                        lineNumber: 144,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this)
                    }["MinimalInvoiceListTable.useMemo[columns]"]
                }),
                columnHelper.accessor('serviceName', {
                    header: t('invoices.fields.service'),
                    cell: {
                        "MinimalInvoiceListTable.useMemo[columns]": ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "body2",
                                        children: row.original.serviceName || 'N/A'
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                        lineNumber: 154,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: "font-medium",
                                        color: "text.primary",
                                        children: [
                                            "$",
                                            row.original.total?.toLocaleString() || '0'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                        lineNumber: 155,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this)
                    }["MinimalInvoiceListTable.useMemo[columns]"]
                }),
                columnHelper.accessor('invoiceStatus', {
                    header: t('invoices.fields.status'),
                    cell: {
                        "MinimalInvoiceListTable.useMemo[columns]": ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                label: row.original.invoiceStatus,
                                color: invoiceStatusObj[row.original.invoiceStatus]?.color || 'default',
                                variant: "filled",
                                size: "small"
                            }, void 0, false, {
                                fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                lineNumber: 164,
                                columnNumber: 11
                            }, this)
                    }["MinimalInvoiceListTable.useMemo[columns]"]
                }),
                columnHelper.accessor('dueDate', {
                    header: t('invoices.fields.dueDate'),
                    cell: {
                        "MinimalInvoiceListTable.useMemo[columns]": ({ row })=>{
                            const dueDate = row.original.dueDate;
                            if (!dueDate) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "body2",
                                children: "-"
                            }, void 0, false, {
                                fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                lineNumber: 176,
                                columnNumber: 32
                            }, this);
                            try {
                                const dateObj = new Date(dueDate);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "body2",
                                    children: dateObj.toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                    lineNumber: 181,
                                    columnNumber: 15
                                }, this);
                            } catch (error) {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "body2",
                                    children: dueDate
                                }, void 0, false, {
                                    fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                    lineNumber: 190,
                                    columnNumber: 20
                                }, this);
                            }
                        }
                    }["MinimalInvoiceListTable.useMemo[columns]"]
                }),
                columnHelper.accessor('action', {
                    header: t('invoices.fields.action'),
                    cell: {
                        "MinimalInvoiceListTable.useMemo[columns]": ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    title: t('invoices.view'),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        size: "small",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$i18n$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocalizedUrl"])(`apps/invoice/preview/${row.original.id}`, locale),
                                            className: "flex",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "tabler-eye text-textSecondary"
                                            }, void 0, false, {
                                                fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                                lineNumber: 201,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                            lineNumber: 200,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                        lineNumber: 199,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                    lineNumber: 198,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                lineNumber: 197,
                                columnNumber: 11
                            }, this)
                    }["MinimalInvoiceListTable.useMemo[columns]"],
                    enableSorting: false
                })
            ]
    }["MinimalInvoiceListTable.useMemo[columns]"], // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const table = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactTable"])({
        data: data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter
        },
        state: {
            globalFilter
        },
        initialState: {
            pagination: {
                pageSize: 5
            }
        },
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCoreRowModel"])(),
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFilteredRowModel"])(),
        getSortedRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSortedRowModel"])(),
        getPaginationRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPaginationRowModel"])(),
        getFacetedRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFacetedRowModel"])(),
        getFacetedUniqueValues: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFacetedUniqueValues"])(),
        getFacetedMinMaxValues: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFacetedMinMaxValues"])()
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        sx: {
            height: '100%'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                className: "flex-wrap gap-x-4 gap-y-2",
                title: t('invoices.title'),
                action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DebouncedInput, {
                    value: globalFilter ?? '',
                    onChange: (value)=>setGlobalFilter(String(value)),
                    placeholder: t('invoices.searchInvoice')
                }, void 0, false, {
                    fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                    lineNumber: 245,
                    columnNumber: 11
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                lineNumber: 241,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$styles$2f$table$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].table,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: table.getHeaderGroups().map((headerGroup)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: headerGroup.headers.map((header)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            children: header.isPlaceholder ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
                                                    'flex items-center': header.column.getIsSorted(),
                                                    'cursor-pointer select-none': header.column.getCanSort()
                                                }),
                                                onClick: header.column.getToggleSortingHandler(),
                                                children: [
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flexRender"])(header.column.columnDef.header, header.getContext()),
                                                    {
                                                        asc: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "tabler-chevron-up text-xl"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                                            lineNumber: 270,
                                                            columnNumber: 32
                                                        }, this),
                                                        desc: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "tabler-chevron-down text-xl"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                                            lineNumber: 271,
                                                            columnNumber: 33
                                                        }, this)
                                                    }[header.column.getIsSorted()] ?? null
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                                lineNumber: 261,
                                                columnNumber: 23
                                            }, this)
                                        }, header.id, false, {
                                            fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                            lineNumber: 259,
                                            columnNumber: 19
                                        }, this))
                                }, headerGroup.id, false, {
                                    fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                    lineNumber: 257,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                            lineNumber: 255,
                            columnNumber: 11
                        }, this),
                        data.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    colSpan: table.getVisibleFlatColumns().length,
                                    className: "text-center",
                                    children: "No data available"
                                }, void 0, false, {
                                    fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                    lineNumber: 283,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                lineNumber: 282,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                            lineNumber: 281,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: table.getRowModel().rows.slice(0, table.getState().pagination.pageSize).map((row)=>{
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "h-[3.67rem]",
                                    children: row.getVisibleCells().map((cell)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flexRender"])(cell.column.columnDef.cell, cell.getContext())
                                        }, cell.id, false, {
                                            fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                            lineNumber: 297,
                                            columnNumber: 25
                                        }, this))
                                }, row.id, false, {
                                    fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                                    lineNumber: 295,
                                    columnNumber: 21
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                            lineNumber: 289,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                    lineNumber: 254,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                lineNumber: 253,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TablePagination$2f$TablePagination$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                rowsPerPageOptions: [
                    5,
                    7,
                    10
                ],
                component: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TablePaginationComponent$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        table: table
                    }, void 0, false, {
                        fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                        lineNumber: 309,
                        columnNumber: 26
                    }, void 0),
                count: table.getFilteredRowModel().rows.length,
                rowsPerPage: table.getState().pagination.pageSize,
                page: table.getState().pagination.pageIndex,
                onPageChange: (_, page)=>{
                    table.setPageIndex(page);
                }
            }, void 0, false, {
                fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
                lineNumber: 307,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/views/apps/ecommerce/dashboard/MinimalInvoiceListTable.jsx",
        lineNumber: 240,
        columnNumber: 5
    }, this);
};
_s1(MinimalInvoiceListTable, "4Nh405vY9NRUthWuouR5uI7pqAI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactTable"]
    ];
});
_c1 = MinimalInvoiceListTable;
const __TURBOPACK__default__export__ = MinimalInvoiceListTable;
var _c, _c1;
__turbopack_refresh__.register(_c, "DebouncedInput");
__turbopack_refresh__.register(_c1, "MinimalInvoiceListTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/configs/calendarConfig.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Google Calendar Configuration
__turbopack_esm__({
    "calendarConfig": (()=>calendarConfig),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const calendarConfig = {
    // Italian holidays calendar ID - try multiple options
    italianHolidaysCalendarId: 'en.italian#holiday@group.v.calendar.google.com',
    // Google Calendar API configuration
    apiKey: ("TURBOPACK compile-time value", "AIzaSyCJNNGn7zGSKT0Y2jluDQV02i6vP92NY_o"),
    apiBaseUrl: 'https://www.googleapis.com/calendar/v3',
    // Calendar display settings
    defaultView: 'dayGridMonth',
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    // Italian holidays styling
    holidayEventStyle: {
        backgroundColor: '#ff6b6b',
        borderColor: '#ff5252',
        textColor: '#ffffff',
        classNames: [
            'holiday-event'
        ]
    },
    // Business hours (Italian timezone)
    businessHours: {
        daysOfWeek: [
            1,
            2,
            3,
            4,
            5
        ],
        startTime: '09:00',
        endTime: '18:00'
    },
    // Timezone
    timeZone: 'Europe/Rome',
    // Language configurations
    languages: {
        en: {
            locale: 'en',
            buttonText: {
                today: 'Today',
                month: 'Month',
                week: 'Week',
                day: 'Day',
                list: 'List'
            },
            dayHeaderFormat: {
                weekday: 'long'
            },
            titleFormat: {
                year: 'numeric',
                month: 'long'
            }
        },
        fr: {
            locale: 'fr',
            buttonText: {
                today: "Aujourd'hui",
                month: 'Mois',
                week: 'Semaine',
                day: 'Jour',
                list: 'Liste'
            },
            dayHeaderFormat: {
                weekday: 'long'
            },
            titleFormat: {
                year: 'numeric',
                month: 'long'
            }
        },
        ar: {
            locale: 'ar',
            buttonText: {
                today: 'اليوم',
                month: 'الشهر',
                week: 'الأسبوع',
                day: 'اليوم',
                list: 'القائمة'
            },
            dayHeaderFormat: {
                weekday: 'long'
            },
            titleFormat: {
                year: 'numeric',
                month: 'long'
            }
        },
        it: {
            locale: 'it',
            buttonText: {
                today: 'Oggi',
                month: 'Mese',
                week: 'Settimana',
                day: 'Giorno',
                list: 'Lista'
            },
            dayHeaderFormat: {
                weekday: 'long'
            },
            titleFormat: {
                year: 'numeric',
                month: 'long'
            },
            monthNames: [
                'GENNAIO',
                'FEBBRAIO',
                'MARZO',
                'APRILE',
                'MAGGIO',
                'GIUGNO',
                'LUGLIO',
                'AGOSTO',
                'SETTEMBRE',
                'OTTOBRE',
                'NOVEMBRE',
                'DICEMBRE'
            ]
        }
    }
};
const __TURBOPACK__default__export__ = calendarConfig;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/services/calendarService.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "getCurrentMonthHolidays": (()=>getCurrentMonthHolidays),
    "getItalianHolidays": (()=>getItalianHolidays),
    "getUpcomingHolidays": (()=>getUpcomingHolidays),
    "getYearHolidays": (()=>getYearHolidays),
    "isHoliday": (()=>isHoliday)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$calendarConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/configs/calendarConfig.js [app-client] (ecmascript)");
;
// Transform Google Calendar events to FullCalendar format
const transformEvents = (events)=>{
    const currentYear = new Date().getFullYear();
    return events.filter((event)=>{
        // Filter out events from previous years
        const eventDate = event.start.date || event.start.dateTime;
        const eventYear = new Date(eventDate).getFullYear();
        return eventYear === currentYear;
    }).map((event)=>({
            id: event.id,
            title: event.summary,
            start: event.start.date || event.start.dateTime,
            end: event.end.date || event.end.dateTime,
            allDay: !event.start.dateTime,
            backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$calendarConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calendarConfig"].holidayEventStyle.backgroundColor,
            borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$calendarConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calendarConfig"].holidayEventStyle.borderColor,
            textColor: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$calendarConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calendarConfig"].holidayEventStyle.textColor,
            classNames: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$calendarConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calendarConfig"].holidayEventStyle.classNames,
            extendedProps: {
                description: event.description || '',
                location: event.location || '',
                source: 'italian-holidays'
            }
        }));
};
const getItalianHolidays = async (timeMin, timeMax)=>{
    try {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$calendarConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calendarConfig"].apiKey) {
            console.warn('Google Calendar API key not configured');
            return [];
        }
        const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$calendarConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calendarConfig"].apiBaseUrl}/calendars/${encodeURIComponent(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$calendarConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calendarConfig"].italianHolidaysCalendarId)}/events`;
        const params = new URLSearchParams({
            key: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$calendarConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calendarConfig"].apiKey,
            timeMin: timeMin,
            timeMax: timeMax,
            singleEvents: true
        });
        const response = await fetch(`${url}?${params}`);
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', response.status, errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Raw API response items count:', data.items?.length || 0);
        console.log('Raw API response items:', data.items);
        const events = transformEvents(data.items || []);
        console.log('Transformed events count:', events.length);
        console.log('Transformed events:', events);
        return events;
    } catch (error) {
        console.error('Error fetching Italian holidays:', error);
        throw error;
    }
};
const getCurrentMonthHolidays = async ()=>{
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return getItalianHolidays(startOfMonth.toISOString(), endOfMonth.toISOString());
};
const getYearHolidays = async (year)=>{
    const startOfYear = new Date(year, 0, 1) // January 1st
    ;
    const endOfYear = new Date(year, 11, 31) // December 31st
    ;
    try {
        const holidays = await getItalianHolidays(startOfYear.toISOString(), endOfYear.toISOString());
        return holidays;
    } catch (error) {
        console.error('Error fetching year holidays:', error);
        throw error;
    }
};
const isHoliday = async (date)=>{
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    const holidays = await getItalianHolidays(startOfDay.toISOString(), endOfDay.toISOString());
    return holidays.length > 0 ? holidays[0] : null;
};
const getUpcomingHolidays = async ()=>{
    const now = new Date();
    const future = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    return getItalianHolidays(now.toISOString(), future.toISOString());
};
// Default export for backward compatibility
const calendarService = {
    getItalianHolidays,
    getCurrentMonthHolidays,
    getYearHolidays,
    isHoliday,
    getUpcomingHolidays
};
const __TURBOPACK__default__export__ = calendarService;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/hooks/useItalianHolidays.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "useItalianHolidays": (()=>useItalianHolidays)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$calendarService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/services/calendarService.js [app-client] (ecmascript)");
var _s = __turbopack_refresh__.signature();
;
;
const useItalianHolidays = (options = {})=>{
    _s();
    const { timeRange = 'currentMonth', customStart = null, customEnd = null, year = new Date().getFullYear(), maxHolidays = 10 } = options;
    const [holidays, setHolidays] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const loadHolidays = async ()=>{
        try {
            setLoading(true);
            setError(null);
            let holidaysData = [];
            switch(timeRange){
                case 'currentMonth':
                    holidaysData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$calendarService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentMonthHolidays"])();
                    break;
                case 'upcoming':
                    holidaysData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$calendarService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUpcomingHolidays"])();
                    break;
                case 'year':
                    holidaysData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$calendarService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getYearHolidays"])(year);
                    break;
                case 'custom':
                    if (customStart && customEnd) {
                        holidaysData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$calendarService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getItalianHolidays"])(customStart, customEnd);
                    }
                    break;
                default:
                    holidaysData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$calendarService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentMonthHolidays"])();
            }
            // Limit holidays if maxHolidays is specified and not null
            if (maxHolidays !== null && maxHolidays && holidaysData.length > maxHolidays) {
                holidaysData = holidaysData.slice(0, maxHolidays);
            }
            setHolidays(holidaysData);
        } catch (err) {
            console.error('Error loading Italian holidays:', err);
            setError(err.message || 'Impossibile caricare le festività italiane');
        } finally{
            setLoading(false);
        }
    };
    const refreshHolidays = ()=>{
        loadHolidays();
    };
    const isHoliday = async (date)=>{
        try {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$calendarService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHoliday"])(date);
        } catch (err) {
            console.error('Error checking if date is holiday:', err);
            return null;
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useItalianHolidays.useEffect": ()=>{
            loadHolidays();
        }
    }["useItalianHolidays.useEffect"], [
        timeRange,
        customStart,
        customEnd,
        year,
        maxHolidays
    ]);
    return {
        holidays,
        loading,
        error,
        refreshHolidays,
        isHoliday
    };
};
_s(useItalianHolidays, "rKMib/Tj0n3GIxlTLrr0XL7RqoE=");
const __TURBOPACK__default__export__ = useItalianHolidays;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/views/dashboards/main/ItalianCalendar.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$calendarConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/configs/calendarConfig.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useItalianHolidays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/useItalianHolidays.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fullcalendar$2f$daygrid$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@fullcalendar/daygrid/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fullcalendar$2f$interaction$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@fullcalendar/interaction/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/Card/Card.js [app-client] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardHeader$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/CardHeader/CardHeader.js [app-client] (ecmascript) <export default as CardHeader>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/CardContent/CardContent.js [app-client] (ecmascript) <export default as CardContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/Alert/Alert.js [app-client] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fullcalendar$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@fullcalendar/react/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/CircularProgress/CircularProgress.js [app-client] (ecmascript) <export default as CircularProgress>");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
;
;
;
;
const ItalianCalendar = ({ height = '600px', showTitle = true })=>{
    _s();
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const calendarRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Get current language from URL params
    const { lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const currentLang = lang || 'en';
    // Use the hook for loading holidays - load all holidays for the current year
    const currentYear = new Date().getFullYear();
    const { holidays, loading, error, refreshHolidays } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useItalianHolidays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useItalianHolidays"])({
        timeRange: 'year',
        year: currentYear,
        maxHolidays: null // Remove the limit to show all holidays
    });
    // Update events when holidays change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ItalianCalendar.useEffect": ()=>{
            console.log('ItalianCalendar: Received holidays:', holidays.length, holidays);
            setEvents(holidays);
        }
    }["ItalianCalendar.useEffect"], [
        holidays
    ]);
    // Handle date range change
    const handleDatesSet = (dateInfo)=>{
    // Calendar view changed
    };
    // Handle event click
    const handleEventClick = (clickInfo)=>{
        const event = clickInfo.event;
        alert(`${event.title}\n${event.extendedProps.description || 'Festa nazionale italiana'}`);
    };
    // Get language-specific configuration
    const langConfig = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$calendarConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calendarConfig"].languages[currentLang] || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$calendarConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calendarConfig"].languages.en;
    // Custom month names for Italian - use uppercase names
    const customMonthNames = currentLang === 'it' ? langConfig.monthNames : null;
    const customMonthNamesShort = currentLang === 'it' ? langConfig.monthNames?.map((name)=>name.substring(0, 3)) : null;
    // Language-specific text
    const getText = (key)=>{
        const texts = {
            en: {
                title: 'Yearly Calendar',
                subtitle: '',
                apiWarning: 'Google Calendar API key not configured. Holidays will not be displayed.',
                error: 'Unable to load holidays. Please check API configuration.'
            },
            fr: {
                title: 'Calendrier Annuel',
                subtitle: '',
                apiWarning: 'Clé API Google Calendar non configurée. Les fêtes ne seront pas affichées.',
                error: "Impossible de charger les fêtes. Vérifiez la configuration de l'API."
            },
            ar: {
                title: 'التقويم السنوي',
                subtitle: '',
                apiWarning: 'مفتاح API لتقويم Google غير مُكوَّن. لن تظهر العطل.',
                error: 'تعذر تحميل العطل. تحقق من إعدادات API.'
            },
            it: {
                title: 'Calendario Annuale',
                subtitle: '',
                apiWarning: 'Chiave API Google Calendar non configurata. Le festività non verranno mostrate.',
                error: "Impossibile caricare le festività. Verifica la configurazione dell'API."
            }
        };
        return texts[currentLang]?.[key] || texts.en[key];
    };
    // Use the API events directly
    const calendarEvents = events;
    // Calendar configuration
    const calendarOptions = {
        plugins: [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fullcalendar$2f$daygrid$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fullcalendar$2f$interaction$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
        ],
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: '' // Remove view options
        },
        height: height,
        locale: currentLang === 'it' ? 'it' : langConfig.locale,
        timeZone: 'Europe/Rome',
        events: calendarEvents,
        eventClick: handleEventClick,
        datesSet: handleDatesSet,
        // Event styling
        eventTextColor: '#ffffff',
        eventBackgroundColor: '#dc3545',
        eventBorderColor: '#dc3545',
        // Dynamic language settings
        buttonText: langConfig.buttonText,
        dayHeaderFormat: langConfig.dayHeaderFormat,
        titleFormat: langConfig.titleFormat,
        // Restrict to current year only
        validRange: {
            start: `${currentYear}-01-01`,
            end: `${currentYear + 1}-01-01`
        },
        // Ensure calendar starts at current month
        initialDate: new Date(),
        nowIndicator: true,
        // Allow proper navigation within the year
        navLinks: true,
        dayMaxEventRows: 3,
        // Additional options
        selectable: false,
        selectMirror: false,
        weekends: true,
        // Ensure all events are visible
        eventDisplay: 'block',
        dayMaxEvents: false,
        moreLinkClick: 'popover',
        // Custom month names for Italian - force override
        ...currentLang === 'it' && {
            monthNames: [
                'GENNAIO',
                'FEBBRAIO',
                'MARZO',
                'APRILE',
                'MAGGIO',
                'GIUGNO',
                'LUGLIO',
                'AGOSTO',
                'SETTEMBRE',
                'OTTOBRE',
                'NOVEMBRE',
                'DICEMBRE'
            ],
            monthNamesShort: [
                'GEN',
                'FEB',
                'MAR',
                'APR',
                'MAG',
                'GIU',
                'LUG',
                'AGO',
                'SET',
                'OTT',
                'NOV',
                'DIC'
            ]
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
            children: [
                showTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardHeader$3e$__["CardHeader"], {
                    title: getText('title'),
                    subheader: getText('subtitle') || undefined
                }, void 0, false, {
                    fileName: "[project]/src/views/dashboards/main/ItalianCalendar.jsx",
                    lineNumber: 151,
                    columnNumber: 23
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: 400
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {}, void 0, false, {
                            fileName: "[project]/src/views/dashboards/main/ItalianCalendar.jsx",
                            lineNumber: 154,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/views/dashboards/main/ItalianCalendar.jsx",
                        lineNumber: 153,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/views/dashboards/main/ItalianCalendar.jsx",
                    lineNumber: 152,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/views/dashboards/main/ItalianCalendar.jsx",
            lineNumber: 150,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
        children: [
            showTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardHeader$3e$__["CardHeader"], {
                title: getText('title'),
                subheader: getText('subtitle') || undefined
            }, void 0, false, {
                fileName: "[project]/src/views/dashboards/main/ItalianCalendar.jsx",
                lineNumber: 163,
                columnNumber: 21
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                children: [
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                        severity: "warning",
                        sx: {
                            mb: 2
                        },
                        children: getText('error')
                    }, void 0, false, {
                        fileName: "[project]/src/views/dashboards/main/ItalianCalendar.jsx",
                        lineNumber: 166,
                        columnNumber: 11
                    }, this),
                    !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$calendarConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calendarConfig"].apiKey && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                        severity: "info",
                        sx: {
                            mb: 2
                        },
                        children: getText('apiWarning')
                    }, void 0, false, {
                        fileName: "[project]/src/views/dashboards/main/ItalianCalendar.jsx",
                        lineNumber: 172,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            '& .fc-toolbar-title': {
                                textTransform: 'uppercase !important'
                            }
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fullcalendar$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            ref: calendarRef,
                            ...calendarOptions
                        }, void 0, false, {
                            fileName: "[project]/src/views/dashboards/main/ItalianCalendar.jsx",
                            lineNumber: 184,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/views/dashboards/main/ItalianCalendar.jsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/views/dashboards/main/ItalianCalendar.jsx",
                lineNumber: 164,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/views/dashboards/main/ItalianCalendar.jsx",
        lineNumber: 162,
        columnNumber: 5
    }, this);
};
_s(ItalianCalendar, "lbsiZSRd5AbotMnZ+k1YbI09QUk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useItalianHolidays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useItalianHolidays"]
    ];
});
_c = ItalianCalendar;
const __TURBOPACK__default__export__ = ItalianCalendar;
var _c;
__turbopack_refresh__.register(_c, "ItalianCalendar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/[lang]/(dashboard)/(private)/dashboards/analytics/page.jsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_3abc9e._.js.map