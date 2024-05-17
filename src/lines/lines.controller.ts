import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { LinesService } from './lines.service';
import { CreateLineDto } from './dto/create-line.dto';
import { UpdateLineDto } from './dto/update-line.dto';
import { AuthGuard } from 'src/auth/jwt.guard';
import { UpdateStatusLineDto } from './dto/update-status.dto';

@Controller('lines')
export class LinesController {
  constructor(private readonly linesService: LinesService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createLineDto: CreateLineDto) {
    return this.linesService.create(createLineDto);
  }
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.linesService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linesService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Put('status/:id')
  updatestatus(
    @Param('id') id: string,
    @Body() updateLoginDto: UpdateStatusLineDto,
  ) {
    return this.linesService.updateStatus(+id, updateLoginDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateLineDto: UpdateLineDto) {
    return this.linesService.update(+id, updateLineDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linesService.remove(+id);
  }
}
