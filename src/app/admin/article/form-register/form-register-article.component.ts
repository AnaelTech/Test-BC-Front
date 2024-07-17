import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../../article/article.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-register-article.component.html',
  styleUrl: './form-register-article.component.css',
})
export class FormRegisterArticleComponent {
  router: Router = inject(Router);
  private articleService: ArticleService = inject(ArticleService);

  public formRegisterArticle: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    picture: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}

  RegisterArticle() {
    if (this.formRegisterArticle.valid) {
      this.articleService.addArticle(this.formRegisterArticle.value).subscribe({
        complete: () => {
          this.router.navigate(['/admin/articles']);
        },
        error: (err: any) => {
          console.log(
            "L'utilisateur existe déjà ou une autre erreur est survenue :",
            err
          );
          //console.log(this.formRegisterUser.value);
        },
      });
    } else {
      console.log("Le formulaire n'est pas valide.");
    }
    this.formRegisterArticle.reset();
  }
}
