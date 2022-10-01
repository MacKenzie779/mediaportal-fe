import { Component, OnInit, Input, EventEmitter, Output, Inject} from '@angular/core';
import { VideoDBService } from '../shared/video-db.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  length = 5;
  name = "Angular";
  url = "https://www.google.com";
  devideby = 2;
  lastkey:any;
  lastkeycode:any
  array = ["Item1", "Item2", "Item3", "Item4", "Item5", "Item6", "Item7", "Item8"]
  videos:string[];
  isGreenActive = false;
  myVideoID = 42;
  @Output() myEmitter = new EventEmitter();

  constructor(datenbank:VideoDBService, @Inject("VideoComponentConfig") config: string) {
    this.videos = datenbank.getVideos();
    console.log(config);
  }

  ngOnInit(): void {
  }

  keyHandler(event: any): void {
    console.log(event);
    this.lastkey = event.key;
    this.lastkeycode = event.code;
  }

  clickHandler(e:any) {
    this.length = this.length + 1;
    console.log(this.videos);
    console.log(this.eigenschaft);
  }

  downhandler() {
    this.devideby = this.devideby - 1;
  }

  uphandler() {
    this.devideby = this.devideby + 1;
  }

  clickClassBinding() {
    this.isGreenActive = !this.isGreenActive;
  }

  @Input() eigenschaft:any;

  eventClickHandler(event: any): void {
    //console.log(event);
    this.myEmitter.emit();
  }

  myEmitHandler() {
    console.log("log");
  }

}
