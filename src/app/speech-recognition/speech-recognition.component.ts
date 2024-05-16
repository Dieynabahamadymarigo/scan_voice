import { Component } from '@angular/core';

@Component({
  selector: 'app-speech-recognition',
  templateUrl: './speech-recognition.component.html',
  styleUrls: ['./speech-recognition.component.css']
})
export class SpeechRecognitionComponent {
  recognition: any;
  isListening: boolean = false;
  fullTranscript: string = '';
  inputText: string = '';

  constructor() {
    this.recognition = new ((window as any).webkitSpeechRecognition)();
    this.recognition.lang = 'fr-FR';
    this.recognition.continuous = true;

    this.recognition.onresult = (event: { results: any[]; }) => {
      const last = event.results.length - 1;
      const currentTranscript = event.results[last][0].transcript;
      this.fullTranscript += currentTranscript + ' ';
      console.log(currentTranscript);
      this.inputText = currentTranscript; // Mettre à jour le texte de l'input
    };
  }

  toggleRecognition(): void {
    if (!this.isListening) {
      this.recognition.start();
      this.isListening = true;
      this.inputText = ''; // Initialiser inputText lorsque la reconnaissance vocale démarre
    } else {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  sendToTextarea(): void {
    this.fullTranscript += this.inputText + ' '; // Ajouter le texte de l'input au texte du textarea
    this.inputText = ''; // Effacer le texte de l'input après l'avoir ajouté
  }
}
