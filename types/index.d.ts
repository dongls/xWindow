import { App } from 'vue';
import { ComponentOptionsMixin } from 'vue';
import { ComputedRef } from 'vue';
import { DefineComponent } from 'vue';
import { ExtractPropTypes } from 'vue';
import { PropType } from 'vue';
import { PublicProps } from 'vue';
import { RendererElement } from 'vue';
import { RendererNode } from 'vue';
import { VNode } from 'vue';
import { VNodeArrayChildren } from 'vue';

export declare class AbstractWindow extends Emitter<AbstractWindow> {
    static seed: number;
    static create(params: AbstractWindow | UseWindowParams): AbstractWindow;
    private CREATE_RESOLVE?;
    private CREATE_REJECT?;
    /** 窗口id，自动生成 */
    readonly id: number;
    /** 窗口类型 */
    type: WindowType;
    /** 窗口选项 */
    options: WindowOptions;
    /** 窗体内容 */
    body?: WindowBody;
    /** 窗口状态，组件挂载后可用 */
    state?: WindowState;
    /** 是否创建窗口 */
    created: boolean;
    /** 窗口是否被销毁 */
    destroyed: boolean;
    /** 组件API, 组件挂载后可用 */
    component: ComponentApi | null | undefined;
    /** 拖拽 */
    private draggable;
    private resizable;
    private handles;
    dragstart: any;
    resizestart: any;
    constructor(params: UseWindowParams);
    /** 窗口组件根元素的id */
    get wid(): string;
    /** 窗口组件是否已创建 */
    get isReady(): boolean;
    /** 是否允许窗口拖拽 */
    get allowDrag(): boolean;
    /** 顶部可拖拽区域，默认只有顶部32px以内可以拖动 */
    get allowDragArea(): number;
    /** 窗口是否已全屏 */
    get isFullscreen(): boolean;
    private createOptions;
    createEvent(type: EventType, data?: any): WindowEvent<this, any>;
    private initDraggable;
    private initResizable;
    private initHooks;
    /** 等待窗口组件创建完成 */
    ready(): Promise<unknown>;
    /** 显示窗口 */
    show(): void;
    /**
     * 关闭窗口
     * @param {boolean} forced - 是否强制关闭窗口
     */
    close(forced?: boolean): boolean;
    cleanup(): void;
    /** 销毁窗口 */
    destroy(): void;
    /** 获取窗口根元素 */
    getElement(): HTMLElement | undefined;
    /** 获取窗口菜单，返回菜单类型数组 */
    useMenus(): ComputedRef<number[]>;
    /** 窗口聚焦 */
    focus(): void;
    private startTransition;
    /** 窗口全屏 */
    requestFullscreen(): void;
    /** 退出全屏 */
    exitFullscreen(): void;
    /** 切换窗口全屏状态 */
    toggleFullscreen(): void;
    /** 固定窗口 */
    pin(): void;
    /** 取消窗口固定 */
    unpin(): void;
    /** 切换窗口的固定状态 */
    togglePin(): void;
    /** 注册事件处理函数, 用于窗口和组件之间的交互 */
    useHandle(type: HandlerType, callback: Function): void;
    private callHandle;
    /** 确认并关闭窗口 */
    confirm(): Promise<void>;
    /** 取消并关闭窗口 */
    cancel(forced?: boolean): Promise<void>;
}

export declare const BlankWindow: DefineComponent<    {
abstractWindow: {
type: PropType<AbstractWindow>;
required: true;
};
}, () => any, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ExtractPropTypes<    {
abstractWindow: {
type: PropType<AbstractWindow>;
required: true;
};
}>>, {}, {}>;

declare type ChangeEventType = 'fullscreenChange';

export declare function cleanup(): void;

declare interface CloseTopOptions {
    pressEsc?: boolean;
    forced?: boolean;
}

/** 关闭顶层窗口 */
declare function closeTopWindow(options?: CloseTopOptions): void;

declare interface ComponentApi {
    /** 获取窗口顶层DOM对象 */
    getElement(): HTMLElement | undefined;
    /** 获取组件当前渲染状态 */
    getRenderState(): number;
    /** 获取组件样式 */
    useCssClass(): Record<string, string>;
    /** 获取窗口菜单 */
    useMenus(): ComputedRef<number[]>;
}

declare type DragEventType = 'dragStart' | 'dragging' | 'dragEnd';

