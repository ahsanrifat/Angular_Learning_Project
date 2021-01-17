import { AuthServiceService } from './../auth/auth-service.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn = false;
  @Output() featureSelected = new EventEmitter<string>();
  constructor(private dataService: DataStorageService, private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe((user) => {
      if (user) {
        this.isUserLoggedIn = true
      }
    })
  }
  onSelect(feature: string) {
    this.featureSelected.emit(feature);
    // console.log(feature)
  }
  storeRecipes() {
    this.dataService.storeRecipes();
  }
  fetchRecipes() {
    this.dataService.fetchRecipes().subscribe();
  }
  logout() {
    console.log('Logout');
    this.isUserLoggedIn = false;
    this.authService.logout();
  }

}
