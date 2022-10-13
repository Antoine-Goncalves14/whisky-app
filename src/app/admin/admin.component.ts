import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogpostService } from '../blogpost.service';
import { Blogpost } from '../models/blogpost';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  blogposts$: Observable<Blogpost[]>;

  constructor(private blogpostService: BlogpostService) { }

  ngOnInit() {
    this.blogposts$ = this.blogpostService.getBlogposts();
  }

}
