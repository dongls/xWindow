import { UseWindowParams, WindowInstance, WindowBody } from '../model';
export declare function useWindow(title: string, body: WindowBody): WindowInstance | null;
export declare function useWindow(title: string, body: WindowBody, params: Omit<UseWindowParams, 'body' | 'title'>): WindowInstance | null;
export declare function useWindow(params: UseWindowParams): WindowInstance | null;
