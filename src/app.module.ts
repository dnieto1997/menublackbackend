import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { LoginModule } from './login/login.module';
import { GroupModule } from './group/group.module';
import { ProductsModule } from './products/products.module';
import { LinesModule } from './lines/lines.module';
import { VariantesModule } from './variantes/variantes.module';
import { ProductosVariantesModule } from './productos_variantes/productos_variantes.module';
import { SlidersModule } from './sliders/sliders.module';
import { MenuModule } from './menu/menu.module';
import { BannerModule } from './banner/banner.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'srv465.hstgr.io',
      port: 3306,
      username: 'u293118005_menu',
      password: 'Nieto1997',
      database: 'u293118005_menuempty',
      /*    type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'nieto1997',
      database: 'menublank', */
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
    SlidersModule,
    MenuModule,
    BannerModule,
    ClientModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
