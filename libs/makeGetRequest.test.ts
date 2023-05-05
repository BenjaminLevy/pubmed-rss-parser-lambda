import {makeGetRequest} from './makeGetRequest'

describe('makeGetRequest', () => {
test('promise-based test', () => {
  expect.assertions(1);
  return makeGetRequest("https://example.com/")
      .then(res => expect(res).toMatch(/Example Domain/))
});
  test('async/await-based test', async () => {
  expect.assertions(1);
    try {
      await makeGetRequest("reddit.com")
    } catch (e) {
      expect(e.message).toMatch('Invalid URL'); }
  });
});
