import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FoodCategoriesComponent } from './components/food-categories/food-categories.component';
import { TopMealsComponent } from './components/top-meals/top-meals.component';
import { FavoriteRestaurantsComponent } from './components/favorite-restaurants/favorite-restaurants.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { EventsComponent } from './components/events/events.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { MenuComponent } from './components/menu/menu.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminRestaurantsComponent } from './components/admin/admin-restaurants/admin-restaurants.component';
import { AdminMenuComponent } from './components/admin/admin-menu/admin-menu.component';
import { AdminEventsComponent } from './components/admin/admin-events/admin-events.component';
import { MyRecipesComponent } from './components/my-recipes/my-recipes.component';
import { EventService } from './services/event.service';
import { RestaurantService } from './services/restaurant.service';
import { MenuService } from './services/menu.service';
import { CartService } from './services/cart.service';
import { MyReviewsComponent } from './components/my-reviews/my-reviews.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    FoodCategoriesComponent,
    TopMealsComponent,
    FavoriteRestaurantsComponent,
    DashboardComponent,
    RecipesComponent,
    EventsComponent,
    RestaurantsComponent,
    MenuComponent,
    AdminDashboardComponent,
    AdminRestaurantsComponent,
    AdminMenuComponent,
    AdminEventsComponent,
    MyRecipesComponent,
    MyReviewsComponent,
    RecipeDetailsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [EventService, RestaurantService, MenuService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
