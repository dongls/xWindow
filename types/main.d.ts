import { App } from 'vue';
import { SimpleWindow } from './components/window';
import { WindowManager } from './components/manger';
declare function install(app: App, options?: any): void;
declare const version: string;
declare const xWindow: {
    install: typeof install;
    version: string;
};
export * from './api/Exports';
export * from './model/Exports';
export { SimpleWindow, WindowManager, install, version, xWindow as default, xWindow, };
