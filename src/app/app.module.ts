import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ScanComponent } from './components/scan/scan.component';
import { CvComponent } from './components/cv/cv.component';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { FormsModule } from '@angular/forms';
import { MotivationComponent } from './components/motivation/motivation.component';
import { CvDetailsComponent } from './components/cv-details/cv-details.component';
import { SpeechRecognitionComponent } from './speech-recognition/speech-recognition.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ScanComponent,
    CvComponent,
    BootstrapComponent,
    MotivationComponent,
    CvDetailsComponent,
    SpeechRecognitionComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
 
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
