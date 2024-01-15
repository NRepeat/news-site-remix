import {v4 as uuid} from 'uuid';

export function createRandomId(): string {
  const newUuid = uuid();
  return newUuid;
}
