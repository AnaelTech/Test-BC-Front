import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ArticleService } from '../article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../cart.service';
import { Prestation, Category } from '../../interface';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css',
})
export class ArticleDetailComponent implements OnInit {
  private articleService: ArticleService = inject(ArticleService);
  private cartService: CartService = inject(CartService);
  public prestations: Prestation[] = [];
  public category: Category[] = [];
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  article = {
    id: 0,
    name: '',
    description: '',
    picture: '',
    category: '',
    price: 0,
    prestation: this.prestations,
  };

  constructor() {}

  ngOnInit(): void {
    this.getArticle();
  }

  private selectedPrestationsSource = new BehaviorSubject<Prestation[]>([]);
  selectedPrestations$ = this.selectedPrestationsSource.asObservable();

  getArticle() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.articleService.getArticle(id).subscribe((article: any) => {
      this.article = article;
      this.prestations = article.category.Prestation;
    });
  }

  addPrestation(prestation: Prestation) {
    const currentPrestations = this.selectedPrestationsSource.getValue();
    this.article.prestation = [...currentPrestations, prestation];
    if (!currentPrestations.some((p) => p.id === prestation.id)) {
      this.selectedPrestationsSource.next([...currentPrestations, prestation]);
    }
  }

  removePrestation(prestation: Prestation) {
    const currentPrestations = this.selectedPrestationsSource.getValue();
    this.selectedPrestationsSource.next(
      currentPrestations.filter((p) => p.id !== prestation.id)
    );
  }

  onPrestationSelect(event: any, prestation: Prestation): void {
    if (event.target.checked) {
      this.addPrestation(prestation);
      console.log(this.article);
    } else {
      this.removePrestation(prestation);
      console.log(this.article);
    }
  }

  addToCart(id: number) {
    this.cartService.addToCart(this.article);
    this.router.navigate(['/cart']);
  }
}
