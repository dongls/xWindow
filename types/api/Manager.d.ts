import { Ref } from 'vue';
import { AbstractWindow, UID, WindowApi } from '../model';
export declare function initWindowManager(): void;
export declare function destroyWindowManager(): void;
export declare function isInitWindowManager(): boolean;
export declare function getZIndex(): number;
export declare function getTopZIndex(): number;
export declare function getTopWindowZIndex(): number;
export declare function setZIndex(num: unknown): void;
export declare function getTopWindow(): WindowApi;
export declare function registerWindow(uid: UID, api: WindowApi): void;
export declare function removeWindow(uid: UID): void;
export declare function closeTopWindow(): void;
export declare function getAbstractWindow(uid: UID): AbstractWindow;
export declare function createWindow(abstractWindow: AbstractWindow): UID;
export declare function getWindowApi(uid: UID): WindowApi;
export declare function useGhostWindow(): Ref<UID[]>;
export declare function setFocusedWindow(uid: UID): void;
export declare function focusTopWindow(): void;
export declare function findTopWindow(): WindowApi;
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
export declare function useWindowManager(): {
    closeTopWindow: typeof closeTopWindow;
    getTopZIndex: typeof getTopZIndex;
    getWindowApi: typeof getWindowApi;
    getZIndex: typeof getZIndex;
    setFocusedWindow: typeof setFocusedWindow;
};
