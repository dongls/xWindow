export declare const HOME_PAGE: string;
export declare const VERSION: string;
export declare const INJECTION_WINDOW_PROXY: unique symbol;
export declare const ON_UPDATE_VISIBLE = "onUpdate:visible";
export declare const ON_BEFORE_UNMOUNT = "onBeforeUnmount";
export declare const ON_UNMOUNT = "onUnmount";
export declare const POSITION_FLAGS: Readonly<{
    NONE: 0;
    TOP: number;
    BOTTOM: number;
    LEFT: number;
    RIGHT: number;
}>;
export declare const RESIZE_POOPS: Readonly<{
    TOP: number;
    BOTTOM: number;
    LEFT: number;
    RIGHT: number;
    TOP_LEFT: number;
    TOP_RIGHT: number;
    BOTTOM_LEFT: number;
    BOTTOM_RIGHT: number;
}>;
export declare const SPLIT_MODES: Readonly<{
    NONE: 0;
    FULLSCREEN: number;
    LEFT: number;
    RIGHT: number;
    TOP_LEFT: number;
    TOP_RIGHT: number;
    BOTTOM_LEFT: number;
    BOTTOM_RIGHT: number;
}>;
/** 窗口调整模式 */
export declare const RESIZE_MODE: Readonly<{
    /** 禁止调整窗口大小 */
    NONE: 0;
    /** 允许调整窗口大小，允许全屏（默认）*/
    RESIZE: 1;
    /** 只允许调整窗口大小 */
    RESIZE_ONLY: 2;
}>;
export declare const WINDOW_STATES: Readonly<{
    /** 窗口初始化，不显示 */
    INIT: 0;
    /** 窗口初始化完成，并展示 */
    MOUNTED: 1;
    /** 窗口已销毁 */
    UNMOUNTED: 2;
}>;
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
    /** 窗口初始全屏状态，默认为`false` */
    fullscreen: {
        type: BooleanConstructor;
        default: boolean;
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
    /** 窗口调整模式，默认为`RESIZE_MODE.REISZE` */
    resizeMode: {
        type: NumberConstructor;
        default: 1;
    };
    /** 是否可关闭窗口，默认为`true` */
    closeable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否包含遮罩层，默认为`false` */
    mask: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否允许固定窗口 */
    pinnable: {
        type: BooleanConstructor;
        default: boolean;
    };
};
