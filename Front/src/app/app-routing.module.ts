import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { MenuComponent } from './components/menu/menu.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { EventsComponent } from './components/events/events.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminRestaurantsComponent } from './components/admin/admin-restaurants/admin-restaurants.component';
import { AdminMenuComponent } from './components/admin/admin-menu/admin-menu.component';
import { AdminEventsComponent } from './components/admin/admin-events/admin-events.component';
import { MyRecipesComponent } from './components/my-recipes/my-recipes.component';
import { MyReviewsComponent } from './components/my-reviews/my-reviews.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'events', component: EventsComponent },
  { path: 'my-recipes', component: MyRecipesComponent },
  { path: 'my-reviews', component: MyReviewsComponent },
  { path: 'recipe-details/:id', component: RecipeDetailsComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'admin/restaurants', component: AdminRestaurantsComponent },
  { path: 'admin/menu', component: AdminMenuComponent },
  { path: 'admin/events', component: AdminEventsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
