import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AllCommunityModule, ModuleRegistry} from 'ag-grid-community';

ModuleRegistry.registerModules([
  AllCommunityModule
]);


declare var particlesJS: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {

  
  
  ngAfterViewInit(): void {
    // particlesJS.load("particles-js", "particles.json", () => {
    //   console.log("callback - particles loaded");
    // });
  }
  
}
