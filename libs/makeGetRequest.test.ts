import {makeGetRequest} from './makeGetRequest'

describe('makeGetRequest', () => {
test('promise-based test', () => {
  return makeGetRequest({ "sort-key": { "S": "reddit.com"} })
      .catch(error => { expect(error).toBe('Type');
  });
});
  test('async/await-based test', async () => {
  expect.assertions(1);
    try {
      await makeGetRequest({ "sort-key": { "S": "reddit.com"} })
    } catch (e) {
      expect(e.message).toContain('read'); }
  });
});
