import {SimpleChanges, Directive, ElementRef, Input, HostListener } from '@angular/core';
import { LyricChordPreview } from '../components/lyric-chord.preview.component'
@Directive({ selector: '[fit-text]' })
export class FitTextDirective {
    entireSong:HTMLElement
    @Input('fit-text') fitText:any
    constructor(private el: ElementRef) {
        
    }

    fitGrow () {
        if( this.entireSong.clientWidth < this.el.nativeElement.clientWidth && 
            this.entireSong.clientHeight < this.el.nativeElement.clientHeight){
            console.log('fit')
            setTimeout(() =>{
                this.entireSong.style.fontSize = (+this.entireSong.style.fontSize.split('px')[0] + 1) + 'px'
                this.fitGrow()
            }, 3)
            
        } else {
            this.entireSong.style.fontSize = (+this.entireSong.style.fontSize.split('px')[0] - 1) + 'px'
            console.log(this.entireSong.style.fontSize)
        }
        
    }

    fitShrink () {
        if( this.entireSong.clientWidth > this.el.nativeElement.clientWidth || 
            this.entireSong.clientHeight > this.el.nativeElement.clientHeight){
            console.log('shrink')
            setTimeout(() =>{
                this.entireSong.style.fontSize = (+this.entireSong.style.fontSize.split('px')[0] - 1) + 'px'
                this.fitShrink()
            }, 5)
        }
    }

    fit () {
        setTimeout(() => {
            if( this.entireSong.clientWidth < this.el.nativeElement.clientWidth && 
                this.entireSong.clientHeight < this.el.nativeElement.clientHeight){
                this.fitGrow()
            } else {
                this.fitShrink()
            }
        }, 100)
        
    }    

    ngOnInit() {
        let lyricChordPreview = this.el.nativeElement.firstElementChild
        this.entireSong = lyricChordPreview.firstElementChild
        this.entireSong.style.fontSize = '8px'
        this.fit()           
    }

    ngOnChanges(changes:SimpleChanges){
        console.log('changes')
        if(this.entireSong && this.el.nativeElement){
            this.fit()
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event:any) {
        console.log('fitText',this.fitText)
        this.fit()
    }

}
    
