export declare const HOME_PAGE: string;
export declare const VERSION: string;
export declare const ON_UPDATE_VISIBLE = "onUpdate:visible";
export declare const ON_BEFORE_UNMOUNT = "onBeforeUnmount";
export declare const ON_UNMOUNT = "onUnmount";
export declare const INJECTION_WINDOW_PROXY: unique symbol;
export declare const ComponentStates: Readonly<{
    INIT: 0;
    MOUNTED: 1;
    UNMOUNTED: 2;
}>;
export declare const enum ResizeProps {
    TOP = 0,
    BOTTOM = 1,
    LEFT = 2,
    RIGHT = 3,
    LEFT_TOP = 4,
    LEFT_BOTTOM = 5,
    RIGHT_TOP = 6,
    RIGHT_BOTTOM = 7
}
export declare const WindowCommonProps: {
    /** 窗口的标题 */
    title: StringConstructor;
    /** 窗口的id */
    id: StringConstructor;
    /** 是否显示窗口 */
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 窗口初始宽度，参照`CSS`的`width`语法 */
    width: {
        type: StringConstructor;
        default: string;
    };
    /** 窗口初始高度，参照`CSS`的`height`语法 */
    height: {
        type: StringConstructor;
        default: any;
    };
    /** 窗口初始位置，参照`CSS`的`left`语法 */
    left: {
        type: StringConstructor;
        default: any;
    };
    /** 窗口初始位置，参照`CSS`的`top`语法 */
    top: {
        type: StringConstructor;
        default: string;
    };
    /** 窗口的固定层级, 参照`CSS`的`zIndex`语法 */
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    /** 是否插入到`body`中，默认为`true` */
    appendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否可拖拽，默认为`true` */
    draggable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否可改变窗口大小，默认为`true` */
    resizable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否可关闭窗口，默认为`true` */
    closeable: {
        type: BooleanConstructor;
        default: boolean;
    };
    mask: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export declare const WindowSplitPosition: Readonly<{
    NONE: "none";
    LEFT: "left";
    RIGHT: "right";
}>;
export declare const POSITION_FLAGS: Readonly<{
    NULL: 0;
    TOP: 1;
    RIGHT: number;
    BOTTOM: number;
    LEFT: number;
}>;
export declare const SPLIT_MODES: Readonly<{
    TOP: 1;
    LEFT: number;
    RIGHT: number;
    TOP_LEFT: number;
    TOP_RIGHT: number;
    BOTTOM_LEFT: number;
    BOTTOM_RIGHT: number;
}>;
