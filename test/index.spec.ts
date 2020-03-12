import * as index from '../src/index';

describe('Index', () => {
  test('should return 4 exports', () => {
    expect(Object.keys(index)).toHaveLength(4);
  });
});