declare class Emitter<T = any> {
    static NOOP(): void;
    private ALL_EVENTS;
    /** 监听事件 */
    on(type: EventType, listener: EventListener_2<T>): this;
    /** 监听事件，仅生效一次 */
    once(type: EventType, listener: EventListener_2<T>): this;
    /** 取消事件监听 */
    off(type: EventType, listener: EventListener_2<T>, delay?: boolean): this;
    /** 触发一个事件 */
    dispatch(event: WindowEvent): WindowEvent<any, any>;
    /** 清空所有事件监听函数 */
    cleanup(): void;
}

declare interface EventListener_2<T = any> {
    (evt: WindowEvent<T>): void;
}

declare type EventType = LifeCycleEventType | DragEventType | ResizeEventType | ChangeEventType | UserEventType;

/** 获取顶层窗口 */
declare function getTopWindow(): AbstractWindow | null | undefined;

declare function getTopZIndex(): number;

declare function getWindowCount(): number;

declare function getZIndex(): number;

declare type HandlerType = 'confirm' | 'cancel';

export declare function install(app: App, options?: PluginOptions): void;

declare type LifeCycleEventType = 'created' | 'beforeShow' | 'show' | 'beforeClose' | 'close' | 'beforeDestroy';

export declare interface PluginOptions {
    /** 窗口的初始层级，默认为`1000` */
    zIndex?: number;
    /** 窗口可推拽的高度，默认为`32px` */
    draggaleHeight?: number;
    /** 预设窗口尺寸 */
    size?: Record<string, WindowSize>;
}

export declare const Render: Readonly<{
    renderMenu: typeof useMenuRender;
}>;

/** 窗口渲染状态 */
export declare const RENDER_STATES: Readonly<{
    /** 窗口初始化，不显示 */
    INIT: 0;
    /** 窗口初始化完成，并展示 */
    MOUNTED: 1;
    /** 窗口已销毁 */
    UNMOUNTED: 2;
}>;

/** 窗口调整模式 */
export declare const RESIZE_MODE: Readonly<{
    /** 禁止调整窗口大小 */
    DISABLED: 0;
    /** 允许调整窗口大小，允许全屏（默认）*/
    RESIZE: 1;
    /** 只允许调整窗口大小 */
    RESIZE_ONLY: 2;
}>;

declare type ResizeEventType = 'resizeStart' | 'resizing' | 'resizeEnd';

declare function setFocusedWindow(focused: AbstractWindow | undefined): void;

export declare const SimpleWindow: DefineComponent<    {
abstractWindow: {
type: PropType<AbstractWindow>;
required: true;
};
}, () => any, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ExtractPropTypes<    {
abstractWindow: {
type: PropType<AbstractWindow>;
required: true;
};
}>>, {}, {}>;

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

export declare function useBlankWindow(params: UseWindowParams): AbstractWindow;

export declare function useBlankWindow(title: string, body: WindowBody): AbstractWindow;

export declare function useBlankWindow(title: string, body: WindowBody, params: UseWindowParams): AbstractWindow;

export declare function useIcons(): Record<string, string>;

declare function useMenuRender(abstractWindow: AbstractWindow, menu: number): any;

declare type UserEventType = 'confirm' | 'cancel';

export declare function useSimpleWindow(params: UseSimpleWindowParams): AbstractWindow;

export declare function useSimpleWindow(title: string, body: WindowBody): AbstractWindow;

export declare function useSimpleWindow(title: string, body: WindowBody, params: UseSimpleWindowParams): AbstractWindow;

export declare type UseSimpleWindowParams = UseWindowParams & {
    /** 是否包含窗尾 */
    footer?: boolean;
};

export declare function useWindow(title: string, body: WindowBody): AbstractWindow;

export declare function useWindow(title: string, body: WindowBody, params: UseWindowParams): AbstractWindow;

export declare function useWindow(params: UseWindowParams): AbstractWindow;

export declare function useWindowApi(): AbstractWindow | undefined;

export declare function useWindowManager(): {
    closeTopWindow: typeof closeTopWindow;
    getTopWindow: typeof getTopWindow;
    getTopZIndex: typeof getTopZIndex;
    getWindowCount: typeof getWindowCount;
    getZIndex: typeof getZIndex;
    setFocusedWindow: typeof setFocusedWindow;
    cleanup: typeof cleanup;
};

