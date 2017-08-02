import { TypedRecord } from '../../src/models/TypedRecord';

interface IDummy {
  id: string;
  content: number;
  boolValue: boolean;
}

const defaultValues = {
  id: '123456789',
  content: 42,
  boolValue: false,
};

class Dummy extends TypedRecord<Dummy, IDummy>(defaultValues) implements IDummy {
  readonly id: string;
  readonly content: number;
  readonly boolValue: boolean;
}

describe('TypedRecord', () => {
  describe('function with', () => {
    it('returns correct object with correct type after multiple chained calls', () => {
      const newObject = new Dummy();
      const anotherObject = newObject.with({content: 55});
      const finalObject = anotherObject.with({id: '987456321', boolValue: true});

      const expectedObject = new Dummy({
        id: '987456321',
        content: 55,
        boolValue: true,
      });

      expect(finalObject).toEqual(expectedObject);
      expect(typeof finalObject).toBe(typeof expectedObject);
    });
  });
});
