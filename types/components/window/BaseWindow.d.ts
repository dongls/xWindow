import { VNode } from 'vue';
import { UID } from '../../model';
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
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:visible" | "beforeUnmount")[], "update:visible" | "beforeUnmount", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
}, {
    visible: boolean;
    width: string;
    appendToBody: boolean;
    draggable: boolean;
    resizable: boolean;
    closeable: boolean;
    mask: boolean;
    body: any;
}>;
