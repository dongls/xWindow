import { Ref } from 'vue';
import { AbstractWindow, UID, WindowApi } from '../model';
export declare function initWindowManager(): void;
export declare function destroyWindowManager(): void;
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
export declare function createWindow(abstractWindow: AbstractWindow): UID;
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
export declare function useWindowManager(): {
    closeTopWindow: typeof closeTopWindow;
    getTopWindow: typeof getTopWindow;
    getTopZIndex: typeof getTopZIndex;
    getWindowApi: typeof getWindowApi;
    getWindowCount: typeof getWindowCount;
    getZIndex: typeof getZIndex;
    setFocusedWindow: typeof setFocusedWindow;
};
