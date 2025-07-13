import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavComponent } from './shared/nav/nav.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecetaCardComponent } from './shared/receta-card/receta-card.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin.component';

@NgModule({
  declarations: [AdminComponent, ProfileComponent, FavoritesComponent, HomeComponent, AppComponent, LoginComponent, NavComponent, ResetPasswordComponent, RegisterComponent, RecetaCardComponent, CategoriaComponent],
  imports: [RouterModule, BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
