import { Body, Controller, Get, Param, Post, Query, Req, Res, Headers, Ip, HostParam, HttpCode, UsePipes, ValidationPipe, ParseIntPipe, ParseBoolPipe, DefaultValuePipe, ParseArrayPipe, ParseEnumPipe, ParseDatePipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateCatDto, FindCatResponseDto } from "src/Dto/Create-cat.dto";
import { plainToInstance } from 'class-transformer';
import { CateService } from "src/Service/CatServiece";
import { CatStatus } from "src/enum/CatEnum";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private CatServices: CateService) { }

    @Post('signup')
    singup() {
        return this.authService.singup();
    }

    @Post('signin')
    signin() {
        return this.authService.singin();
    }

    // @Get('findAll')
    // findAll(@Req() request: Request) {
    //     const reqBody = request.body;
    //     console.log('req::', reqBody);

    //     return { 
    //         msg: 'Success',
    //         data: reqBody 
    //     }; // Nest 会自动 res.status(200).json()
    // }


    @Post('findAll')
    findAll(@Body() body: any) {
        return {
            msg: 'Success',
            data: body
        }; // 直接替代@Req() request: Request
    }

    @Get('findOne/:id') // localhost:3333/auth/findOneAll/311
    findOne(@Param('id') id: string): any {
        return {
            msg: 'Success',
            data: id
        }
    }

    @Get('findOneAll/:id') // localhost:3333/auth/findOneAll/311?sort=desc&page=2
    findOneAll(@Param() params, @Query() query): any {
        return { params, query };
    }


    @Post('findAllHeader')
    findAllHeader(@Headers('share_id') share_id: string): any {
        return `share_id: ${share_id}`;
    }

    @Get('findAllIp')
    findAllIp(@Ip() ip: string): string {
        return `Request from IP: ${ip}`;
    }

    // @Get('host')
    // getHost(@HostParam('0') host: string): string {
    //     return `Request from host: ${host}`;
    // }

    @Get('host')
    getHost(@Req() req): string {
        return req.headers.host;
    }

    @Post('create')
    @HttpCode(201)
    create() {
        return 'This action adds a new cat';
    }

    /**
     * 
     * @param createDto   插入数据
     * @returns 
     */

    @Post('ctdCat')
    async createCat(@Body() createDto: CreateCatDto) {
        const cat = plainToInstance(CreateCatDto, createDto) // 校验数据类型
        if (cat) {
            this.CatServices.create(cat);

            return {
                msg: 'Create True'
            }
        }
    }

    @Post('findCat')
    async findCat(): Promise<FindCatResponseDto> {
        const result = this.CatServices.findAll()
        return {
            msg: 'find true',
            data: result
        };

    }


    @Post('cats')
    @UsePipes(new ValidationPipe())  // 使用管道校验数据类型
    async test(@Body() dy: CreateCatDto) {
        return {
            msg: 'success',
            data: dy
        }
    }

    @Get('findOneInt/:id')
    @UsePipes(new ValidationPipe())
    findOneInt(@Param('id', ParseIntPipe) id: number) {
        return `This action returns a cat with ID: ${id}`;
    }

    @Get('findOneBoolean')
    @UsePipes(new ValidationPipe())
    findOneBoolean(@Query('active', ParseBoolPipe) active: boolean) {
        return `The cat active status is: ${active}`;
    }

    @Get('findCatsDefault')
    @UsePipes(new DefaultValuePipe('default'))
    findCatsDefault(@Query('status') status: string) {
        return `The cat status is: ${status}`;
    }


    @Get('findCatIds')
    findCatIds(@Query('ids', new ParseArrayPipe({ items: Number })) ids: number[]) {
        return `Cats with IDs: ${ids.join(', ')}`;
    }


    @Get('findCatEnum')
    findCatEnum(@Query('status', new ParseEnumPipe(CatStatus)) status: CatStatus) {
        return `The cat status is: ${status}`;
    }


    @Get('findCatsDate')
    findCatsDate(@Query('date', new ParseDatePipe()) date: Date) {
        return `The cat's date is: ${date.toISOString()}`;
    }

}