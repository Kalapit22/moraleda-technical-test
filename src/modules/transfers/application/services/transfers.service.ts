// transfer.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { Transfer } from '../../domain/entities/transfer.entity';
import { CreateTransferDto } from '../dto/create-transfer.dto';
import { UpdateTransferDto } from '../dto/update-transfer.dto';
import { DeleteResult } from 'typeorm';
import { ITransferRepository } from '../ports/transfers-interface.repository';

@Injectable()
export class TransferService {
  constructor(
    @Inject('ITransferRepository')
    private readonly transferRepository: ITransferRepository,
  ) {}

  public async findById(id: string): Promise<Transfer | null> {
    return this.transferRepository.findById(id);
  }

  public async findAll(userId: string): Promise<Transfer[]> {
    return this.transferRepository.findAll(userId);
  }

  public async create(createTransferDto: CreateTransferDto): Promise<Transfer> {
    // Potentially add domain checks here (e.g. user can create in that project?)
    return this.transferRepository.create(createTransferDto);
  }

  public async update(id: string, updateTransferDto: UpdateTransferDto): Promise<Transfer> {
    return this.transferRepository.update(id, updateTransferDto);
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    return this.transferRepository.deleteById(id);
  }
}
