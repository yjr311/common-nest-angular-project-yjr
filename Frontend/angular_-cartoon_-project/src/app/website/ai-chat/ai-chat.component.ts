import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { diffChars } from 'diff'; // 在文件顶部引入


@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, NzCardModule, NzButtonModule, NzMessageModule, NzModalModule],
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.less']
})
export class AiChatComponent implements OnInit {
  ngOnInit(): void {
   const newResul  = this.buildRevisionOps(this.originalText, this.newText);
    console.log('newResul', newResul);
    
  }


  
  originalText = '我想出去玩,我们将在下午出发';
  newText = '我想要在下午6点出去玩,我们将在晚上出发';
  // diffResult: Diff.Change[] = [];

  

  buildRevisionOps(original:any, modified:any) {
  const changes = diffChars(original, modified);
  const ops = [];
  let pos = 0;
  for (const change of changes) {
    if (change.added) {
      ops.push({ op: 'insert', pos, text: change.value });
    } else if (change.removed) {
      ops.push({ op: 'delete', pos, len: change.value.length });
      pos += change.value.length;
    } else {
      pos += change.value.length;
    }
  }
  return ops;
}
 
}
