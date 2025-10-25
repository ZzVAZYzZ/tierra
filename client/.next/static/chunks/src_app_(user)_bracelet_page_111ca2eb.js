(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/(user)/bracelet/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../ring/components/Filters'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../ring/components/ProductGrid'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../ring/utils/price'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$productsStore$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/productsStore.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const parsePrice = toIntegerVND;
function Page() {
    _s();
    const { products, status, error, fetchProducts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$productsStore$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProducts"])();
    const [favorites, setFavorites] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState([]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "Page.useEffect": ()=>{
            if (status === "idle") {
                fetchProducts();
            }
        }
    }["Page.useEffect"], [
        status,
        fetchProducts
    ]);
    const [priceRange, setPriceRange] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState("");
    const [color, setColor] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState("");
    const [material, setMaterial] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState("");
    const [sortBy, setSortBy] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState("");
    const displayedData = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "Page.useMemo[displayedData]": ()=>{
            let list = Array.isArray(products) ? [
                ...products
            ] : [];
            // category filter for "vong tay"
            list = list.filter({
                "Page.useMemo[displayedData]": (item)=>{
                    var _item_Category;
                    const cat = (item === null || item === void 0 ? void 0 : (_item_Category = item.Category) === null || _item_Category === void 0 ? void 0 : _item_Category.name) || "";
                    return String(cat).trim().toLowerCase() === "vong tay";
                }
            }["Page.useMemo[displayedData]"]);
            if (priceRange) {
                let min = 0, max = Infinity;
                if (priceRange.includes("-")) {
                    const [minStr, maxStr] = priceRange.split("-");
                    min = Number(minStr);
                    max = Number(maxStr);
                } else {
                    if (priceRange === "1") {
                        min = 0;
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
                list = list.filter({
                    "Page.useMemo[displayedData]": (item)=>{
                        const price = parsePrice(item.price);
                        return price >= min * 1_000_000 && price <= max * 1_000_000;
                    }
                }["Page.useMemo[displayedData]"]);
            }
            if (color) {
                let colorName = color;
                if (color === "5") colorName = "Vang";
                else if (color === "6") colorName = "Vang hong";
                else if (color === "7") colorName = "Trang";
                list = list.filter({
                    "Page.useMemo[displayedData]": (item)=>String(item.color).toLowerCase() === String(colorName).toLowerCase()
                }["Page.useMemo[displayedData]"]);
            }
            if (material) {
                let materialName = material;
                if (material === "8") materialName = "vang";
                else if (material === "9") materialName = "kim cuong";
                list = list.filter({
                    "Page.useMemo[displayedData]": (item)=>String(item.material).toLowerCase() === String(materialName).toLowerCase()
                }["Page.useMemo[displayedData]"]);
            }
            if (sortBy === "priceAsc") {
                list.sort({
                    "Page.useMemo[displayedData]": (a, b)=>parsePrice(a.price) - parsePrice(b.price)
                }["Page.useMemo[displayedData]"]);
            } else if (sortBy === "priceDesc") {
                list.sort({
                    "Page.useMemo[displayedData]": (a, b)=>parsePrice(b.price) - parsePrice(a.price)
                }["Page.useMemo[displayedData]"]);
            } else if (sortBy === "nameAsc") {
                list.sort({
                    "Page.useMemo[displayedData]": (a, b)=>a.name.localeCompare(b.name)
                }["Page.useMemo[displayedData]"]);
            }
            return list;
        }
    }["Page.useMemo[displayedData]"], [
        products,
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: " flex flex-col items-center gap-[30px] mt-[40px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: " w-[90%]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: " text-[32px] text-[#9B8D6F] text-left",
                    children: "Vòng tay"
                }, void 0, false, {
                    fileName: "[project]/src/app/(user)/bracelet/page.js",
                    lineNumber: 102,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(user)/bracelet/page.js",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-[90%] flex flex-row gap-[50px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Filters, {
                        priceRange: priceRange,
                        color: color,
                        material: material,
                        sortBy: sortBy,
                        onPriceRangeChange: setPriceRange,
                        onColorChange: setColor,
                        onMaterialChange: setMaterial,
                        onSortChange: setSortBy
                    }, void 0, false, {
                        fileName: "[project]/src/app/(user)/bracelet/page.js",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            status === "loading" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 text-sm text-gray-500",
                                children: "Đang tải sản phẩm…"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(user)/bracelet/page.js",
                                lineNumber: 118,
                                columnNumber: 13
                            }, this),
                            status === "failed" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 text-sm text-red-500",
                                children: [
                                    "Lỗi tải dữ liệu: ",
                                    String(error)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(user)/bracelet/page.js",
                                lineNumber: 121,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductGrid, {
                                products: displayedData,
                                favorites: favorites,
                                onToggleFavorite: toggleFavorite
                            }, void 0, false, {
                                fileName: "[project]/src/app/(user)/bracelet/page.js",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(user)/bracelet/page.js",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(user)/bracelet/page.js",
                lineNumber: 104,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(user)/bracelet/page.js",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
_s(Page, "y6SlITK3+dhaMfj2q2wP2ELJXTg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$productsStore$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProducts"]
    ];
});
_c = Page;
var _c;
__turbopack_context__.k.register(_c, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_%28user%29_bracelet_page_111ca2eb.js.map