import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { desenv } from 'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class ContentLearningService {

    public tedtalksList: any = [];

    constructor(private httpService: HttpClient) {

    }

    getTedTalksFirstLogin() {
        const apiUrl = "https://www.googleapis.com/youtube/v3";
        const videoIds = ["su42HCVDPNk", "5MgBikgcWnY", "nO-2U-oc_PI", "cN777vhuvDY"];
        const videoIdsString = videoIds.join(',');
        const url = `${apiUrl}/videos?key=${desenv.youTubeApiKey}&type=video&part=player&id=${videoIdsString}`;
        return this.httpService.get(url).pipe(map((i)=> {
          console.log("object values: ", Object.values(i)[2].map((i: any)=> i.player))

          return  Object.values(i)[2].map((i: any)=> i.player);
        }))
    }
}