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
    title: StringConstructor;
    id: StringConstructor;
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: StringConstructor;
        default: string;
    };
    appendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    draggable: {
        type: BooleanConstructor;
        default: boolean;
    };
    resizable: {
        type: BooleanConstructor;
        default: boolean;
    };
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
