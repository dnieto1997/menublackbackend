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
import { VariantesService } from './variantes.service';
import { CreateVarianteDto } from './dto/create-variante.dto';
import { UpdateVarianteDto } from './dto/update-variante.dto';
import { UpdateStatusVariantDto } from './dto/update-status.dto';
import { AuthGuard } from 'src/auth/jwt.guard';

@Controller('variantes')
export class VariantesController {
  constructor(private readonly variantesService: VariantesService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createVarianteDto: CreateVarianteDto) {
    return this.variantesService.create(createVarianteDto);
  }

  @Get()
  findAll() {
    return this.variantesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variantesService.findOne(+id);
  }
  @UseGuards(AuthGuard)
  @Put('status/:id')
  updatestatus(
    @Param('id') id: string,
    @Body() updateLoginDto: UpdateStatusVariantDto,
  ) {
    return this.variantesService.updateUser(+id, updateLoginDto);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateVarianteDto: UpdateVarianteDto,
  ) {
    return this.variantesService.update(+id, updateVarianteDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variantesService.remove(+id);
  }
}
