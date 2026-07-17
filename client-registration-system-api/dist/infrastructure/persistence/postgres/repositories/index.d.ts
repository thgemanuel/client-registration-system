import { ClientRepositoryTypeORM } from './client.repository';
export declare const repositories: {
    provide: string;
    useClass: typeof ClientRepositoryTypeORM;
}[];
