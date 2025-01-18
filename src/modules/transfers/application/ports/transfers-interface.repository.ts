import { Transfer } from '../../domain/entities/transfer.entity';
import { DeleteResult } from 'typeorm';
import { CreateTransferDto } from '../dto/create-transfer.dto';
import { UpdateTransferDto } from '../dto/update-transfer.dto';

export interface ITransferRepository {
  findById(id: string): Promise<Transfer | null>;
  findAll(userId: string): Promise<Transfer[]>;
  create(transfer: CreateTransferDto): Promise<Transfer>;
  update(id: string, transfer: UpdateTransferDto): Promise<Transfer>;
  deleteById(id: string): Promise<DeleteResult>;
}
