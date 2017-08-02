import { Record } from 'immutable';

export const TypedRecord = <ClassType, ContentType>(defaultStuff: ContentType) => {
  return class extends Record(defaultStuff) {
    constructor(defaultValues?: Partial<ContentType>) {
      defaultValues ? super(defaultValues) : super();
    }

    with(values: Partial<ContentType>): ClassType {
      return this.merge(values) as any as ClassType;
    }
  };
};
