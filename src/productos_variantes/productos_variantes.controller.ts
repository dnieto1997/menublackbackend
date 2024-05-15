import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductosVariantesService } from './productos_variantes.service';
import { CreateProductosVarianteDto } from './dto/create-productos_variante.dto';
import { UpdateProductosVarianteDto } from './dto/update-productos_variante.dto';
import { UpdateStatusVariantDto } from 'src/variantes/dto/update-status.dto';

@Controller('productos-variantes')
export class ProductosVariantesController {
  constructor(
    private readonly productosVariantesService: ProductosVariantesService,
  ) {}

  @Post()
  create(@Body() createProductosVarianteDto: CreateProductosVarianteDto) {
    return this.productosVariantesService.create(createProductosVarianteDto);
  }

  @Get()
  findAll() {
    return this.productosVariantesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosVariantesService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductosVarianteDto: UpdateProductosVarianteDto,
  ) {
    return this.productosVariantesService.update(
      +id,
      updateProductosVarianteDto,
    );
  }

  @Put('status/:id')
  updatestatus(
    @Param('id') id: string,
    @Body() updateLoginDto: UpdateStatusVariantDto,
  ) {
    return this.productosVariantesService.updateUser(+id, updateLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosVariantesService.remove(+id);
  }
}
