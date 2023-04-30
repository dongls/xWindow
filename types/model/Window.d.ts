import { Ref } from 'vue';
import { AbstractWindowParams } from './Common';
export declare class UID {
    readonly value: number;
    get wid(): string;
    /** 统一使用`UID.create`方法创建 */
    constructor();
    static create(raw: UID | void): UID;
}
export declare class AbstractWindow {
    readonly uid: UID;
    type: string;
    visible: Ref<Boolean>;
    others: object;
    body: any;
    /** 清理组件相关内容 */
    cleanup: () => void;
    constructor(params: AbstractWindowParams);
    static create(params: AbstractWindow | AbstractWindowParams): AbstractWindow;
    get id(): string;
    buildProps(): any;
}
