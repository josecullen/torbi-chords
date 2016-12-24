export class SongBook {
    constructor(
        public title:string = '',
        public author:string = '',
        public decription:string = '',
        public songs:Array<Song> = [],
        public _id:string = ''
    ){}
}

export class Song {
    constructor(
        public title:string = '',
        public author: string = '',
        public raw:string = '',
        public _id:string = ''
    ){}

}