import { INodeContent } from '../../src/models/NodeContent';
import { IServerNode, parseFetchedNode, parseFetchedNodes } from '../../src/utils/parseFetchedNodes';

describe('parseFetchedNodes', () => {
  const firstId = '4a032b91-a564-4589-b764-453e21c22d51';
  const secondId = '5944beeb-3345-4f18-8918-a747a996bfd5';
  const date = new Date(2017, 10, 12, 8, 23, 47, 22);

  const serverNode: IServerNode = {
    id: firstId,
    text: 'testing text',
    creation: date,
    lastUpdate: date,
  };
  const anotherServerNode: IServerNode = {
    id: secondId,
    text: 'first time feeling',
    creation: date,
    lastUpdate: date,
  };
  const parsedNode: INodeContent = {
    id: firstId,
    text: 'testing text',
  };
  const secondParsedNode: INodeContent = {
    id: secondId,
    text: 'first time feeling',
  };

  it('parses a valid array of nodes from server correctly', () => {
    const expectedOutput = [parsedNode, secondParsedNode];
    const actualOutput = parseFetchedNodes([serverNode, anotherServerNode]);

    expect(expectedOutput).toEqual(actualOutput);
  });

  it('parses a single node from server correctly', () => {
    const expectedOutput = parsedNode;
    const actualOutput = parseFetchedNode(serverNode);

    expect(expectedOutput).toEqual(actualOutput);
  });
});
