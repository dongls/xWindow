import { VNodeProps, Ref, VNode, VNodeArrayChildren } from 'vue';
import { ON_BEFORE_UNMOUNT, ON_UPDATE_VISIBLE, SPLIT_MODES, WindowCommonProps } from './Constant';
import { UID } from './Window';
/** @deprecated */
export type RawProps = VNodeProps & Record<string, any>;
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
    splitMode: InferValue<typeof SPLIT_MODES>;
};
export type WindowApi = {
    get menus(): any;
    get uid(): UID;
    get visible(): boolean;
    get windowState(): WindowState;
    get zIndex(): number;
    set zIndex(v: number);
    close: () => void;
    exitSplitMode: (event: MouseEvent) => void;
    saveWindowState: () => void;
};
type InferPropType<T> = [
    T
] extends [null] ? any : [T] extends [{
    type: null | true;
}] ? any : [T] extends [ObjectConstructor | {
    type: ObjectConstructor;
}] ? Record<string, any> : [T] extends [BooleanConstructor | {
    type: BooleanConstructor;
}] ? boolean : [T] extends [StringConstructor | {
    type: StringConstructor;
}] ? string : [T] extends [DateConstructor | {
    type: DateConstructor;
}] ? Date : unknown;
type ExtractDefaultPropTypes<O> = O extends object ? {
    [K in keyof O]: InferPropType<O[K]>;
} : {};
type WindowCommonPropsType = ExtractDefaultPropTypes<Omit<Partial<typeof WindowCommonProps>, 'visible'>>;
export type WindowBody = string | number | boolean | VNode | VNodeArrayChildren | (() => any);
export type UseWindowParams = WindowCommonPropsType & {
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
export type AbstractWindowParams = Omit<UseWindowParams, "unmountAfterClose" | "displayAfterCreate"> & {
    visible: Ref<boolean>;
    [ON_UPDATE_VISIBLE]: Function;
    [ON_BEFORE_UNMOUNT]: Function;
};
export {};
