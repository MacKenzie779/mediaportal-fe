import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoDBService {
  videos:string[];

  constructor() {
    this.videos = ['AngularJS', 'TS', 'JS', 'JAVA']
  }

  getVideos():string[] {
    return this.videos;
  }
}
