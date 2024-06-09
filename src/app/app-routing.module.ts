import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { VoiceComponent } from './components/voice/voice.component';
import { ScanComponent } from './components/scan/scan.component';
import { CvComponent } from './components/cv/cv.component';
import { MotivationComponent } from './components/motivation/motivation.component';
import { CvDetailsComponent } from './components/cv-details/cv-details.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SpeechRecognitionComponent } from './components/speech-recognition/speech-recognition.component';
import { GuardService } from './services/guards/guard.service';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [GuardService] },
  { path: 'voice', component: VoiceComponent, canActivate: [GuardService] },
  { path: 'scan', component: ScanComponent, canActivate:[GuardService] },
  { path: 'cv', component: CvComponent, canActivate:[GuardService] },
  { path: 'edit', component: MotivationComponent, canActivate:[GuardService] },
  { path: 'edit-cv', component: CvDetailsComponent, canActivate:[GuardService] },
  { path: 'reset-password', component: ResetPasswordComponent, },
  { path: '**', component: NotFoundComponent },
  {
    path: 'speech',
    component: SpeechRecognitionComponent,
    canActivate: [GuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
