export class LyricChordConverter {

    convert(raw:string):LyricChord{
        raw
            .split('\n')
            .forEach( line => {
                
                
            })

        return
    }



}

export class LyricChord {
    lines:Array<Line> = []
}

export class Line {
    constructor(public lyric:string, public chord:string ){

    }
}

export class LyricChunk {

}

export class Chord {
    constructor(public target:LyricChunk, public chord:string){

    }
}