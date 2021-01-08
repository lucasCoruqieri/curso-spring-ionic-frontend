import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder: FormBuilder,
     public cidadeService: CidadeService,
     public estadoService : EstadoService,
     public clienteService : ClienteService,
     public alertCtrl : AlertController) {

      this.formGroup = this.formBuilder.group({
          nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]], 
          email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
          tipo: ['1', [Validators.required]],
          cpfCnpj: ['97328214007', [Validators.required]], 
          senha: ['123', [Validators.required]],
          logradouro: ['Rua via', [Validators.required]],
          numero: ['25', [Validators.required]],  
          complemento: ['Apto 3', []],  
          bairro: ['Morumbi', []],
          cep: ['05712070', [Validators.required]],
          telefone1: ['996876655', [Validators.required]],
          telefone2: ['', []], 
          telefone3: ['', []],
          estadoId: ['1', [Validators.required]],    
          cidadeId: ['1', [Validators.required]]           
      });
  }
  
  ionViewDidLoad(){
    this.estadoService.findAll()
    .subscribe(response => {
        this.estados= response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
    },
    error => {});
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
    .subscribe(response => {
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);
    },
   error => {});
  }

  signupUser() {
       this.clienteService.insert(this.formGroup.value)
       .subscribe(response => {
         this.showInsertOk();
       },
    error => {});
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetutado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler:() => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}
