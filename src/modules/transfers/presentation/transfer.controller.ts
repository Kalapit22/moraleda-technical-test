import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CreateTransferDto } from '../application/dto/create-transfer.dto';
import { UpdateTransferDto } from '../application/dto/update-transfer.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { TransferService } from '../application/services/transfers.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@ApiTags('transfers')
@Controller('transfers')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @ApiOperation({ summary: 'Get all transfers' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  public async findAll() {
    // Replace 'user-id' with an actual user ID from your auth context/decorator in real usage
    return this.transferService.findAll('user-id');
  }

  @ApiOperation({ summary: 'Get transfer by ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', required: true })
  @Get(':id')
  public async findById(@Param('id') id: string) {
    return this.transferService.findById(id);
  }

  @ApiOperation({ summary: 'Create a new transfer' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  public async create(@Body() createTransferDto: CreateTransferDto) {
    return this.transferService.create(createTransferDto);
  }

  @ApiOperation({ summary: 'Update a transfer' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', required: true })
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateTransferDto: UpdateTransferDto,
  ) {
    return this.transferService.update(id, updateTransferDto);
  }

  @ApiOperation({ summary: 'Delete a transfer' })
  @ApiParam({ name: 'id', required: true })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return this.transferService.deleteById(id);
  }
}
