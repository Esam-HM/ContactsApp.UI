import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AllCommunityModule, ModuleRegistry} from 'ag-grid-community';
import { NavBarComponent } from "../components/nav-bar/nav-bar.component";

ModuleRegistry.registerModules([
  AllCommunityModule
]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  
}
