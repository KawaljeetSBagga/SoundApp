import { isEmpty, isNull, isUndefined } from 'lodash';

export function isDataValid(data: any) {
  return !isNull(data) && !isUndefined(data) && !isEmpty(data);
}
