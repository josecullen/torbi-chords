export class ChordConverter {
    static chordSong:ChordSong

    static convert(rawSong:string):ChordSong{
        this.chordSong = new ChordSong()
        rawSong
            .split('\n')
            .forEach( line => {
                if (line.includes('song')) {
                    this.chordSong.title = this.extractTitle(line)
                }
                else if (line.includes("section")){
                    let section:SongSection = new SongSection(this.extractTitle(line)) 
                    this.chordSong.sections.push(section)
                }
                else if (line.includes("|")) {
                    let songLine:SongLine = new SongLine(line);
                    
                    this.chordSong
                        .sections[this.chordSong.sections.length -1]
                        .lines
                        .push(songLine)   
                }        
            })

        return this.chordSong 
    }

    static extractTitle( str:string ):string{
        var ret = "";

        if ( /"/.test( str ) ){
            let match:any = str.match( /"(.*?)"/ )
            
            ret = match !== null ? match[1] : ""
            console.log('str',str,'ret', ret)
        } else {
           ret = str;
        }
        return ret;
    }

}

export class ChordSong {
    public title:string = ''
    public sections:Array<SongSection> = []
}

export class SongSection {
    constructor(
        public title:string = '',
        public lines:Array<SongLine> = []
    ){}
}

export class SongLine {
    public instructions:Array<Instruction> = []
    public bars:Array<Bar> = []

    constructor(rawLine:string){
        rawLine
            .split('|')
            .filter(bar => bar.trim() !== "")
            .forEach(rawBar => {
                this.bars.push(new Bar(rawBar))
                this.instructions.push(new Instruction(rawBar))
            })
    }
}

export class Bar {
    public type:string = 'common'
    public chords:Array<string> = []

    constructor(barRaw:string){
        if (barRaw.includes(':')) {
            barRaw.trim().split(' ')[0] === ":"
                ? this.type = "repeat-start"
                : this.type = "repeat-end"
        }
        this.chords = barRaw
            .split(' ')
            .map(chord => chord.replace(":", "").trim())
            .filter(chord => chord !== "" )
            .filter(chord => !chord.includes('('))
    }
}

export class Instruction {
    hasInstruction:boolean = false
    condition:string
    constructor(barRaw:string){
        let instruction:any = false
        if(barRaw.includes('(') && barRaw.includes(')')){
            let instructionsRaw = this.extractInstructions(barRaw)      
            if(instructionsRaw.includes('condition=')){
                this.hasInstruction = true
                let condition = /condition=(\d)/
                this.condition = instructionsRaw.match(condition)[1]+"."
            }
        }
    }

    extractInstructions(str:string):string{
        var regExp = /\(([^)]+)\)/;
        var matches = regExp.exec(str);
        return matches[1]
    }
}
