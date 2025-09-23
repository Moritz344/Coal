import { Routes } from '@angular/router';
import { EditorViewComponent } from './editor-view/editor-view.component';
import { FrontPageComponent } from './front-page/front-page.component';

export const routes: Routes = [

  { path: 'note/:name',component: EditorViewComponent}, // Editing notes
  { path: 'home',component: FrontPageComponent}, // Editing notes


];
