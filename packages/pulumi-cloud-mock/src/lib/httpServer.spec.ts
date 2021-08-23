import fetch from 'node-fetch';
import { HttpServer } from './httpServer';

describe('HttpServer resource', () => {
  const requestListener = jest.fn();
  const createRequestListener = jest.fn();

  beforeEach(() => {
    requestListener.mockImplementation((req, res) => res.end());
    createRequestListener.mockReturnValue(requestListener);
  });

  afterEach(() => {
    requestListener.mockReset();
    createRequestListener.mockReset();
  });

  it('creates an HTTP server using the right request listener', (done) => {
    const resource = new HttpServer('test', createRequestListener);

    resource.url.apply(async (url) => {
      expect(url).toMatch(/http:\/\/localhost:\d+/);
      expect(createRequestListener).toHaveBeenCalledTimes(1);
      expect(requestListener).not.toHaveBeenCalled();

      await fetch(url);
      expect(requestListener).toHaveBeenCalledTimes(1);

      await resource.server.close();
      done();
    });
  });
});
