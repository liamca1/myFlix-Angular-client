import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  
  // 1. movie variable is declared as an array. 
  //    this is where the movies returned from the API will be kept.
  movies: any[] = [];
  constructor(public fetchApiData: FetchApiDataService) { }

// 3. After implementing the function getMovies(), it's then called in the ngOnInit() lifecycle hook. ngOnInit() is called when Angular is done creating the component.
ngOnInit(): void {
  this.getMovies();
}

// 2. this getMovies function is both implemented and then used to fetch the movies from the FetchApiDataService with the help of getAllMovies().
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    
    });
  }
}