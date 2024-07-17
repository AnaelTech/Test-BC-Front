import { Component, inject } from '@angular/core';
import { Article } from '../../../interface';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ArticleService } from '../../../article/article.service';

@Component({
  selector: 'app-form-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-edit-article.component.html',
  styleUrl: './form-edit-article.component.css',
})
export class FormEditArticleComponent {
  articles: Article[] = [];
  article: Article | undefined;

  articleService: ArticleService = inject(ArticleService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  public formEditArticle: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    picture: new FormControl(''),
  });

  ngOnInit(): void {
    this.getCurrentArticle();
  }

  getCurrentArticle() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.articleService.getArticleById(id).subscribe(
        (article: Article) => {
          this.article = article;
          this.formEditArticle.patchValue({
            name: article.name,
            description: article.description,
            price: article.price,
            picture: article.picture,
          });
          console.log(this.article);
        },
        (error) => {
          console.error('Error fetching prestation', error);
        }
      );
    }
  }

  editArticle() {
    if (this.formEditArticle.valid) {
      const updatedArticle: Article = {
        ...this.article,
        ...this.formEditArticle.value,
        category: this.article?.category?.['@id'],
      };
      this.articleService.updateArticle(updatedArticle).subscribe(
        (article: Article) => {
          this.article = article;
          this.router.navigate(['admin/articles']);
        },
        (error) => {
          console.error('Error updating article', error);
        }
      );
    }
  }
}
