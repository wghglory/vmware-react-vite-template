// src/mocks/res.js
import {context, response} from 'msw';

export function res(...transformers: any[]) {
  // A custom response composition chain that embeds
  // a random realistic server response delay to each `res()` call.
  return response(...transformers, context.delay(1000));
}
