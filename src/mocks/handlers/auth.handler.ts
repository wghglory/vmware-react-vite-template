import {rest} from 'msw';

import {ACCESS_TOKEN} from '@/core/const';
import {User} from '@/core/models/user';

import {apiPrefix} from '../const';
import users from '../data/users.data';
import {res} from '../res';

const handlers = [
  rest.post(`${apiPrefix}/session`, (req, _, ctx) => {
    const {username} = req.body as User;

    const foundUser = users.find(u => u.username === username);
    if (foundUser) {
      delete foundUser.password;

      localStorage.setItem('__MOCK_SERVER_USER__', JSON.stringify(foundUser));

      return res((r: any) => {
        r.headers.set(ACCESS_TOKEN, 'MOCK_ACCESS_TOKEN');
        r.status = 200;
        r.body = JSON.stringify({id: 'sessionId', user: foundUser});
        return r;
      });
    } else {
      return res(
        ctx.status(401),
        ctx.json({
          message: 'No user found',
        }),
      );
    }
  }),

  rest.get(`${apiPrefix}/current-user`, (req, _, ctx) => {
    const token = req.headers.get('Authorization');
    const authUserString = localStorage.getItem('__MOCK_SERVER_USER__');

    if (!token || !authUserString) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          message: 'Not authorized',
        }),
      );
    }

    // If authenticated, return a mocked user details
    return res(ctx.status(200), ctx.json(JSON.parse(authUserString)));
  }),

  rest.delete(`${apiPrefix}/session`, (req, _, ctx) => {
    localStorage.removeItem('__MOCK_SERVER_USER__');

    return res(
      ctx.status(200),
      ctx.json({
        message: 'log out successfully',
      }),
    );
  }),
];

export default handlers;
