import { Component, OnInit } from '@angular/core';
import { ScanService } from '../../services/scan.service';
import { NgxPrintModule } from 'ngx-print';
import printJS from 'print-js';
import * as JSPM from 'jsprintmanager';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrl: './scan.component.css',
})
export class ScanComponent implements OnInit {
  constructor(private scan: ScanService) {}

  printers: any = [];

  ngOnInit(): void {
    this.listeOcr();

    JSPM.JSPrintManager.auto_reconnect = true;
    JSPM.JSPrintManager.start();

    if (JSPM.JSPrintManager.WS) {
      JSPM.JSPrintManager.WS.onStatusChanged = () => {
        if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Open) {
          console.log('printer connected');

          // Get installed printers
          JSPM.JSPrintManager.getPrinters()
            .then((printers) => {
              this.printers = printers;
              console.log('Installed printers:', this.printers);
            })
            .catch((error) => {
              console.error('Error getting printers:', error);
            });
        }
      };
    }
  }

  imprimante(): void {
    if (this.printers.length > 0) {
      const cpj = new JSPM.ClientPrintJob();
      cpj.clientPrinter = new JSPM.InstalledPrinter(this.printers[0]); // Use the first printer in the list
      cpj
        .sendToClient()
        .then(() => {
          console.log('Print job sent to printer');
        })
        .catch((error) => {
          console.error('Error sending print job:', error);
        });
    }
  }

  printSection() {
    window.print();
  }

  print() {
    printJS('print-section', 'html');
  }

  selectedFile: File | null = null;
  ocrResult: string | null = null;
  error: string | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.scan.parseImage(this.selectedFile).subscribe(
        (response) => {
          this.ocrResult = response.ParsedResults[0].ParsedText;
          console.log('ocr', this.ocrResult);

        },
        (error) => {
          this.error =
            "une erreur est survenue dans lors du téléchagement d'image.";
          console.error(error);
        }
      );
    } else {
      this.error = 'Please selectionner un fichier.';
    }
  }

  file: any[] = [];
  listeOcr(): void {
    this.scan.ocrImageGet().subscribe((rep) => {
      this.file = rep;
      console.log('file', rep);
    });
  }
}
