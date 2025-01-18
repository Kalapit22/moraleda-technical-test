import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/domain/entities/user.entity';
import { TransferService } from './application/services/transfers.service';
import { Transfer } from './domain/entities/transfer.entity';
import { TransferRepository } from './infrastructure/repository/transfer.repository';
import { TransferController } from './presentation/transfer.controller';



@Module({
  imports: [
    // We include Transfer and User because TransferRepository injects both.
    TypeOrmModule.forFeature([Transfer, User]),
  ],
  controllers: [TransferController],
  providers: [
    TransferService,
    {
      provide: 'ITransferRepository',
      useClass: TransferRepository,
    },
  ],
  exports: [],
})
export class TransferModule {}
