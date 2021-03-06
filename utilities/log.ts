import { green, red } from 'https://deno.land/std@0.53.0/fmt/colors.ts';

import Configuration, { ENVS } from '../configuration/index.ts';

const config = Configuration.config();

/**
 * Log the text and data
 * @param {string} text - text to show
 * @param {*} data - additional value to show
 * @param {boolean} isError - display the message in a different color
 * @returns {void}
 */
export default (
  text = '',
  data: any = null,
  isError= false,
): void => {
  const color = isError ? red : green;
  if (config.ENV === ENVS.development) {
    return console.log(color(`${text} ${data || ''}`));
  }
}
