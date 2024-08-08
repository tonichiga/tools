interface IUseLoadedProps {
    defaultLoadingState?: boolean;
    enableTimeout?: boolean;
}
declare const useLoaded: (props: IUseLoadedProps) => {
    emitFetching: (callback: any) => void;
    emitLoaded: (callback: any) => void;
    isLoading: boolean;
};
export default useLoaded;
