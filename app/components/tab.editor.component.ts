import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Song, SongBook } from '../models/models'
import { SongService } from '../services/song.service'
import { BookService } from '../services/book.service'
@Component({
  selector: 'tab-editor',
  template: `
    <md-input-container style="width:100%">
        <textarea 
            md-input 
            md-autosize
            style="width:100%" 
            (keyup)="onTextChange()"
            [(ngModel)]="raw"></textarea>
    </md-input-container>
  `
})
export class TabEditor{ 
  raw:string
  tabPreview:Array<any> = []
  @Output() tabChange:EventEmitter<any> = new EventEmitter()

  onTextChange(){
      this.convertTab()
  }

  convertTab(){
      this.tabPreview = []

      this.raw
        .split('\n')
        .forEach(lineRaw => {
            if(lineRaw.includes('tab(')){
                let tabArr = lineRaw.match(/tab\((.*?)\)/)
                let tabName = ""
                if(tabArr.length > 1){
                    tabName = tabArr[1]
                }
                this.tabPreview.push({
                    name: tabName,
                    vextab: ''
                })
            }
            else if (this.tabPreview.length > 0) {
                this.tabPreview[this.tabPreview.length -1].vextab += lineRaw + '\n'
            }
        })

      this.tabChange.emit(this.tabPreview)
  }



}