export declare type UseWindowParams = Partial<WindowOptions> & {
    /** 窗口类型 */
    type?: WindowType;
    /** 窗口的内容，可以是`VNode`或者一个返回`VNode`的函数 */
    body?: WindowBody;
    /** 窗口尺寸 */
    size?: string;
};

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
    /** 如果移动距离小,则阻止后续事件触发 */
    preventDragEvent(event: PointerEvent): boolean;
    createEvent(type: EventType, instance: AbstractWindow): WindowEvent<AbstractWindow, this>;
}

declare class WindowEvent<T = any, P = any> {
    /** 事件类型 */
    type: EventType;
    /** 事件是否被阻止继续执行 */
    stopped: boolean;
    /** 是否已取消默认行为 */
    defaultPrevented: boolean;
    /** 事件触发窗口实例 */
    instance: T;
    /** 事件的参数 */
    detail?: P;
    constructor(type: EventType, instance: T, detail?: P);
    /** 阻止事件继续执行 */
    stop(): void;
    /** 阻止事件默认行为 */
    preventDefault(): void;
}

export declare type WindowIcon = string | VNode | ((win: AbstractWindow) => VNode);

export declare const WindowManager: DefineComponent<    {}, () => (VNode<RendererNode, RendererElement, {
[key: string]: any;
}> | null)[], {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ExtractPropTypes<    {}>>, {}, {}>;

declare interface WindowOptions {
    /** 窗口的标题 */
    title: string;
    /**
     * 窗口的图标,如果不指定则使用默认的图标
     * - `string` 传入值当作`CSS`中的类选择器使用
     * - `VNode` 以传入的`VNode`当作图标
     * - `Function` 需返回一个`VNode`当作图标
     */
    icon?: WindowIcon;
    /** 窗口的`CSS`类名 */
    className?: string;
    /** 窗体的`CSS`类名 */
    bodyClassName?: string;
    /** 窗口初始宽度,参照`CSS`中`width`语法,默认为`640px` */
    width: string;
    /** 窗口最小宽度,最小为0,默认为`360`,单位像素 */
    minWidth: number;
    /** TODO: 窗口最大宽度,默认不限制，单位像素 */
    maxWidth?: number;
    /** 窗口初始高度，参照`CSS`中`height`语法 */
    height?: string;
    /** 窗口最小高度, 最小为0,默认为`32`单位像素 */
    minHeight: number;
    /** TODO: 窗口最大高度，默认不限制，单位像素 */
    maxHeight?: number;
    /** 窗口相对浏览器窗口顶部的初始位置，参照`CSS`的`top`语法 */
    top?: string;
    /** 窗口相对浏览器窗口左侧的初始位置，参照`CSS`的`left`语法 */
    left?: string;
    /**
     * @deprecated 此属性可能会发生变动，请谨慎使用
     * 窗口的固定层级, 参照`CSS`的`zIndex`语法
     */
    zIndex?: number;
    /** 窗口初始全屏状态,默认为`false` */
    fullscreen: boolean;
    /** 窗口插入的位置,默认为`body`,值为`false`禁用此行为 */
    teleport: string | false;
    /** 是否可拖拽, 默认为`true`, 如果值为数字, 则用于指定`header`的高度 */
    draggable: boolean | number;
    /** 窗口调整模式,默认为`RESIZE_MODE.REISZE` */
    resizeMode: number;
    /** 是否可关闭窗口,默认为`true` */
    closeable: boolean;
    /** 是否包含遮罩层,默认为`false` */
    mask: boolean;
    /** 是否允许固定窗口,默认为`true` */
    pinnable: boolean;
    /** 创建后立即显示窗口，默认为`true` */
    displayAfterCreate: boolean;
    /** 关闭后销毁窗口，默认为`true` */
    destroyAfterClose: boolean;
    /** 按下`Esc`键关闭窗口，默认为`true` */
    closeOnPressEsc: boolean;
}

declare interface WindowSize {
    width: string;
    height: string;
    left?: string;
    top?: string;
}

/** 窗口状态信息 */
declare interface WindowState {
    /** 是否显示窗口 */
    visible: boolean;
    /** 窗口实际宽度 */
    offsetWidth: number;
    /** 窗口实际高度 */
    offsetHeight: number;
    /** 窗口距容器顶部距离 */
    offsetTop: number;
    /** 窗口距容器左侧距离 */
    offsetLeft: number;
    /** 窗口是否聚焦 */
    focused: boolean;
    /** 窗口是否被固定 */
    pinned: boolean;
    /** 窗口层级 */
    zIndex: number;
    /** 窗口分割状态 */
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
