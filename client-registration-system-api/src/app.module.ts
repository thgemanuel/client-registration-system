import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientTypeORM } from './infrastructure/persistence/postgres/schemas/client.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [ClientTypeORM],
      synchronize: false,
      migrations: ['dist/infrastructure/persistence/postgres/migrations/**/*.js'],
      migrationsRun: false,
      logging: process.env.NODE_ENV !== 'production',
    }),
    TypeOrmModule.forFeature([ClientTypeORM]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
