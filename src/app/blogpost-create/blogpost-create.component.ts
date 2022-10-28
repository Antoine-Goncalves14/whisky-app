import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BlogpostService } from "../blogpost.service";

@Component({
  selector: "app-blogpost-create",
  templateUrl: "./blogpost-create.component.html",
  styleUrls: ["./blogpost-create.component.css"],
})
export class BlogpostCreateComponent implements OnInit {
  creationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private blogpostService: BlogpostService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.creationForm = this.fb.group({
      title: "",
      subTitle: "",
      content: "",
    });
  }

  createBlogPost() {
    if (this.creationForm.valid) {
      this.blogpostService.createBlogpost(this.creationForm.value).subscribe(data => this.handleSuccess(data), error => this.handleError(error));
    }
  }

  handleSuccess(data) {
    console.log('OK blogpost created', data);
  }

  handleError(error) {
    console.error('KO blogpost NOT created !');

  }
}
