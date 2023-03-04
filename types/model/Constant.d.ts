export declare const HOME_PAGE: string;
export declare const VERSION: string;
export declare const ON_UPDATE_VISIBLE = "onUpdate:visible";
export declare const ON_BEFORE_UNMOUNT = "onBeforeUnmount";
export declare const INJECTION_WINDOW_PROXY: unique symbol;
export declare const ComponentStates: Readonly<{
    INIT: 0;
    LAYOUT: 1;
    MOUNTED: 2;
    UNMOUNTED: 3;
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
    /** 窗口宽度，参照`CSS`的`width`语法 */
    width: {
        type: StringConstructor;
        default: string;
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
};
export declare const WindowSplitPosition: Readonly<{
    NONE: "none";
    LEFT: "left";
    RIGHT: "right";
}>;
