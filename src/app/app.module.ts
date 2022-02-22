import { FormModule } from 'src/app/shared/components/form/form.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderModule } from './shared/components/header/header.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { DialogConfirmModule } from './shared/components/dialog-confirm/dialog-confirm.module';
import { DialogAddModule } from './shared/components/dialog-add/dialog-add.module';
import { SheetModule } from './shared/components/sheet/sheet.module';
import { InviteDialogConfirmModule } from './shared/components/invite-dialog-confirm/invite-dialog-confirm.module';
import { EditProfileDialogModule } from './shared/components/edit-profile-dialog/edit-profile-dialog.module'

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    FormModule,
    RouterModule,
    BrowserAnimationsModule,
    HeaderModule,
    MatSidenavModule,
    MatListModule,
    DialogConfirmModule,
    DialogAddModule,
    SheetModule,
    InviteDialogConfirmModule,
    EditProfileDialogModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule {}
