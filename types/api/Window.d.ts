import { UseBaseWindowParams, UseBlankWindowParams, UseSimpleWindowParams, WindowInstance, WindowBody } from '../model';
export declare function useWindow(title: string, body: WindowBody): WindowInstance | null;
export declare function useWindow(title: string, body: WindowBody, params: Omit<UseBaseWindowParams, 'body' | 'title'>): WindowInstance | null;
export declare function useWindow(params: UseBaseWindowParams): WindowInstance | null;
export declare function useBlankWindow(title: string, body: WindowBody): WindowInstance | null;
export declare function useBlankWindow(title: string, body: WindowBody, params: Omit<UseBlankWindowParams, 'body' | 'title'>): WindowInstance | null;
export declare function useBlankWindow(params: UseBlankWindowParams): WindowInstance | null;
export declare function useSimpleWindow(title: string, body: WindowBody): WindowInstance | null;
export declare function useSimpleWindow(title: string, body: WindowBody, params: Omit<UseSimpleWindowParams, 'body' | 'title'>): WindowInstance | null;
export declare function useSimpleWindow(params: UseSimpleWindowParams): WindowInstance | null;
