import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SpaAngularEditableComponentsModule} from "@adobe/cq-angular-editable-components";
import {PageComponent} from "./components/page/page.component";
import {TextComponent} from "./components/text/text.component";
import {ImageComponent} from "./components/image/image.component";
import {HeaderComponent} from "./components/header/header.component";
import {ListComponent} from "./components/list/list.component";

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    TextComponent,
    ImageComponent,
    HeaderComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SpaAngularEditableComponentsModule
  ],
  providers: [],
  entryComponents: [
    ListComponent,
    TextComponent,
    PageComponent,
    ImageComponent,
    HeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
