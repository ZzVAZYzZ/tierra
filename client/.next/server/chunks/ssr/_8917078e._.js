module.exports = [
"[project]/src/app/ring/components/Filters.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const Filters = ({ priceRange, color, material, sortBy, onPriceRangeChange, onColorChange, onMaterialChange, onSortChange })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: " flex flex-col gap-[11px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[24px]",
                children: "Bộ lọc"
            }, void 0, false, {
                fileName: "[project]/src/app/ring/components/Filters.jsx",
                lineNumber: 16,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2 ml-[20px] text-[15px]",
                style: {
                    accentColor: "black"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[20px]",
                        children: "Theo giá"
                    }, void 0, false, {
                        fileName: "[project]/src/app/ring/components/Filters.jsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                name: "priceGroup",
                                value: "1",
                                checked: priceRange === "1",
                                onChange: (e)=>onPriceRangeChange?.(e.target.checked ? e.target.value : ""),
                                className: "mr-2 cursor-pointer"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 24,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Từ 10 triệu đến 20 triệu"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/ring/components/Filters.jsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                name: "priceGroup",
                                value: "2",
                                checked: priceRange === "2",
                                onChange: (e)=>onPriceRangeChange?.(e.target.checked ? e.target.value : ""),
                                className: "mr-2 cursor-pointer"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Từ 20 triệu đến 30 triệu"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/ring/components/Filters.jsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                name: "priceGroup",
                                value: "3",
                                checked: priceRange === "3",
                                onChange: (e)=>onPriceRangeChange?.(e.target.checked ? e.target.value : ""),
                                className: "mr-2 cursor-pointer"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Từ 30 triệu đến 40 triệu"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/ring/components/Filters.jsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                name: "priceGroup",
                                value: "4",
                                checked: priceRange === "4",
                                onChange: (e)=>onPriceRangeChange?.(e.target.checked ? e.target.value : ""),
                                className: "mr-2 cursor-pointer"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Từ 40 triệu đến 100 triệu"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/ring/components/Filters.jsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[20px]",
                        children: "Màu sắc"
                    }, void 0, false, {
                        fileName: "[project]/src/app/ring/components/Filters.jsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                name: "colorGroup",
                                value: "5",
                                checked: color === "5",
                                onChange: (e)=>onColorChange?.(e.target.checked ? e.target.value : ""),
                                className: "mr-2 appearance-none w-[13] h-[13] border-2 border-[#F1DC87] checked:bg-[#F1DC87] cursor-pointer"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Vàng"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/ring/components/Filters.jsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                name: "colorGroup",
                                value: "6",
                                checked: color === "6",
                                onChange: (e)=>onColorChange?.(e.target.checked ? e.target.value : ""),
                                className: "mr-2 appearance-none w-[13] h-[13] border-2 border-[#F2BAA8] checked:bg-[#F2BAA8] cursor-pointer"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Vàng hồng"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/ring/components/Filters.jsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                name: "colorGroup",
                                value: "7",
                                checked: color === "7",
                                onChange: (e)=>onColorChange?.(e.target.checked ? e.target.value : ""),
                                className: "mr-2 appearance-none w-[13] h-[13] border-2 border-[#D6D6D6] checked:bg-[#D6D6D6] cursor-pointer"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Trắng"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/ring/components/Filters.jsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[20px]",
                        children: "Chất liệu"
                    }, void 0, false, {
                        fileName: "[project]/src/app/ring/components/Filters.jsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                name: "materialGroup",
                                value: "8",
                                checked: material === "8",
                                onChange: (e)=>onMaterialChange?.(e.target.checked ? e.target.value : ""),
                                className: "mr-2 cursor-pointer"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Vàng"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/ring/components/Filters.jsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                name: "materialGroup",
                                value: "9",
                                checked: material === "9",
                                onChange: (e)=>onMaterialChange?.(e.target.checked ? e.target.value : ""),
                                className: "mr-2 cursor-pointer"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Kim cương"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/ring/components/Filters.jsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/ring/components/Filters.jsx",
                lineNumber: 17,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[24px]",
                children: "Sắp xếp"
            }, void 0, false, {
                fileName: "[project]/src/app/ring/components/Filters.jsx",
                lineNumber: 146,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2",
                style: {
                    accentColor: "black"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                name: "sortGroup",
                                value: "priceAsc",
                                checked: sortBy === "priceAsc",
                                onChange: (e)=>onSortChange?.(e.target.checked ? "priceAsc" : ""),
                                className: "mr-2 cursor-pointer"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Giá từ thấp đến cao"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/ring/components/Filters.jsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                name: "sortGroup",
                                value: "priceDesc",
                                checked: sortBy === "priceDesc",
                                onChange: (e)=>onSortChange?.(e.target.checked ? "priceDesc" : ""),
                                className: "mr-2 cursor-pointer"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 161,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Giá từ cao đến thấp"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 171,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/ring/components/Filters.jsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                name: "sortGroup",
                                value: "bestSeller",
                                checked: sortBy === "bestSeller",
                                onChange: (e)=>onSortChange?.(e.target.checked ? "bestSeller" : ""),
                                className: "mr-2 cursor-pointer"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Bán chạy"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/ring/components/Filters.jsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                name: "sortGroup",
                                value: "nameAsc",
                                checked: sortBy === "nameAsc",
                                onChange: (e)=>onSortChange?.(e.target.checked ? "nameAsc" : ""),
                                className: "mr-2 cursor-pointer"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "A-Z"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ring/components/Filters.jsx",
                                lineNumber: 197,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/ring/components/Filters.jsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/ring/components/Filters.jsx",
                lineNumber: 147,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/ring/components/Filters.jsx",
        lineNumber: 15,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Filters;
}),
"[project]/src/assets/icons/heart_icon.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const HeartIcon = ({ isFavorite = false, onClick })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        onClick: onClick,
        width: "30",
        height: "30",
        viewBox: "0 0 30 30",
        fill: isFavorite ? "red" : "none",
        xmlns: "http://www.w3.org/2000/svg",
        className: "cursor-pointer transition-colors duration-300",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M20.87 3.75C18.315 3.75 16.1088 5.24625 15 7.42875C13.8912 5.24625 11.685 3.75 9.13 3.75C5.4675 3.75 2.5 6.82125 2.5 10.6012C2.5 14.3812 4.77125 17.8463 7.70625 20.6925C10.6413 23.5388 15 26.25 15 26.25C15 26.25 19.2175 23.5838 22.2937 20.6925C25.575 17.61 27.5 14.3925 27.5 10.6012C27.5 6.81 24.5325 3.75 20.87 3.75Z",
            stroke: isFavorite ? "red" : "black",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/src/assets/icons/heart_icon.js",
            lineNumber: 14,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/assets/icons/heart_icon.js",
        lineNumber: 5,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = HeartIcon;
}),
"[project]/src/app/ring/utils/price.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toIntegerVND",
    ()=>toIntegerVND
]);
const toIntegerVND = (input)=>{
    if (typeof input === "number" && Number.isFinite(input)) {
        return Math.round(input);
    }
    let string = String(input ?? "").trim();
    if (!string) return 0;
    if (/\.00$/.test(string)) string = string.slice(0, -3);
    string = string.replace(/\./g, "");
    // number = number.replace(/[^0-9]/g, "");
    if (!string) return 0;
    const number = Number(string);
    return Number.isFinite(number) ? number : 0;
};
}),
"[project]/src/app/ring/components/ProductCard.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$icons$2f$heart_icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/assets/icons/heart_icon.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$ring$2f$utils$2f$price$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/ring/utils/price.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const formatPriceVND = (input)=>new Intl.NumberFormat("vi-VN", {
        maximumFractionDigits: 0
    }).format((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$ring$2f$utils$2f$price$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toIntegerVND"])(input));
const ProductCard = ({ item, isFavorite, onToggleFavorite })=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const goToDetail = ()=>{
        if (item?.product_id) router.push(`/ring/${item.product_id}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-[250px] h-[350px] flex flex-col justify-around border border-[#D6D6D6] hover:shadow-xl transition-shadow duration-300 rounded-md cursor-pointer relative",
        onClick: goToDetail,
        children: [
            item?.ProductImages?.map((img, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: img.is_main === true && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: img.image_url
                    }, void 0, false, {
                        fileName: "[project]/src/app/ring/components/ProductCard.jsx",
                        lineNumber: 25,
                        columnNumber: 49
                    }, ("TURBOPACK compile-time value", void 0))
                }, idx, false, {
                    fileName: "[project]/src/app/ring/components/ProductCard.jsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[20px] font-medium ml-[15px]",
                children: item?.name
            }, void 0, false, {
                fileName: "[project]/src/app/ring/components/ProductCard.jsx",
                lineNumber: 27,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[16px] text-[#C0C0C0] mt-[20px] mb-[10px] ml-[15px]",
                children: formatPriceVND(item?.price)
            }, void 0, false, {
                fileName: "[project]/src/app/ring/components/ProductCard.jsx",
                lineNumber: 28,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-label": "Yêu thích",
                className: " absolute top-[10px] right-[10px]",
                onClick: (e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleFavorite?.();
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$icons$2f$heart_icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    isFavorite: isFavorite,
                    onClick: ()=>{}
                }, void 0, false, {
                    fileName: "[project]/src/app/ring/components/ProductCard.jsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/ring/components/ProductCard.jsx",
                lineNumber: 29,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/ring/components/ProductCard.jsx",
        lineNumber: 20,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ProductCard;
}),
"[project]/src/app/ring/components/ProductGrid.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$ring$2f$components$2f$ProductCard$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/ring/components/ProductCard.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
const ProductGrid = ({ products, favorites, onToggleFavorite })=>{
    const count = Array.isArray(products) ? products.length : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col mb-[50px] gap-[25px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    "Hiện có ",
                    count,
                    " sản phẩm"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/ring/components/ProductGrid.jsx",
                lineNumber: 9,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-4 gap-[30px]",
                children: products?.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$ring$2f$components$2f$ProductCard$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        item: item,
                        isFavorite: favorites?.includes(item.product_id),
                        onToggleFavorite: ()=>onToggleFavorite?.(item.product_id)
                    }, index, false, {
                        fileName: "[project]/src/app/ring/components/ProductGrid.jsx",
                        lineNumber: 12,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/app/ring/components/ProductGrid.jsx",
                lineNumber: 10,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/ring/components/ProductGrid.jsx",
        lineNumber: 8,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ProductGrid;
}),
"[project]/src/app/ring/components/data.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const ringData = [
    {
        product_id: "13791d8b-6e84-4a93-9124-fe8ed4f2e1a2",
        name: "nhan vang",
        material: "vang",
        description: "lam bang vang nguyen chat",
        color: "Vang",
        category_id: "dbca287b-c6f7-4790-b2e9-927ff662020e",
        price: "30000000.00",
        discount_price: "100000.00",
        stock_quantity: 12,
        status: "active",
        created_at: "2025-10-15 15:45:34",
        updated_at: "2025-10-15 15:45:34",
        Category: {
            category_id: "dbca287b-c6f7-4790-b2e9-927ff662020e",
            name: "nhan"
        },
        ProductImages: [
            {
                image_id: "c5973566-1e1e-4f67-a8d0-1c8eff278de0",
                image_url: "https://res.cloudinary.com/dihqq66r4/image/upload/v1760517939/doana/product_images/qeue9damrsvzi2datmhl.webp",
                is_main: false
            },
            {
                image_id: "9895a2fd-8ca3-4628-8b97-c2f42621e684",
                image_url: "https://res.cloudinary.com/dihqq66r4/image/upload/v1760517938/doana/product_images/xeqshuhowzr3a5oy5f77.webp",
                is_main: false
            },
            {
                image_id: "64aa2342-fadd-460c-91d2-8b5241a722e7",
                image_url: "https://res.cloudinary.com/dihqq66r4/image/upload/v1760517937/doana/product_images/sjaoghuerrdlozvuxaae.webp",
                is_main: false
            },
            {
                image_id: "0ecb8cda-fca3-41c8-a252-e5a2bbdbbb90",
                image_url: "https://res.cloudinary.com/dihqq66r4/image/upload/v1760517940/doana/product_images/etemmmjrkivoktddpfbf.webp",
                is_main: true
            }
        ]
    },
    {
        product_id: "sdgvdfzvewvqr23543",
        name: "nhan vang 2",
        material: "vang",
        description: "lam bang bac",
        color: "Vang hong",
        category_id: "dbca287b-c6f7-4790-b2e9-927ff662020e",
        price: "10000000.00",
        discount_price: "100000.00",
        stock_quantity: 12,
        status: "active",
        created_at: "2025-10-15 15:45:34",
        updated_at: "2025-10-15 15:45:34",
        Category: {
            category_id: "dbca287b-c6f7-4790-b2e9-927ff662020e",
            name: "nhan"
        },
        ProductImages: [
            {
                image_id: "c5973566-1e1e-4f67-a8d0-1c8eff278de0",
                image_url: "https://res.cloudinary.com/dihqq66r4/image/upload/v1760517939/doana/product_images/qeue9damrsvzi2datmhl.webp",
                is_main: false
            },
            {
                image_id: "9895a2fd-8ca3-4628-8b97-c2f42621e684",
                image_url: "https://res.cloudinary.com/dihqq66r4/image/upload/v1760517938/doana/product_images/xeqshuhowzr3a5oy5f77.webp",
                is_main: true
            },
            {
                image_id: "64aa2342-fadd-460c-91d2-8b5241a722e7",
                image_url: "https://res.cloudinary.com/dihqq66r4/image/upload/v1760517937/doana/product_images/sjaoghuerrdlozvuxaae.webp",
                is_main: false
            },
            {
                image_id: "0ecb8cda-fca3-41c8-a252-e5a2bbdbbb90",
                image_url: "https://res.cloudinary.com/dihqq66r4/image/upload/v1760517940/doana/product_images/etemmmjrkivoktddpfbf.webp",
                is_main: false
            }
        ]
    },
    {
        product_id: "12432534tfdgxdf",
        name: "nhan kim cuong",
        material: "kim cuong",
        description: "lam bang kim cuong nguyen chat",
        color: "Trang",
        category_id: "dbca287b-c6f7-4790-b2e9-927ff662020e",
        price: "50000000.00",
        discount_price: "100000.00",
        stock_quantity: 12,
        status: "active",
        created_at: "2025-10-15 15:45:34",
        updated_at: "2025-10-15 15:45:34",
        Category: {
            category_id: "dbca287b-c6f7-4790-b2e9-927ff662020e",
            name: "nhan"
        },
        ProductImages: [
            {
                image_id: "c5973566-1e1e-4f67-a8d0-1c8eff278de0",
                image_url: "https://res.cloudinary.com/dihqq66r4/image/upload/v1760517939/doana/product_images/qeue9damrsvzi2datmhl.webp",
                is_main: true
            },
            {
                image_id: "9895a2fd-8ca3-4628-8b97-c2f42621e684",
                image_url: "https://res.cloudinary.com/dihqq66r4/image/upload/v1760517938/doana/product_images/xeqshuhowzr3a5oy5f77.webp",
                is_main: false
            },
            {
                image_id: "64aa2342-fadd-460c-91d2-8b5241a722e7",
                image_url: "https://res.cloudinary.com/dihqq66r4/image/upload/v1760517937/doana/product_images/sjaoghuerrdlozvuxaae.webp",
                is_main: false
            },
            {
                image_id: "0ecb8cda-fca3-41c8-a252-e5a2bbdbbb90",
                image_url: "https://res.cloudinary.com/dihqq66r4/image/upload/v1760517940/doana/product_images/etemmmjrkivoktddpfbf.webp",
                is_main: false
            }
        ]
    },
    {
        product_id: "fdgbfdx43q21v46rg",
        name: "nhan vang 3",
        material: "vang",
        description: "lam bang kim cuong nguyen chat",
        color: "Vang",
        category_id: "dbca287b-c6f7-4790-b2e9-927ff662020e",
        price: "20000000.00",
        discount_price: "100000.00",
        stock_quantity: 12,
        status: "active",
        created_at: "2025-10-15 15:45:34",
        updated_at: "2025-10-15 15:45:34",
        Category: {
            category_id: "dbca287b-c6f7-4790-b2e9-927ff662020e",
            name: "nhan"
        },
        ProductImages: [
            {
                image_id: "c5973566-1e1e-4f67-a8d0-1c8eff278de0",
                image_url: "https://res.cloudinary.com/dihqq66r4/image/upload/v1760517939/doana/product_images/qeue9damrsvzi2datmhl.webp",
                is_main: false
            },
            {
                image_id: "9895a2fd-8ca3-4628-8b97-c2f42621e684",
                image_url: "https://res.cloudinary.com/dihqq66r4/image/upload/v1760517938/doana/product_images/xeqshuhowzr3a5oy5f77.webp",
                is_main: false
            },
            {
                image_id: "64aa2342-fadd-460c-91d2-8b5241a722e7",
                image_url: "https://res.cloudinary.com/dihqq66r4/image/upload/v1760517937/doana/product_images/sjaoghuerrdlozvuxaae.webp",
                is_main: true
            },
            {
                image_id: "0ecb8cda-fca3-41c8-a252-e5a2bbdbbb90",
                image_url: "https://res.cloudinary.com/dihqq66r4/image/upload/v1760517940/doana/product_images/etemmmjrkivoktddpfbf.webp",
                is_main: false
            }
        ]
    },
    {
        product_id: "567thgc234vdxdfvrthfntyi78",
        name: "nhan kim cuong 2",
        material: "kim cuong",
        description: "lam bang bach kim nguyen chat",
        color: "Vang hong",
        category_id: "dbca287b-c6f7-4790-b2e9-927ff662020e",
        price: "40000000.00",
        discount_price: "100000.00",
        stock_quantity: 12,
        status: "active",
        created_at: "2025-10-15 15:45:34",
        updated_at: "2025-10-15 15:45:34",
        Category: {
            category_id: "dbca287b-c6f7-4790-b2e9-927ff662020e",
            name: "nhan"
        },
        ProductImages: [
            {
                image_id: "c5973566-1e1e-4f67-a8d0-1c8eff278de0",
                image_url: "https://res.cloudinary.com/dihqq66r4/image/upload/v1760517939/doana/product_images/qeue9damrsvzi2datmhl.webp",
                is_main: false
            },
            {
                image_id: "9895a2fd-8ca3-4628-8b97-c2f42621e684",
                image_url: "https://res.cloudinary.com/dihqq66r4/image/upload/v1760517938/doana/product_images/xeqshuhowzr3a5oy5f77.webp",
                is_main: false
            },
            {
                image_id: "64aa2342-fadd-460c-91d2-8b5241a722e7",
                image_url: "https://res.cloudinary.com/dihqq66r4/image/upload/v1760517937/doana/product_images/sjaoghuerrdlozvuxaae.webp",
                is_main: false
            },
            {
                image_id: "0ecb8cda-fca3-41c8-a252-e5a2bbdbbb90",
                image_url: "https://res.cloudinary.com/dihqq66r4/image/upload/v1760517940/doana/product_images/etemmmjrkivoktddpfbf.webp",
                is_main: true
            }
        ]
    }
];
const __TURBOPACK__default__export__ = ringData;
}),
"[project]/src/app/ring/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$ring$2f$components$2f$Filters$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/ring/components/Filters.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$ring$2f$components$2f$ProductGrid$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/ring/components/ProductGrid.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$ring$2f$components$2f$data$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/ring/components/data.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$ring$2f$utils$2f$price$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/ring/utils/price.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const parsePrice = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$ring$2f$utils$2f$price$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toIntegerVND"];
const Page = ()=>{
    const [data, setData] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$ring$2f$components$2f$data$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
    const [favorites, setFavorites] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState([]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        fetch('http://localhost:8000/api/products').then((res)=>{
            return res.json();
        }).then((res)=>{
            setData(res);
        });
    }, []);
    // Filter & sort state
    const [priceRange, setPriceRange] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(""); // "2"|"2"|"3"|"4"
    const [color, setColor] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(""); // "5"|"6"|"7"
    const [material, setMaterial] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(""); // "8"|"9"
    const [sortBy, setSortBy] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(""); // """", "priceAsc","priceDesc","nameAsc"
    // parser/formatter handle cả "30000000.00" và "30.000.000"
    // danh sách được lọc + sắp xếp
    const displayedData = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>{
        let list = [
            ...data
        ];
        // phạm vi lọc theo giá
        if (priceRange) {
            let min = 0, max = Infinity;
            if (priceRange.includes("-")) {
                const [minStr, maxStr] = priceRange.split("-");
                min = Number(minStr);
                max = Number(maxStr);
            } else {
                if (priceRange === "1") {
                    min = 10;
                    max = 20;
                } else if (priceRange === "2") {
                    min = 20;
                    max = 30;
                } else if (priceRange === "3") {
                    min = 30;
                    max = 40;
                } else if (priceRange === "4") {
                    min = 40;
                    max = 100;
                }
            }
            list = list.filter((item)=>{
                const price = parsePrice(item.price);
                return price >= min * 1_000_000 && price <= max * 1_000_000;
            });
        }
        // lọc theo màu
        if (color) {
            let colorName = color;
            if (color === "5") colorName = "Vang";
            else if (color === "6") colorName = "Vang hong";
            else if (color === "7") colorName = "Trang";
            list = list.filter((item)=>String(item.color).toLowerCase() === String(colorName).toLowerCase());
        }
        // lọc theo chất liệu
        if (material) {
            let materialName = material;
            if (material === "8") materialName = "vang";
            else if (material === "9") materialName = "kim cuong";
            list = list.filter((item)=>String(item.material).toLowerCase() === String(materialName).toLowerCase());
        }
        // sắp xêp
        if (sortBy === "priceAsc") {
            list.sort((a, b)=>parsePrice(a.price) - parsePrice(b.price));
        } else if (sortBy === "priceDesc") {
            list.sort((a, b)=>parsePrice(b.price) - parsePrice(a.price));
        } else if (sortBy === "nameAsc") {
            list.sort((a, b)=>a.name.localeCompare(b.name));
        }
        return list;
    }, [
        data,
        priceRange,
        color,
        material,
        sortBy
    ]);
    const toggleFavorite = (productId)=>{
        setFavorites((prev)=>prev.includes(productId) ? prev.filter((id)=>id !== productId) : [
                ...prev,
                productId
            ]);
    };
    // Handlers passed to child components
    const handlePriceChange = (value)=>setPriceRange(value);
    const handleColorChange = (value)=>setColor(value);
    const handleMaterialChange = (value)=>setMaterial(value);
    const handleSortChange = (value)=>setSortBy(value);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: " flex flex-col items-center gap-[30px] mt-[40px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: " w-[90%]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: " text-[32px] text-[#9B8D6F] text-left",
                    children: "Nhẫn"
                }, void 0, false, {
                    fileName: "[project]/src/app/ring/page.jsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/ring/page.jsx",
                lineNumber: 115,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-[90%] flex flex-row gap-[50px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$ring$2f$components$2f$Filters$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        priceRange: priceRange,
                        color: color,
                        material: material,
                        sortBy: sortBy,
                        onPriceRangeChange: handlePriceChange,
                        onColorChange: handleColorChange,
                        onMaterialChange: handleMaterialChange,
                        onSortChange: handleSortChange
                    }, void 0, false, {
                        fileName: "[project]/src/app/ring/page.jsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$ring$2f$components$2f$ProductGrid$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        products: displayedData,
                        favorites: favorites,
                        onToggleFavorite: toggleFavorite
                    }, void 0, false, {
                        fileName: "[project]/src/app/ring/page.jsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/ring/page.jsx",
                lineNumber: 118,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/ring/page.jsx",
        lineNumber: 114,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Page;
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=_8917078e._.js.map