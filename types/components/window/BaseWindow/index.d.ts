import { VNode } from 'vue';
import { UID } from '../../../model';
export declare const BaseWindow: import("vue").DefineComponent<{
    uid: {
        type: typeof UID;
        required: true;
    };
    body: {
        default: any;
    };
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
    height: {
        type: StringConstructor;
        default: any;
    };
    left: {
        type: StringConstructor;
        default: any;
    };
    top: {
        type: StringConstructor;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
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
    resizable: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeable: {
        type: BooleanConstructor;
        default: boolean;
    };
    mask: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("beforeUnmount" | "update:visible" | "unmount")[], "beforeUnmount" | "update:visible" | "unmount", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    uid: {
        type: typeof UID;
        required: true;
    };
    body: {
        default: any;
    };
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
    height: {
        type: StringConstructor;
        default: any;
    };
    left: {
        type: StringConstructor;
        default: any;
    };
    top: {
        type: StringConstructor;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
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
    resizable: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeable: {
        type: BooleanConstructor;
        default: boolean;
    };
    mask: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onUpdate:visible"?: (...args: any[]) => any;
    onBeforeUnmount?: (...args: any[]) => any;
    onUnmount?: (...args: any[]) => any;
}, {
    visible: boolean;
    width: string;
    height: string;
    left: string;
    top: string;
    zIndex: number;
    fullscreen: boolean;
    appendToBody: boolean;
    draggable: boolean;
    resizable: boolean;
    closeable: boolean;
    mask: boolean;
    body: any;
}>;
