export interface LoadState<T> {
  data?: T;
  error?: Error;
  isLoading: boolean;
}
