import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';  // 导入 NzGridModule
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormLayoutType, NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NzCardModule, FormsModule, CommonModule, NzGridModule, NzIconModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzRadioModule, NzButtonModule, NzSelectModule, NzTimePickerModule, NzInputNumberModule, NzDatePickerModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {

  isShowProduct: boolean = false;
  historyList: any[] = [];
  constructor(
    private productSrc: ProductService,
    private message: NzMessageService

  ) { }

  private fb = inject(NonNullableFormBuilder);
  validateForm = this.fb.group({
    id: this.fb.control(0, [Validators.required]),
    name: this.fb.control('', [Validators.required]),
    rank: this.fb.control('', [Validators.required]),
    label: this.fb.control('', [Validators.required]),
    avatar_url: this.fb.control('', [Validators.required]),
    intro: this.fb.control('', [Validators.required]),
  });

  ngOnInit() {
    this.GetProduct();
  }

  GetProduct() {
    return this.productSrc.GetProduct().subscribe((res: any) => {
      console.log(res.data.hospitals);
      this.historyList = res.data.hospitals;
    })
  }

  newProduct() {
    this.isShowProduct = true;
  }

  closeProduct() {
    this.isShowProduct = false;
    this.ResetProduct();
  }

  ResetProduct() {
    this.validateForm.reset();
  }

  submitForm() {
    const resultData = {
      name: this.validateForm.value.name,
      rank: this.validateForm.value.rank,
      label: this.validateForm.value.label,
      intro: this.validateForm.value.intro,
      avatar_url: this.validateForm.value.avatar_url,
    }
    if (this.validateForm.valid) {

      console.log('submit', this.validateForm.value);

    } else {
      console.log("2222", this.validateForm.valid)
      alert('已清除或数据没有完整')
    }
    const id = this.validateForm.get('id')!.value;
    // 更新
    if ( id !== 0) {
      this.productSrc.updateHosData(id, resultData).subscribe({
        next: (res: any) => {
          if (res.code == 200) {
            this.message.success(res.msg);
            this.GetProduct();
            this.closeProduct()
          }
        },
        error: (err) => {
          this.message.error(err.error.message);
        }
      })
    } else {
      // 新增
      this.productSrc.inserHosData(resultData).subscribe({
        next: (res: any) => {
          if (res.code == 200) {
            this.message.success(res.msg);
            this.GetProduct();
            this.closeProduct()
          }
        },
        error: (err) => {
          this.message.error(err.error?.message);
        }
      })
    }


  }

  EditProduct(itm: any) {
    this.validateForm.setValue({
      id: itm.id,
      name: itm.name,
      rank: itm.rank,
      label: itm.label,
      avatar_url: itm.avatar_url,
      intro: itm.intro,
    });
    this.newProduct()

    console.log("12313", itm);


  }


  Delete(id: number) {
    this.productSrc.deleteHosData(id).subscribe({
      next: (res: any) => {
        if(res.code == 200) {
          this.message.success(res.msg);
          this.GetProduct();
        }
      },
      error: (err) => {
        this.message.error(err.error.message);
      }
    })
  }
}
