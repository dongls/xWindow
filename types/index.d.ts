import { App } from 'vue';
import { ComponentOptionsMixin } from 'vue';
import { ComputedRef } from 'vue';
import { DefineComponent } from 'vue';
import { ExtractPropTypes } from 'vue';
import { JSX } from 'vue/jsx-runtime';
import { PublicProps } from 'vue';
import { VNode } from 'vue';
import { VNodeArrayChildren } from 'vue';

export declare class AbstractWindow<T extends WindowOptions = WindowOptions> extends Emitter<AbstractWindow> {
    static seed: number;
    static create(params: any): AbstractWindow<any>;
    private CREATE_RESOLVE?;
    private CREATE_REJECT?;
    readonly id: number;
    type: WindowType;
    options: T;
    body?: WindowBody;
    state?: WindowState;
    created: boolean;
    destroyed: boolean;
    component: ComponentApi | null | undefined;
    private draggable;
    private resizable;
    private handles;
    dragstart: any;
    resizestart: any;
    constructor(params: any);
    get wid(): string;
    get isReady(): boolean;
    get allowDrag(): boolean;
    get allowDragArea(): number;
    get isMaximize(): boolean;
    private createOptions;
    createEvent(type: EventType, data?: any): WindowEvent<this, any>;
    private initDraggable;
    private initResizable;
    private initHooks;
    ready(): Promise<unknown>;
    show(): void;
    close(forced?: boolean): boolean;
    cleanup(): void;
    destroy(): void;
    getElement(): HTMLElement | undefined;
    useMenus(): ComputedRef<number[]>;
    focus(): void;
    private startTransition;
    private requestMaximize;
    private exitMaximize;
    toggleMaximize(): void;
    pin(): void;
    unpin(): void;
    togglePin(): void;
    useHandle(type: HandlerType, callback: Function): void;
    private callHandle;
    dispatchConfirm(): Promise<void>;
    confirm(data?: any): void;
    dispatchCancel(): Promise<void>;
    cancel(forced?: boolean, data?: any): void;
    promisify<T = any>(): Promise<T>;
}

declare type ChangeEventType = 'maximizeChange';

export declare function cleanup(): void;

declare interface CloseTopOptions {
    pressEsc?: boolean;
    forced?: boolean;
}

declare function closeTopWindow(options?: CloseTopOptions): void;

declare interface ComponentApi {
    getElement(): HTMLElement | undefined;
    getRenderState(): number;
    useCssClass(): Record<string, string>;
    useMenus(): ComputedRef<number[]>;
}

declare type DragEventType = 'dragStart' | 'dragging' | 'dragEnd';

declare class Emitter<T = any> {
    static NOOP(): void;
    private ALL_EVENTS;
    on(type: EventType, listener: EventListener_2<T>): this;
    once(type: EventType, listener: EventListener_2<T>): this;
    off(type: EventType, listener: EventListener_2<T>, delay?: boolean): this;
    dispatch(event: WindowEvent): WindowEvent<any, any>;
    cleanup(): void;
}

declare interface EventListener_2<T = any> {
    (evt: WindowEvent<T>): void;
}

declare type EventType = LifeCycleEventType | DragEventType | ResizeEventType | ChangeEventType | UserEventType;

declare function getTopWindow(): AbstractWindow<WindowOptions> | null | undefined;

declare function getTopZIndex(): number;

declare function getWindowCount(): number;

declare function getZIndex(): number;

declare type HandlerType = 'confirm' | 'cancel';

export declare function install(app: App, options?: PluginOptions): void;

declare type LifeCycleEventType = 'created' | 'beforeShow' | 'show' | 'beforeClose' | 'close' | 'beforeDestroy';

export declare interface PluginOptions {
    zIndex?: number;
    draggaleHeight?: number;
    size?: Record<string, WindowSize>;
}

export declare const Render: Readonly<{
    renderMenu: typeof useMenuRender;
}>;

export declare const RENDER_STATES: Readonly<{
    INIT: 0;
    MOUNTED: 1;
    UNMOUNTED: 2;
}>;

export declare const RESIZE_MODE: Readonly<{
    DISABLED: 0;
    RESIZE: 1;
    RESIZE_ONLY: 2;
}>;

declare type ResizeEventType = 'resizeStart' | 'resizing' | 'resizeEnd';

declare function setFocusedWindow(focused: AbstractWindow | undefined): void;

export declare class SimpleWindow extends AbstractWindow {
    static create(params: any): SimpleWindow;
    options: SimpleWindowOptions;
    constructor(params: any);
    updateMenus(menus: WindowMenu[]): void;
}

declare interface SimpleWindowOptions extends WindowOptions {
    footer?: boolean;
    menus?: WindowMenu[];
}

