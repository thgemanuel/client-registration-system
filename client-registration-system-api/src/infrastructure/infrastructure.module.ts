import { Global, Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from '@application/application.module';
import { ClientController } from './controllers/client.controller';
import { repositories } from './persistence/postgres/repositories';
import { schemas } from './persistence/postgres/schemas';
import { mappers } from './persistence/postgres/mappers';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: false,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature(schemas),
    ApplicationModule,
  ],
  providers: [Logger, ...repositories, ...mappers],
  exports: [...repositories.map((repo) => repo.provide), Logger],
  controllers: [ClientController],
})
export class InfrastructureModule {}
