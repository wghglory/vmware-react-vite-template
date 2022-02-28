import {rest} from 'msw';

import {apiPrefix} from '../const';
import tenants from '../data/tenants';
import {res} from '../res';

const handlers = [
  rest.get(`${apiPrefix}/core/tenants`, (req, _, ctx) => {
    const token = req.headers.get('Authorization');
    const limit = Number(req.url.searchParams.get('limit')) || 1000;
    const offset = Number(req.url.searchParams.get('offset')) || 0;
    const filter = req.url.searchParams.get('filter'); // (status==OPEN)
    const filterObj = {} as any;

    const items = tenants;

    if (!token) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          message: 'Not authorized',
        }),
      );
    }

    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        items: items.slice(offset, limit + offset),
        page_info: {
          limit,
          offset,
          total: items.length,
        },
      }),
    );
  }),
];

export default handlers;
