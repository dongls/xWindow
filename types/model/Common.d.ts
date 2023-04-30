import { Ref, VNode, VNodeArrayChildren, ExtractPropTypes, ComponentInternalInstance } from 'vue';
import { ON_BEFORE_UNMOUNT, ON_UPDATE_VISIBLE, SPLIT_MODES, BaseWindowProps, SimpleWindowProps } from './Constant';
import { UID } from './Window';
export type InferValue<T> = T[keyof T];
export type WindowInstance = {
    uid: UID;
    get visible(): boolean;
    get isUnmounted(): boolean;
    close: () => void;
    show: () => void;
    unmount: () => void;
};
export type WindowState = {
    width: number;
    height: number;
    left: number;
    top: number;
    focused: boolean;
    pinned: boolean;
};
export type SplitState = {
    mode: InferValue<typeof SPLIT_MODES>;
    width: number;
    height: number;
};
export type UseMenuOptions = {
    custom?: boolean;
};
export type WindowApi = {
    get uid(): UID;
    get visible(): boolean;
    get windowState(): WindowState;
    get splitState(): SplitState;
    get zIndex(): number;
    set zIndex(v: number);
    /** 窗口是否允许调整大小 */
    get resizable(): boolean;
    /** 窗口是否允许拖拽 */
    get draggable(): boolean;
    get props(): BaseWindowPropsType;
    close: (forced?: boolean) => void;
    exitSplitMode: (event: MouseEvent) => void;
    getWindowEl: () => HTMLElement;
    /** 获取窗口组件实例 */
    getWindow: () => ComponentInternalInstance;
    saveWindowState: () => void;
    useCssClass: () => any;
    useMenus: (options?: UseMenuOptions) => any;
};
export type WindowBody = string | number | boolean | VNode | VNodeArrayChildren | (() => any);
export type BaseWindowPropsType = ExtractPropTypes<Omit<Partial<typeof BaseWindowProps>, 'visible'>>;
export type UseBaseWindowParams = BaseWindowPropsType & {
    type?: string;
    /** 窗口的内容，可以是`VNode`或者一个返回`VNode`的函数 */
    body: WindowBody;
    /** 关闭后销毁窗口，默认为`true` */
    unmountAfterClose?: boolean;
    /** 创建后立即显示窗口，默认为`true` */
    displayAfterCreate?: boolean;
    /** 窗口销毁后 */
    afterUnmount?: () => void;
};
export type UseBlankWindowParams = UseBaseWindowParams;
export type UseSimpleWindowParams = UseBaseWindowParams & Partial<typeof SimpleWindowProps>;
export type UseWindowParams = UseBaseWindowParams | UseBlankWindowParams | UseSimpleWindowParams;
export type AbstractWindowParams = Omit<UseWindowParams, "unmountAfterClose" | "displayAfterCreate"> & {
    visible: Ref<boolean>;
    [ON_UPDATE_VISIBLE]: Function;
    [ON_BEFORE_UNMOUNT]: Function;
};
