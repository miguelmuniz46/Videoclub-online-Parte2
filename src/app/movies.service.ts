import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser'
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class MovieService {
    private url = "http://localhost:8080/buscarPelicula/";

    constructor(private http: Http, public sanitizer: DomSanitizer) { }

    getPeliculas(name: string) {
        this.URL(name);
        return this.http.get(this.url).map(response => response.json().map(movie => movie.name))
    }

    getDirector(){
        return this.http.get(this.url).map(response => response.json().map(director => director.director))
    }

    getActors(){
        return this.http.get(this.url).map(response => response.json().map(actor => actor.actors))
    }

    getYear(){
        return this.http.get(this.url).map(response => response.json().map(year => year.year))
    }

    getCover(){
        return this.http.get(this.url).map(response => response.json().map(urlc => urlc.urlc))
    }

    getTrailer(){
        let out = this.http.get(this.url).map(response => response.json().map(urly => this.sanitizer.bypassSecurityTrustResourceUrl(urly.urly)));
        this.oldURL();
        return out
    }

    URL(name: string){
        this.url=this.url+name;
    }

    oldURL(){
        this.url = "http://localhost:8080/buscarPelicula/";
    }
}