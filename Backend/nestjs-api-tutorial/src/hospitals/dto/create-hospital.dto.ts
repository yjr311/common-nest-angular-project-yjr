import { IsNotEmpty, IsString } from "class-validator";

export class CreateHospitalDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    rank: string;

    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsNotEmpty()
    intro: string;

    @IsString()
    @IsNotEmpty()
    avatar_url: string;
}
