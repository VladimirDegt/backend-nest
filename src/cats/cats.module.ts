import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";
import { Cat, CatSchema } from "./schemas/cat.schema";

@Module({
    controllers: [CatsController],
    providers: [CatsService],
    imports: [
        MongooseModule.forFeature([
            {name: Cat.name, schema: CatSchema}
        ])
    ]
})
export class CatsModule { 

}