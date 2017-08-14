import { Record } from 'immutable';

export function TypedRecord<TRecordParams, TRecord>(defaultValues: TRecordParams, name?: string) {
  return class extends Record(defaultValues, name) {
    constructor(params?: Partial<TRecordParams>) {
      params ? super(params) : super();
    }

    typedMerge(objToMerge: Partial<TRecordParams>): TRecord {
      return this.merge(objToMerge) as any as TRecord;
    };
  };
}
