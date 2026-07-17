import { CLIENT_REPOSITORY_NAME } from '@domain/repositories/client.repository';
import { ClientRepositoryTypeORM } from './client.repository';

export const repositories = [
  {
    provide: CLIENT_REPOSITORY_NAME,
    useClass: ClientRepositoryTypeORM,
  },
];
