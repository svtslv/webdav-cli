import { WebdavCliRights } from './webdav-cli.interfaces';

export const HOMEPAGE = 'homepage';

export const RIGHTS: WebdavCliRights = [
  'all', 'canCreate', 'canDelete', 'canMove', 'canRename',
  'canAppend', 'canWrite', 'canRead', 'canSource',
  'canGetMimeType', 'canGetSize', 'canListLocks',
  'canSetLock', 'canRemoveLock', 'canGetAvailableLocks',
  'canGetLock', 'canAddChild', 'canRemoveChild',
  'canGetChildren', 'canSetProperty', 'canGetProperty',
  'canGetProperties', 'canRemoveProperty', 'canGetCreationDate',
  'canGetLastModifiedDate', 'canGetWebName', 'canGetType',
];