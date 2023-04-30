import { Ref, App } from 'vue';
import { AbstractWindow, UID, WindowApi } from '../model';
export declare function initWindowManager(): void;
export declare function destroyContext(): void;
export declare function isInitWindowManager(): boolean;
export declare function getZIndex(): number;
export declare function getTopZIndex(): number;
export declare function getTopWindowZIndex(): number;
export declare function setZIndex(num: unknown): void;
/** 获取顶层窗口 */
export declare function getTopWindow(): WindowApi;
export declare function registerWindow(uid: UID, api: WindowApi): void;
export declare function removeWindow(uid: UID): void;
/** 关闭顶层窗口 */
export declare function closeTopWindow(): void;
export declare function getAbstractWindow(uid: UID): AbstractWindow;
export declare function createWindow(newOption: any): UID;
/** 获取窗口组件暴露的`API` */
export declare function getWindowApi(uid: UID): WindowApi;
export declare function useGhostWindow(): Ref<UID[]>;
/**
 * 设置窗口为聚焦窗口
 * @param { UID } uid - 窗口的唯一ID
 */
export declare function setFocusedWindow(uid: UID): void;
export declare function focusTopWindow(): void;
export declare function previewSplitWindow(event: MouseEvent): {
    mode: number;
    width: number;
    relatedWindow: WindowApi;
};
export declare function resetSplitMode(): 0;
export declare function usePreviewState(): {
    mode: number;
    width: number;
    height: number;
};
export declare function findTopSplitWindow(mode: number): WindowApi;
export declare function getWindowCount(): number;
export declare function getWindowComponent(type: string): import("vue").DefineComponent<{
    icon: import("vue").PropType<string | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | (() => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>)>;
    id: StringConstructor;
    title: StringConstructor;
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    className: StringConstructor;
    width: {
        type: StringConstructor;
        default: string;
    };
    minWidth: {
        type: NumberConstructor;
        default: number;
    };
    maxWidth: NumberConstructor;
    height: {
        type: StringConstructor;
    };
    minHeight: {
        type: NumberConstructor;
        default: number;
    };
    maxHeight: NumberConstructor;
    left: {
        type: StringConstructor;
    };
    top: {
        type: StringConstructor;
    };
    zIndex: {
        type: NumberConstructor;
    };
    fullscreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    appendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    draggable: {
        type: BooleanConstructor;
        default: boolean;
    };
    resizeMode: {
        type: NumberConstructor;
        default: 1;
    };
    closeable: {
        type: BooleanConstructor;
        default: boolean;
    };
    mask: {
        type: BooleanConstructor;
        default: boolean;
    };
    pinnable: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    icon: import("vue").PropType<string | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | (() => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>)>;
    id: StringConstructor;
    title: StringConstructor;
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    className: StringConstructor;
    width: {
        type: StringConstructor;
        default: string;
    };
    minWidth: {
        type: NumberConstructor;
        default: number;
    };
    maxWidth: NumberConstructor;
    height: {
        type: StringConstructor;
    };
    minHeight: {
        type: NumberConstructor;
        default: number;
    };
    maxHeight: NumberConstructor;
    left: {
        type: StringConstructor;
    };
    top: {
        type: StringConstructor;
    };
    zIndex: {
        type: NumberConstructor;
    };
    fullscreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    appendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    draggable: {
        type: BooleanConstructor;
        default: boolean;
    };
    resizeMode: {
        type: NumberConstructor;
        default: 1;
    };
    closeable: {
        type: BooleanConstructor;
        default: boolean;
    };
    mask: {
        type: BooleanConstructor;
        default: boolean;
    };
    pinnable: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    visible: boolean;
    width: string;
    minWidth: number;
    minHeight: number;
    fullscreen: boolean;
    appendToBody: boolean;
    draggable: boolean;
    resizeMode: number;
    closeable: boolean;
    mask: boolean;
    pinnable: boolean;
}> | import("vue").DefineComponent<{
    id: StringConstructor;
    title: StringConstructor;
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    className: StringConstructor;
    width: {
        type: StringConstructor;
        default: string;
    };
    minWidth: {
        type: NumberConstructor;
        default: number;
    };
    maxWidth: NumberConstructor;
    height: {
        type: StringConstructor;
    };
    minHeight: {
        type: NumberConstructor;
        default: number;
    };
    maxHeight: NumberConstructor;
    left: {
        type: StringConstructor;
    };
    top: {
        type: StringConstructor;
    };
    zIndex: {
        type: NumberConstructor;
    };
    fullscreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    appendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    draggable: {
        type: BooleanConstructor;
        default: boolean;
    };
    resizeMode: {
        type: NumberConstructor;
        default: 1;
    };
    closeable: {
        type: BooleanConstructor;
        default: boolean;
    };
    mask: {
        type: BooleanConstructor;
        default: boolean;
    };
    pinnable: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    id: StringConstructor;
    title: StringConstructor;
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    className: StringConstructor;
    width: {
        type: StringConstructor;
        default: string;
    };
    minWidth: {
        type: NumberConstructor;
        default: number;
    };
    maxWidth: NumberConstructor;
    height: {
        type: StringConstructor;
    };
    minHeight: {
        type: NumberConstructor;
        default: number;
    };
    maxHeight: NumberConstructor;
    left: {
        type: StringConstructor;
    };
    top: {
        type: StringConstructor;
    };
    zIndex: {
        type: NumberConstructor;
    };
    fullscreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    appendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    draggable: {
        type: BooleanConstructor;
        default: boolean;
    };
    resizeMode: {
        type: NumberConstructor;
        default: 1;
    };
    closeable: {
        type: BooleanConstructor;
        default: boolean;
    };
    mask: {
        type: BooleanConstructor;
        default: boolean;
    };
    pinnable: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    visible: boolean;
    width: string;
    minWidth: number;
    minHeight: number;
    fullscreen: boolean;
    appendToBody: boolean;
    draggable: boolean;
    resizeMode: number;
    closeable: boolean;
    mask: boolean;
    pinnable: boolean;
}>;
export declare function createIsolateWindow(abstractWindow: AbstractWindow): () => void;
export declare function useEscEvent(): void;
export declare function useAppContext(app: App): void;
export declare function cleanup(): void;
export declare function useWindowManager(): {
    closeTopWindow: typeof closeTopWindow;
    getTopWindow: typeof getTopWindow;
    getTopZIndex: typeof getTopZIndex;
    getWindowApi: typeof getWindowApi;
    getWindowCount: typeof getWindowCount;
    getZIndex: typeof getZIndex;
    setFocusedWindow: typeof setFocusedWindow;
    cleanup: typeof cleanup;
};
