import axios from 'axios';
import * as utils from '../libs/utils';

export const post = async (options, data?) => {
  if (typeof options == 'string') {
    options = {
      url: options,
    };
  }
  if (utils.isObject(data)) {
    options.data = data;
  }
  return await axios.request({
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    ...options,
    data: utils.param(options.data),
    method: 'post',
  });
};

export const get = async (options, data?) => {
  if (typeof options == 'string') {
    options = {
      url: options,
    };
  }
  if (utils.isObject(data)) {
    options.data = data;
  }
  return await axios.get(options.url, { ...options, params: options.data });
};
