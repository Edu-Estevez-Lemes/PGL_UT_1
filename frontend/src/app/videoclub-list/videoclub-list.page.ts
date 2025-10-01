import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-videoclub-list',
  templateUrl: './videoclub-list.page.html',
  styleUrls: ['./videoclub-list.page.scss'],
  standalone: false,
})
export class VideoclubListPage implements OnInit {

  peliculas: any = [
    {
      Title: "Lalaland",
      year: 2019
    }, {
      Title: "Terminator 2",
      year: 1992
    },{
      Title: "Salvar akl soldado Ryan",
      year: 1998
    }

  ]

  constructor() { }

  ngOnInit() {
  }

}
