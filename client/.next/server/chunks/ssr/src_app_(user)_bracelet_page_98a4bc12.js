module.exports = [
"[project]/src/app/(user)/bracelet/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$productsStore$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/productsStore.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const parsePrice = toIntegerVND;
function Page() {
    const { products, status, error, fetchProducts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$productsStore$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProducts"])();
    const [favorites, setFavorites] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState([]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (status === "idle") {
            fetchProducts();
        }
    }, [
        status,
        fetchProducts
    ]);
    const [priceRange, setPriceRange] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState("");
    const [color, setColor] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState("");
    const [material, setMaterial] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState("");
    const [sortBy, setSortBy] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState("");
    const displayedData = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>{
        let list = Array.isArray(products) ? [
            ...products
        ] : [];
        // category filter for "vong tay"
        list = list.filter((item)=>{
            const cat = item?.Category?.name || "";
            return String(cat).trim().toLowerCase() === "vong tay";
        });
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
            list = list.filter((item)=>{
                const price = parsePrice(item.price);
                return price >= min * 1_000_000 && price <= max * 1_000_000;
            });
        }
        if (color) {
            let colorName = color;
            if (color === "5") colorName = "Vang";
            else if (color === "6") colorName = "Vang hong";
            else if (color === "7") colorName = "Trang";
            list = list.filter((item)=>String(item.color).toLowerCase() === String(colorName).toLowerCase());
        }
        if (material) {
            let materialName = material;
            if (material === "8") materialName = "vang";
            else if (material === "9") materialName = "kim cuong";
            list = list.filter((item)=>String(item.material).toLowerCase() === String(materialName).toLowerCase());
        }
        if (sortBy === "priceAsc") {
            list.sort((a, b)=>parsePrice(a.price) - parsePrice(b.price));
        } else if (sortBy === "priceDesc") {
            list.sort((a, b)=>parsePrice(b.price) - parsePrice(a.price));
        } else if (sortBy === "nameAsc") {
            list.sort((a, b)=>a.name.localeCompare(b.name));
        }
        return list;
    }, [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: " flex flex-col items-center gap-[30px] mt-[40px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: " w-[90%]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-[90%] flex flex-row gap-[50px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Filters, {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            status === "loading" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 text-sm text-gray-500",
                                children: "Đang tải sản phẩm…"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(user)/bracelet/page.js",
                                lineNumber: 118,
                                columnNumber: 13
                            }, this),
                            status === "failed" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductGrid, {
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
}),
];

//# sourceMappingURL=src_app_%28user%29_bracelet_page_98a4bc12.js.map