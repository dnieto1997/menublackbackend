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
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/jwt.guard';
import { UpdateStatusGroupDto } from 'src/group/dto/update-status.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('search')
  search() {
    return this.productsService.search();
  }
  @UseGuards(AuthGuard)
  @Get('searchvariant')
  searchvariant(@Query('id') id: number) {
    return this.productsService.searchVariant(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @UseGuards(AuthGuard)
  @Put('status/:id')
  updatestatus(
    @Param('id') id: string,
    @Body() updateLoginDto: UpdateStatusGroupDto,
  ) {
    return this.productsService.updateUser(+id, updateLoginDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
