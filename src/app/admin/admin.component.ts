import { Component, OnInit } from "@angular/core";
// import { Observable } from 'rxjs';
import { BlogpostService } from "../blogpost.service";
import { Blogpost } from "../models/blogpost";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  // blogposts$: Observable<Blogpost[]>;
  allBlogposts: Blogpost[];

  constructor(private blogpostService: BlogpostService) {}

  ngOnInit() {
    // this.blogposts$ = this.blogpostService.getBlogposts();
    this.blogpostService.getBlogposts().subscribe((data) => {
      this.refresh(data);
    });
  }

  deleteBlogposts(selectedOptions) {
    const ids = selectedOptions.map((so) => so.value);

    if (ids.length === 1) {
      this.blogpostService.deleteSingleBlogpost(ids[0]).subscribe(
        (data) => {
          this.refresh(data);
        },
        (err) => console.log(err)
      );
    } else {
      return this.blogpostService.deleteBlogposts(ids).subscribe(
        (data) => {
          this.refresh(data);
        },
        (err) => console.log(err)
      );
    }
  }

  refresh(data) {
    this.blogpostService.getBlogposts().subscribe((data) => {
      this.allBlogposts = data;
    });
  }
}
