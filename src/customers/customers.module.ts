import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  imports: [
      FilesModule
  ]
})
export class CustomersModule {}
