export interface TransactionManager {
  handleTransaction<T>(cb: (transaction: unknown) => T): Promise<T>;
}
