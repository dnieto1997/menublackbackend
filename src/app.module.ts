import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { LoginModule } from './login/login.module';
import { GroupModule } from './group/group.module';
import { ProductsModule } from './products/products.module';
import { LinesModule } from './lines/lines.module';
import { VariantesModule } from './variantes/variantes.module';
import { ProductosVariantesModule } from './productos_variantes/productos_variantes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'nieto1997',
      database: 'menublank',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    LoginModule,
    GroupModule,
    ProductsModule,
    LinesModule,
    VariantesModule,
    ProductosVariantesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
