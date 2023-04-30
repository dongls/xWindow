export declare const SimpleWindow: import("vue").DefineComponent<{
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
}>;
