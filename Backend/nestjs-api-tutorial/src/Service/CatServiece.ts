import { Injectable } from "@nestjs/common";
import { CreateCatDto } from "src/Dto/Create-cat.dto";

@Injectable()
export class CateService {
    private readonly cats: CreateCatDto[] = []


    create(cat:CreateCatDto) {
        this.cats.push(cat);
    }

    findAll(): CreateCatDto[] {
        return this.cats
    }
}