export declare const SPLIT_MODES: Readonly<{
    NONE: 0;
    MAXIMIZE: number;
    LEFT: number;
    RIGHT: number;
    TOP_LEFT: number;
    TOP_RIGHT: number;
    BOTTOM_LEFT: number;
    BOTTOM_RIGHT: number;
}>;

export declare function useBlankWindow(title: string, body: WindowBody): AbstractWindow;

export declare function useBlankWindow(title: string, body: WindowBody, params: Partial<UseBlankWindowParams>): AbstractWindow;

export declare function useBlankWindow(params: Partial<UseBlankWindowParams>): AbstractWindow;

export declare type UseBlankWindowParams = UseWindowParams & Partial<WindowOptions>;

export declare function useIcons(): Record<string, string>;

declare function useMenuRender(abstractWindow: AbstractWindow, menu: number): any;

declare type UserEventType = 'confirm' | 'cancel';

export declare function useSimpleWindow(title: string, body: WindowBody): SimpleWindow;

export declare function useSimpleWindow(title: string, body: WindowBody, params: Partial<UseSimpleWindowParams>): SimpleWindow;

export declare function useSimpleWindow(params: Partial<UseSimpleWindowParams>): SimpleWindow;

export declare type UseSimpleWindowParams = UseWindowParams & Partial<SimpleWindowOptions>;

export declare function useWindow(title: string, body: WindowBody): AbstractWindow;

export declare function useWindow(title: string, body: WindowBody, params: Partial<UseBlankWindowParams>): AbstractWindow;

export declare function useWindow(params: Partial<UseSimpleWindowParams>): AbstractWindow;

export declare function useWindowApi(): AbstractWindow<WindowOptions> | undefined;

export declare function useWindowManager(): {
    closeTopWindow: typeof closeTopWindow;
    getTopWindow: typeof getTopWindow;
    getTopZIndex: typeof getTopZIndex;
    getWindowCount: typeof getWindowCount;
    getZIndex: typeof getZIndex;
    setFocusedWindow: typeof setFocusedWindow;
    cleanup: typeof cleanup;
};

declare interface UseWindowParams {
    type?: WindowType;
    body?: WindowBody;
    size?: string;
}

export declare function useWindowSize(name: string, size: WindowSize): void;

export declare const version: string;

export declare type WindowBody = string | number | VNode | VNodeArrayChildren | ((win: AbstractWindow) => any);

export declare class WindowDragContext {
    moved: boolean;
    originalEvent: PointerEvent;
    target: HTMLElement;
    deltaX: number;
    deltaY: number;
    initialX: number;
    initialY: number;
    left: number;
    top: number;
    prevClientX: number;
    prevClientY: number;
    constructor(target: HTMLElement, event: PointerEvent);
    preventDragEvent(event: PointerEvent): boolean;
    createEvent(type: EventType, instance: AbstractWindow): WindowEvent<AbstractWindow<WindowOptions>, this>;
}

declare class WindowEvent<T = any, P = any> {
    type: EventType;
    stopped: boolean;
    defaultPrevented: boolean;
    instance: T;
    detail?: P;
    constructor(type: EventType, instance: T, detail?: P);
    stop(): void;
    preventDefault(): void;
}

export declare type WindowIcon = string | VNode | ((win: AbstractWindow) => VNode);

export declare const WindowManager: DefineComponent<    {}, () => JSX.Element, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ExtractPropTypes<    {}>>, {}, {}>;

declare interface WindowMenu {
    label?: string;
    handler: (win: AbstractWindow) => any;
}

declare interface WindowOptions {
    title: string;
    icon?: WindowIcon;
    className?: string;
    width: string;
    minWidth: number;
    maxWidth?: number;
    height?: string;
    minHeight: number;
    maxHeight?: number;
    top?: string;
    left?: string;
    zIndex?: number;
    maximize: boolean;
    teleport: string | false;
    draggable: boolean | number;
    resizeMode: number;
    closeable: boolean;
    mask: boolean;
    pinnable: boolean;
    displayAfterCreate: boolean;
    destroyAfterClose: boolean;
    closeOnPressEsc: boolean;
}

declare interface WindowSize {
    width: string;
    height: string;
    left?: string;
    top?: string;
}

declare interface WindowState {
    visible: boolean;
    offsetWidth: number;
    offsetHeight: number;
    offsetTop: number;
    offsetLeft: number;
    focused: boolean;
    pinned: boolean;
    zIndex: number;
    splitMode: number;
}

declare type WindowType = 'SimpleWindow' | 'BlankWindow';

declare const xWindow: {
    install: typeof install;
    version: string;
};
export default xWindow;
export { xWindow }

export { }
