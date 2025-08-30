import { Routes } from '@angular/router';
import { EditorViewComponent } from './editor-view/editor-view.component';

export const routes: Routes = [

  { path: 'note/:name',component: EditorViewComponent}, // Editing notes


];
