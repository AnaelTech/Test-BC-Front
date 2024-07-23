import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
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
  totalPrice: number = 0;
  article = {
    id: 0,
    name: '',
    description: '',
    picture: '',
    category: '',
    price: 0,
    prestations: this.prestations,
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
      this.calculateTotalPrice();
    });
  }

  addPrestation(prestation: Prestation) {
    const currentPrestations = this.selectedPrestationsSource.getValue();
    this.article.prestations = [...currentPrestations, prestation];
    if (!currentPrestations.some((p) => p.id === prestation.id)) {
      this.selectedPrestationsSource.next([...currentPrestations, prestation]);
    }
    this.calculateTotalPrice();
  }

  removePrestation(prestation: Prestation) {
    const currentPrestations = this.selectedPrestationsSource.getValue();
    this.selectedPrestationsSource.next(
      currentPrestations.filter((p) => p.id !== prestation.id)
    );
    this.calculateTotalPrice();
  }

  onPrestationSelect(event: any, prestation: Prestation): void {
    if (event.target.checked) {
      this.addPrestation(prestation);
    } else {
      this.removePrestation(prestation);
    }
  }

  calculateTotalPrice() {
    const selectedPrestations = this.selectedPrestationsSource.getValue();
    const prestationsTotal = selectedPrestations.reduce(
      (sum, p) => sum + p.price,
      0
    );
    this.totalPrice = this.article.price + prestationsTotal;
  }

  addToCart(id: number) {
    this.article.price = this.totalPrice;
    this.cartService.addToCart(this.article);
    this.router.navigate(['/cart']);
  }
}
