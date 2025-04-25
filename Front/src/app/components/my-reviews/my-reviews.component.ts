import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.css']
})
export class MyReviewsComponent implements OnInit {
  reviews: any[] = [];
  selectedReview: any = null;
  isDeleteModalOpen = false;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    // TODO: Replace with real user filtering if needed
    this.reviewService.getReviewsByRecipeId(1).subscribe(data => this.reviews = data); // Example for recipeId=1
  }

  openDeleteModal(review: any) {
    this.selectedReview = review;
    this.isDeleteModalOpen = true;
  }

  closeModal() {
    this.isDeleteModalOpen = false;
    this.selectedReview = null;
  }

  deleteReview() {
    if (this.selectedReview) {
      this.reviewService.deleteReview(this.selectedReview.id).subscribe(() => {
        this.reviews = this.reviews.filter(r => r.id !== this.selectedReview.id);
        this.closeModal();
      });
    }
  }
}
