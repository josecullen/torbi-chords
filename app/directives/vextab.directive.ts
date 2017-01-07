import { Directive, ElementRef, Input } from '@angular/core';

declare var VexTab: any
declare var Vex: any
declare var Artist: any

@Directive({ selector: '[vextab]' })


export class VexTabDirective {
    
    @Input('vextab') vexExpression:string;
    vextab:any
    renderer:any
    artist:any
    Renderer:any
    constructor(private el: ElementRef) {
        let vextab = VexTab
        this.Renderer = Vex.Flow.Renderer;

        // Create VexFlow Renderer from canvas element with id #boo.
        this.renderer = new this.Renderer(el.nativeElement, this.Renderer.Backends.CANVAS);

        // Initialize VexTab artist and parser.
        this.artist = new Artist(10, 10, 600, {scale: 0.8});
        this.vextab = new VexTab(this.artist);
    }

    ngOnChanges(){
        this.el.nativeElement.style.width = "100%"

        // this.el.nativeElement.innerHTML = this.vexExpression;
        this.renderer = new this.Renderer(this.el.nativeElement, this.Renderer.Backends.CANVAS);

        // Initialize VexTab artist and parser.
        this.artist = new Artist(10, 10, 600, {scale: 0.8});
        this.vextab = new VexTab(this.artist);
        try {
            
            // Parse VexTab music notation passed in as a string.
            this.vextab.parse(this.vexExpression)

            // Render notation onto canvas.
            this.artist.render(this.renderer);
        } catch (e) {
            console.log(e);
        }
        
    }
}
    
